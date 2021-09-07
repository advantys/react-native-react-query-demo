const defaultAssetExts =
  // eslint-disable-next-line import/no-extraneous-dependencies
  require('metro-config/src/defaults/defaults').assetExts;

module.exports = {
  resolver: {
    assetExts: [...defaultAssetExts, 'woff2'],
  },
  transformer: {
    assetPlugins: ['expo-asset/tools/hashAssetFiles'],
  },
};
