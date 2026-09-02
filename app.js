// ===================== СОСТОЯНИЕ =====================
const STORAGE_KEY = "pyCourseProgress_v1";

const state = {
  unlocked: 0,       // индекс первого ещё не пройденного урока (0-based)
  current: 0,        // какой урок сейчас открыт
  completed: new Set(),   // индексы пройденных уроков
  learnedRules: new Set(), // id правил, которые уже были ПОЛНОСТЬЮ изучены (урок пройден)
};

// Прогресс хранится в localStorage — отдельно в каждом браузере/устройстве.
// Если несколько человек открывают один и тот же сайт (например, с GitHub Pages),
// у каждого будет свой собственный прогресс, никто друг другу не мешает.
function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      unlocked: state.unlocked,
      completed: [...state.completed],
      learnedRules: [...state.learnedRules],
    }));
  } catch (e) { /* localStorage недоступен — просто не сохраняем */ }
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const data = JSON.parse(raw);
    if (typeof data.unlocked === "number") state.unlocked = data.unlocked;
    if (Array.isArray(data.completed)) state.completed = new Set(data.completed);
    if (Array.isArray(data.learnedRules)) state.learnedRules = new Set(data.learnedRules);
    state.current = state.unlocked;
  } catch (e) { /* игнорируем повреждённые данные */ }
}

function resetProgress() {
  if (!confirm("Барлық прогресс өшіріледі. Сенімдісің бе?")) return;
  try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
  state.unlocked = 0;
  state.current = 0;
  state.completed = new Set();
  state.learnedRules = new Set();
  renderAll();
}

let pyodideReady = false;
let pyodide = null;

// ===================== PYODIDE =====================
async function initPyodide() {
  const statusEl = document.getElementById("pyStatus");
  try {
    pyodide = await loadPyodide();
    pyodideReady = true;
    statusEl.textContent = "Python дайын";
    statusEl.classList.add("ready");
    document.querySelectorAll(".run-btn, .check-btn").forEach(b => b.disabled = false);
  } catch (e) {
    statusEl.textContent = "Python жүктелмеді. Интернетті тексеріңіз.";
    statusEl.classList.add("err");
    console.error(e);
  }
}

function extractNumbers(text) {
  const matches = text.match(/-?\d+(\.\d+)?/g);
  if (!matches) return [];
  return matches.map(Number);
}

// Выполняет код студента. inputsArr — заранее заданные ответы на input().
// interactive=true -> input() реально спросит через window.prompt (для кнопки "Іске қосу")
async function runPython(code, inputsArr, interactive) {
  if (!pyodideReady) return { stdout: "", error: "Python әлі дайын емес, сәл күтіңіз..." };
  const setupInteractive = `
import sys, io, builtins
sys.stdout = io.StringIO()
sys.stderr = sys.stdout
def __fake_input(prompt=""):
    from js import prompt as __js_prompt
    r = __js_prompt(str(prompt) if prompt else "Мән енгізіңіз:")
    return r if r is not None else ""
builtins.input = __fake_input
`;
  const setupTest = `
import sys, io, builtins
sys.stdout = io.StringIO()
sys.stderr = sys.stdout
__test_inputs = ${JSON.stringify(inputsArr || [])}
__input_i = {"n": 0}
def __fake_input(prompt=""):
    i = __input_i["n"]
    __input_i["n"] += 1
    if i < len(__test_inputs):
        return str(__test_inputs[i])
    return ""
builtins.input = __fake_input
`;
  try {
    pyodide.runPython(interactive ? setupInteractive : setupTest);
  } catch (e) {
    // setup itself shouldn't fail, but just in case
  }
  let error = null;
  try {
    await pyodide.runPythonAsync(code);
  } catch (e) {
    error = cleanError(String(e));
  }
  let stdout = "";
  try {
    stdout = pyodide.runPython("sys.stdout.getvalue()");
  } catch (e) {
    stdout = "";
  }
  return { stdout: stdout || "", error };
}

function cleanError(raw) {
  // Оставляем только последнюю содержательную строку трейсбека Python
  const lines = raw.trim().split("\n");
  const last = lines[lines.length - 1] || raw;
  return last.replace(/^PythonError:\s*/, "");
}

