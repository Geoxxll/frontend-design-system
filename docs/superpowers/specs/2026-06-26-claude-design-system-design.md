# Claude Design System — Spec

## 概述

构建一套受 Claude 生态（claude.ai/code、claude.ai 主站、docs.anthropic.com）设计语言启发的、**框架无关的 Web Components 组件库**，以 npm 包形式发布，可在任意前端项目中复用。

## 目标

1. **可复用** — 任何项目通过 `npm install` + `<script>` 或 `import` 即可使用全部组件
2. **框架无关** — 基于 Web Components 标准，在 React / Vue / 纯 HTML 中均可使用
3. **双主题** — 深色 / 浅色主题通过 CSS 变量无缝切换
4. **自文档化** — 配套 Showcase 页面，展示所有组件的 live preview 和属性说明

## 技术选型

| 维度 | 选型 | 理由 |
|------|------|------|
| 组件标准 | Web Components (Custom Elements + Shadow DOM) | 浏览器原生，框架无关 |
| 开发框架 | **Lit** (~5KB gzipped) | Web Component 行业标准库，提供响应式属性、模板、生命周期 |
| 构建工具 | **Vite** (Library Mode) | 快速开发体验 + 打包成 ES Module / UMD 双格式 |
| 样式体系 | CSS Custom Properties (Design Tokens) | 穿透 Shadow DOM，支持主题切换 |
| 包管理 | npm | 标准前端包分发 |

## Design Tokens

所有视觉属性通过 CSS 变量定义，组件通过 `var(--token-name)` 消费。主题切换通过 `<claude-theme>` 组件在根元素上设置 `data-theme` 属性实现。

### 颜色

| Token | Dark Mode | Light Mode | 说明 |
|-------|-----------|------------|------|
| `--claude-bg-primary` | `#0D0D0D` | `#FAF7F2` | 页面主背景 |
| `--claude-bg-secondary` | `#1A1A2E` | `#F0EBE3` | 次级背景/区域 |
| `--claude-bg-elevated` | `#252538` | `#FFFFFF` | 卡片/弹层/浮起元素 |
| `--claude-bg-hover` | `rgba(255,255,255,0.05)` | `rgba(0,0,0,0.03)` | 悬停态背景 |
| `--claude-text-primary` | `#F5F0E8` | `#1A1A1A` | 主文字 |
| `--claude-text-secondary` | `#8B8B9E` | `#6B6B6B` | 次要文字 |
| `--claude-text-tertiary` | `#5A5A6E` | `#9B9B9B` | 辅助/placeholder |
| `--claude-accent` | `#E87B35` | `#D4622B` | Claude 品牌橙 — 主强调色 |
| `--claude-accent-hover` | `#F59E4B` | `#E87B35` | 强调色悬停态 |
| `--claude-accent-subtle` | `rgba(232,123,53,0.12)` | `rgba(212,98,43,0.08)` | 强调色低透明度背景 |
| `--claude-success` | `#34D399` | `#059669` | 成功状态 |
| `--claude-warning` | `#FBBF24` | `#D97706` | 警告状态 |
| `--claude-error` | `#F87171` | `#DC2626` | 错误状态 |
| `--claude-info` | `#60A5FA` | `#2563EB` | 信息状态 |
| `--claude-border` | `rgba(255,255,255,0.08)` | `rgba(0,0,0,0.08)` | 默认边框 |
| `--claude-border-strong` | `rgba(255,255,255,0.15)` | `rgba(0,0,0,0.15)` | 强调边框 |

### 字体

| Token | 值 | 说明 |
|-------|---|------|
| `--claude-font-sans` | `'Inter', system-ui, -apple-system, sans-serif` | 正文字体 |
| `--claude-font-mono` | `'JetBrains Mono', 'Fira Code', monospace` | 代码/终端字体 |
| `--claude-font-size-xs` | `0.75rem` (12px) | |
| `--claude-font-size-sm` | `0.875rem` (14px) | |
| `--claude-font-size-md` | `1rem` (16px) | 基准 |
| `--claude-font-size-lg` | `1.25rem` (20px) | |
| `--claude-font-size-xl` | `1.5rem` (24px) | |
| `--claude-font-size-2xl` | `2rem` (32px) | |
| `--claude-font-size-3xl` | `3rem` (48px) | Hero 标题 |
| `--claude-line-height-tight` | `1.25` | 标题 |
| `--claude-line-height-normal` | `1.5` | 正文 |
| `--claude-line-height-relaxed` | `1.75` | 宽松 |
| `--claude-font-weight-normal` | `400` | |
| `--claude-font-weight-medium` | `500` | |
| `--claude-font-weight-semibold` | `600` | |
| `--claude-font-weight-bold` | `700` | |

