module.exports = {
    "globals": {
        "_": true
    },
    "env": {
        "browser": true,
        "es6": true
    },
    "parser": "babel-eslint",
    "plugins": ["flowtype"],
    "extends": [
        "eslint:recommended", "plugin:flowtype/recommended"
    ],
    "rules": {
        "indent": [
            "error", 4
        ],
        "linebreak-style": [
            "error", "unix"
        ],
        "quotes": [
            "error", "single"
        ],
        "semi": [
            "error", "never"
        ],
        "no-console": [
            "error", {
                allow: ["log", "warn", "error"]
            }
        ]
    }
};
