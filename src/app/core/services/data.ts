import { Articles } from '../ngxs/articles.model';

export const ARTICLES: Articles[] = [
  {
    id: 1,
    title: 'Технологические инновации в Галактике',
    summary: 'Рассматриваются последние достижения в области технологий.',
    content:
      'Галактические инженеры представили новую технологию гиперпространственных двигателей...',
    author: {
      id: 1001,
      name: 'Энакин Скайуокер',
      profile_url: 'https://starwars.com/anakin-skywalker',
    },
    published_at: '2024-10-01T12:00:00Z',
    updated_at: '2024-10-02T10:00:00Z',
    tags: ['Технологии', 'Галактика', 'Инновации'],
    image_url: 'https://example.com/images/tech.jpg',
  },
  {
    id: 2,
    title: 'Экономика Империи: анализ экспертов',
    summary: 'Эксперты обсуждают состояние экономики Империи.',
    content:
      'В связи с ростом затрат на производство звездных разрушителей, Империя сталкивается с новыми вызовами...',
    author: {
      id: 1002,
      name: 'Дарт Вейдер',
      profile_url: 'https://starwars.com/darth-vader',
    },
    published_at: '2024-10-02T15:30:00Z',
    updated_at: '2024-10-03T09:20:00Z',
    tags: ['Экономика', 'Империя', 'Анализ'],
    image_url: 'https://example.com/images/economy.jpg',
  },
  {
    id: 3,
    title: 'Совет джедаев: роль в Галактической Республике',
    summary: 'Рассматривается роль Совета джедаев в политике.',
    content:
      'Совет джедаев продолжает оказывать влияние на политику Республики, несмотря на растущую критику...',
    author: {
      id: 1003,
      name: 'Оби-Ван Кеноби',
      profile_url: 'https://starwars.com/obi-wan-kenobi',
    },
    published_at: '2024-10-03T09:00:00Z',
    updated_at: '2024-10-03T11:15:00Z',
    tags: ['Политика', 'Джедаи', 'Республика'],
    image_url: 'https://example.com/images/jedi.jpg',
  },
  {
    id: 4,
    title: 'Научные открытия планеты Татуин',
    summary: 'Последние открытия в области астрономии и геологии на Татуине.',
    content:
      'Ученые Татуина обнаружили новые минералы и планетарные феномены...',
    author: {
      id: 1004,
      name: 'Люк Скайуокер',
      profile_url: 'https://starwars.com/luke-skywalker',
    },
    published_at: '2024-09-28T14:45:00Z',
    updated_at: '2024-10-01T08:30:00Z',
    tags: ['Наука', 'Татуин', 'Геология'],
    image_url: 'https://example.com/images/tatooine.jpg',
  },
  {
    id: 5,
    title: 'Секреты Ситхов: что скрывает Темная сторона?',
    summary: 'Исследование мифов и фактов о Темной стороне Силы.',
    content:
      'Темная сторона Силы остается одной из самых загадочных и мощных сил во Вселенной...',
    author: {
      id: 1005,
      name: 'Палпатин',
      profile_url: 'https://starwars.com/palpatine',
    },
    published_at: '2024-10-01T16:00:00Z',
    updated_at: '2024-10-02T12:00:00Z',
    tags: ['Ситхи', 'Сила', 'Темная сторона'],
    image_url: 'https://example.com/images/sith.jpg',
  },
  {
    id: 6,
    title: 'Как роботы меняют будущее?',
    summary: 'Рассматривается влияние дроидов на повседневную жизнь.',
    content:
      'С увеличением числа дроидов в различных сферах жизни, меняется подход к труду и технологиям...',
    author: {
      id: 1006,
      name: 'C-3PO',
      profile_url: 'https://starwars.com/c-3po',
    },
    published_at: '2024-10-02T08:20:00Z',
    updated_at: '2024-10-02T18:30:00Z',
    tags: ['Роботы', 'Технологии', 'Будущее'],
    image_url: 'https://example.com/images/droids.jpg',
  },
  {
    id: 7,
    title: 'Битва при Эндоре: тактика и стратегия',
    summary: 'Подробный анализ тактики и стратегии битвы при Эндоре.',
    content:
      'Битва при Эндоре остается одной из самых значительных военных операций...',
    author: {
      id: 1007,
      name: 'Хан Соло',
      profile_url: 'https://starwars.com/han-solo',
    },
    published_at: '2024-09-30T12:10:00Z',
    updated_at: '2024-10-01T09:45:00Z',
    tags: ['Битвы', 'Эндор', 'Тактика'],
    image_url: 'https://example.com/images/endor.jpg',
  },
  {
    id: 8,
    title: 'Клоновые войны: взгляд изнутри',
    summary: 'Рассказ очевидцев и участников о Клоновых войнах.',
    content: 'Ветераны Клоновых войн делятся своими историями и опытом...',
    author: {
      id: 1008,
      name: 'Капитан Рекс',
      profile_url: 'https://starwars.com/captain-rex',
    },
    published_at: '2024-10-02T14:15:00Z',
    updated_at: '2024-10-03T08:40:00Z',
    tags: ['Клоновые войны', 'Армия', 'История'],
    image_url: 'https://example.com/images/clone-wars.jpg',
  },
  {
    id: 9,
    title: 'Галактические гонки: спорт будущего',
    summary: 'О развитии скоростных гонок и новых технологий.',
    content:
      'Галактические гонки стали одним из самых зрелищных видов спорта, привлекая внимание миллионов...',
    author: {
      id: 1009,
      name: 'Подрейсер Себульба',
      profile_url: 'https://starwars.com/sebulba',
    },
    published_at: '2024-09-29T17:00:00Z',
    updated_at: '2024-10-01T11:20:00Z',
    tags: ['Спорт', 'Гонки', 'Технологии'],
    image_url: 'https://example.com/images/races.jpg',
  },
  {
    id: 10,
    title: 'Мир на Корусканте: анализ и перспективы',
    summary:
      'Рассматриваются политические изменения и будущее мира на Корусканте.',
    content:
      'Корускант, как столица Галактики, находится в центре политических реформ...',
    author: {
      id: 1010,
      name: 'Лея Органа',
      profile_url: 'https://starwars.com/leia-organa',
    },
    published_at: '2024-10-01T10:00:00Z',
    updated_at: '2024-10-03T07:50:00Z',
    tags: ['Политика', 'Мир', 'Корускант'],
    image_url: 'https://example.com/images/coruscant.jpg',
  },
];