### 间距

使用 4px 基准的间距系统：

| Token | 值 |
|-------|---|
| `--claude-space-1` | `4px` |
| `--claude-space-2` | `8px` |
| `--claude-space-3` | `12px` |
| `--claude-space-4` | `16px` |
| `--claude-space-5` | `20px` |
| `--claude-space-6` | `24px` |
| `--claude-space-8` | `32px` |
| `--claude-space-10` | `40px` |
| `--claude-space-12` | `48px` |
| `--claude-space-16` | `64px` |

### 圆角

| Token | 值 | 用途 |
|-------|---|------|
| `--claude-radius-sm` | `6px` | 小元素（badge, tag） |
| `--claude-radius-md` | `12px` | 中元素（button, input, card） |
| `--claude-radius-lg` | `20px` | 大元素（modal, section） |
| `--claude-radius-full` | `9999px` | 圆形/胶囊 |

### 阴影

| Token | 值 |
|-------|---|
| `--claude-shadow-sm` | `0 1px 2px rgba(0,0,0,0.3)` (dark) / `0 1px 2px rgba(0,0,0,0.05)` (light) |
| `--claude-shadow-md` | `0 4px 12px rgba(0,0,0,0.4)` / `0 4px 12px rgba(0,0,0,0.08)` |
| `--claude-shadow-lg` | `0 8px 32px rgba(0,0,0,0.5)` / `0 8px 32px rgba(0,0,0,0.12)` |
| `--claude-shadow-glow` | `0 0 20px rgba(232,123,53,0.3)` | Claude 橙光晕 |

### 动画

| Token | 值 |
|-------|---|
| `--claude-transition-fast` | `150ms ease` |
| `--claude-transition-normal` | `250ms ease` |
| `--claude-transition-slow` | `400ms ease` |

## 组件规格

### 命名约定

- 所有组件使用 `claude-` 前缀，如 `<claude-button>`
- Props 使用 kebab-case，如 `variant="primary"`
- Events 使用 `claude-` 前缀，如 `claude-change`、`claude-click`
- Slots 用于内容投射，如 `<slot name="icon">`

### Foundation 层

#### `<claude-theme>`

主题提供者组件，包裹整个应用，管理深/浅主题切换。

```html
<claude-theme mode="dark">
  <!-- 所有子组件自动继承主题 -->
</claude-theme>
```

| Prop | Type | Default | 说明 |
|------|------|---------|------|
| `mode` | `'dark' \| 'light' \| 'system'` | `'system'` | 主题模式，system 跟随系统偏好 |

| Event | 说明 |
|-------|------|
| `claude-theme-change` | 主题切换时触发，`detail: { mode }` |

### Basic Components

#### `<claude-button>`

```html
<claude-button variant="primary" size="md">
  <claude-icon slot="prefix" name="plus"></claude-icon>
  Create New
</claude-button>
```

| Prop | Type | Default | 说明 |
|------|------|---------|------|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger'` | `'primary'` | 按钮样式变体 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| `disabled` | `boolean` | `false` | 禁用状态 |
| `loading` | `boolean` | `false` | 加载状态（显示 spinner） |
| `full-width` | `boolean` | `false` | 是否撑满容器宽度 |

| Slot | 说明 |
|------|------|
| default | 按钮文字 |
| `prefix` | 前置图标 |
| `suffix` | 后置图标 |

**视觉规格：**
- `primary`: 实心 accent 色背景 + 白色文字，hover 时亮度提升
- `secondary`: 透明背景 + accent 色边框 + accent 色文字，hover 时填充 accent-subtle
- `ghost`: 透明背景 + text-secondary 文字，hover 时填充 bg-hover
- `danger`: error 色方案，同 primary 结构
- 所有变体有 `transition: var(--claude-transition-fast)` 过渡

#### `<claude-input>`

```html
<claude-input
  label="Email"
  type="email"
  placeholder="you@example.com"
  error="Invalid email address"
></claude-input>
```

