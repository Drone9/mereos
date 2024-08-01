module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.[tj]sx?$": "esbuild-jest"
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/src/__mocks__/fileMock.js',
  },
};
