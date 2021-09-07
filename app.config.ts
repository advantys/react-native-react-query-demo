import type { ConfigContext, ExpoConfig } from '@expo/config';
const pkg = require('./package.json');

export default ({ config }: ConfigContext): Partial<ExpoConfig> => {
  return {
    ...config,
    extra: {
      appVersion: pkg.version,
      appName: pkg.appName,
    },
  };
};
