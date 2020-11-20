const jestConfig = require('@holidayapi/jest-config')

module.exports = Object.assign(jestConfig, {
  projects: ['<rootDir>/packages/**/jest.config.js']
})