// ===================== ПРОВЕРКА ЗАДАНИЙ =====================
function pass(msg) { return { ok: true, message: msg }; }
function fail(msg) { return { ok: false, message: msg }; }

async function checkLesson(lesson, code) {
  switch (lesson.checkKind) {
    case "nonempty": {
      const { stdout, error } = await runPython(code, [], false);
      if (error) return fail("Кодта қате бар: " + error);
      if (stdout.trim().length === 0) return fail("Экранға ештеңе шықпады. print() арқылы бір нәрсе шығарып көр.");
      return pass(lesson.successHint);
    }
    case "min_lines": {
      const { stdout, error } = await runPython(code, lesson.testInputs || [], false);
      if (error) return fail("Кодта қате бар: " + error);
      const lines = stdout.split("\n").map(l => l.trim()).filter(l => l.length > 0);
      if (lines.length < lesson.minLines) {
        return fail(`Қазір тек ${lines.length} жол шықты, ал кемінде ${lesson.minLines} керек. Әр мәліметті жеке print() арқылы шығар.`);
      }
      return pass(lesson.successHint);
    }
    case "exact_contains": {
      const { stdout, error } = await runPython(code, lesson.testInputs || [], false);
      if (error) return fail("Кодта қате бар: " + error);
      for (const needle of lesson.mustContain) {
        if (!stdout.includes(needle)) {
          return fail(`Нәтижеде "${needle}" деген мәтін табылмады. Тапсырманы қайта оқып, кодты тексер.`);
        }
      }
      return pass(lesson.successHint);
    }
    case "numeric": {
      for (const tc of lesson.testCases) {
        const { stdout, error } = await runPython(code, tc.inputs, false);
        if (error) return fail("Кодта қате бар: " + error);
        const nums = extractNumbers(stdout);
        for (const exp of tc.expectedNumbers) {
          const found = nums.some(n => Math.abs(n - exp) < 0.01);
          if (!found) {
            const inputNote = tc.inputs.length ? ` (енгізілген сан: ${tc.inputs.join(", ")})` : "";
            return fail(`Жауап дұрыс емес сияқты${inputNote}. Күтілген нәтижеде ${exp} саны болу керек еді. Формуланы қайта тексер.`);
          }
        }
      }
      return pass(lesson.successHint);
    }
    case "exact_branch": {
      for (const tc of lesson.testCases) {
        const { stdout, error } = await runPython(code, tc.inputs, false);
        if (error) return fail("Кодта қате бар: " + error);
        if (!stdout.includes(tc.expected)) {
          const inputNote = tc.inputs.length ? ` (енгізілген мән: ${tc.inputs.join(", ")})` : "";
          return fail(`Жауап дұрыс емес сияқты${inputNote}. Күтілген нәтижеде "${tc.expected}" деген мәтін болу керек еді. Шартыңды қайта тексер.`);
        }
      }
      return pass(lesson.successHint);
    }
    case "branch": {
      const outs = [];
      for (const tc of lesson.testCases) {
        const { stdout, error } = await runPython(code, tc.inputs, false);
        if (error) return fail("Кодта қате бар: " + error);
        if (stdout.trim().length === 0) return fail("Экранға ешнәрсе шықпады. if/else ішінде print() болуы керек.");
        outs.push(stdout.trim());
      }
      if (new Set(outs).size < 2) {
        return fail("Әр түрлі сандар үшін нәтиже бірдей болып тұр. if және else екеуі де дұрыс жауап беруі керек — шартты тексер.");
      }
      return pass(lesson.successHint);
    }
    default:
      return fail("Белгісіз тексеру түрі.");
  }
}

// ===================== РЕНДЕР =====================
function ruleCardFull(ruleId) {
  const r = RULES[ruleId];
  return `<div class="rule-card new">
    <div class="rule-head"><span class="tag tag-new">жаңа</span><h4>${r.title}</h4></div>
    <div class="rule-body">${r.full}</div>
  </div>`;
}

function ruleCardShort(ruleId) {
  const r = RULES[ruleId];
  return `<details class="rule-card known">
    <summary><span class="tag tag-known">бұрын үйрендік</span><span class="rule-title-inline">${r.title}</span></summary>
    <div class="rule-body short">${r.short}</div>
  </details>`;
}

