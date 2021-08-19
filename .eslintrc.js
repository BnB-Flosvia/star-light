module.exports = {
  extends: [
    "react-app",
    "airbnb",
    "plugin:prettier/recommended",
    "prettier",
    "prettier/babel",
    "prettier/react",
  ],
  env: {
    browser: true,
    jest: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "react/jsx-filename-extension": [
      "warn",
      {
        extensions: [".js", ".jsx"],
      },
    ],
    "no-param-reassign": ["error", { props: false }],
    "react/prop-types": "off",
    "import/no-named-as-default-member": "off",
    "react/jsx-props-no-spreading": "warn",
    "jsx-a11y/label-has-associated-control": "warn",
    "no-use-before-define": "warn",
    "no-shadow": "warn",
    "import/prefer-default-export": "warn",
    "no-unused-vars": [
      "error",
      {
        varsIgnorePattern: "^_",
        argsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],
    // https://stackoverflow.com/q/39114446/2771889
    "linebreak-style": process.platform === "win32" ? ["error", "windows"] : "off",
    "react/jsx-one-expression-per-line": "off",
    "no-nested-ternary": "off",
    "jsx-a11y/click-events-have-key-events": "warn",
    "jsx-a11y/no-static-element-interactions": "warn",
    camelcase: "warn",
  },
  overrides: [
    {
      files: ["*.stories.js"],
      rules: {
        "import/no-unresolved": "off",
        "import/no-extraneous-dependencies": "off",
        "no-unused-expressions": "off",
        "no-alert": "off",
        "no-console": "off",
        "react-hooks/rules-of-hooks": "off",
      },
    },
  ],
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
}
