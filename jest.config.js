module.exports = {
  verbose: true, //Indicates whether each individual test should be reported during the run
  transform: {
    '^.+\\.tsx?$': 'ts-jest', //enables ts parsing
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // necessary for parsing styles
  },
  setupFilesAfterEnv: ['./tests/test.config.ts'], // auto run these files
};
