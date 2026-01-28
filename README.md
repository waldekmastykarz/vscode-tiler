# Tiler

[![VS Code Marketplace](https://img.shields.io/visual-studio-marketplace/v/waldek.tiler?label=VS%20Code%20Marketplace)](https://marketplace.visualstudio.com/items?itemName=waldek.tiler)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/waldek.tiler)](https://marketplace.visualstudio.com/items?itemName=waldek.tiler)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Run multiple Copilot chats side by side. Or any editor layout you need — instantly.

<!-- TODO: Add GIF demo showing 2x2 layout with Copilot chats -->

## Install

```
ext install waldek.tiler
```

Or search "Tiler" in the VS Code Extensions view (`Cmd+Shift+X`).

## Quick Start

```
Cmd+K 4    →    2×2 grid (perfect for 4 Copilot chats)
Cmd+K 2    →    side by side
Cmd+K 1    →    back to single pane
```

That's it. Muscle memory in 30 seconds.

## All Layouts

| Shortcut | Layout | Use case |
|----------|--------|----------|
| `Cmd+K 1` | Reset | Back to single pane |
| `Cmd+K 2` | 1×2 | Code + preview, or 2 chats |
| `Cmd+K 4` | 2×2 | 4 parallel Copilot agents |
| `Cmd+K 6` | 3×2 | 6 panes for complex comparisons |
| `Cmd+K F` | Focus | Toggle maximize current pane |

**Command Palette only** (for when you need something specific):
- **2×1** — Stacked (2 rows)
- **1×3** — Three columns  
- **3×1** — Three rows

> **Note:** On Windows/Linux, use `Ctrl+K` instead of `Cmd+K`.

## Use Cases

### Parallel Copilot Chats

The killer feature. Run multiple AI agents simultaneously:

1. `Cmd+K 4` for a 2×2 grid
2. Open 4 Copilot chat sessions
3. Drag each to a different pane
4. Ask different questions in parallel
5. Watch your AI army work

### Code Reviews

Side-by-side comparison of implementations:
- Original vs. refactored
- Your code vs. reference implementation
- Multiple related files

### Multi-file Editing

When you're touching several files at once, `Cmd+K 4` keeps them all visible without constant tab switching.

## Contributing

```bash
git clone https://github.com/waldekmastykarz/vscode-tiler.git
cd vscode-tiler
npm install
npm run compile
```

Press `F5` to launch the Extension Development Host.

PRs welcome.

## License

[MIT](LICENSE)
