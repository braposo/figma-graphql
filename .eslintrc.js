module.exports = {
    extends: [
        "airbnb-base",
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:prettier/recommended",
        "prettier/@typescript-eslint",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.json",
    },
    plugins: ["@typescript-eslint"],
    ignorePatterns: ["docs", "**/*.js"],
    rules: {
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        "no-underscore-dangle": "off",
        "import/prefer-default-export": "off",
        "import/no-default-export": "off",
        "import/extensions": [
            "error",
            {
                ts: "never",
            },
        ],
    },
    settings: {
        "import/resolver": {
            typescript: {},
        },
    },
};