| Prop | Type | Default | 说明 |
|------|------|---------|------|
| `type` | `'text' \| 'email' \| 'password' \| 'number' \| 'search'` | `'text'` | 输入类型 |
| `label` | `string` | — | 标签文字 |
| `placeholder` | `string` | — | 占位符 |
| `value` | `string` | `''` | 值 |
| `error` | `string` | — | 错误信息，设置后显示红色边框 + 错误文字 |
| `disabled` | `boolean` | `false` | 禁用 |
| `helper` | `string` | — | 辅助说明文字 |

| Event | 说明 |
|-------|------|
| `claude-input` | 输入时触发 |
| `claude-change` | 值变更时触发 |

**视觉规格：**
- bg-elevated 背景，border 边框，focus 时 accent 色边框 + shadow-glow
- Label 在输入框上方，font-size-sm，text-secondary
- Error 在输入框下方，font-size-xs，error 色

#### `<claude-textarea>`

与 `<claude-input>` 类似，额外支持：

| Prop | Type | Default | 说明 |
|------|------|---------|------|
| `rows` | `number` | `3` | 行数 |
| `resize` | `'none' \| 'vertical' \| 'both'` | `'vertical'` | 调整大小方向 |
| `auto-resize` | `boolean` | `false` | 自动根据内容调整高度 |

#### `<claude-toggle>`

```html
<claude-toggle label="Dark mode" checked></claude-toggle>
```

| Prop | Type | Default | 说明 |
|------|------|---------|------|
| `checked` | `boolean` | `false` | 开关状态 |
| `disabled` | `boolean` | `false` | 禁用 |
| `label` | `string` | — | 标签文字 |
| `size` | `'sm' \| 'md'` | `'md'` | 尺寸 |

**视觉规格：**
- OFF: bg-secondary 轨道 + 白色圆点
- ON: accent 色轨道 + 白色圆点
- 切换有弹性缓动动画

#### `<claude-badge>`

```html
<claude-badge variant="success">Active</claude-badge>
```

| Prop | Type | Default | 说明 |
|------|------|---------|------|
| `variant` | `'default' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'default'` | 颜色变体 |
| `size` | `'sm' \| 'md'` | `'sm'` | 尺寸 |
| `dot` | `boolean` | `false` | 是否显示状态圆点 |

**视觉规格：** 对应色的 subtle 背景 + 对应色文字，radius-full 胶囊形

#### `<claude-tag>`

```html
<claude-tag removable @claude-remove="handleRemove">JavaScript</claude-tag>
```

| Prop | Type | Default | 说明 |
|------|------|---------|------|
| `removable` | `boolean` | `false` | 是否显示关闭按钮 |
| `variant` | `'default' \| 'accent'` | `'default'` | 颜色变体 |

#### `<claude-tooltip>`

```html
<claude-tooltip text="Copy to clipboard" position="top">
  <claude-button variant="ghost">Copy</claude-button>
</claude-tooltip>
```

| Prop | Type | Default | 说明 |
|------|------|---------|------|
| `text` | `string` | — | 提示文字 |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | 位置 |

**视觉规格：** bg-elevated 背景，shadow-md，font-size-xs，箭头指向触发元素

#### `<claude-avatar>`

```html
<claude-avatar src="/photo.jpg" size="md"></claude-avatar>
<claude-avatar initials="EC" size="sm"></claude-avatar>
```

| Prop | Type | Default | 说明 |
|------|------|---------|------|
| `src` | `string` | — | 图片 URL |
| `initials` | `string` | — | 无图片时显示的缩写 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 (32/40/56px) |

**视觉规格：** 圆形，无图片时 accent-subtle 背景 + accent 色文字

#### `<claude-icon>`

使用内联 SVG 图标。组件内部维护一个 `name → SVG path` 的 Map，不依赖外部图标库。V1 内置图标集：`copy`, `check`, `close`, `chevron-down`, `chevron-right`, `search`, `sun`, `moon`, `terminal`, `code`, `plus`, `minus`, `menu`, `external-link`, `loading`（15 个）。

```html
<claude-icon name="terminal" size="md"></claude-icon>
```

| Prop | Type | Default | 说明 |
|------|------|---------|------|
| `name` | `string` | — | 图标名 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 (16/20/24px) |

### Layout Components

#### `<claude-card>`

