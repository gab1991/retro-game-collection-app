export enum EGameSelectorOrderingName {
  'name' = 'name',
  'rating' = 'rating',
  'released' = 'released',
}

export enum EGameSelectorOrderingDirection {
  'ASC' = '↑',
  'DESC' = '↓',
}

const appConfig = {
  EbayCards: {
    defaultSortOrder: 'BestMatch',
  },
  GameSelector: {
    defaultOrdering: {
      direction: EGameSelectorOrderingDirection.DESC,
      name: EGameSelectorOrderingName.rating,
    },
    defaultPage: 1,
    gamesPerRequest: 18,
    ordering: ['name ↓', 'name ↑', 'released ↓', 'released ↑', 'rating ↓', 'rating ↑'],
  },

  assetsMapping: {
    gamepadMap: {},
  },

  platformIdList: {
    '3DO': 111,

    Android: 21,

    'Apple II': 41,

    'Atari 2600': 23,

    'Atari 5200': 31,

    'Atari 7800': 28,

    'Atari 8-bit': 25,

    'Atari Flashback': 22,

    'Atari Lynx': 46,

    'Atari ST': 34,

    'Atari XEGS': 50,

    'Classic Macintosh': 55,

    'Commodore / Amiga': 166,

    Dreamcast: 106,

    'Game Boy': 26,

    'Game Boy Advance': 24,

    'Game Boy Color': 43,

    'Game Gear': 77,

    GameCube: 105,

    Genesis: 167,

    Jaguar: 112,

    Linux: 6,

    NES: 49,

    'Neo Geo': 12,

    'Nintendo 3DS': 8,

    'Nintendo 64': 83,

    'Nintendo DS': 9,

    'Nintendo DSi': 13,

    'Nintendo Switch': 7,
    // Can get through api call -> https://api.rawg.io/api/platforms
    PC: 4,
    'PS Vita': 19,
    PSP: 17,
    PlayStation: 27,
    'PlayStation 2': 15,
    'PlayStation 3': 16,
    'PlayStation 4': 18,
    'SEGA 32X': 117,
    'SEGA CD': 119,
    'SEGA Master System': 74,
    'SEGA Saturn': 107,
    SNES: 79,
    Web: 171,
    Wii: 11,
    'Wii U': 10,
    Xbox: 80,
    'Xbox 360': 14,
    'Xbox One': 1,
    iOS: 3,
    macOS: 5,
  },
};

const images = {
  Genesis: {
    gamepad: { src: require('../Assets/images/icons/Sega Genesis.png') },
    logo: {
      src: require('../Assets/images/platform logos/sega_genesis_logo.png'),
    },
  },
  NES: {
    gamepad: { src: require('../Assets/images/icons/Nintendo NES.png') },
    logo: { src: require('../Assets/images/platform logos/nes_logo.png') },
  },

  PlayStation: {
    gamepad: { src: require('../Assets/images/icons/Sony Playstation.png') },
    logo: { src: require('../Assets/images/platform logos/ps_logo.png') },
  },
  noPicture: {
    background: { src: require('../Assets/images/no_img.png') },
  },
};

const textMessages = {
  fromWishToOwn: 'You added game to Collection. Do you want to remove it from WishList?',
};
export { appConfig, images, textMessages };
