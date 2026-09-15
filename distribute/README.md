# Systemika Studio packaging tools

This directory contains the build configuration used to assemble Systemika Studio desktop and web distributions.

For most users, use the platform-specific builders in the source-package root:

- Windows: `BUILD_WINDOWS_INSTALLER.bat`
- macOS: `BUILD_MACOS_INSTALLER.command`
- Linux: `BUILD_LINUX_APPIMAGE.sh`

## Manual Electron packaging

From this directory:

```sh
npm install --no-audit --no-fund
npm run dist:win-installer
npm run dist:mac
npm run dist:linux
```

Outputs are written under `output/dist-electron/`.

`npm run build` also assembles the unbundled desktop payload under `output/app/` and the web payload under `output/web/<Systemika-version>/`.

The public application version is taken from `OpenSystemDynamics/src/version.js` (`systemika.version`). The historical StochSD version in that file is retained only for lineage/compatibility information.
