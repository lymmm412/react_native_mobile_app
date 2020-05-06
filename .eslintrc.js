module.exports = {
    "parser": "babel-eslint",
    "env": {
        "es6": true,
        "node": true,
        "react-native/react-native": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:flowtype/recommended",
        "plugin:prettier/recommended",
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "react-native",
        "flowtype"
    ],
    /**
     * "off" 或 0 - 关闭规则
     * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出),
     * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
     */
    "rules": {
        "no-extra-boolean-cast": 0,
        "no-useless-computed-key": 0,
        "no-extra-parens":0,
        "no-extra-semi":2,
        "no-irregular-whitespace":2,
        "no-unexpected-multiline":2,
        "no-unreachable":2,
        "valid-typeof":2,
        'strict': 'error',
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single",
            { "allowTemplateLiterals": true }
        ],
        "semi": [
            "error",
            "always"
        ],
        "eqeqeq": 2,
        "block-spacing": [2, "always"],
        "space-before-blocks": 2,
        "space-infix-ops": 2,
        "space-unary-ops": 2,
        "spaced-comment": [2, "always", { exceptions: ["-"] }],
        "keyword-spacing": [
            2,
            { "before": true, "after": true }
        ],
        "arrow-spacing": [
            "error",
            { "before": true, "after": true }
        ],
        "key-spacing":[
            "error",
            { "beforeColon": false }
        ],
        "no-mixed-spaces-and-tabs": 0,
        "no-var": 2,
        "comma-spacing": [
            "error",
            { "after": true }
        ],
        "semi-spacing": 2,
        'no-const-assign': 'error',
        'prefer-const': 'error',
        "react-native/no-inline-styles": 1,
        "flowtype/delimiter-dangle": [
            2,
            "only-multiline"
        ],
        "flowtype/space-after-type-colon": [
            2,
            "always"
        ],
        "flowtype/union-intersection-spacing": [
            2,
            "always"
        ],
        "react/prop-types": 0,

    }
};
