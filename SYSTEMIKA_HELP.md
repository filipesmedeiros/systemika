# Systemika Classroom Help

## Getting started

1. Set the model time unit, start time, simulation length, DT, solver, and Advance increment from **Time Unit**.
2. Build the model using **Stock, Flow, Link, Auxiliary, Constant, Lookup, and Ghost**.
3. Double-click model entities to enter definitions and units. A Link may carry an optional `+` or `−` polarity annotation.
4. Use **Check Units → Report** to review strict unit inconsistencies. The checker never converts, suggests, or repairs units.
5. Add outputs using **Number Box, Table, Time Plot, XY Plot, or Histogram**. Time Plot, XY Plot, Histogram, and Table can compare selected named runs.
6. Use **Run/Pause** for ordinary simulations or **Advance** for stepwise exploration.
7. Save with Save/Save As. The red **Unsaved Changes** indicator is clickable.

Equations may span multiple lines. Use **Ctrl+Enter** on Windows/Linux or **Cmd+Enter** on macOS to apply a multiline equation.

## Core shortcuts

| Action | Shortcut |
|---|---|
| Open | Ctrl/Cmd+O |
| Save | Ctrl/Cmd+S |
| Save As | Ctrl/Cmd+Shift+S |
| Undo / Redo | Ctrl/Cmd+Z / Ctrl/Cmd+Y |
| Cut / Copy / Paste | Ctrl/Cmd+X / C / V |
| Clear outputs | Ctrl/Cmd+0 |
| Run / Pause | Ctrl/Cmd+1 |
| Advance | Ctrl/Cmd+2 |
| Advance to End | Ctrl/Cmd+3 |
| Stock / Flow / Auxiliary / Constant | S / F / A / C |
| Link | L |
| Lookup / Ghost | K / G |
| Hide / unhide definition question marks | Q |
| Number Box / Table | N / T |
| Time Plot / XY Plot / Histogram | P / X / H |
| Rotate entity name | R |
| Apply multiline equation | Ctrl/Cmd+Enter |

When exactly one Link is selected, **L** opens Link Properties instead of starting a new Link.

## Functions and equations

The live function list in the Equation Editor is generated from the same supported-function catalog used by Systemika help. Model entity references use square brackets, such as `[Population]`. See `SYSTEMIKA_FUNCTIONS.md` for the full function reference.

## Unit checking

Systemika uses strict, reporting-only unit checking:

- symbols are literal and case-sensitive (`USD` ≠ `$`, `Person` ≠ `People`);
- algebraically equivalent unit expressions are recognized (`Person/Year = Person*Year^-1`);
- no unit conversion or synonym matching is performed;
- missing information is reported as **Could not verify**;
- `Unitless` is the explicit dimensionless unit.

See `SYSTEMIKA_UNITS.md` for the full specification.
