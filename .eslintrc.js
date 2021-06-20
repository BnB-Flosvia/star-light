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
      1,
      {
        extensions: [".js", ".jsx"],
      },
    ],
    "no-param-reassign": ["error", { props: false }],
    "react/prop-types": "off",
    "react/jsx-props-no-spreading": "warn",
    "import/no-named-as-default-member": "off",
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
    camelcase: "warn",
    "linebreak-style": (process.platform === "win32" ? [2, "windows"] : 0),

    // Organize
    "jsx-a11y/anchor-is-valid": "off",
    "import/no-unresolved": "off",
    "no-undef": "warn",
    "react/jsx-one-expression-per-line": "off",
    "react/destructuring-assignment": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "no-nested-ternary": "off",
  },
  overrides: [
    {
      files: ["*.test.js", "*.spec.js", "*.stories.js", "TestSetup.js"],
      rules: {
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
