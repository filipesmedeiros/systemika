# Systemika Studio 1.0.0 — First Public Release

**Release date:** 14 September 2026

Systemika Studio 1.0.0 is the first public release of Systemika Studio, an educational System Dynamics modelling and simulation environment designed for teaching and learning stock-and-flow modelling.

## Main modelling and simulation capabilities

- Canonical classroom entities: **Stock, Flow, Link, Auxiliary, Constant, Lookup, and Ghost**.
- Euler and RK4 simulation.
- Multiline equations and a focused educational function library.
- Fixed-time `Lag`, exponential `Smooth` and `Delay`, and supported random distributions with optional per-function seeds.
- Strict, report-only dimensional consistency checking: inconsistencies are reported without silently converting, repairing, or reinterpreting units.
- Link polarity annotations and duplicate directed-Link protection.
- Undo/Redo, cut/copy/paste, colour tools, name rotation, canvas navigation, and classroom-oriented keyboard shortcuts.

## Run management and outputs

- Run, Pause, Advance, and Advance to End workflows.
- Named runs with persistent run storage and multi-run comparison.
- Number Box, Table, Time Plot, XY Plot, and Histogram outputs.
- Comparative Histogram output with common bins and translucent overlays.
- Single-run Histograms use light gray bars with black borders and no point markers.

## Classroom interface refinements

- Systemika-specific Help, Keyboard Shortcuts, Functions & Equations, Unit Checking, Preferences, About, License, and Third-party Notices.
- **Hide/Unhide Question Marks (Q)** toolbar control and keyboard shortcut for missing-definition markers. This is display-only; definition checking and simulation safeguards remain active.
- Focused interface that hides unsupported or advanced legacy features from normal classroom workflows.

## Desktop and source distribution

- Windows installer builder for a per-user Systemika Studio installation.
- Universal macOS builder producing one application for both Apple Silicon (`arm64`) and Intel (`x86_64`) Macs, plus DMG/ZIP outputs and SHA-256 checksums.
- Linux AppImage build and launcher-installation helpers.
- Source-tree WebApp workflow for development and classroom testing.

For full browser project-folder and persistent run-management support, Chrome, Microsoft Edge, or Chromium is recommended.

## Verification baseline

The public 1.0.0 source release contains:

- **233/233 passing automated regression tests** (`npm test`);
- **17 permanent `.ssd` validation models** under `validation-models/`;
- regression coverage for numerical simulation, unit checking, file handling, run management, output comparison, Histograms, toolbar shortcuts, question-mark visibility, desktop launchers, and release-cleanup behavior.

See `VERIFICATION.txt` and `SYSTEMIKA_VALIDATION.md` for details.

## License and provenance

Systemika Studio contains original Systemika code and code derived from StochSD. It is distributed under the **GNU Affero General Public License v3 (AGPLv3)**. See `LICENSE.txt`, `COPYRIGHT.txt`, and `third-party-licenses.md`.

The active Systemika simulation engine and model infrastructure described in the source audit are independently written for Systemika. Historical identifiers and references are retained where required for attribution and `.ssd` file compatibility.
