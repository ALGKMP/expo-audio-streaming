import {
  ConfigPlugin,
  withAndroidManifest,
  withAppBuildGradle,
  withProjectBuildGradle,
} from "@expo/config-plugins";
import { ExpoConfig } from "@expo/config-types";

// Adding ExoPlayer and related dependencies to the app's build.gradle
const withDeps: ConfigPlugin = (config) => {
  return withAppBuildGradle(config, (config) => {
    config.modResults.contents = config.modResults.contents.replace(
      /dependencies {\n(?:.+\n)*?\}/m,
      (match) => {
        const dependencies = match.split("\n").slice(1, -1).join("\n");
        return `dependencies {
          ${dependencies}
          implementation 'androidx.media3:media3-exoplayer:1.3.0'
          implementation 'androidx.media3:media3-exoplayer-dash:1.3.0'
          implementation 'androidx.media3:media3-ui:1.3.0'
        }`;
      },
    );

    return config;
  });
};

export default withDeps;
