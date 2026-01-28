# Tiler - VS Code Extension

VS Code extension for quick editor pane grid layouts. Targets VS Code 1.85+.

## Architecture

Single-file extension in [src/extension.ts](../src/extension.ts). All layout logic lives there:
- Commands registered in `activate()` via `vscode.commands.registerCommand`
- Layout commands delegate to `applyLayout(rows, columns)`
- Focus toggle uses module-level `isMaximized` state

## Key Pattern: Async Layout Manipulation

VS Code's editor group APIs require timing delays between operations. The extension uses a `sleep()` helper between sequential commands:

```typescript
await vscode.commands.executeCommand('workbench.action.splitEditorRight');
await sleep(30);  // Let VS Code settle before next operation
```

When adding new layouts, follow this pattern: reset → create columns → split rows → focus first group.

## Commands

All commands prefixed with `tiler.` and defined in both:
- [package.json](../package.json) `contributes.commands` — declares command IDs and titles
- [src/extension.ts](../src/extension.ts) — implements handlers

When adding commands, update both files and add keybindings if shortcut-worthy.

## Development

```bash
npm run compile    # Build once
npm run watch      # Watch mode (or use default build task)
npm run lint       # ESLint
```

**Debug:** Press F5 to launch Extension Development Host.

## Code Style

- TypeScript strict mode enabled
- Async/await for all VS Code command execution
- Show user feedback via `vscode.window.showInformationMessage` after layout changes
