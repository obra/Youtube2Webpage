module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: "module",
  },
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  globals: {
      "MAIN_WINDOW_WEBPACK_ENTRY": true,
      "MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY": true
  },
  rules: {
    "no-console": 0,
    "react/prop-types": 0,
    "no-unused-vars": 0, // disabled due to false positives
    "no-async-promise-executor": 0, // grandfathered in during eslint update; would be nice to remove
    "no-prototype-builtins": 0, // grandfathered in during eslint update; would be nice to remove
    "prefer-const": "error",
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "prettier/prettier": "error",
  },
  settings: {
    "import/resolver": {
    'node': {
                'paths': ['src'],
                'extensions': ['.js','.jsx', '.ts', '.d.ts', '.tsx']
    },
    webpack: { config: "./webpack.renderer.config.js" },
    },

    react: {
      pragma: "React", // Pragma to use, default to "React"
      version: "detect", // React version. "detect" automatically picks the version you have installed.
      // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
    },
    propWrapperFunctions: [
      // The names of any function used to wrap propTypes, e.g. `forbidExtraProps`. If this isn't set, any propTypes wrapped in a function will be skipped.
      "forbidExtraProps",
      { property: "freeze", object: "Object" },
      { property: "myFavoriteWrapper" },
    ],
    linkComponents: [
      // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
      "Hyperlink",
      { name: "Link", linkAttribute: "to" },
    ],
  },
};
