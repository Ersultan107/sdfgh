// ===================== СЛОВАРЬ ПРАВИЛ =====================
// Каждое правило рассказывается полностью один раз (когда встречается впервые),
// а затем при повторной встрече показывается только короткое напоминание.
const RULES = {
  r_print: {
    title: "Функция print()",
    short: "print() выводит текст или число на экран.",
    full: `<p><b>print()</b> — это команда, которая показывает что-то на экране. Всё, что ты положишь внутрь скобок, появится в окне результата.</p>
<pre><code>print("Сәлем")</code></pre>
<p>Python выполнит эту строку и покажет: <code>Сәлем</code></p>
<p>Скобки <code>()</code> — обязательная часть команды. Без них ничего не выведется.</p>`
  },
  r_string: {
    title: "Строка (текст в кавычках)",
    short: "Текст в программе всегда пишут в кавычках — это называется строка.",
    full: `<p>Если ты хочешь, чтобы Python вывел именно <i>текст</i> (а не посчитал что-то), этот текст нужно взять в кавычки — одинарные <code>'...'</code> или двойные <code>"..."</code>. Разницы между ними нет, главное — не смешивать в одной строке.</p>
<pre><code>print("Мен үйренемін")
print('Бұл да жұмыс істейді')</code></pre>
<p>Такой текст в кавычках называется <b>строкой</b> (по-английски <i>string</i>). Если убрать кавычки у слова, Python подумает, что это имя переменной, и выдаст ошибку.</p>`
  },
  r_variable: {
    title: "Переменная",
    short: "Переменная — это имя, под которым Python запоминает значение (name = \"Аружан\").",
    full: `<p><b>Переменная</b> — это как подписанная коробка: ты кладёшь туда значение и потом обращаешься к нему по имени.</p>
<pre><code>name = "Аружан"
age = 16
print(name)
print(age)</code></pre>
<p>Слева от знака <code>=</code> — имя переменной, справа — значение, которое туда «кладётся». Дальше можно использовать <code>name</code> вместо того, чтобы каждый раз писать текст заново.</p>
<p>Обрати внимание: <code>=</code> здесь — это не «равно» как в математике, а команда «сохранить в переменную».</p>`
  },
  r_arithmetic: {
    title: "Арифметические операции (+, -, *, /)",
    short: "+ сложение, − вычитание, * умножение, / деление — работают так же, как в математике.",
    full: `<p>Python умеет считать прямо в коде:</p>
<pre><code>a = 15
b = 4
print(a + b)   # сложение → 19
print(a - b)   # вычитание → 11
print(a * b)   # умножение → 60
print(a / b)   # деление → 3.75</code></pre>
<p>Знак умножения — это <code>*</code> (звёздочка), а не <code>x</code>. Деление <code>/</code> в Python всегда возвращает дробное число, даже если делится нацело.</p>`
  },
  r_input: {
    title: "Функция input()",
    short: "input() ставит программу на паузу и ждёт, пока пользователь введёт текст.",
    full: `<p><b>input()</b> — это способ спросить что-то у пользователя. Программа остановится и будет ждать, пока человек напечатает ответ и нажмёт Enter.</p>
<pre><code>name = input("Атыңызды жазыңыз: ")
print(name)</code></pre>
<p>Текст внутри скобок — это подсказка, которую увидит пользователь. То, что он введёт, сохраняется в переменную (в примере — <code>name</code>).</p>
<p><b>Важно:</b> всё, что вводит пользователь через <code>input()</code>, Python воспринимает как строку (текст) — даже если это цифры.</p>`
  },
  r_fstring: {
    title: "Вставка переменной в текст (f-строка)",
    short: 'f"...{переменная}..." — способ вставить значение переменной прямо в текст.',
    full: `<p>Если хочешь собрать сообщение из текста и переменной, удобно поставить букву <code>f</code> перед кавычками и написать имя переменной в фигурных скобках <code>{}</code>:</p>
<pre><code>name = "Данияр"
print(f"Сәлем, {name}!")</code></pre>
<p>Выведет: <code>Сәлем, Данияр!</code></p>
<p>Python сам подставит значение переменной вместо <code>{name}</code>. Без буквы <code>f</code> перед кавычками фигурные скобки не сработают.</p>`
  },
  r_int: {
    title: "Функция int()",
    short: "int() превращает текст в целое число, чтобы с ним можно было считать.",
    full: `<p>input() всегда возвращает текст (строку), даже если пользователь ввёл цифры. Чтобы посчитать что-то с этим числом, его нужно превратить в настоящее число функцией <b>int()</b>.</p>
<pre><code>age = input("Жасыңыз: ")   # это ещё текст, например "20"
age = int(age)              # теперь это число 20
print(age + 5)               # можно считать → 25</code></pre>
<p>Если попробовать сложить текст с числом без <code>int()</code>, Python выдаст ошибку. Часто обе строчки объединяют в одну: <code>age = int(input("Жасыңыз: "))</code>.</p>`
  },
  r_float: {
    title: "Функция float()",
    short: "float() превращает текст в дробное число (с точкой), например 3.5.",
    full: `<p><b>float()</b> работает как <code>int()</code>, но превращает текст в число с точкой — то есть в дробное число.</p>
<pre><code>n = float(input("Сан енгізіңіз: "))
print(n * 2)</code></pre>
<p>Используй <code>float()</code>, когда результат может быть не целым числом (например, среднее значение или деление).</p>`
  },
  r_order: {
    title: "Порядок действий и скобки",
    short: "Python сначала считает * и /, потом + и −. Скобки () меняют порядок, как в математике.",
    full: `<p>Python считает по тем же правилам, что и на уроках математики: сначала умножение и деление, потом сложение и вычитание.</p>
<pre><code>print(2 + 3 * 4)     # сначала 3*4=12, потом 2+12 → 14
print((2 + 3) * 4)    # сначала 2+3=5, потом 5*4 → 20</code></pre>
<p>Если сомневаешься — ставь скобки. Они всегда выполняются первыми и делают код понятнее.</p>`
  },
  r_if: {
    title: "Условие if / else",
    short: "if проверяет условие: если оно верно — один блок кода, иначе (else) — другой.",
    full: `<p><b>if</b> позволяет программе принимать решение: выполнить один код, если условие верно, и другой — если нет.</p>
<pre><code>x = 10
if x == 10:
    print("Иә, ондық")
else:
    print("Жоқ, ондық емес")</code></pre>
<p>После <code>if условие:</code> и после <code>else:</code> обязательно ставится двоеточие <code>:</code>, а строки внутри — с отступом (4 пробела или Tab). Отступ — это то, как Python понимает, что относится к <code>if</code>, а что нет.</p>`
  },
  r_compare: {
    title: "Операторы сравнения",
    short: "== равно, != не равно, > больше, < меньше, >= больше/равно, <= меньше/равно.",
    full: `<p>Чтобы проверить условие внутри <code>if</code>, используют операторы сравнения:</p>
<pre><code>x == 10   # x равно 10?
x != 10   # x НЕ равно 10?
x > 10    # x больше 10?
x < 10    # x меньше 10?
x >= 10   # x больше или равно 10?
x <= 10   # x меньше или равно 10?</code></pre>
<p>Не путай <code>==</code> (сравнение, вопрос «равно ли?») с <code>=</code> (присваивание, команда «сохранить»). Это одна из самых частых ошибок у новичков.</p>`
  },
  r_elif: {
    title: "elif — қосымша шарт",
    short: "elif — if мен else арасында қосымша шартты тексереді, нұсқа екеуден көп болғанда қолданылады.",
    full: `<p>Егер нұсқа екеуден көп болса (мысалы, бірнеше баға деңгейі), бір <code>else</code> жеткіліксіз. Осындай жағдайда <b>elif</b> (else if дегеннің қысқасы) қосымша шартты тексереді.</p>
<pre><code>score = 75
if score >= 90:
    print("A")
elif score >= 70:
    print("B")
else:
    print("C")</code></pre>
<p>Python шарттарды жоғарыдан төменге қарай ретімен тексереді және біріншісі дұрыс болған жерде тоқтайды, қалғанын тексермейді. <code>elif</code> санын қажетінше көбейтуге болады.</p>`
  },
  r_modulo: {
    title: "Қалдық табу амалы (%)",
    short: "% амалы бөлгеннен қалған қалдықты табады. Жұп сандар үшін n % 2 әрқашан 0.",
    full: `<p><b>%</b> (модуль) амалы бірінші санды екіншісіне бөлгендегі <b>қалдықты</b> қайтарады, толық нәтижені емес.</p>
<pre><code>print(7 % 2)   # 1 (7-ні 2-ге бөлсек, қалдық 1 болады)
print(8 % 2)   # 0 (8 нацело бөлінеді, қалдық жоқ)</code></pre>
<p>Сан жұп болса, оны 2-ге бөлгенде қалдық әрқашан <code>0</code> болады, сондықтан жұптықты <code>n % 2 == 0</code> арқылы тексереді.</p>`
  },
  r_and: {
    title: "Логикалық and (және)",
    short: "and — бір if ішінде бірнеше шартты біріктіреді; нәтиже екеуі де дұрыс болғанда ғана True.",
    full: `<p><b>and</b> бірнеше шартты бір <code>if</code> ішінде біріктіруге мүмкіндік береді. Нәтиже тек <b>екі шарт та</b> бірдей дұрыс болғанда ғана True болады.</p>
<pre><code>age = 20
has_ticket = True
if age >= 18 and has_ticket:
    print("Кіруге болады")
else:
    print("Кіруге болмайды")</code></pre>
<p>Шарттардың тек біреуі ғана қате болса да, бүкіл өрнек False болып, <code>else</code> бөлігі орындалады.</p>`
  }
};