```html
<claude-card elevation="2" interactive>
  <span slot="header">Card Title</span>
  <p>Card content goes here</p>
  <div slot="footer">
    <claude-button variant="ghost" size="sm">Cancel</claude-button>
    <claude-button size="sm">Save</claude-button>
  </div>
</claude-card>
```

| Prop | Type | Default | 说明 |
|------|------|---------|------|
| `elevation` | `'0' \| '1' \| '2' \| '3'` | `'1'` | 阴影层级 |
| `interactive` | `boolean` | `false` | 是否有 hover 效果（提升阴影 + 轻微上移） |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | 内边距 |

| Slot | 说明 |
|------|------|
| `header` | 卡片头部 |
| default | 卡片内容 |
| `footer` | 卡片底部 |

**视觉规格：** bg-elevated 背景，border，对应 elevation 的 shadow，radius-md

#### `<claude-modal>`

```html
<claude-modal open>
  <span slot="title">Confirm Action</span>
  <p>Are you sure you want to proceed?</p>
  <div slot="actions">
    <claude-button variant="ghost">Cancel</claude-button>
    <claude-button variant="danger">Delete</claude-button>
  </div>
</claude-modal>
```

| Prop | Type | Default | 说明 |
|------|------|---------|------|
| `open` | `boolean` | `false` | 是否显示 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 宽度 (400/560/720px) |
| `closable` | `boolean` | `true` | 是否显示关闭按钮 |

**视觉规格：**
- Backdrop: `rgba(0,0,0,0.6)` + `backdrop-filter: blur(4px)`
- 居中弹出，bg-elevated 背景，shadow-lg，radius-lg
- 打开/关闭有 scale + opacity 动画

#### `<claude-sidebar>`

```html
<claude-sidebar>
  <span slot="header">Navigation</span>
  <claude-sidebar-item active>Dashboard</claude-sidebar-item>
  <claude-sidebar-item>Settings</claude-sidebar-item>
  <claude-sidebar-group label="Projects">
    <claude-sidebar-item>Project A</claude-sidebar-item>
    <claude-sidebar-item>Project B</claude-sidebar-item>
  </claude-sidebar-group>
</claude-sidebar>
```

| Prop | Type | Default | 说明 |
|------|------|---------|------|
| `collapsed` | `boolean` | `false` | 是否折叠（只显示图标） |
| `width` | `string` | `'260px'` | 展开宽度 |

**子组件：** `<claude-sidebar-item>`（`active`, `icon` props）、`<claude-sidebar-group>`（`label` prop）

#### `<claude-nav>`

```html
<claude-nav>
  <span slot="brand">My App</span>
  <claude-nav-item active>Home</claude-nav-item>
  <claude-nav-item>Docs</claude-nav-item>
  <div slot="actions">
    <claude-button variant="ghost" size="sm">Login</claude-button>
  </div>
</claude-nav>
```

**视觉规格：** bg-primary 背景 + 底部 border，固定高度 56px，flex 布局

#### `<claude-divider>`

```html
<claude-divider></claude-divider>
<claude-divider text="OR"></claude-divider>
```

| Prop | Type | Default | 说明 |
|------|------|---------|------|
| `text` | `string` | — | 分割线中间的文字 |
| `spacing` | `'sm' \| 'md' \| 'lg'` | `'md'` | 上下间距 |

#### `<claude-tabs>`

```html
<claude-tabs>
  <claude-tab label="Preview" active>
    <p>Preview content</p>
  </claude-tab>
  <claude-tab label="Code">
    <claude-code language="html">...</claude-code>
  </claude-tab>
</claude-tabs>
```

**视觉规格：** tab 按钮底部有 accent 色指示线，切换有滑动动画

### Advanced Components

#### `<claude-code>`

```html
<claude-code language="javascript" line-numbers copyable>
  const greeting = "Hello, Claude!";
  console.log(greeting);
</claude-code>
```

| Prop | Type | Default | 说明 |
|------|------|---------|------|
| `language` | `string` | — | 语言（用于语法高亮类名） |
| `line-numbers` | `boolean` | `false` | 显示行号 |
| `copyable` | `boolean` | `true` | 显示复制按钮 |
| `title` | `string` | — | 代码块标题（如文件名） |

