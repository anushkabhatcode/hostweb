import { defineConfig } from "cypress";

export default defineConfig({
 e2e: {
    setupNodeEvents(on, config) {
      // Enable experimentalSessionSupport
      config.experimentalSessionSupport = true;

      // Return the modified config object
      return config;
    },
 },
});
