# Systemika Studio 1.0.0

Systemika Studio is educational System Dynamics software designed for learning and teaching stock-and-flow modelling. Its classroom interface uses the canonical model entities **Stock, Flow, Link, Auxiliary, Constant, Lookup, and Ghost**.

## Release status

Version **1.0.0** is the **first public release** of Systemika Studio. The source package includes the independently written Systemika simulation engine, the desktop/web interfaces, platform build helpers, 17 permanent validation models, and an automated regression suite with **233 tests**.

The 1.0.0 release includes the finalized comparative Histogram implementation. A single-run Histogram uses light gray bars with black borders and no point markers; multiple selected runs use common bins and translucent overlays with an external run legend. It also includes the **Hide/Unhide Question Marks (Q)** display toggle for missing-definition markers.

## Main capabilities

- Euler and RK4 simulation.
- Multiline equations and a focused educational function library.
- Fixed-time `Lag`, exponential `Smooth` and `Delay`, and supported random distributions with optional per-function seeds.
- Strict, report-only dimensional consistency checking. Systemika reports inconsistencies but does not silently convert, repair, or reinterpret units.
- Run, Pause, Advance, Advance to End, named runs, and multi-run comparison outputs.
- Number Box, Table, Time Plot, XY Plot, and comparative Histogram outputs.
- Link polarity annotations, Ghosts, Lookups, Undo/Redo, copy/paste, and classroom-oriented keyboard shortcuts.
- Systemika-specific Help, keyboard-shortcut, functions, units, preferences, licensing, and third-party notices.

## Verification

From the source root, run:

```sh
npm test
```

The current release baseline is **233/233 passing tests** plus **17 permanent `.ssd` validation models** under `validation-models/`.

See `VERIFICATION.txt` for the release verification summary.

## Running from source

Requires Node.js.

```sh
npm install --no-audit --no-fund
npm start
```

Convenience launchers are included for Windows, macOS, and Linux. See `BUILD_AND_RUN.md`.

For source-tree WebApp testing, use `npm run web` or the corresponding `RUN_SYSTEMIKA_WEB_*` launcher rather than opening `start.html` directly with `file://`.

## Building installers

- **Windows:** double-click `BUILD_WINDOWS_INSTALLER.bat`. See `WINDOWS_INSTALLER.md`.
- **macOS:** double-click `BUILD_MACOS_INSTALLER.command` on a Mac after installing the two documented build prerequisites. See `MACOS_INSTALLER_GUIDE.md`.
- **Linux:** use `BUILD_LINUX_APPIMAGE.sh`, then `INSTALL_SYSTEMIKA_LINUX_LAUNCHER.sh`. See `LINUX_INSTALLATION_GUIDE.md`.

The macOS builder creates a Universal application for both Apple Silicon and Intel Macs and packages it in a `.dmg` disk image.

## Reference documentation

- `SYSTEMIKA_HELP.md` — classroom help/reference summary
- `SYSTEMIKA_ENGINE.md` — simulation-engine behavior
- `SYSTEMIKA_FUNCTIONS.md` — supported function reference
- `SYSTEMIKA_UNITS.md` — strict unit-checking specification
- `SYSTEMIKA_RUNS.md` — run-management behavior
- `SYSTEMIKA_VALIDATION.md` — validation models and regression baseline
- `SYSTEMIKA_INDEPENDENCE.md` — Systemika code-independence summary
- `SYSTEMIKA_SOURCE_AUDIT.md` — source audit
- `CHANGELOG.md` — development history

## Browser note

For full browser-based project-folder and saved-run management, use a current Chromium-based browser such as Google Chrome, Microsoft Edge, or Chromium. Firefox and Safari can run Systemika but fall back to limited browser storage because they do not expose the directory-access APIs used by Systemika's shared `.ssd` + `Runs/*.sysrun` project layout.

## License and provenance

Systemika Studio contains original Systemika code and code derived from StochSD. It is distributed under the **GNU Affero General Public License v3 (AGPLv3)**. See `LICENSE.txt`, `COPYRIGHT.txt`, and `third-party-licenses.md`.

Systemika Studio was developed from the open-source StochSD codebase. The current simulation engine and model infrastructure replaced during the Systemika independence work are independently written for Systemika. Historical `.ssd` storage identifiers are retained where needed for file compatibility.
