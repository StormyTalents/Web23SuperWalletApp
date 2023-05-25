module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
      },
    ],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@api/*': ['src/api/*'],
          '@assets/*': ['src/assets/*'],
          '@components/*': ['src/components/*'],
          '@hooks/*': ['src/hooks/*'],
          '@navigation/*': ['src/navigation/*'],
          '@screens/*': ['src/screens/*'],
          '@stores/*': ['src/stores/*'],
          '@utils/*': ['src/utils/*'],
          '@layouts/*': ['src/layouts/*'],
        },
      },
    ],
  ],
};
