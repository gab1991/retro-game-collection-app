// export enum GameSelectorOrdering {
//   'NAME_DESC' = 'name ↓',
//   'NAME_ASC' = 'name ↑',
//   'RELEASED_DSC' = 'released ↓',
//   'RELEASED_ASC' = 'released ↑',
//   'RATING_DSC' = 'rating ↓',
//   'RATING_ASC' = 'rating ↑',
// }

export enum GameSelectorOrderingName {
  'name' = 'name',
  'released' = 'released',
  'rating' = 'rating',
}

export enum GameSelectorOrderingDirection {
  'DESC' = '↓',
  'ASC' = '↑',
}

const appConfig = {
  platformIdList: {
    // Can get through api call -> https://api.rawg.io/api/platforms
    PC: 4,
    'Xbox One': 1,
    'PlayStation 4': 18,
    iOS: 3,
    Android: 21,
    macOS: 5,
    Linux: 6,
    'Nintendo Switch': 7,
    'Nintendo 3DS': 8,
    'Nintendo DS': 9,
    'Nintendo DSi': 13,
    'Xbox 360': 14,
    Xbox: 80,
    'PlayStation 3': 16,
    'PlayStation 2': 15,
    PlayStation: 27,
    'PS Vita': 19,
    PSP: 17,
    'Wii U': 10,
    Wii: 11,
    GameCube: 105,
    'Nintendo 64': 83,
    'Game Boy Advance': 24,
    'Game Boy Color': 43,
    'Game Boy': 26,
    SNES: 79,
    NES: 49,
    'Classic Macintosh': 55,
    'Apple II': 41,
    'Commodore / Amiga': 166,
    'Atari 7800': 28,
    'Atari 5200': 31,
    'Atari 2600': 23,
    'Atari Flashback': 22,
    'Atari 8-bit': 25,
    'Atari ST': 34,
    'Atari Lynx': 46,
    'Atari XEGS': 50,
    Genesis: 167,
    'SEGA Saturn': 107,
    'SEGA CD': 119,
    'SEGA 32X': 117,
    'SEGA Master System': 74,
    Dreamcast: 106,
    '3DO': 111,
    Jaguar: 112,
    'Game Gear': 77,
    'Neo Geo': 12,
    Web: 171,
  },
  assetsMapping: {
    gamepadMap: {},
  },

  GameSelector: {
    defaultPage: 1,
    gamesPerRequest: 18,
    defaultOrdering: {
      name: 'rating',
      direction: '↓',
    },
    ordering: ['name ↓', 'name ↑', 'released ↓', 'released ↑', 'rating ↓', 'rating ↑'],
  },

  EbayCards: {
    defaultSortOrder: 'BestMatch',
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
export default appConfig;
export { appConfig, images, textMessages };