// ===================== 20 ЗАДАНИЙ =====================
// Оригинальный текст задания — от преподавательницы, на казахском, без изменений.
// ===================== 20 ЗАДАНИЙ =====================
// Оригинальный текст задания — от преподавательницы, на казахском, без изменений.
// starterCode — пустой каркас, который заполняет ученик сам.
// solutionCode — готовый рабочий код, показывается ТОЛЬКО по кнопке "Кеңес" и защищён от копирования.
const LESSONS = [
{
  id: 1,
  title: "Первый вывод на экран",
  taskKz: "Экранға өз атыңызды шығарыңыз.",
  newRuleIds: ["r_print", "r_string"],
  reviewRuleIds: [],
  intro: `Первая программа почти всегда одна и та же — вывести что-то на экран. В Python для этого есть команда <b>print()</b>. Это самая первая и самая нужная команда, ты будешь использовать её в каждом задании.`,
  examples: [
    { code: `print("Айгерім")`, explain: `Здесь "Айгерім" — это текст в кавычках (строка). Программа выведет ровно то, что написано внутри кавычек: Айгерім.` }
  ],
  starterCode: `# Мына жерге print() арқылы өз атыңды жаз\n\n`,
  solutionCode: `print("Айгерім")`,
  checkKind: "nonempty",
  successHint: "Отлично! Ты вывел(а) первый текст на экране — это твоя первая строчка кода.",
},
{
  id: 2,
  title: "Вывод готовой фразы",
  taskKz: "Экранға «Мен Python тілін үйреніп жатырмын» деген мәтінді шығарыңыз.",
  newRuleIds: [],
  reviewRuleIds: ["r_print", "r_string"],
  intro: `Здесь всё то же самое, что и в первом задании — только текст уже дан, и его нужно вывести <b>точно так же, как написано</b>.`,
  examples: [
    { code: `print("Бұл менің екінші жаттығуым")`, explain: `Просто ещё один пример: print() с текстом внутри кавычек — то, что мы уже умеем.` }
  ],
  starterCode: `# Берілген сөйлемді дәл осылай print() арқылы шығар\n\n`,
  solutionCode: `print("Мен Python тілін үйреніп жатырмын")`,
  checkKind: "exact_contains",
  mustContain: ["Мен Python тілін үйреніп жатырмын"],
  successHint: "Верно! Фраза выведена точно так, как в задании.",
},
{
  id: 3,
  title: "Несколько строк вывода",
  taskKz: "Өз атыңызды, жасыңызды және қалаңызды жеке жолдарға шығарыңыз.",
  newRuleIds: ["r_variable"],
  reviewRuleIds: ["r_print"],
  intro: `Теперь нужно вывести не один, а три разных значения — каждое на своей строке. Удобнее сначала сохранить каждое значение в отдельную переменную, а потом вывести все три через print().`,
  examples: [
    { code: `name = "Данияр"\nage = 15\ncity = "Алматы"\nprint(name)\nprint(age)\nprint(city)`,
      explain: `Мы создали три переменные: name (текст), age (число), city (текст). Затем вывели каждую отдельным print() — получилось три строки.` }
  ],
  starterCode: `# 1) Үш айнымалы жаса: атың, жасың, қалаң\n# 2) Әрқайсысын жеке print() арқылы шығар\n\n`,
  solutionCode: `name = "Данияр"\nage = 15\ncity = "Алматы"\nprint(name)\nprint(age)\nprint(city)`,
  checkKind: "min_lines",
  minLines: 3,
  successHint: "Хорошо! Три переменные — три строки на экране.",
},
{
  id: 4,
  title: "Сумма двух чисел",
  taskKz: "Екі сан берілген. Олардың қосындысын табыңыз.",
  newRuleIds: ["r_arithmetic"],
  reviewRuleIds: ["r_variable", "r_print"],
  intro: `Задания 4–7 используют одни и те же два числа: <code>a = 15</code> и <code>b = 4</code> (они уже вписаны в код). В каждом задании нужно применить новую операцию. Сейчас — сложение <code>+</code>.<br><i>Совет: не меняй значения a и b, иначе проверка результата собьётся.</i>`,
  examples: [
    { code: `x = 10\ny = 3\nprint(x + y)`, explain: `Знак + складывает два числа. Результат 13 выводится сразу внутри print().` }
  ],
  starterCode: `a = 15\nb = 4\n\n# a мен b-ның қосындысын тап және print() арқылы шығар\n\n`,
  solutionCode: `a = 15\nb = 4\nprint(a + b)`,
  checkKind: "numeric",
  testCases: [{ inputs: [], expectedNumbers: [19] }],
  successHint: "Верно, 15 + 4 = 19.",
},
{
  id: 5,
  title: "Разность двух чисел",
  taskKz: "Екі сан берілген. Олардың айырмасын табыңыз.",
  newRuleIds: [],
  reviewRuleIds: ["r_arithmetic"],
  intro: `Те же <code>a = 15</code> и <code>b = 4</code> — теперь вычитание <code>-</code>.`,
  examples: [
    { code: `x = 10\ny = 3\nprint(x - y)`, explain: `Знак - вычитает второе число из первого: 10 - 3 = 7.` }
  ],
  starterCode: `a = 15\nb = 4\n\n# a мен b-ның айырмасын тап және print() арқылы шығар\n\n`,
  solutionCode: `a = 15\nb = 4\nprint(a - b)`,
  checkKind: "numeric",
  testCases: [{ inputs: [], expectedNumbers: [11] }],
  successHint: "Верно, 15 − 4 = 11.",
},
{
  id: 6,
  title: "Произведение двух чисел",
  taskKz: "Екі сан берілген. Олардың көбейтіндісін табыңыз.",
  newRuleIds: [],
  reviewRuleIds: ["r_arithmetic"],
  intro: `Те же <code>a = 15</code> и <code>b = 4</code> — теперь умножение. Помни: знак умножения в Python это <code>*</code>, а не «x».`,
  examples: [
    { code: `x = 10\ny = 3\nprint(x * y)`, explain: `10 * 3 = 30.` }
  ],
  starterCode: `a = 15\nb = 4\n\n# a мен b-ның көбейтіндісін тап және print() арқылы шығар\n\n`,
  solutionCode: `a = 15\nb = 4\nprint(a * b)`,
  checkKind: "numeric",
  testCases: [{ inputs: [], expectedNumbers: [60] }],
  successHint: "Верно, 15 × 4 = 60.",
},
{
  id: 7,
  title: "Деление двух чисел",
  taskKz: "Екі сан берілген. Бірінші санды екінші санға бөліңіз.",
  newRuleIds: [],
  reviewRuleIds: ["r_arithmetic"],
  intro: `Те же <code>a = 15</code> и <code>b = 4</code> — теперь деление <code>/</code>. В Python деление всегда даёт дробное число, даже если можно было бы поделить нацело.`,
  examples: [
    { code: `x = 10\ny = 4\nprint(x / y)`, explain: `10 / 4 = 2.5 — с точкой, потому что / в Python всегда возвращает дробный результат.` }
  ],
  starterCode: `a = 15\nb = 4\n\n# a-ны b-ға бөл және print() арқылы шығар\n\n`,
  solutionCode: `a = 15\nb = 4\nprint(a / b)`,
  checkKind: "numeric",
  testCases: [{ inputs: [], expectedNumbers: [3.75] }],
  successHint: "Верно, 15 ÷ 4 = 3.75.",
},
{
  id: 8,
  title: "Приветствие по имени",
  taskKz: "Пайдаланушыдан оның атын сұрап, экранға сәлемдесу хабарламасын шығарыңыз.",
  newRuleIds: ["r_input", "r_fstring"],
  reviewRuleIds: ["r_print", "r_variable"],
  intro: `Впервые программа не просто выводит текст, а <b>спрашивает</b> что-то у пользователя — через <code>input()</code>. То, что человек введёт, можно сразу вставить в приветствие с помощью f-строки.<br><i>При проверке программа сама впишет тестовое имя вместо реального ввода.</i>`,
  examples: [
    { code: `city = input("Қай қалада тұрасыз? ")\nprint(f"{city} — өте әдемі қала екен!")`, explain: `input() спрашивает город, сохраняет ответ в city, а f-строка вставляет его в готовое предложение.` }
  ],
  starterCode: `# 1) input() арқылы пайдаланушының атын сұра\n# 2) Сол атты пайдаланып сәлемдесу хабарламасын шығар (f-жолды қолдансаң болады)\n\n`,
  solutionCode: `name = input("Атыңызды жазыңыз: ")\nprint(f"Сәлем, {name}!")`,
  checkKind: "exact_contains",
  testInputs: ["Динара"],
  mustContain: ["Динара"],
  successHint: "Отлично! Программа услышала имя и вставила его в приветствие.",
},
{
  id: 9,
  title: "Возраст через 5 лет",
  taskKz: "Пайдаланушыдан жасын сұраңыз. Оның 5 жылдан кейінгі жасын есептеңіз.",
  newRuleIds: ["r_int"],
  reviewRuleIds: ["r_input", "r_arithmetic"],
  intro: `input() всегда отдаёт текст, а не число — даже если пользователь ввёл цифры. Чтобы прибавить к возрасту 5, число нужно сначала превратить из текста в настоящее число функцией <code>int()</code>.`,
  examples: [
    { code: `score = int(input("Ұпай саны: "))\nprint(score + 10)`, explain: `int() превращает введённый текст в число, поэтому score + 10 можно посчитать без ошибки.` }
  ],
  starterCode: `# 1) input() арқылы жасын сұра, int() арқылы санға айналдыр\n# 2) 5 жылдан кейінгі жасын есептеп, print() ет\n\n`,
  solutionCode: `age = int(input("Жасыңызды енгізіңіз: "))\nprint(age + 5)`,
  checkKind: "numeric",
  testCases: [{ inputs: ["20"], expectedNumbers: [25] }],
  successHint: "Верно! int() превратил текст в число, и прибавить 5 стало возможно.",
},
{
  id: 10,
  title: "Среднее двух чисел",
  taskKz: "Пайдаланушыдан екі сан енгізуді сұрап, олардың орташа арифметикалық мәнін табыңыз.",
  newRuleIds: ["r_float"],
  reviewRuleIds: ["r_input", "r_int", "r_arithmetic"],
  intro: `Среднее арифметическое двух чисел — это их сумма, делённая на 2: <code>(a + b) / 2</code>. Результат может быть дробным, поэтому удобнее сразу считывать числа через <code>float()</code>, а не <code>int()</code>.`,
  examples: [
    { code: `x = float(input("Бірінші сан: "))\ny = float(input("Екінші сан: "))\nprint((x + y) / 2)`, explain: `Скобки вокруг x + y обязательны — иначе Python сначала поделит y на 2, а потом только прибавит x, и результат будет неверным.` }
  ],
  starterCode: `# 1) input() арқылы екі сан сұра, float() арқылы санға айналдыр\n# 2) Орташа мәнін есепте: (бірінші + екінші) / 2\n\n`,
  solutionCode: `a = float(input("Бірінші санды енгізіңіз: "))\nb = float(input("Екінші санды енгізіңіз: "))\nprint((a + b) / 2)`,
  checkKind: "numeric",
  testCases: [{ inputs: ["4", "7"], expectedNumbers: [5.5] }],
  successHint: "Верно! (4 + 7) / 2 = 5.5",
},
{
  id: 11,
  title: "Площадь прямоугольника",
  taskKz: "Тіктөртбұрыштың ұзындығы мен енін енгізіп, оның ауданын есептеңіз.",
  newRuleIds: [],
  reviewRuleIds: ["r_input", "r_float", "r_arithmetic"],
  intro: `Площадь прямоугольника считается по формуле из математики: длина × ширина. В коде это просто ещё одно умножение — как в задании 6, только числа теперь вводит пользователь.`,
  examples: [
    { code: `base = float(input("Табаны: "))\nheight = float(input("Биіктігі: "))\nprint(base * height / 2)`, explain: `Так считается площадь треугольника — тот же принцип: ввод чисел и одна формула.` }
  ],
  starterCode: `# 1) Ұзындығы мен енін input() арқылы сұра (float)\n# 2) Ауданын есепте: ұзындық * ен\n\n`,
  solutionCode: `length = float(input("Ұзындығын енгізіңіз: "))\nwidth = float(input("Енін енгізіңіз: "))\nprint(length * width)`,
  checkKind: "numeric",
  testCases: [{ inputs: ["5", "3"], expectedNumbers: [15] }],
  successHint: "Верно! 5 × 3 = 15",
},
{
  id: 12,
  title: "Площадь квадрата",
  taskKz: "Шаршының қабырғасын енгізіп, оның ауданын есептеңіз.",
  newRuleIds: [],
  reviewRuleIds: ["r_input", "r_float", "r_arithmetic"],
  intro: `Площадь квадрата — сторона, умноженная сама на себя: <code>side * side</code>.`,
  examples: [
    { code: `side = float(input("Қабырға: "))\nprint(side * side)`, explain: `Просто умножаем одно и то же число на себя.` }
  ],
  starterCode: `# 1) Қабырғаны input() арқылы сұра (float)\n# 2) Ауданын есепте: қабырға * қабырға\n\n`,
  solutionCode: `side = float(input("Шаршының қабырғасын енгізіңіз: "))\nprint(side * side)`,
  checkKind: "numeric",
  testCases: [{ inputs: ["6"], expectedNumbers: [36] }],
  successHint: "Верно! 6 × 6 = 36",
},
{
  id: 13,
  title: "Стоимость покупки",
  taskKz: "Тауардың бағасы мен санын енгізіп, жалпы құнын есептеңіз.",
  newRuleIds: [],
  reviewRuleIds: ["r_input", "r_float", "r_arithmetic"],
  intro: `Общая стоимость — это цена, умноженная на количество: <code>price * count</code>.`,
  examples: [
    { code: `price = float(input("Бағасы: "))\ncount = float(input("Саны: "))\nprint(price * count)`, explain: `Та же логика, что и в задании 11 — только считаем стоимость покупки.` }
  ],
  starterCode: `# 1) Бағасы мен санын input() арқылы сұра (float)\n# 2) Жалпы құнын есепте: баға * сан\n\n`,
  solutionCode: `price = float(input("Тауардың бағасын енгізіңіз: "))\ncount = float(input("Санын енгізіңіз: "))\nprint(price * count)`,
  checkKind: "numeric",
  testCases: [{ inputs: ["1200", "3"], expectedNumbers: [3600] }],
  successHint: "Верно! 1200 × 3 = 3600",
},
{
  id: 14,
  title: "Скидка 10%",
  taskKz: "Тауардың бағасы берілген. Оған 10% жеңілдік жасап, жаңа бағасын есептеңіз.",
  newRuleIds: ["r_order"],
  reviewRuleIds: ["r_arithmetic", "r_variable"],
  intro: `Скидка 10% означает: из цены нужно вычесть 10% от этой же цены. 10% от числа — это число, умноженное на <code>0.1</code>. Формула: <code>price - price * 0.1</code>.<br>Цена задана в коде: <code>price = 2000</code>. Не меняй её.`,
  examples: [
    { code: `price = 5000\nnew_price = price - price * 0.2\nprint(new_price)`, explain: `Здесь скидка 20%: сначала price * 0.2 (сколько скидываем), потом вычитаем из price. Умножение выполняется раньше вычитания само по себе, даже без скобок.` }
  ],
  starterCode: `price = 2000\n\n# Жаңа бағаны есепте: price - price * 0.1\n\n`,
  solutionCode: `price = 2000\nnew_price = price - price * 0.1\nprint(new_price)`,
  checkKind: "numeric",
  testCases: [{ inputs: [], expectedNumbers: [1800] }],
  successHint: "Верно! 2000 − 2000×0.1 = 1800",
},
{
  id: 15,
  title: "Тенге в доллары",
  taskKz: "Пайдаланушы теңгедегі соманы енгізеді. Оны доллар курсы бойынша долларға айналдырыңыз.",
  newRuleIds: [],
  reviewRuleIds: ["r_input", "r_float", "r_order"],
  intro: `Возьмём курс: <b>1 доллар = 480 теңге</b> (можно писать в коде как <code>rate = 480</code>). Чтобы узнать сумму в долларах, сумму в теңге нужно поделить на курс.`,
  examples: [
    { code: `rate = 480\ntenge = float(input("Сома: "))\nprint(tenge / rate)`, explain: `Делим сумму в теңге на курс — получаем сумму в долларах.` }
  ],
  starterCode: `rate = 480\n\n# 1) Теңгедегі соманы input() арқылы сұра (float)\n# 2) Долларға айналдыр: сома / rate\n\n`,
  solutionCode: `rate = 480\ntenge = float(input("Теңгедегі соманы енгізіңіз: "))\nprint(tenge / rate)`,
  checkKind: "numeric",
  testCases: [{ inputs: ["4800"], expectedNumbers: [10] }],
  successHint: "Верно! 4800 ÷ 480 = 10 доллар",
},
{
  id: 16,
  title: "Часы в минуты",
  taskKz: "Пайдаланушы сағат санын енгізеді. Оны минутқа айналдырыңыз.",
  newRuleIds: [],
  reviewRuleIds: ["r_input", "r_arithmetic"],
  intro: `В одном часе 60 минут, значит нужно умножить количество часов на 60.`,
  examples: [
    { code: `days = float(input("Күн саны: "))\nprint(days * 24)`, explain: `Тот же принцип: переводим дни в часы, умножая на 24.` }
  ],
  starterCode: `# 1) Сағат санын input() арқылы сұра (float)\n# 2) Минутқа айналдыр: сағат * 60\n\n`,
  solutionCode: `hours = float(input("Сағат санын енгізіңіз: "))\nprint(hours * 60)`,
  checkKind: "numeric",
  testCases: [{ inputs: ["3"], expectedNumbers: [180] }],
  successHint: "Верно! 3 × 60 = 180 минут",
},
{
  id: 17,
  title: "Минуты в секунды",
  taskKz: "Пайдаланушы минут санын енгізеді. Оны секундқа айналдырыңыз.",
  newRuleIds: [],
  reviewRuleIds: ["r_input", "r_arithmetic"],
  intro: `В одной минуте 60 секунд — умножаем на 60, как и в прошлом задании.`,
  examples: [
    { code: `minutes = float(input("Минут: "))\nprint(minutes * 60)`, explain: `Минуты в секунды: тот же множитель 60.` }
  ],
  starterCode: `# 1) Минут санын input() арқылы сұра (float)\n# 2) Секундқа айналдыр: минут * 60\n\n`,
  solutionCode: `minutes = float(input("Минут санын енгізіңіз: "))\nprint(minutes * 60)`,
  checkKind: "numeric",
  testCases: [{ inputs: ["5"], expectedNumbers: [300] }],
  successHint: "Верно! 5 × 60 = 300 секунд",
},
{
  id: 18,
  title: "Цельсий в Фаренгейт",
  taskKz: "Цельсий бойынша температураны енгізіп, оны Фаренгейтке айналдырыңыз.",
  newRuleIds: [],
  reviewRuleIds: ["r_input", "r_order", "r_arithmetic"],
  intro: `Формула перевода: <code>F = C * 9 / 5 + 32</code>. Здесь важен порядок действий: сначала умножение и деление (слева направо), потом прибавление 32 — скобки даже не нужны, Python сам посчитает в правильном порядке.`,
  examples: [
    { code: `c = 0\nprint(c * 9 / 5 + 32)`, explain: `0°C — это 32°F. Сначала 0*9=0, потом 0/5=0, потом 0+32=32.` }
  ],
  starterCode: `# 1) Цельсийді input() арқылы сұра (float)\n# 2) Фаренгейтке айналдыр: C * 9 / 5 + 32\n\n`,
  solutionCode: `celsius = float(input("Цельсий бойынша температураны енгізіңіз: "))\nprint(celsius * 9 / 5 + 32)`,
  checkKind: "numeric",
  testCases: [{ inputs: ["20"], expectedNumbers: [68] }],
  successHint: "Верно! 20 * 9/5 + 32 = 68°F",
},
{
  id: 19,
  title: "Равно 10 или нет",
  taskKz: "Пайдаланушы сан енгізеді. Санның 10-ға тең немесе тең емес екенін анықтаңыз.",
  newRuleIds: ["r_if", "r_compare"],
  reviewRuleIds: ["r_input", "r_int"],
  intro: `Впервые программа должна не просто посчитать, а <b>принять решение</b>. Для этого используется <code>if</code> вместе со знаком сравнения <code>==</code>. Не забудь двоеточие <code>:</code> и отступ на следующей строке.<br><i>При проверке программа запустит твой код дважды: один раз с числом, равным 10, второй раз — с другим числом. Ответы должны отличаться.</i>`,
  examples: [
    { code: `n = int(input("Сан: "))\nif n > 0:\n    print("Оң сан")\nelse:\n    print("Оң сан емес")`, explain: `Если введённое число больше нуля — выполнится первая строка, иначе — вторая. Только одна из двух строк выполнится за раз.` }
  ],
  starterCode: `n = int(input("Санды енгізіңіз: "))\n\n# if/else арқылы n-нің 10-ға тең не тең емес екенін тексер\n\n`,
  solutionCode: `n = int(input("Санды енгізіңіз: "))\nif n == 10:\n    print("Сан 10-ға тең")\nelse:\n    print("Сан 10-ға тең емес")`,
  checkKind: "branch",
  testCases: [{ inputs: ["10"] }, { inputs: ["7"] }],
  successHint: "Верно! Программа по-разному отвечает, когда число равно 10 и когда нет.",
},
{
  id: 20,
  title: "Положительное число",
  taskKz: "Пайдаланушы сан енгізеді. Санның оң сан екенін анықтаңыз.",
  newRuleIds: [],
  reviewRuleIds: ["r_if", "r_compare"],
  intro: `Такая же схема if/else, что и в прошлом задании — только знак сравнения теперь <code>&gt;</code> (больше нуля).`,
  examples: [
    { code: `n = int(input("Сан: "))\nif n < 0:\n    print("Теріс сан")\nelse:\n    print("Теріс емес")`, explain: `Проверка на отрицательное число: n < 0.` }
  ],
  starterCode: `n = int(input("Санды енгізіңіз: "))\n\n# if/else арқылы n-нің оң сан екенін тексер\n\n`,
  solutionCode: `n = int(input("Санды енгізіңіз: "))\nif n > 0:\n    print("Оң сан")\nelse:\n    print("Оң сан емес")`,
  checkKind: "branch",
  testCases: [{ inputs: ["5"] }, { inputs: ["-5"] }],
  successHint: "Верно! Программа различает положительные и остальные числа.",
},
{
  id: 21,
  title: "Теріс сан",
  taskKz: "Пайдаланушы сан енгізеді. Санның теріс сан екенін анықтаңыз.",
  newRuleIds: [],
  reviewRuleIds: ["r_if", "r_compare"],
  intro: `Такая же схема if/else, что и в прошлом задании — только теперь проверяем, меньше ли число нуля: <code>n &lt; 0</code>.`,
  examples: [
    { code: `n = int(input("Сан: "))\nif n == 0:\n    print("Нөл")\nelse:\n    print("Нөл емес")`, explain: `Проверка на равенство нулю: n == 0.` }
  ],
  starterCode: `n = int(input("Санды енгізіңіз: "))\n\n# if/else арқылы n-нің теріс сан екенін тексер\n\n`,
  solutionCode: `n = int(input("Санды енгізіңіз: "))\nif n < 0:\n    print("Теріс сан")\nelse:\n    print("Теріс сан емес")`,
  checkKind: "exact_branch",
  testCases: [{ inputs: ["-5"], expected: "Теріс сан" }, { inputs: ["5"], expected: "Теріс сан емес" }],
  successHint: "Верно! Программа различает отрицательные и остальные числа.",
},
{
  id: 22,
  title: "Нөлге тең бе",
  taskKz: "Пайдаланушы сан енгізеді. Санның нөлге тең екенін анықтаңыз.",
  newRuleIds: [],
  reviewRuleIds: ["r_if", "r_compare"],
  intro: `Проверяем равенство нулю с помощью <code>==</code>. Не перепутай с одним знаком <code>=</code>.`,
  examples: [
    { code: `n = int(input("Сан: "))\nif n < 0:\n    print("Теріс сан")\nelse:\n    print("Теріс емес")`, explain: `Похожая схема — только тут проверяется другое условие.` }
  ],
  starterCode: `n = int(input("Санды енгізіңіз: "))\n\n# if/else арқылы n-нің нөлге тең екенін тексер\n\n`,
  solutionCode: `n = int(input("Санды енгізіңіз: "))\nif n == 0:\n    print("Нөлге тең")\nelse:\n    print("Нөлге тең емес")`,
  checkKind: "exact_branch",
  testCases: [{ inputs: ["0"], expected: "Нөлге тең" }, { inputs: ["7"], expected: "Нөлге тең емес" }],
  successHint: "Верно! Программа определяет, равно ли число нулю.",
},
{
  id: 23,
  title: "Жасқа қарай рұқсат",
  taskKz: "Пайдаланушының жасын енгізіңіз. Егер жасы 18 немесе одан жоғары болса, «Кіруге рұқсат» деген хабарлама шығарыңыз. Әйтпесе «Кіруге рұқсат жоқ» деген хабарлама шығарыңыз.",
  newRuleIds: [],
  reviewRuleIds: ["r_if", "r_compare", "r_int"],
  intro: `«18 немесе одан жоғары» дегенді Python-да <code>&gt;=</code> операторымен жазады.`,
  examples: [
    { code: `score = int(input("Балл: "))\nif score >= 60:\n    print("Өтті")\nelse:\n    print("Өтпеді")`, explain: `>= — «үлкен немесе тең». 60-тан төмен болмаса, шарт орындалады.` }
  ],
  starterCode: `age = int(input("Жасыңызды енгізіңіз: "))\n\n# if/else арқылы жасы 18-ден асатынын тексер\n\n`,
  solutionCode: `age = int(input("Жасыңызды енгізіңіз: "))\nif age >= 18:\n    print("Кіруге рұқсат")\nelse:\n    print("Кіруге рұқсат жоқ")`,
  checkKind: "exact_branch",
  testCases: [{ inputs: ["18"], expected: "Кіруге рұқсат" }, { inputs: ["15"], expected: "Кіруге рұқсат жоқ" }],
  successHint: "Верно! Программа корректно проверяет возрастной порог 18 лет.",
},
{
  id: 24,
  title: "Сынақтан өту",
  taskKz: "Пайдаланушы балын енгізеді. Егер балл 50 немесе одан жоғары болса, «Сынақтан өтті» деген хабарлама шығарыңыз. Әйтпесе «Сынақтан өтпеді» деп шығарыңыз.",
  newRuleIds: [],
  reviewRuleIds: ["r_if", "r_compare", "r_int"],
  intro: `Такая же проверка порога, что и в прошлом задании, только с другим числом и другими сообщениями.`,
  examples: [
    { code: `temp = int(input("Температура: "))\nif temp >= 0:\n    print("Мұз емес")\nelse:\n    print("Мұз")`, explain: `Тот же принцип: сравниваем число с порогом через >=.` }
  ],
  starterCode: `score = int(input("Балды енгізіңіз: "))\n\n# if/else арқылы балл 50-ден кем емес пе, тексер\n\n`,
  solutionCode: `score = int(input("Балды енгізіңіз: "))\nif score >= 50:\n    print("Сынақтан өтті")\nelse:\n    print("Сынақтан өтпеді")`,
  checkKind: "exact_branch",
  testCases: [{ inputs: ["50"], expected: "Сынақтан өтті" }, { inputs: ["30"], expected: "Сынақтан өтпеді" }],
  successHint: "Верно! Порог в 50 баллов проверяется правильно.",
},
{
  id: 25,
  title: "Парольді тексеру",
  taskKz: "Пайдаланушы пароль енгізеді. Егер пароль дұрыс болса, «Пароль дұрыс» деген хабарлама шығарыңыз. Әйтпесе «Пароль қате» деп шығарыңыз.",
  newRuleIds: [],
  reviewRuleIds: ["r_if", "r_compare", "r_input"],
  intro: `Оператор <code>==</code> сравнивает не только числа, но и текст (строки). «Правильный» пароль зададим прямо в коде переменной <code>correct_password</code> — не меняй эту строку.`,
  examples: [
    { code: `secret = "алма"\nword = input("Сөз: ")\nif word == secret:\n    print("Дұрыс")\nelse:\n    print("Қате")`, explain: `== сравнивает две строки: то, что ввёл пользователь, и заранее заданное слово.` }
  ],
  starterCode: `correct_password = "python2024"\n\n# 1) input() арқылы парольді сұра\n# 2) Ол correct_password-қа тең бе, тексер\n\n`,
  solutionCode: `correct_password = "python2024"\npassword = input("Парольді енгізіңіз: ")\nif password == correct_password:\n    print("Пароль дұрыс")\nelse:\n    print("Пароль қате")`,
  checkKind: "exact_branch",
  testCases: [{ inputs: ["python2024"], expected: "Пароль дұрыс" }, { inputs: ["12345"], expected: "Пароль қате" }],
  successHint: "Верно! Программа сравнивает введённый текст с правильным паролем.",
},
{
  id: 26,
  title: "Үлкен санды табу",
  taskKz: "Пайдаланушы екі сан енгізеді. Қай санның үлкен екенін анықтаңыз.",
  newRuleIds: ["r_elif"],
  reviewRuleIds: ["r_compare", "r_input"],
  intro: `Тут три возможных исхода: первое число больше, второе больше, или они равны. Для третьего варианта одного <code>if/else</code> мало — нужен <b>elif</b> посередине.`,
  examples: [
    { code: `x = int(input("x: "))\nif x > 0:\n    print("Оң")\nelif x < 0:\n    print("Теріс")\nelse:\n    print("Нөл")`, explain: `Три возможных случая — три ветки: if, elif и else.` }
  ],
  starterCode: `a = float(input("Бірінші санды енгізіңіз: "))\nb = float(input("Екінші санды енгізіңіз: "))\n\n# if/elif/else арқылы қай санның үлкен екенін шығар\n\n`,
  solutionCode: `a = float(input("Бірінші санды енгізіңіз: "))\nb = float(input("Екінші санды енгізіңіз: "))\nif a > b:\n    print(a)\nelif b > a:\n    print(b)\nelse:\n    print("Сандар тең")`,
  checkKind: "numeric",
  testCases: [{ inputs: ["9", "4"], expectedNumbers: [9] }, { inputs: ["3", "10"], expectedNumbers: [10] }],
  successHint: "Верно! Программа находит большее из двух чисел.",
},
{
  id: 27,
  title: "Кіші санды табу",
  taskKz: "Пайдаланушы екі сан енгізеді. Қай санның кіші екенін анықтаңыз.",
  newRuleIds: [],
  reviewRuleIds: ["r_elif", "r_compare"],
  intro: `Та же схема с elif, что и в прошлом задании — только теперь ищем меньшее число.`,
  examples: [
    { code: `a = int(input("a: "))\nb = int(input("b: "))\nif a > b:\n    print(a)\nelif b > a:\n    print(b)\nelse:\n    print("Тең")`, explain: `Тот же принцип поиска большего числа — здесь просто для примера.` }
  ],
  starterCode: `a = float(input("Бірінші санды енгізіңіз: "))\nb = float(input("Екінші санды енгізіңіз: "))\n\n# if/elif/else арқылы қай санның кіші екенін шығар\n\n`,
  solutionCode: `a = float(input("Бірінші санды енгізіңіз: "))\nb = float(input("Екінші санды енгізіңіз: "))\nif a < b:\n    print(a)\nelif b < a:\n    print(b)\nelse:\n    print("Сандар тең")`,
  checkKind: "numeric",
  testCases: [{ inputs: ["9", "4"], expectedNumbers: [4] }, { inputs: ["3", "10"], expectedNumbers: [3] }],
  successHint: "Верно! Программа находит меньшее из двух чисел.",
},
{
  id: 28,
  title: "Үш саннан ең үлкенін табу",
  taskKz: "Пайдаланушы үш сан енгізеді. Ең үлкен санды анықтаңыз.",
  newRuleIds: ["r_and"],
  reviewRuleIds: ["r_elif", "r_compare"],
  intro: `Чтобы проверить, что число больше сразу двух других, две проверки нужно объединить оператором <b>and</b>: <code>a &gt;= b and a &gt;= c</code> значит «a не меньше ни b, ни c».`,
  examples: [
    { code: `age = int(input("Жас: "))\nhas_id = True\nif age >= 18 and has_id:\n    print("Рұқсат")\nelse:\n    print("Рұқсат жоқ")`, explain: `and требует, чтобы ОБА условия были верны одновременно.` }
  ],
  starterCode: `a = float(input("Бірінші санды енгізіңіз: "))\nb = float(input("Екінші санды енгізіңіз: "))\nc = float(input("Үшінші санды енгізіңіз: "))\n\n# if/elif/else + and арқылы ең үлкен санды тап\n\n`,
  solutionCode: `a = float(input("Бірінші санды енгізіңіз: "))\nb = float(input("Екінші санды енгізіңіз: "))\nc = float(input("Үшінші санды енгізіңіз: "))\nif a >= b and a >= c:\n    print(a)\nelif b >= a and b >= c:\n    print(b)\nelse:\n    print(c)`,
  checkKind: "numeric",
  testCases: [{ inputs: ["3", "9", "5"], expectedNumbers: [9] }, { inputs: ["10", "2", "7"], expectedNumbers: [10] }, { inputs: ["1", "4", "8"], expectedNumbers: [8] }],
  successHint: "Верно! Программа находит наибольшее из трёх чисел.",
},
{
  id: 29,
  title: "Баға деңгейі",
  taskKz: "Студенттің жинаған балын енгізіңіз. Баллға байланысты нәтижені анықтаңыз: 90–100 — «Өте жақсы», 70–89 — «Жақсы», 50–69 — «Қанағаттанарлық», 0–49 — «Қанағаттанарлықсыз».",
  newRuleIds: [],
  reviewRuleIds: ["r_elif", "r_compare"],
  intro: `Четыре варианта ответа — значит, понадобится <code>if</code> и два <code>elif</code> подряд, а последний случай уйдёт в <code>else</code>. Провepяй границы от большей к меньшей: сначала &gt;=90, потом &gt;=70, потом &gt;=50.`,
  examples: [
    { code: `t = int(input("Температура: "))\nif t >= 30:\n    print("Ыстық")\nelif t >= 15:\n    print("Жылы")\nelif t >= 0:\n    print("Салқын")\nelse:\n    print("Суық")`, explain: `Четыре диапазона — три elif подряд, последний случай в else.` }
  ],
  starterCode: `score = int(input("Балды енгізіңіз: "))\n\n# if/elif/elif/else арқылы баға деңгейін анықта\n\n`,
  solutionCode: `score = int(input("Балды енгізіңіз: "))\nif score >= 90:\n    print("Өте жақсы")\nelif score >= 70:\n    print("Жақсы")\nelif score >= 50:\n    print("Қанағаттанарлық")\nelse:\n    print("Қанағаттанарлықсыз")`,
  checkKind: "exact_branch",
  testCases: [{ inputs: ["95"], expected: "Өте жақсы" }, { inputs: ["80"], expected: "Жақсы" }, { inputs: ["60"], expected: "Қанағаттанарлық" }, { inputs: ["30"], expected: "Қанағаттанарлықсыз" }],
  successHint: "Верно! Программа правильно определяет все четыре уровня оценки.",
},
{
  id: 30,
  title: "Ай атауы",
  taskKz: "Пайдаланушы айдың нөмірін енгізеді. Айдың атауын анықтаңыз.",
  newRuleIds: [],
  reviewRuleIds: ["r_elif", "r_compare", "r_int"],
  intro: `Здесь понадобится длинная цепочка <code>if/elif</code> — по одной ветке на каждый месяц (всего 12).`,
  examples: [
    { code: `d = int(input("Күн нөмірі: "))\nif d == 1:\n    print("Дүйсенбі")\nelif d == 2:\n    print("Сейсенбі")\nelse:\n    print("Басқа күн")`, explain: `Похожая цепочка elif — по одной ветке на каждый вариант номера.` }
  ],
  starterCode: `month = int(input("Ай нөмірін енгізіңіз (1-12): "))\n\n# if/elif тізбегі арқылы ай атауын шығар\n\n`,
  solutionCode: `month = int(input("Ай нөмірін енгізіңіз (1-12): "))\nif month == 1:\n    print("Қаңтар")\nelif month == 2:\n    print("Ақпан")\nelif month == 3:\n    print("Наурыз")\nelif month == 4:\n    print("Сәуір")\nelif month == 5:\n    print("Мамыр")\nelif month == 6:\n    print("Маусым")\nelif month == 7:\n    print("Шілде")\nelif month == 8:\n    print("Тамыз")\nelif month == 9:\n    print("Қыркүйек")\nelif month == 10:\n    print("Қазан")\nelif month == 11:\n    print("Қараша")\nelse:\n    print("Желтоқсан")`,
  checkKind: "exact_branch",
  testCases: [{ inputs: ["1"], expected: "Қаңтар" }, { inputs: ["6"], expected: "Маусым" }, { inputs: ["12"], expected: "Желтоқсан" }],
  successHint: "Верно! Программа правильно определяет название месяца по номеру.",
},
{
  id: 31,
  title: "Апта күні",
  taskKz: "Пайдаланушы аптаның күн нөмірін енгізеді. Апта күнінің атауын анықтаңыз.",
  newRuleIds: [],
  reviewRuleIds: ["r_elif", "r_compare", "r_int"],
  intro: `Такая же цепочка if/elif, что и с месяцами — только вариантов теперь 7.`,
  examples: [
    { code: `m = int(input("Ай нөмірі: "))\nif m == 1:\n    print("Қаңтар")\nelif m == 2:\n    print("Ақпан")\nelse:\n    print("Басқа ай")`, explain: `Та же логика — цепочка elif по количеству вариантов.` }
  ],
  starterCode: `day = int(input("Күн нөмірін енгізіңіз (1-7): "))\n\n# if/elif тізбегі арқылы апта күнінің атауын шығар\n\n`,
  solutionCode: `day = int(input("Күн нөмірін енгізіңіз (1-7): "))\nif day == 1:\n    print("Дүйсенбі")\nelif day == 2:\n    print("Сейсенбі")\nelif day == 3:\n    print("Сәрсенбі")\nelif day == 4:\n    print("Бейсенбі")\nelif day == 5:\n    print("Жұма")\nelif day == 6:\n    print("Сенбі")\nelse:\n    print("Жексенбі")`,
  checkKind: "exact_branch",
  testCases: [{ inputs: ["1"], expected: "Дүйсенбі" }, { inputs: ["5"], expected: "Жұма" }, { inputs: ["7"], expected: "Жексенбі" }],
  successHint: "Верно! Программа правильно определяет день недели по номеру.",
},
{
  id: 32,
  title: "Жас санаты",
  taskKz: "Пайдаланушы жасын енгізеді. Оның бала, оқушы, студент немесе ересек екенін анықтаңыз.",
  newRuleIds: [],
  reviewRuleIds: ["r_elif", "r_compare"],
  intro: `Возьмём границы: до 7 лет — «Бала», 7–17 — «Оқушы», 18–23 — «Студент», старше — «Ересек». Опять понадобится цепочка if/elif/else.`,
  examples: [
    { code: `s = int(input("Балл: "))\nif s >= 90:\n    print("A")\nelif s >= 70:\n    print("B")\nelse:\n    print("C")`, explain: `Похожая цепочка диапазонов, только для оценок.` }
  ],
  starterCode: `age = int(input("Жасыңызды енгізіңіз: "))\n\n# if/elif/else арқылы жас санатын анықта\n\n`,
  solutionCode: `age = int(input("Жасыңызды енгізіңіз: "))\nif age < 7:\n    print("Бала")\nelif age <= 17:\n    print("Оқушы")\nelif age <= 23:\n    print("Студент")\nelse:\n    print("Ересек")`,
  checkKind: "exact_branch",
  testCases: [{ inputs: ["5"], expected: "Бала" }, { inputs: ["12"], expected: "Оқушы" }, { inputs: ["20"], expected: "Студент" }, { inputs: ["40"], expected: "Ересек" }],
  successHint: "Верно! Программа правильно определяет возрастную категорию.",
},
{
  id: 33,
  title: "Сатып алуға жеңілдік",
  taskKz: "Пайдаланушы дүкендегі сатып алу сомасын енгізеді. Егер сома 20 000 теңгеден жоғары болса, 10% жеңілдік есептеңіз.",
  newRuleIds: [],
  reviewRuleIds: ["r_if", "r_order", "r_compare"],
  intro: `Здесь итог зависит от условия: если сумма больше 20 000, из неё вычитается 10% (<code>amount - amount * 0.1</code>); иначе сумма остаётся без изменений. В обоих случаях в конце — один <code>print()</code>.`,
  examples: [
    { code: `price = 5000\nif price > 3000:\n    price = price - price * 0.2\nprint(price)`, explain: `Если условие верно, значение переменной меняется прямо внутри if, а печатается уже после условия.` }
  ],
  starterCode: `amount = float(input("Сатып алу сомасын енгізіңіз: "))\n\n# Егер amount 20000-нан үлкен болса, 10% жеңілдік жаса\n# Соңында amount-ты print() ет\n\n`,
  solutionCode: `amount = float(input("Сатып алу сомасын енгізіңіз: "))\nif amount > 20000:\n    amount = amount - amount * 0.1\nprint(amount)`,
  checkKind: "numeric",
  testCases: [{ inputs: ["25000"], expectedNumbers: [22500] }, { inputs: ["15000"], expectedNumbers: [15000] }],
  successHint: "Верно! Скидка применяется только когда сумма превышает 20 000.",
},
{
  id: 34,
  title: "Логин мен парольді тексеру",
  taskKz: "Пайдаланушы логин мен пароль енгізеді. Екеуінің де дұрыс енгізілгенін тексеріңіз.",
  newRuleIds: [],
  reviewRuleIds: ["r_and", "r_compare", "r_input"],
  intro: `Здесь нужно проверить сразу два условия одновременно — логин совпадает И пароль совпадает. Для этого используется <code>and</code>, который ты уже видел в задании про наибольшее число.`,
  examples: [
    { code: `age = int(input("Жас: "))\nhas_ticket = True\nif age >= 18 and has_ticket:\n    print("Рұқсат")\nelse:\n    print("Рұқсат жоқ")`, explain: `and требует, чтобы оба условия были верны одновременно.` }
  ],
  starterCode: `correct_login = "admin"\ncorrect_password = "12345"\n\n# 1) input() арқылы логин мен парольді сұра\n# 2) and арқылы екеуі де дұрыс па, тексер\n\n`,
  solutionCode: `correct_login = "admin"\ncorrect_password = "12345"\nlogin = input("Логин: ")\npassword = input("Пароль: ")\nif login == correct_login and password == correct_password:\n    print("Кіру сәтті")\nelse:\n    print("Логин немесе пароль қате")`,
  checkKind: "exact_branch",
  testCases: [{ inputs: ["admin", "12345"], expected: "Кіру сәтті" }, { inputs: ["admin", "wrong"], expected: "Логин немесе пароль қате" }],
  successHint: "Верно! Программа пропускает только когда оба значения совпадают.",
},
{
  id: 35,
  title: "Жұп немесе тақ",
  taskKz: "Пайдаланушы сан енгізеді. Оның жұп немесе тақ сан екенін анықтаңыз.",
  newRuleIds: ["r_modulo"],
  reviewRuleIds: ["r_if", "r_compare"],
  intro: `Чтобы узнать, чётное ли число, нужно найти остаток от деления на 2 с помощью оператора <code>%</code>. Если остаток 0 — число чётное.`,
  examples: [
    { code: `n = int(input("Сан: "))\nif n % 3 == 0:\n    print("3-ке бөлінеді")\nelse:\n    print("3-ке бөлінбейді")`, explain: `n % 3 находит остаток от деления на 3; если он равен 0 — число делится нацело.` }
  ],
  starterCode: `n = int(input("Санды енгізіңіз: "))\n\n# n % 2 арқылы жұп/тақ екенін тексер\n\n`,
  solutionCode: `n = int(input("Санды енгізіңіз: "))\nif n % 2 == 0:\n    print("Жұп сан")\nelse:\n    print("Тақ сан")`,
  checkKind: "exact_branch",
  testCases: [{ inputs: ["4"], expected: "Жұп сан" }, { inputs: ["7"], expected: "Тақ сан" }],
  successHint: "Верно! Оператор % правильно определяет чётность числа.",
},
{
  id: 36,
  title: "Санды 100-мен салыстыру",
  taskKz: "Пайдаланушы сан енгізеді. Егер сан 100-ден үлкен болса, «Үлкен сан», 100-ге тең болса, «100-ге тең», ал 100-ден кіші болса, «Кіші сан» деген хабарлама шығарыңыз.",
  newRuleIds: [],
  reviewRuleIds: ["r_elif", "r_compare"],
  intro: `Три варианта — три ветки: <code>if</code> для «больше», <code>elif</code> для «равно», <code>else</code> для «меньше».`,
  examples: [
    { code: `x = int(input("x: "))\nif x > 0:\n    print("Оң")\nelif x == 0:\n    print("Нөл")\nelse:\n    print("Теріс")`, explain: `Тот же принцип: три исхода — if, elif и else.` }
  ],
  starterCode: `n = int(input("Санды енгізіңіз: "))\n\n# if/elif/else арқылы n-ды 100-мен салыстыр\n\n`,
  solutionCode: `n = int(input("Санды енгізіңіз: "))\nif n > 100:\n    print("Үлкен сан")\nelif n == 100:\n    print("100-ге тең")\nelse:\n    print("Кіші сан")`,
  checkKind: "exact_branch",
  testCases: [{ inputs: ["150"], expected: "Үлкен сан" }, { inputs: ["100"], expected: "100-ге тең" }, { inputs: ["50"], expected: "Кіші сан" }],
  successHint: "Верно! Программа правильно сравнивает число со 100 во всех трёх случаях.",
},
{
  id: 37,
  title: "Сабаққа қатысу деңгейі",
  taskKz: "Студенттің сабаққа қатысу пайызын енгізіңіз. Егер қатысуы 80%-дан жоғары болса, «Қатысу деңгейі жақсы» деп шығарыңыз, әйтпесе «Қатысу деңгейін жақсарту қажет» деп шығарыңыз.",
  newRuleIds: [],
  reviewRuleIds: ["r_if", "r_compare", "r_float"],
  intro: `Простая проверка порога — точно как в заданиях 23–24, только с процентом посещаемости.`,
  examples: [
    { code: `mark = float(input("Баға: "))\nif mark > 4:\n    print("Жақсы оқиды")\nelse:\n    print("Жақсарту керек")`, explain: `Та же схема: сравниваем число с порогом через >.` }
  ],
  starterCode: `percent = float(input("Қатысу пайызын енгізіңіз: "))\n\n# if/else арқылы 80%-дан жоғары ма, тексер\n\n`,
  solutionCode: `percent = float(input("Қатысу пайызын енгізіңіз: "))\nif percent > 80:\n    print("Қатысу деңгейі жақсы")\nelse:\n    print("Қатысу деңгейін жақсарту қажет")`,
  checkKind: "exact_branch",
  testCases: [{ inputs: ["90"], expected: "Қатысу деңгейі жақсы" }, { inputs: ["60"], expected: "Қатысу деңгейін жақсарту қажет" }],
  successHint: "Верно! Порог в 80% проверяется правильно.",
},
{
  id: 38,
  title: "Жалақы деңгейі",
  taskKz: "Пайдаланушы жалақысын енгізеді. Егер жалақысы 300 000 теңгеден жоғары болса, «Жоғары жалақы», 150 000–300 000 аралығында болса, «Орташа жалақы», ал одан төмен болса, «Төмен жалақы» деп шығарыңыз.",
  newRuleIds: [],
  reviewRuleIds: ["r_elif", "r_compare"],
  intro: `Снова три диапазона — та же схема if/elif/else, что и в задании про оценки (29).`,
  examples: [
    { code: `t = int(input("Температура: "))\nif t > 30:\n    print("Ыстық")\nelif t >= 15:\n    print("Жылы")\nelse:\n    print("Суық")`, explain: `Три диапазона — if, elif, else.` }
  ],
  starterCode: `salary = float(input("Жалақыны енгізіңіз: "))\n\n# if/elif/else арқылы жалақы деңгейін анықта\n\n`,
  solutionCode: `salary = float(input("Жалақыны енгізіңіз: "))\nif salary > 300000:\n    print("Жоғары жалақы")\nelif salary >= 150000:\n    print("Орташа жалақы")\nelse:\n    print("Төмен жалақы")`,
  checkKind: "exact_branch",
  testCases: [{ inputs: ["350000"], expected: "Жоғары жалақы" }, { inputs: ["200000"], expected: "Орташа жалақы" }, { inputs: ["100000"], expected: "Төмен жалақы" }],
  successHint: "Верно! Программа правильно определяет уровень зарплаты.",
},
{
  id: 39,
  title: "Қарапайым калькулятор",
  taskKz: "Қарапайым калькулятор құрыңыз. Пайдаланушы екі сан және математикалық амал енгізеді. Бағдарлама қосу, азайту, көбейту немесе бөлу нәтижесін көрсетуі керек.",
  newRuleIds: [],
  reviewRuleIds: ["r_elif", "r_input", "r_arithmetic"],
  intro: `Амал (+, -, *, /) вводится как обычный текст через <code>input()</code>. Дальше — цепочка <code>if/elif</code>, где каждая ветка сравнивает введённый символ со строкой: <code>op == "+"</code>, <code>op == "-"</code> и так далее.`,
  examples: [
    { code: `color = input("Түс: ")\nif color == "қызыл":\n    print("От түсі")\nelif color == "көк":\n    print("Аспан түсі")\nelse:\n    print("Белгісіз түс")`, explain: `Строку тоже можно сравнивать через == внутри if/elif, как и число.` }
  ],
  starterCode: `a = float(input("Бірінші санды енгізіңіз: "))\nb = float(input("Екінші санды енгізіңіз: "))\nop = input("Амалды енгізіңіз (+, -, *, /): ")\n\n# if/elif арқылы op-қа сай нәтижені есептеп print() ет\n\n`,
  solutionCode: `a = float(input("Бірінші санды енгізіңіз: "))\nb = float(input("Екінші санды енгізіңіз: "))\nop = input("Амалды енгізіңіз (+, -, *, /): ")\nif op == "+":\n    print(a + b)\nelif op == "-":\n    print(a - b)\nelif op == "*":\n    print(a * b)\nelif op == "/":\n    print(a / b)`,
  checkKind: "numeric",
  testCases: [
    { inputs: ["6", "3", "+"], expectedNumbers: [9] },
    { inputs: ["6", "3", "-"], expectedNumbers: [3] },
    { inputs: ["6", "3", "*"], expectedNumbers: [18] },
    { inputs: ["6", "3", "/"], expectedNumbers: [2] }
  ],
  successHint: "Верно! Калькулятор правильно обрабатывает все четыре операции.",
},
{
  id: 40,
  title: "Студент туралы ақпарат",
  taskKz: "Пайдаланушыдан аты-жөнін, жасын, оқу орнын және мамандығын сұраңыз. Осы мәліметтерді пайдаланып, студент туралы қысқаша ақпаратты экранға шығарыңыз.",
  newRuleIds: [],
  reviewRuleIds: ["r_input", "r_fstring", "r_print"],
  intro: `Финальное задание объединяет всё, что ты уже умеешь: несколько <code>input()</code> подряд и вывод каждого значения — можно через обычный <code>print()</code> или через f-строки.`,
  examples: [
    { code: `city = input("Қала: ")\ncountry = input("Ел: ")\nprint(f"Қала: {city}")\nprint(f"Ел: {country}")`, explain: `Несколько input() подряд, а затем несколько print() — каждый со своим значением.` }
  ],
  starterCode: `# 1) Аты-жөнін, жасын, оқу орнын, мамандығын input() арқылы сұра\n# 2) Әрқайсысын жеке print() арқылы шығар\n\n`,
  solutionCode: `name = input("Аты-жөніңізді енгізіңіз: ")\nage = input("Жасыңызды енгізіңіз: ")\nschool = input("Оқу орныңызды енгізіңіз: ")\nmajor = input("Мамандығыңызды енгізіңіз: ")\nprint(f"Аты-жөні: {name}")\nprint(f"Жасы: {age}")\nprint(f"Оқу орны: {school}")\nprint(f"Мамандығы: {major}")`,
  checkKind: "exact_contains",
  testInputs: ["Ерсұлтан", "20", "ҚазҰУ", "Информатика"],
  mustContain: ["Ерсұлтан", "20", "ҚазҰУ", "Информатика"],
  successHint: "Отлично! Ты собрал(а) полноценную карточку студента из четырёх введённых значений.",
},
];
