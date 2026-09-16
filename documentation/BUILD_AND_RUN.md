# Running and building Systemika Studio 1.0.0

## Run directly from this source tree

Requires Node.js.

### Desktop development runtime (Electron)

```sh
npm install --no-audit --no-fund
npm start
```

Convenience launchers:

- Windows: `RUN_SYSTEMIKA_WINDOWS.bat`
- macOS: `RUN_SYSTEMIKA_MACOS.command`
- Linux: `./run-systemika-linux.sh`

### WebApp source-tree testing

Do **not** open `start.html` directly with `file://` when testing local project files or persistent Runs. Systemika embeds the model editor in an iframe, and browser security restrictions limit project-directory access in a local `file://` context.

Run instead:

```sh
npm run web
```

The included local server opens Systemika Studio at `http://localhost:8765/start.html` (or the next free port). It uses only Node's built-in modules and disables HTTP caching for source-tree testing.

Convenience launchers:

- Windows: `RUN_SYSTEMIKA_WEB_WINDOWS.bat`
- macOS: `RUN_SYSTEMIKA_WEB_MACOS.command`
- Linux: `./RUN_SYSTEMIKA_WEB_LINUX.sh`

Use a current Chromium-based browser for full local project-folder and saved-run storage. Firefox and Safari can run Systemika but use the limited browser-storage fallback.

## Run the verification suite

```sh
npm test
```

Release 1.0.0 baseline: **259 tests passing** plus **19 permanent validation models**.

## Build student/public installers

### Windows

Double-click:

`BUILD_WINDOWS_INSTALLER.bat`

See `WINDOWS_INSTALLER.md`.

### macOS

On a Mac, double-click:

`BUILD_MACOS_INSTALLER.command`

The builder creates a Universal `.app`, `.dmg`, and `.zip` for Apple Silicon and Intel Macs. See `MACOS_INSTALLER_GUIDE.md` for the complete lay-user procedure, Gatekeeper notes, and optional Apple Developer ID signing/notarization.

### Linux

```sh
chmod +x BUILD_LINUX_APPIMAGE.sh INSTALL_SYSTEMIKA_LINUX_LAUNCHER.sh
./BUILD_LINUX_APPIMAGE.sh
./INSTALL_SYSTEMIKA_LINUX_LAUNCHER.sh
```

Do not use `sudo` for these commands. See `LINUX_INSTALLATION_GUIDE.md`.

## Manual Electron packaging

Maintainers can also build Electron packages directly from `distribute/`:

```sh
cd distribute
npm install --no-audit --no-fund
npm run dist:win-installer
npm run dist:mac
npm run dist:linux
```

The root-level platform builders and platform guides are the preferred release procedures. The `distribute` project has one npm packaging dependency (`electron-builder` 26.16.1); its staging script uses only Node built-ins. See `BUILD_TOOLCHAIN_SECURITY.md` for the release-toolchain rationale.
