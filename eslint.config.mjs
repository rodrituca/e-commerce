import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  { ignores: ['js/dropzone.js', 'js/bootstrap.bundle.min.js'] },
];
