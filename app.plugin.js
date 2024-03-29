// // module.exports = require("./plugin/build/with-deps");

// "use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
// const config_plugins_1 = require("@expo/config-plugins");
// // Adding ExoPlayer and related dependencies to the app's build.gradle
// const withDeps = (config) => {
//     return (0, config_plugins_1.withAppBuildGradle)(config, (config) => {
//         if (config.modResults.language === "groovy") {
//             // Ensure we add the implementation lines for our dependencies
//             const dependencies = `
// implementation "androidx.media3:media3-exoplayer:1.3.0"
// implementation "androidx.media3:media3-exoplayer-dash:1.3.0"
// implementation "androidx.media3:media3-ui:1.3.0"
// `;
//             // Append our dependencies to the end of the build.gradle file
//             config.modResults.contents += `\ndependencies {\n${dependencies}\n}\n`;
//         }
//         return config;
//     });
// };
// // exports.default = withDeps;
// module.exports = withDeps;

const pkg = require("./package.json");
const configPlugins = require("@expo/config-plugins");

const MUSIC_LIBRARY_USAGE =
  "Allow $(PRODUCT_NAME) to access your music library";

const withMusicLibrary = (config, { musicLibraryPermission } = {}) => {
  if (!config.ios) config.ios = {};
  if (!config.ios.infoPlist) config.ios.infoPlist = {};

  config.ios.infoPlist.NSAppleMusicUsageDescription =
    musicLibraryPermission ||
    config.ios.infoPlist.NSAppleMusicUsageDescription ||
    MUSIC_LIBRARY_USAGE;

  return config;
};

exports.default = configPlugins.createRunOncePlugin(
  withMusicLibrary,
  pkg.name,
  pkg.version,
);
