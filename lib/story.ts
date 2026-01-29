// Game types and story data

export interface Choice {
  id: string
  text: string
  next: string
}

export interface Scene {
  id: string
  background: string
  character: string
  characterImg?: string
  text: string
  choices: Choice[]
  isEnding: boolean
  narrativeText?: string // Для нарративных вставок
}

export interface Progress {
  currentScene: string
  choices: string[]
  visitedScenes: string[]
  completedEndings: string[]
}

// Story data - История Лулу и Меви
export const SCENES: Record<string, Scene> = {
  // Пролог
  prologue: {
    id: 'prologue',
    background: 'mystic_sky',
    character: '',
    text: '«Судьба — это книга, которую мы пишем сами.» — Анна Ахматова.\n\nКаждая глава нашей жизни зависит от того, какие действия мы предпринимаем.',
    narrativeText: 'Пролог',
    choices: [
      { id: 'begin', text: 'Начать историю', next: 'chapter1_arrival' },
    ],
    isEnding: false,
  },

  // Глава 1 - Прибытие
  chapter1_arrival: {
    id: 'chapter1_arrival',
    background: 'witch_hut',
    character: '',
    text: 'Большое дерево-хижина в окружении леса, обвитая корнями и светящимися рунами. Древесина излучает мягкое изумрудное свечение, руны пульсируют в такт с дыханием леса.',
    narrativeText: 'Глава 1',
    choices: [
      { id: 'enter', text: 'Войти в хижину', next: 'chapter1_meeting' },
    ],
    isEnding: false,
  },

  chapter1_meeting: {
    id: 'chapter1_meeting',
    background: 'witch_hut',
    character: 'Меви',
    text: '— Ты сегодня поздно.',
    choices: [
      { id: 'palace', text: '«Я задержалась во дворце.»', next: 'chapter1_palace_response' },
      { id: 'weather', text: '«Погода неспокойная.»', next: 'chapter1_weather_response' },
    ],
    isEnding: false,
  },

  chapter1_palace_response: {
    id: 'chapter1_palace_response',
    background: 'witch_hut',
    character: 'Меви',
    text: '— Дворец всегда отнимает больше, чем даёт.',
    choices: [
      { id: 'continue', text: 'Продолжить', next: 'chapter1_lesson_intro' },
    ],
    isEnding: false,
  },

  chapter1_weather_response: {
    id: 'chapter1_weather_response',
    background: 'witch_hut',
    character: 'Меви',
    text: '— Лес чувствует приближение беды раньше людей.',
    choices: [
      { id: 'continue', text: 'Продолжить', next: 'chapter1_lesson_intro' },
    ],
    isEnding: false,
  },

  chapter1_lesson_intro: {
    id: 'chapter1_lesson_intro',
    background: 'witch_hut',
    character: 'Меви',
    text: '— Садись. Сегодня ты будешь учиться не силе… а удержанию.',
    narrativeText: 'Меви была изгнана. Ведьмой. Опасной. Ненужной.\n\nНо именно она учила Лулу слушать ветер внутри себя.',
    choices: [
      { id: 'listen', text: 'Внимательно слушать', next: 'chapter1_power_grows' },
    ],
    isEnding: false,
  },

  chapter1_power_grows: {
    id: 'chapter1_power_grows',
    background: 'witch_hut',
    character: 'Меви',
    text: '— Твоя сила растёт. И если ты не научишься её направлять, она найдёт выход сама.',
    choices: [
      { id: 'ask_past', text: '«Как тогда… тридцать лет назад?»', next: 'chapter1_past_mention' },
      { id: 'ask_how', text: '«Как мне её направить?»', next: 'chapter1_control_lesson' },
    ],
    isEnding: false,
  },

  chapter1_past_mention: {
    id: 'chapter1_past_mention',
    background: 'witch_hut',
    character: 'Меви',
    text: '(Меви замолкает. Её взгляд становится далёким, словно она видит что-то за пределами этой комнаты.)\n\n— Именно так.',
    choices: [
      { id: 'continue', text: 'Промолчать', next: 'chapter1_wind_arrives' },
      { id: 'press', text: '«Что тогда произошло?»', next: 'chapter1_past_details' },
    ],
    isEnding: false,
  },

  chapter1_control_lesson: {
    id: 'chapter1_control_lesson',
    background: 'witch_hut',
    character: 'Меви',
    text: '— Сила — это река. Ты не можешь остановить её течение, но можешь направить по нужному руслу. Закрой глаза. Почувствуй ветер внутри себя.',
    choices: [
      { id: 'meditate', text: 'Закрыть глаза и сосредоточиться', next: 'chapter1_meditation' },
    ],
    isEnding: false,
  },

  chapter1_meditation: {
    id: 'chapter1_meditation',
    background: 'witch_hut',
    character: '',
    text: 'Вы закрываете глаза. Внутри вас пробуждается что-то древнее и дикое. Ветер. Шёпот листьев. Пульсация земли под ногами.\n\nВсё это — часть вас.',
    choices: [
      { id: 'open_eyes', text: 'Открыть глаза', next: 'chapter1_wind_arrives' },
    ],
    isEnding: false,
  },

  chapter1_past_details: {
    id: 'chapter1_past_details',
    background: 'witch_hut',
    character: 'Меви',
    text: '— Тридцать лет назад я не смогла удержать свою силу. Деревня сгорела. Люди погибли. Меня изгнали, но худшее наказание — это память.\n\n(Она смотрит на вас.)\n\n— Ты не повторишь моих ошибок. Я не позволю.',
    choices: [
      { id: 'promise', text: '«Обещаю научиться контролю.»', next: 'chapter1_wind_arrives' },
    ],
    isEnding: false,
  },

  chapter1_wind_arrives: {
    id: 'chapter1_wind_arrives',
    background: 'witch_hut_windy',
    character: '',
    text: 'Резкий порыв ветра врывается в хижину. В открытое окно влетает птица с чёрным оперением. Она кружит под потолком, роняя перья, которые мерцают странным светом.',
    choices: [
      { id: 'catch_bird', text: 'Попытаться поймать птицу', next: 'chapter1_bird_caught' },
      { id: 'observe', text: 'Наблюдать за птицей', next: 'chapter1_bird_message' },
      { id: 'ask_mevi', text: '«Меви, что это значит?»', next: 'chapter1_mevi_explains' },
    ],
    isEnding: false,
  },

  chapter1_bird_caught: {
    id: 'chapter1_bird_caught',
    background: 'witch_hut_windy',
    character: '',
    text: 'Вы протягиваете руку, и птица неожиданно садится на неё. В её клюве — свёрнутое письмо, запечатанное королевской печатью.',
    choices: [
      { id: 'read', text: 'Прочитать письмо', next: 'chapter1_letter' },
    ],
    isEnding: false,
  },

  chapter1_bird_message: {
    id: 'chapter1_bird_message',
    background: 'witch_hut_windy',
    character: 'Меви',
    text: '— Посланник. Из дворца.\n\n(Птица кружит ещё раз и роняет свёрнутое письмо прямо к ногам Лулу.)',
    choices: [
      { id: 'pick_up', text: 'Поднять письмо', next: 'chapter1_letter' },
    ],
    isEnding: false,
  },

  chapter1_mevi_explains: {
    id: 'chapter1_mevi_explains',
    background: 'witch_hut_windy',
    character: 'Меви',
    text: '— Это вестник беды. Королевские птицы не прилетают с хорошими новостями.\n\n(Птица опускается на стол и роняет письмо с королевской печатью.)',
    choices: [
      { id: 'read', text: 'Прочитать письмо', next: 'chapter1_letter' },
    ],
    isEnding: false,
  },

  chapter1_letter: {
    id: 'chapter1_letter',
    background: 'witch_hut_windy',
    character: '',
    text: '«Королевский приказ.\n\nЛулу, советница двора, немедленно явиться во дворец. Королева требует твоего присутствия.\n\nОпасность надвигается с севера. Тьма пробуждается.»',
    choices: [
      { id: 'go_palace', text: '«Я должна идти во дворец.»', next: 'ending_palace_duty' },
      { id: 'refuse', text: '«Я останусь и продолжу обучение.»', next: 'ending_stay_with_mevi' },
      { id: 'ask_advice', text: '«Меви, что мне делать?»', next: 'chapter1_mevi_advice' },
    ],
    isEnding: false,
  },

  chapter1_mevi_advice: {
    id: 'chapter1_mevi_advice',
    background: 'witch_hut_windy',
    character: 'Меви',
    text: '— Решение должна принять ты сама. Дворец может дать тебе власть и признание. Но здесь, в лесу, ты найдёшь себя.\n\n— Что бы ты ни выбрала… помни: твоя сила — это часть тебя. Не позволяй другим решать, как ты её используешь.',
    choices: [
      { id: 'go_palace', text: 'Отправиться во дворец', next: 'ending_palace_duty' },
      { id: 'stay', text: 'Остаться с Меви', next: 'ending_stay_with_mevi' },
      { id: 'both', text: 'Найти третий путь', next: 'ending_balance_path' },
    ],
    isEnding: false,
  },

  // Концовки
  ending_palace_duty: {
    id: 'ending_palace_duty',
    background: 'palace',
    character: '',
    text: 'Вы покидаете хижину и направляетесь во дворец. Королева встречает вас с тревогой в глазах.\n\n— Тьма надвигается, — говорит она. — И только ты можешь нас спасти.\n\nВаша судьба теперь связана с королевством. Впереди — битвы, интриги и великие свершения.',
    narrativeText: 'Концовка: Долг перед королевством',
    choices: [],
    isEnding: true,
  },

  ending_stay_with_mevi: {
    id: 'ending_stay_with_mevi',
    background: 'witch_hut',
    character: 'Меви',
    text: '— Ты сделала правильный выбор, — улыбается Меви. — Истинная сила приходит изнутри, а не от королевских указов.\n\nВы остаётесь в лесу, постигая древнюю магию под руководством Меви. Ваша сила растёт, становясь частью леса, частью самой природы.',
    narrativeText: 'Концовка: Путь ведьмы',
    choices: [],
    isEnding: true,
  },

  ending_balance_path: {
    id: 'ending_balance_path',
    background: 'forest_mystic',
    character: '',
    text: 'Вы понимаете, что не обязаны выбирать между дворцом и лесом. Ваш путь — это баланс.\n\nВы становитесь мостом между двумя мирами: помогаете королевству, но черпаете силу из природы. Меви становится вашим тайным наставником, а королева — союзницей.\n\nВаша судьба — объединить то, что казалось несовместимым.',
    narrativeText: 'Концовка: Равновесие',
    choices: [],
    isEnding: true,
  },
}

// Background styles mapping
export const BACKGROUNDS: Record<string, string> = {
  mystic_sky: 'bg-gradient-to-b from-indigo-950 via-purple-900 to-violet-950',
  witch_hut: 'bg-gradient-to-br from-emerald-950/90 via-teal-900/80 to-green-950/90',
  witch_hut_windy: 'bg-gradient-to-br from-slate-900 via-teal-900/70 to-cyan-950/80',
  palace: 'bg-gradient-to-b from-amber-950 via-yellow-900/70 to-orange-950',
  forest_mystic: 'bg-gradient-to-br from-emerald-900/80 via-teal-800/70 to-cyan-900/80',
}
