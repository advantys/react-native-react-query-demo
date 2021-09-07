/* eslint-disable import/no-extraneous-dependencies */
const defaultAssetExts =
  require('metro-config/src/defaults/defaults').assetExts;

let exclusionList;

try {
  // React Native >= 0.59, < 0.64
  exclusionList = require('metro-config/src/defaults/blacklist');
} catch {
  // React Native >= 0.64
  exclusionList = require('metro-config/src/defaults/exclusionList');
}

module.exports = {
  resolver: {
    assetExts: [...defaultAssetExts, 'woff2'],
    blacklistRE: exclusionList([/hasura\/.*/]),
  },
  transformer: {
    assetPlugins: ['expo-asset/tools/hashAssetFiles'],
  },
};