function renderSidebar() {
  const list = document.getElementById("lessonList");
  list.innerHTML = "";
  LESSONS.forEach((lesson, i) => {
    const li = document.createElement("li");
    const locked = i > state.unlocked;
    const done = state.completed.has(i);
    li.className = "lesson-item" + (i === state.current ? " active" : "") + (locked ? " locked" : "") + (done ? " done" : "");
    li.innerHTML = `<span class="num">${done ? "✓" : lesson.id}</span><span class="lbl">${lesson.title}</span>`;
    if (!locked) {
      li.addEventListener("click", () => { state.current = i; renderAll(); });
    }
    list.appendChild(li);
  });
  const doneCount = state.completed.size;
  document.getElementById("progressText").textContent = `${doneCount} / ${LESSONS.length} тапсырма орындалды`;
  document.getElementById("progressFill").style.width = `${(doneCount / LESSONS.length) * 100}%`;
}

function renderLesson() {
  const lesson = LESSONS[state.current];
  const main = document.getElementById("mainPanel");

  const newRulesHtml = lesson.newRuleIds.map(ruleCardFull).join("");
  const reviewRulesHtml = lesson.reviewRuleIds
    .filter(id => state.learnedRules.has(id) || lesson.newRuleIds.length === 0 || true)
    .map(ruleCardShort).join("");

  const examplesHtml = lesson.examples.map(ex => `
    <div class="example">
      <pre><code>${escapeHtml(ex.code)}</code></pre>
      <p class="example-explain">${ex.explain}</p>
    </div>`).join("");

  main.innerHTML = `
    <div class="lesson-header">
      <span class="lesson-num">Тапсырма ${lesson.id} / ${LESSONS.length}</span>
      <h2>${lesson.title}</h2>
    </div>

    ${newRulesHtml ? `<section class="block"><h3>Жаңа ережелер</h3>${newRulesHtml}</section>` : ""}
    ${reviewRulesHtml ? `<section class="block"><h3>Бұрын үйренгендер (қажет болса еске түсір)</h3>${reviewRulesHtml}</section>` : ""}

    <section class="block">
      <h3>Мысал</h3>
      ${examplesHtml}
    </section>

    <section class="block task-block">
      <h3>Тапсырма (мұғалімнен)</h3>
      <blockquote class="task-text">${lesson.taskKz}</blockquote>
    </section>

    <section class="block">
      <h3>Кодыңды осында жаз</h3>
      <textarea id="codeArea" spellcheck="false">${escapeHtml(lesson.starterCode)}</textarea>
      <div class="btn-row">
        <button id="runBtn" class="run-btn" disabled>▶ Іске қосу</button>
        <button id="checkBtn" class="check-btn" disabled>✓ Тексеру</button>
        <button id="hintBtn" class="hint-btn" type="button">💡 Кеңес керек пе?</button>
        <span id="pyStatus" class="py-status">Python жүктелуде...</span>
      </div>
      <div id="outputBox" class="output-box empty">Нәтиже осында шығады...</div>
      <div id="feedbackBox" class="feedback-box hidden"></div>

      <div id="hintPanel" class="hint-panel hidden">
        <p class="hint-warning">Бұл — дайын жауап. Көшіріп-жапсырма — <b>қолыңмен қайта теріп жаз</b>, сонда ғана есіңде қалады. Бұл терезеден көшіру өшірілген.</p>
        <pre id="hintCode" class="hint-code" oncopy="return false" oncontextmenu="return false" ondragstart="return false"></pre>
      </div>
    </section>
  `;

  if (pyodideReady) {
    document.getElementById("runBtn").disabled = false;
    document.getElementById("checkBtn").disabled = false;
    document.getElementById("pyStatus").textContent = "Python дайын";
    document.getElementById("pyStatus").classList.add("ready");
  }

  document.getElementById("runBtn").addEventListener("click", onRun);
  document.getElementById("checkBtn").addEventListener("click", onCheck);
  document.getElementById("hintBtn").addEventListener("click", onToggleHint);
  setupCopyProtection(document.getElementById("hintCode"), lesson.solutionCode);
}

// ---- Подсказка (защищённая от копирования) ----
function onToggleHint() {
  const panel = document.getElementById("hintPanel");
  const btn = document.getElementById("hintBtn");
  const isHidden = panel.classList.contains("hidden");
  panel.classList.toggle("hidden");
  btn.textContent = isHidden ? "🙈 Кеңесті жасыру" : "💡 Кеңес керек пе?";
}

