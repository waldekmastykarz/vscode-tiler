# Changelog

All notable changes to Tiler will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.1] - 2026-01-30

### Changed

- Improved layout algorithm for more reliable pane creation

## [0.2.0] - 2026-01-28

### Changed

- Simplified layout commands: removed redundant 1×2 layout, 2×1 now creates side-by-side columns
- Refactored command registration for cleaner codebase

## [0.1.0] - 2026-01-28

### Added

- Grid layout commands: 1×2, 2×1, 2×2, 3×2, 1×3, 3×1
- Reset to single pane command
- Focus toggle (maximize/restore current pane)
- Keyboard shortcuts for common layouts:
  - `Cmd+K 2` / `Ctrl+K 2` — Side by side (1×2)
  - `Cmd+K 4` / `Ctrl+K 4` — 2×2 grid
  - `Cmd+K 6` / `Ctrl+K 6` — 3×2 grid
  - `Cmd+K 1` / `Ctrl+K 1` — Reset to single pane
  - `Cmd+K F` / `Ctrl+K F` — Toggle focus
