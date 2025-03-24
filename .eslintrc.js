module.exports = {
  root: true,
<<<<<<< HEAD
  extends: ['@react-native', 'plugin:@typescript-eslint/recommended', 'plugin:jest/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-native', 'jest'],
=======
  extends: [
    '@react-native',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'react-native/no-inline-styles': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/react-in-jsx-scope': 'off',
  },
>>>>>>> 5b431fa (Update SignUpScreen with image picker)
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
<<<<<<< HEAD
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
      },
    },
    {
      files: ['*.test.ts', '*.test.tsx'],
      env: {
        jest: true,
      },
    },
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'react-native/no-inline-styles': 'warn',
  },
};
=======
        '@typescript-eslint/explicit-function-return-type': ['warn'],
      },
    },
  ],
}; 
>>>>>>> 5b431fa (Update SignUpScreen with image picker)
