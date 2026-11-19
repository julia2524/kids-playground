const { withAndroidManifest } = require("@expo/config-plugins");

const withOptionalPortrait = (config) => {
  return withAndroidManifest(config, (config) => {
    const manifest = config.modResults.manifest;

    if (!manifest["uses-feature"]) {
      manifest["uses-feature"] = [];
    }

    const features = manifest["uses-feature"];

    const portraitFeature = features.find(
      (feature) =>
        feature.$["android:name"] ===
        "android.hardware.screen.portrait"
    );

    if (portraitFeature) {
      portraitFeature.$["android:required"] = "false";
    } else {
      features.push({
        $: {
          "android:name": "android.hardware.screen.portrait",
          "android:required": "false",
        },
      });
    }

    return config;
  });
};

module.exports = withOptionalPortrait;
