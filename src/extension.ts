import * as vscode from 'vscode';

// Track maximized state for focus toggle
let isMaximized = false;

export function activate(context: vscode.ExtensionContext) {
  console.log('Tiler is now active!');

  // Register all commands
  const commands = [
    vscode.commands.registerCommand('tiler.split2x1', () => applyLayout(2, 1)),
    vscode.commands.registerCommand('tiler.split2x2', () => applyLayout(2, 2)),
    vscode.commands.registerCommand('tiler.split3x2', () => applyLayout(3, 2)),
    vscode.commands.registerCommand('tiler.split1x3', () => applyLayout(1, 3)),
    vscode.commands.registerCommand('tiler.split3x1', () => applyLayout(3, 1)),
    vscode.commands.registerCommand('tiler.reset', resetLayout),
    vscode.commands.registerCommand('tiler.focusToggle', toggleFocus),
  ];

  context.subscriptions.push(...commands);
}

/**
 * Apply a grid layout with the specified number of columns and rows.
 * Uses vscode.setEditorLayout for proportional sizing that scales with window resize.
 */
async function applyLayout(columns: number, rows: number): Promise<void> {
  // Reset the maximized state when applying a new layout
  isMaximized = false;

  // Close all editors in all groups first to get a clean slate
  await vscode.commands.executeCommand('workbench.action.closeAllEditors');

  // Build the layout structure
  // orientation: 0 = horizontal (columns side by side), 1 = vertical (rows stacked)
  const columnSize = 1 / columns;
  const rowSize = 1 / rows;

  interface LayoutGroup {
    groups?: LayoutGroup[];
    size: number;
  }

  const layout: { orientation: number; groups: LayoutGroup[] } = {
    orientation: 0, // horizontal - columns side by side
    groups: []
  };

  for (let col = 0; col < columns; col++) {
    if (rows === 1) {
      // Single row - just add a group
      layout.groups.push({ size: columnSize });
    } else {
      // Multiple rows - add a column with nested row groups
      const rowGroups: LayoutGroup[] = [];
      for (let row = 0; row < rows; row++) {
        rowGroups.push({ size: rowSize });
      }
      layout.groups.push({
        groups: rowGroups,
        size: columnSize
      });
    }
  }

  await vscode.commands.executeCommand('vscode.setEditorLayout', layout);

  // Focus the first editor group
  await vscode.commands.executeCommand('workbench.action.focusFirstEditorGroup');
  
  vscode.window.showInformationMessage(`Tiler: Applied ${columns}×${rows} layout`);
}

/**
 * Reset to a single editor pane
 */
async function resetLayout(): Promise<void> {
  isMaximized = false;
  
  await vscode.commands.executeCommand('workbench.action.editorLayoutSingle');
  vscode.window.showInformationMessage('Tiler: Reset to single pane');
}

/**
 * Toggle focus mode - maximize current editor or restore previous layout
 */
async function toggleFocus(): Promise<void> {
  if (isMaximized) {
    // Restore - use the built-in toggle
    await vscode.commands.executeCommand('workbench.action.toggleEditorWidths');
    isMaximized = false;
    vscode.window.showInformationMessage('Tiler: Restored layout');
  } else {
    // Maximize current editor
    await vscode.commands.executeCommand('workbench.action.toggleEditorWidths');
    isMaximized = true;
    vscode.window.showInformationMessage('Tiler: Maximized current pane');
  }
}

export function deactivate() {
  // Clean up if needed
}
