import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';

/**
 * Custom plugin to emit a standalone tokens.css for non-Web-Component consumers.
 * Reads the source tokens.css (which uses :host for Shadow DOM) and rewrites
 * selectors to :root so the file works as a plain <link> stylesheet.
 */
function emitTokensCss() {
  return {
    name: 'emit-tokens-css',
    closeBundle() {
      const src = resolve(__dirname, 'src/tokens/tokens.css');
      let css = readFileSync(src, 'utf-8');
      // Convert Shadow DOM :host(...) selectors to document-level :root... selectors
      // :host([attr]) → :root[attr]  (unwrap the parens around the argument)
      css = css.replace(/:host\(([^)]+)\)/g, ':root$1');
      // :host (bare, no parens) → :root
      css = css.replace(/:host\b/g, ':root');
      const distDir = resolve(__dirname, 'dist');
      mkdirSync(distDir, { recursive: true });
      writeFileSync(resolve(distDir, 'tokens.css'), css);
    },
  };
}

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'ClaudeDesignSystem',
      formats: ['es', 'umd'],
      fileName: (format) => `claude-design-system.${format}.js`,
    },
  },
  plugins: [emitTokensCss()],
});