**视觉规格：**
- bg-secondary 背景，radius-md，border
- 顶栏：title + language badge + copy 按钮
- 字体：font-mono，font-size-sm
- 语法高亮：使用 CSS 类实现基础关键字/字符串/注释/数字着色，不引入外部库

#### `<claude-terminal>`

```html
<claude-terminal title="Terminal" typing-speed="50">
  <claude-terminal-line prompt="$">npm install @anthropic-ai/sdk</claude-terminal-line>
  <claude-terminal-line type="output">added 23 packages in 2.1s</claude-terminal-line>
  <claude-terminal-line prompt="$" cursor>_</claude-terminal-line>
</claude-terminal>
```

| Prop | Type | Default | 说明 |
|------|------|---------|------|
| `title` | `string` | `'Terminal'` | 终端标题 |
| `typing-speed` | `number` | `50` | 打字动效速度 (ms/字符) |
| `animated` | `boolean` | `false` | 是否启用打字动效 |

**视觉规格：**
- macOS 风格终端窗口：顶栏有三个圆点（红/黄/绿）+ 标题
- bg-primary 背景，font-mono
- 提示符用 accent 色
- 输出行用 text-secondary

#### `<claude-hero>`

```html
<claude-hero
  title="Build something amazing"
  subtitle="A design system inspired by Claude"
  gradient
>
  <div slot="actions">
    <claude-button size="lg">Get Started</claude-button>
    <claude-button variant="secondary" size="lg">Learn More</claude-button>
  </div>
</claude-hero>
```

| Prop | Type | Default | 说明 |
|------|------|---------|------|
| `title` | `string` | — | 大标题 |
| `subtitle` | `string` | — | 副标题 |
| `gradient` | `boolean` | `true` | 是否显示渐变背景装饰 |
| `align` | `'center' \| 'left'` | `'center'` | 对齐方式 |

**视觉规格：**
- 大尺寸标题 (font-size-3xl, font-weight-bold)
- 可选的径向渐变背景（accent 色到透明）
- 充足的纵向 padding (space-16+)

#### `<claude-glow>`

纯装饰组件——Claude 标志性的橙色渐变光晕。

```html
<claude-glow position="top-right" intensity="medium"></claude-glow>
```

| Prop | Type | Default | 说明 |
|------|------|---------|------|
| `position` | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right' \| 'center'` | `'top-right'` | 光晕位置 |
| `intensity` | `'subtle' \| 'medium' \| 'strong'` | `'medium'` | 强度 |
| `animated` | `boolean` | `false` | 是否有呼吸/脉动动画 |

**视觉规格：** 大尺寸径向渐变，accent 色核心渐变到透明，blur 80-120px

#### `<claude-skeleton>`

```html
<claude-skeleton width="200px" height="20px"></claude-skeleton>
<claude-skeleton variant="circle" size="40px"></claude-skeleton>
```

| Prop | Type | Default | 说明 |
|------|------|---------|------|
| `variant` | `'line' \| 'circle' \| 'rect'` | `'line'` | 形状 |
| `width` | `string` | `'100%'` | 宽度 |
| `height` | `string` | `'16px'` | 高度 |

**视觉规格：** bg-secondary 背景，shimmer 动画（从左到右的光泽扫过效果）

#### `<claude-toast>`

```html
<script>
  // 通过 JS API 调用
  document.querySelector('claude-toaster').show({
    message: 'Saved successfully',
    variant: 'success',
    duration: 3000
  });
</script>
<claude-toaster position="bottom-right"></claude-toaster>
```

**容器组件 `<claude-toaster>`：**

| Prop | Type | Default | 说明 |
|------|------|---------|------|
| `position` | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left'` | `'bottom-right'` | 弹出位置 |
| `max` | `number` | `5` | 最大同时显示数 |

**Toast 配置对象：**

| 字段 | Type | Default | 说明 |
|------|------|---------|------|
| `message` | `string` | — | 消息内容 |
| `variant` | `'default' \| 'success' \| 'warning' \| 'error'` | `'default'` | 类型 |
| `duration` | `number` | `4000` | 自动关闭时间 (ms)，0 = 不自动关闭 |

**视觉规格：** bg-elevated 背景 + 左侧色条，slide-in 进入动画，slide-out 退出动画

## 项目结构