function setupCopyProtection(el, code) {
  el.textContent = code;
  el.setAttribute("tabindex", "0");
  const block = (e) => { e.preventDefault(); return false; };
  el.addEventListener("copy", block);
  el.addEventListener("cut", block);
  el.addEventListener("contextmenu", block);
  el.addEventListener("dragstart", block);
  el.addEventListener("selectstart", block);
  el.addEventListener("keydown", (e) => {
    const k = e.key.toLowerCase();
    if ((e.ctrlKey || e.metaKey) && (k === "c" || k === "a" || k === "x" || k === "s")) {
      e.preventDefault();
    }
  });
}

// Глобальная защита: блокирует копирование/правый клик/выделение
// для ВСЕХ блоков с готовым кодом на странице (правила + примеры + подсказка),
// чтобы их нельзя было скопировать и вставить как ответ.
const PROTECTED_CODE_SELECTOR = ".rule-body pre, .example pre, .hint-code";

document.addEventListener("contextmenu", (e) => {
  if (e.target.closest && e.target.closest(PROTECTED_CODE_SELECTOR)) {
    e.preventDefault();
  }
});
document.addEventListener("dragstart", (e) => {
  if (e.target.closest && e.target.closest(PROTECTED_CODE_SELECTOR)) {
    e.preventDefault();
  }
});
document.addEventListener("selectstart", (e) => {
  if (e.target.closest && e.target.closest(PROTECTED_CODE_SELECTOR)) {
    e.preventDefault();
  }
});
document.addEventListener("copy", (e) => {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return;
  const node = sel.anchorNode;
  const el = node && (node.nodeType === 1 ? node : node.parentElement);
  if (el && el.closest && el.closest(PROTECTED_CODE_SELECTOR)) {
    e.preventDefault();
    if (e.clipboardData) e.clipboardData.setData("text/plain", "");
  }
});

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function onRun() {
  const lesson = LESSONS[state.current];
  const code = document.getElementById("codeArea").value;
  const outBox = document.getElementById("outputBox");
  outBox.classList.remove("empty", "err");
  outBox.textContent = "Орындалуда...";
  const needsInput = /input\s*\(/.test(code);
  const { stdout, error } = await runPython(code, [], needsInput);
  if (error) {
    outBox.classList.add("err");
    outBox.textContent = error;
  } else {
    outBox.textContent = stdout.trim().length ? stdout : "(экранға ештеңе шықпады)";
  }
}

async function onCheck() {
  const lesson = LESSONS[state.current];
  const code = document.getElementById("codeArea").value;
  const fbBox = document.getElementById("feedbackBox");
  fbBox.classList.remove("hidden", "ok", "bad");
  fbBox.textContent = "Тексерілуде...";

  const result = await checkLesson(lesson, code);

  if (result.ok) {
    fbBox.classList.add("ok");
    fbBox.innerHTML = `<b>Дұрыс!</b> ${result.message}`;
    state.completed.add(state.current);
    lesson.newRuleIds.forEach(id => state.learnedRules.add(id));
    if (state.unlocked === state.current && state.unlocked < LESSONS.length - 1) {
      state.unlocked += 1;
    } else if (state.unlocked === state.current) {
      state.unlocked = LESSONS.length - 1;
    }
    saveProgress();
    renderSidebar();
    if (state.current < LESSONS.length - 1) {
      setTimeout(() => {
        state.current += 1;
        renderAll();
      }, 1400);
    } else {
      fbBox.innerHTML += `<br><br>🎉 Барлық 20 тапсырманы бітірдің!`;
    }
  } else {
    fbBox.classList.add("bad");
    fbBox.innerHTML = `<b>Әлі дұрыс емес.</b> ${result.message} Тағы көріп, қайта жібер.`;
  }
}

function renderAll() {
  renderSidebar();
  renderLesson();
}

document.addEventListener("DOMContentLoaded", () => {
  loadProgress();
  renderAll();
  initPyodide();
  const resetBtn = document.getElementById("resetBtn");
  if (resetBtn) resetBtn.addEventListener("click", resetProgress);
});
