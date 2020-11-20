const { name } = require('./package.json')

const jestConfig = require('@holidayapi/jest-config')

module.exports = Object.assign(jestConfig, {
  displayName: name,
  name,
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/src/$1',
    '@config/(.*)': '<rootDir>/src/config/$1',
    '@app/(.*)': '<rootDir>/src/app/$1',
    '@helpers/(.*)': '<rootDir>/src/helpers/$1'
  },
  testTimeout: 20000
})
