const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');
const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
  preset: '@shelf/jest-mongodb',
  // testEnvironment: 'node',
  transform: tsjPreset.transform,

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src',
  }),
  setupFilesAfterEnv: ['<rootDir>/src/testUtils/setup.ts'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
