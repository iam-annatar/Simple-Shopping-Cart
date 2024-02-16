const { init } = require("@fullstacksjs/eslint-config/init");

module.exports = init({
  root: true,
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  plugins: ["react-refresh"],
  modules: {
    auto: true, // If you need auto module detection (refer to Auto Module Detection).
    // Modules configuration check (optional). (refer to Module API)
  },
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-var-requires": 0,
    "import/no-unresolved": "off",
    "import/extensions": ["error", { json: "always" }],
  },
});
