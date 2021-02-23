module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
        node: true
    },
    extends: ["airbnb-base", "prettier"],
    parserOptions: {
        ecmaVersion: 12
    },
    plugins: ["prettier"],
    rules: {
        "prettier/prettier": [
            "error",
            {
                tabWidth: 4,
                trailingComma: "none",
                semi: false
            }
        ]
    }
}