# Systemika Studio 1.0.0 Validation Baseline

Date: 2026-09-13

## Purpose

Systemika Studio 1.0.0 retains the permanent regression baseline established during development and extends it through the final Histogram and release-readiness work. The validation set does not attempt to reproduce every possible system dynamics model; it covers the deliberately focused feature set Systemika currently supports.


## Current release result

Systemika Studio 1.0.0 has **17 permanent validation models** and **233/233 passing automated regression tests**. The milestone notes below are retained as a development history of how that baseline grew.

## Permanent validation models

The `validation-models/` directory contains 17 ordinary `.ssd` files:

1. Constant Inflow
2. Constant Outflow
3. Exponential Growth — Euler
4. Exponential Growth — RK4
5. Exponential Decay
6. Two-Stock Transfer
7. Auxiliary Chain
8. Constant Parameter
9. Linear Lookup
10. IfThenElse
11. Multiple Inflows and Outflows
12. Goal Seeking
13. Discrete Lookup
14. Nonnegative Stock
15. Link Polarity Annotation
16. Smooth, Delay, and fixed-time Lag
17. Statistical Functions

`validation-models/manifest.js` stores the corresponding numerical specifications and expected values used by the automated tests.

## File robustness checks

Automated tests verify that:

- non-Systemika XML is rejected before editor synchronization;
- malformed model roots are rejected;
- missing simulation settings are repaired from current defaults;
- incomplete Links are not written to `.ssd`;
- a Ghost whose source was deleted does not crash saving;
- all seven canonical entity types preserve their critical save attributes;
- Link polarity, Lookup data, Ghost source, Flow endpoints, and simulation settings are serialized.

## Numerical robustness checks

Automated tests verify analytical or known results for the permanent models, including conservation in a two-stock transfer. The engine also provides explicit errors for division/modulo by zero and rejects settings requiring more than 2,000,000 integration steps.

## Automated result

The 0.7 baseline began with 15 fixtures. The 0.8 programming/statistical function extension adds two more fixtures, for **17 permanent validation models** total. Milestone 0.8.2 updated those fixtures for fixed-time `Lag` semantics and optional per-function random seeds. Milestone 0.8.4 adds regression coverage for multiline nested `IfThenElse` equations and the corrected function-help/editor key behavior. Milestone 0.8.5 adds regression coverage that optional random seeds appear in click-to-insert templates as well as hover help. The complete regression suite for 0.8.5 is **185/185 passing**.

## 0.9.0 strict unit-check validation

Milestone 0.9.0 adds 19 dedicated unit-check regression tests. They cover strict/case-sensitive symbols, algebraic equivalence, invalid unit syntax, constants with declared units, arithmetic and powers, Stock–Flow/time consistency, missing-unit reporting, `IfThenElse`, the complete supported mathematical-function family, `Smooth`, `Delay`, `Lag`, all five statistical distributions, seed units, and the read-only Check Units report UI.

No conversion or synonym cases are accepted: tests explicitly verify that `USD != $`, `Person != People`, and `Year != Month`.

The complete regression suite for 0.9.0 is **204/204 passing**. The permanent numerical `.ssd` validation fixture count remains **17**.
## 0.9.1 classroom-usability regression coverage

Milestone 0.9.1 adds focused regression coverage for the actionable Unsaved Changes control, duplicate directed-Link rejection (including copy/paste), selected-entity stacking above plot overlays, Save As and Rotate Name shortcuts, plot defaults, Text Box copy semantics, silent Advance-mode Simulation Settings, and time-unit x-axis labels. The complete automated suite for 0.9.1 is **212/212 passing**.
## 0.9.2 release-readiness cleanup coverage

Milestone 0.9.2 adds regression checks for the Systemika-specific Help menu, removal of obsolete hidden plugin/help material, restored Histogram toolbar access and `H` shortcut, cleaned Preferences terminology, current AGPL/About text, and a third-party notice screen limited to bundled libraries. The complete automated suite for 0.9.2 is **219/219 passing**.


## 0.9.4 comparative-Histogram regression coverage

Milestone 0.9.4 adds regression checks that Histogram uses the shared **Runs to compare** selector, stores `RunNames`, uses one common set of bin boundaries across all selected runs, draws overlapping distributions with translucent fills and outlines, and participates in the shared run rename/delete/new-run lifecycle. Milestone 0.9.5 additionally verifies current-run fallback and suppresses jqPlot point markers on Histogram bars. Milestone 0.9.6 removed single-run alpha processing, but the one-run chart could still fail because the comparative renderer also introduced jqPlot `fillAndStroke` settings. Milestone 0.9.7 reproduces that jqPlot 1.0.8 draw-time failure directly and restores the proven pre-comparison `step + fill` renderer for exactly one run, with `showMarker: false`. The comparative `fillAndStroke`/transparent renderer is now used only for two or more runs. The complete automated suite for 0.9.7 is **229/229 passing**.

Milestone 0.9.8 reproduces the remaining one-run failure in a real browser: jqPlot 1.0.8 aborts after drawing only the title/frame when a hidden legend is still assigned `outsideGrid` placement. Histogram now requests outside-grid placement only for actual multi-run comparisons. A dedicated regression prevents this configuration from returning. The complete automated suite for 0.9.8 is **230/230 passing**.

Milestone 0.9.9 adds a visual-regression source check for the single-run Histogram style: light gray fill, black bin borders, no markers, and no reintroduction of jqPlot one-series `fillAndStroke`. The comparative renderer is unchanged. The complete automated suite for 0.9.9 is **231/231 passing**.


## 1.0.0 final-release regression coverage

The final pre-release pass adds regression coverage for the **Hide/Unhide Question Marks (Q)** display toggle. Tests verify both the toolbar/shortcut wiring and the display-only behavior: missing-definition markers may be hidden, while definition checking and simulation safeguards remain active. The complete first-public-release suite is **233/233 passing**.
