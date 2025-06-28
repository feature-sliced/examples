import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import importX from 'eslint-plugin-import-x';
import react from 'eslint-plugin-react';
import { configs as hookConfigs } from 'eslint-plugin-react-hooks';
import { configs, config } from 'typescript-eslint';

export default config(
    {
        ignores: ['out/**', 'env.d.ts'],
    },
    eslint.configs.recommended,
    configs.strict,
    configs.stylistic,
    react.configs.flat.recommended,
    importX.flatConfigs.typescript,
    hookConfigs['recommended-latest'],
    {
        plugins: {
            '@stylistic': stylistic,
        },
        rules: {
            'import-x/order': [
                'warn',
                {
                    'groups': [
                        'builtin',
                        'external',
                        'internal',
                        'parent',
                        'sibling',
                        'index',
                        'object',
                        'type',
                    ],
                    'alphabetize': {
                        'order': 'asc',
                        'caseInsensitive': true,
                    },
                    'pathGroups': [
                        {
                            'pattern': 'next',
                            'group': 'external',
                            'position': 'before',
                        },
                        {
                            'pattern': 'react',
                            'group': 'external',
                            'position': 'before',
                        },
                        {
                            'pattern': '@/**',
                            'group': 'internal',
                            'position': 'before',
                        },
                        {
                            'pattern': 'src/**',
                            'group': 'internal',
                            'position': 'before',
                        },
                    ],
                    'pathGroupsExcludedImportTypes': ['builtin'],
                },
            ],
            '@stylistic/arrow-parens': ['warn', 'as-needed'],
            '@typescript-eslint/no-invalid-void-type': ['off', { 'allowInGenericTypeArguments': true }],
            '@stylistic/indent': ['error', 4],
            '@stylistic/template-curly-spacing': ['warn', 'always'],
            '@stylistic/object-curly-spacing': ['warn', 'always'],
            '@stylistic/semi': ['error', 'always'],
            '@stylistic/quotes': ['warn', 'single'],
            '@stylistic/comma-dangle': ['warn', 'always-multiline'],
            'react/jsx-curly-spacing': ['warn', { 'when': 'always', 'children': true }],
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'react/function-component-definition': ['warn', {
                namedComponents: 'arrow-function',
                unnamedComponents: 'arrow-function',
            }],
            '@typescript-eslint/naming-convention': ['warn',
                {
                    'selector': 'interface',
                    'format': ['PascalCase'],
                    'prefix': ['I'],
                },
                {
                    'selector': 'enumMember',
                    'format': ['PascalCase'],
                    'prefix': ['E'],
                },
            ],
        },
    },
    {
        files: ['*.d.ts'],
        rules: {
            '@typescript-eslint/naming-convention': 'off',
        },
    },
);