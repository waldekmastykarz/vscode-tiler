import * as vscode from 'vscode';

// Track maximized state for focus toggle
let isMaximized = false;

export function activate(context: vscode.ExtensionContext) {
  console.log('Tiler is now active!');

  // Register all commands
  const commands = [
    vscode.commands.registerCommand('tiler.split1x2', () => applyLayout(1, 2)),
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
 * The layout is created by:
 * 1. First closing all editor groups to start fresh
 * 2. Creating the column structure
 * 3. Splitting each column into rows
 */
async function applyLayout(columns: number, rows: number): Promise<void> {
  // Reset the maximized state when applying a new layout
  isMaximized = false;

  // Close all editors in all groups first to get a clean slate
  await vscode.commands.executeCommand('workbench.action.closeAllEditors');
  
  // Reset to single editor group
  await vscode.commands.executeCommand('workbench.action.editorLayoutSingle');
  
  // Small delay to let VS Code settle
  await sleep(50);

  // Create columns first
  for (let col = 1; col < columns; col++) {
    await vscode.commands.executeCommand('workbench.action.splitEditorRight');
    await sleep(30);
  }

  // Now for each column, create the rows
  // We need to navigate to each column and split it vertically
  if (rows > 1) {
    // Move to the first (leftmost) editor group
    await vscode.commands.executeCommand('workbench.action.focusFirstEditorGroup');
    await sleep(30);

    for (let col = 0; col < columns; col++) {
      // Split this column into rows
      for (let row = 1; row < rows; row++) {
        await vscode.commands.executeCommand('workbench.action.splitEditorDown');
        await sleep(30);
      }

      // Move to the next column (if not the last one)
      if (col < columns - 1) {
        // Navigate to the top of the next column
        await vscode.commands.executeCommand('workbench.action.focusFirstEditorGroup');
        await sleep(30);
        // Move right to the next column base
        for (let i = 0; i <= col + 1; i++) {
          await vscode.commands.executeCommand('workbench.action.focusRightGroup');
          await sleep(20);
        }
      }
    }
  }

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

/**
 * Helper function for timing delays
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function deactivate() {
  // Clean up if needed
}
