import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'ClaudeDesignSystem',
      formats: ['es', 'umd'],
      fileName: (format) => `claude-design-system.${format}.js`,
    },
  },
});
