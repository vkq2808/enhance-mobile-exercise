<<<<<<< HEAD
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
=======
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
>>>>>>> ec8c59a (Bài tập 01 - Giới thiệu bản thân)

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
<<<<<<< HEAD
module.exports = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname);

  const config = {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...defaultConfig.resolver.sourceExts, 'svg']
    }
  };

  return mergeConfig(defaultConfig, config);
})();
=======
const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
>>>>>>> ec8c59a (Bài tập 01 - Giới thiệu bản thân)
