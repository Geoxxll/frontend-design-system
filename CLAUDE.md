# Claude Design System

A framework-agnostic Web Components UI library inspired by Claude's design language.

## Tech Stack

- **Web Components** via [Lit](https://lit.dev/) v3
- **Vite** for build (Library Mode)
- **CSS Custom Properties** for design tokens and theming

## Project Structure

```
src/
├── index.js              # Entry point — registers all components
├── tokens/tokens.css     # Design tokens (CSS vars, dark/light themes)
├── shared/base-element.js # Base class extending LitElement
├── foundation/           # <claude-theme>
├── basic/                # Button, Icon, Input, Textarea, Toggle, Badge, Tag, Tooltip, Avatar
├── layout/               # Card, Modal, Sidebar, Nav, Divider, Tabs
└── advanced/             # Code Block, Terminal, Hero, Glow, Skeleton, Toast
```

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start Vite dev server
npm run build        # Build library to dist/
npm run preview      # Preview built library
```

## Commit Conventions

- Use conventional commit style: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`
- Each commit must include: `Co-Authored-By: Claude <noreply@anthropic.com>`
- Keep commits atomic — one logical change per commit

## Component Conventions

- All custom elements use `claude-` prefix (e.g. `<claude-button>`)
- All components extend `ClaudeBaseElement` from `src/shared/base-element.js`
- Props use kebab-case HTML attributes
- Custom events use `claude-` prefix (e.g. `claude-change`)
- CSS tokens use `--claude-` prefix (e.g. `--claude-accent`)
- Use Shadow DOM for style isolation; design tokens penetrate via CSS custom properties

## Testing

No test framework is set up yet for V1. When implementing, verify components work by:
1. Building the library: `npm run build`
2. Opening `docs/index.html` in a browser to visually verify

## Design Token Reference

See `docs/superpowers/specs/2026-06-26-claude-design-system-design.md` for the full token spec.
