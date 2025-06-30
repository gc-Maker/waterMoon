module.exports = {
    env: {
        node: true,
        es2020: true,
        jest: true,
        browser: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'prettier',
    ],
    settings: {
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true, // 始终尝试解析类型声明文件
                project: './tsconfig.json', // 指定 tsconfig.json 路径
            },
        },
    },
    plugins: ['@typescript-eslint', 'import', 'prettier'],
    rules: {
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/no-explicit-any': 'error',
        'no-redeclare': 'error',
        'no-console': 'error',
        'import/order': [
            'error',
            {
                'newlines-between': 'never',
            },
        ],
        'import/no-unresolved': 'error',
    },
    overrides: [
        {
            files: ['**/*.ts'],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                project: './tsconfig.json',
            },
        },
    ],
};
