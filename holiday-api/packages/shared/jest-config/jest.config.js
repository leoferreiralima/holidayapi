module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '**/__tests__/**/*.spec.[jt]s?(x)',
    '!**/__tests__/coverage/**',
    '!**/__tests__/utils/**'
  ]
}
