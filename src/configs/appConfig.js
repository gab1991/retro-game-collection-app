const appConfig = {
  assetsMapping: {
    gamepadMap: {}
  },

  GameSelector: {
    defaultPage: 1,
    gamesPerRequest: 20,
    defaultOrdering: '-rating',
    ordering: ['name', 'released', 'rating']
  }
};

const images = {
  Genesis: {
    gamepad: { src: require('../assets/images/icons/Sega Genesis.png') },
    logo: {
      src: require('../assets/images/platform logos/sega_genesis_logo.png')
    }
  },
  NES: {
    gamepad: { src: require('../assets/images/icons/Nintendo NES.png') },
    logo: { src: require('../assets/images/platform logos/nes_logo.png') }
  }
};
export default appConfig;
export { images, appConfig };
