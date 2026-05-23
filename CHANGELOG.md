# Changelog

This file documents the notable changes introduced in the v4 release line compared with v3.1.0.

## 4.0.0

### Changed

- Reworked programmatic dialog state management to use `gitart-manage-vue-dialog` under the hood.
- Updated the build and package setup for the current Vue, Vite, TypeScript, Vitest, ESLint, Stylelint, and pnpm toolchain.
- Refreshed the README and installation guidance to better separate standalone component usage from plugin-based dialog management.

### Added

- New composables: `useGDialog()`, `useDialogConfirm()`, and `useDialogReturnData()`.
- Exported `DialogPluginOptions` and typed global `$dialog` support for Vue components.
- Accessibility improvements for `GDialog`, including focus trapping, focus restoration, `initialFocus`, and ARIA labeling props.
- `disableUseCloseOnBack` support to opt out of internal browser history synchronization when `closeOnBack` is managed externally.

### Fixed

- Prevented duplicate `window.location.hash` dialog entries when a `closeOnBack` dialog is mounted in the open state.
- Kept the dialog injection key stable during HMR by switching it to a shared global symbol.
- Improved programmatic dialog bookkeeping, including safer duplicate-id handling and delayed cleanup after close.
