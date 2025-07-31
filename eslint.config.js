// eslint.config.js
import js from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import astroParser from 'astro-eslint-parser'
import prettier from 'eslint-config-prettier/flat'
import astro from 'eslint-plugin-astro'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import react from 'eslint-plugin-react'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import tseslint from 'typescript-eslint'

export default [
  // Base Astro/JS/TS config
  ...astro.configs.recommended,
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    // Simple import/export sorting
    plugins: { 'simple-import-sort': simpleImportSort },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error'
    }
  },
  // Type-aware rules only for TS/TSX in src/ and scripts/ folders
  {
    files: ['{src,scripts}/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json'
      }
    },
    rules: {
      ...tseslint.configs.recommendedTypeChecked.rules,
      '@typescript-eslint/triple-slash-reference': 'off',
      '@typescript-eslint/sort-type-constituents': 'error'
    }
  },

  // Supabase functions TypeScript configuration
  {
    files: ['supabase/functions/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './supabase/tsconfig.json'
      }
    },
    rules: {
      ...tseslint.configs.recommendedTypeChecked.rules,
      '@typescript-eslint/triple-slash-reference': 'off',
      '@typescript-eslint/sort-type-constituents': 'error'
    }
  },

  // Astro files - Enhanced configuration
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.astro'],
        project: './tsconfig.json',
        // Add these options to better handle Astro syntax
        sourceType: 'module',
        ecmaVersion: 'latest'
      }
    },
    rules: {
      // Disable problematic rules for Astro files
      '@typescript-eslint/no-unused-vars': 'off',
      'astro/no-unused-define-vars-in-style': 'error'
    }
  },

  // React files
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: { react, 'jsx-a11y': jsxA11y },
    rules: {
      ...react.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      '@typescript-eslint/sort-type-constituents': 'error'
    }
  },
  // Import resolver for TypeScript path aliases
  {
    settings: {
      'import/resolver': {
        typescript: {}
      }
    }
  },
  // Prettier
  prettier
]
