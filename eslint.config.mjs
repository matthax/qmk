import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2017,
      },
    },
  },
  tseslint.configs.recommended,
);