```
frontend-design-system/
├── package.json                 # @even/claude-design-system
├── vite.config.js               # Library mode 构建配置
├── src/
│   ├── index.js                 # 注册所有组件的入口
│   ├── tokens/
│   │   └── tokens.css           # 全部 design tokens（深/浅主题）
│   ├── shared/
│   │   └── base-element.js      # 组件基类，继承 LitElement，注入共享 tokens
│   ├── foundation/
│   │   └── theme-provider.js    # <claude-theme>
│   ├── basic/
│   │   ├── button.js            # <claude-button>
│   │   ├── input.js             # <claude-input>
│   │   ├── textarea.js          # <claude-textarea>
│   │   ├── toggle.js            # <claude-toggle>
│   │   ├── badge.js             # <claude-badge>
│   │   ├── tag.js               # <claude-tag>
│   │   ├── tooltip.js           # <claude-tooltip>
│   │   ├── avatar.js            # <claude-avatar>
│   │   └── icon.js              # <claude-icon>
│   ├── layout/
│   │   ├── card.js              # <claude-card>
│   │   ├── modal.js             # <claude-modal>
│   │   ├── sidebar.js           # <claude-sidebar> + 子组件
│   │   ├── nav.js               # <claude-nav> + 子组件
│   │   ├── divider.js           # <claude-divider>
│   │   └── tabs.js              # <claude-tabs> + <claude-tab>
│   └── advanced/
│       ├── code-block.js        # <claude-code>
│       ├── terminal.js          # <claude-terminal> + 子组件
│       ├── hero.js              # <claude-hero>
│       ├── glow.js              # <claude-glow>
│       ├── skeleton.js          # <claude-skeleton>
│       └── toast.js             # <claude-toaster> + toast
├── docs/
│   └── index.html               # Showcase 文档页
└── dist/                        # 构建产物
    ├── claude-design-system.es.js
    ├── claude-design-system.umd.js
    └── tokens.css
```

## Showcase 文档页

`docs/index.html` — 一个使用本 design system 自身构建的展示页面。

### 页面结构

1. **顶部导航栏** — 项目名 + 版本号 + 深/浅主题切换按钮
2. **Hero 区域** — 用 `<claude-hero>` + `<claude-glow>` 展示
3. **侧边栏导航** — 用 `<claude-sidebar>` 列出所有组件分类
4. **组件展示区** — 每个组件一个 section：
   - 组件名称 + 简短说明
   - Live preview（实际渲染的组件实例，展示所有 variant）
   - 属性表格
5. **Foundation 区域** — 色板网格、字体样本、间距/圆角参考

### 主题切换

Showcase 页面顶部有 toggle 可在深/浅模式间切换，所有组件 preview 实时响应。

## 构建与发布

### package.json 关键字段

```json
{
  "name": "claude-design-system",
  "version": "0.1.0",
  "type": "module",
  "main": "dist/claude-design-system.umd.js",
  "module": "dist/claude-design-system.es.js",
  "exports": {
    ".": {
      "import": "./dist/claude-design-system.es.js",
      "require": "./dist/claude-design-system.umd.js"
    },
    "./tokens.css": "./dist/tokens.css"
  },
  "files": ["dist"],
  "devDependencies": {
    "lit": "^3.0.0",
    "vite": "^6.0.0"
  }
}
```

### Vite 配置

```js
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'ClaudeDesignSystem',
      formats: ['es', 'umd'],
      fileName: (format) => `claude-design-system.${format}.js`
    },
    rollupOptions: {
      // Lit 内联打包，消费者零依赖安装
    }
  }
});
```

### 消费方式

**在任意项目中使用：**

```bash
npm install claude-design-system
```

```html
<!-- HTML 中 -->
<script type="module">
  import 'claude-design-system'
</script>
<link rel="stylesheet" href="node_modules/claude-design-system/dist/tokens.css">

<claude-theme mode="dark">
  <claude-button variant="primary">Hello</claude-button>
</claude-theme>
```

**或者用 CDN / 直接 script：**

```html
<script src="path/to/claude-design-system.umd.js"></script>
<link rel="stylesheet" href="path/to/tokens.css">
```

## 不在 V1 范围内

以下功能有价值但留到后续版本：

- TypeScript 类型定义
- React/Vue wrapper 包
- 完整的无障碍（a11y）合规
- 动画系统的 `prefers-reduced-motion` 响应
- 国际化（RTL 支持）
- 单元测试
- Storybook 集成
- 自动化 visual regression 测试
