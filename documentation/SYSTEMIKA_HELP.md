# Systemika Classroom Help

## Getting started

1. Set the model time unit, start time, simulation length, DT, solver, and Advance increment from **Time Unit**.
2. Build the model using **Stock, Flow, Link, Auxiliary, Constant, Lookup, and Ghost**.
   Auxiliaries that use `Smooth`, `Delay`, or `Lag` are shown with a **processing/hourglass symbol** so stateful delay-processing elements can be recognized directly on the canvas. If those functions are removed, the normal Auxiliary circle returns.
3. Double-click model entities to enter definitions and units. A Link may carry an optional `+` or `−` polarity annotation.
4. Use **Check Units → Report** to review strict unit inconsistencies. The checker never converts, suggests, or repairs units.
5. Use the dedicated **Output panel** on the right. It shows **Equations** by default. Use **Equations (E), Table (T), Time Plot (P), XY Plot (X), or Histogram (H)** in the top toolbar to switch output views. Plot/Table outputs appear above their settings; Equations uses the full panel. The vertical canvas/output split and the horizontal output/settings split are draggable. The Output panel defaults to about one quarter of the application width and can be **Detached** into a true operating-system window that can be moved to another monitor; choose **Attach** to return it to the main workspace.
6. Use **Run/Pause** for ordinary simulations or **Advance** for stepwise exploration.
7. Save with Save/Save As. The red **Unsaved Changes** indicator is clickable.

Equations may span multiple lines without an escape character. **Enter** inserts a line break, **Tab** moves to the next property field, and **Ctrl+Enter** on Windows/Linux or **Cmd+Enter** on macOS applies the equation. Double-clicking a model entity opens its properties with the cursor in **Name** first. The **Comment** field is for documentation only and does not affect simulation behavior.

Flow definitions may evaluate to positive or negative values. Systemika does not impose bounds on Flow rates; a negative stock-to-stock Flow reverses the effective transfer direction.

## Core shortcuts

| Action | Shortcut |
|---|---|
| Open | Ctrl/Cmd+O |
| Save | Ctrl/Cmd+S |
| Save As | Ctrl/Cmd+Shift+S |
| Undo / Redo | Ctrl/Cmd+Z / Ctrl/Cmd+Y |
| Cut / Copy / Paste | Ctrl/Cmd+X / C / V |

When exactly one rendered Figure is selected, **Copy** (toolbar or Ctrl/Cmd+C) also places a high-resolution transparent PNG of that Figure on the operating-system clipboard, while retaining Systemika's normal internal model-object copy for Paste. **Cut** (toolbar or Ctrl/Cmd+X) copies the same Figure image to the operating-system clipboard before removing the Figure from the model, so it can be pasted directly into Word, PowerPoint, presentation software, or an image editor.
| Clear outputs | Ctrl/Cmd+0 |
| Run / Pause | Ctrl/Cmd+1 |
| Advance | Ctrl/Cmd+2 |
| Advance to End | Ctrl/Cmd+3 |
| Stock / Flow / Auxiliary / Constant | S / F / A / C |
| Link | L |
| Lookup / Ghost | K / G |
| Hide / unhide definition question marks | Q |
| Table | T |
| Time Plot / XY Plot / Histogram | P / X / H |
| Rotate entity name | R |
| Apply multiline equation | Ctrl/Cmd+Enter |

When exactly one Link is selected, **L** opens Link Properties instead of starting a new Link.

## Functions and equations

The live function list in the Equation Editor is generated from the same supported-function catalog used by Systemika help. Systemika model-entity references use bare names such as `Population` or `BirthRate`; square-bracket references such as `[Population]` are accepted only for backward compatibility with older `.ssd` files. See `SYSTEMIKA_FUNCTIONS.md` for the full function reference.

## Unit checking

Systemika uses strict, reporting-only unit checking:

- symbols are literal and case-sensitive (`USD` ≠ `$`, `Person` ≠ `People`);
- algebraically equivalent unit expressions are recognized (`Person/Year = Person*Year^-1`);
- no unit conversion or synonym matching is performed;
- missing information is reported as **Could not verify**;
- `Unitless` is the explicit dimensionless unit.

See `SYSTEMIKA_UNITS.md` for the full specification.



## Table and Histogram display options

Table formatting is set **per displayed model entity**. In Table Properties, the **Added Model Entities** list includes an editable **Decimal** column; enter a non-negative integer to choose the decimal places for that variable independently of the others. The former global Precision/Decimal selector has been removed. Older Tables use their stored legacy decimal value as the initial default for variables that do not yet have a per-entity setting.

Histogram output is always the standard **Histogram** (bin counts). The former **Select Scaling Type** / Probability Density Function option has been removed so Histogram Figures use one consistent classroom representation.

## Output workspace

Systemika keeps model structure and output inspection separate. The modeling canvas remains on the left; equations, plots, and tables are shown in the right-hand **Output panel**. Equations are the default view. Use the dedicated output toolbar tools (or their shortcuts) to navigate: **E** Equations, **T** Table, **P** Time Plot, **X** XY Plot, and **H** Histogram. There is no separate output-selector dropdown or New button. Plot/Table views place the output above its settings; the Equations view occupies the full panel and has no lower settings pane. Drag the vertical divider to change the canvas/output widths and the horizontal divider to change output/settings heights. **Detach** opens the live Output panel in a separate operating-system window that can be moved across displays; **Attach** returns it to the right side.

Output and variable/run selectors use fixed-height scrollable lists so large models and large run libraries do not expand the settings pane indefinitely. Runs to compare and Display order show about three runs at once; variable lists show about five variables at once.

Typing in Run Name or Manage Runs never triggers single-letter modeling/output shortcuts. In the toolbar **Run Name** field, press **Enter**, **Ctrl/Cmd+1**, or **Ctrl/Cmd+R** to run/pause without first moving focus back to the canvas.

## Paged Figures

Time Plot, comparison Time Plot, XY Plot, and Histogram Figures support multiple pages. Use the compact controls at the bottom-right of a Figure: **‹ / ›** to move between pages, **+** to add a page, **−** to delete the current page, and **⚙ Settings** to open the Figure properties. The + and − controls use the same font and size. The last remaining page cannot be deleted; the − control is dimmed to make its inactive state clear. Page management is intentionally kept on the Figure itself rather than duplicated in Figure Properties.

Each page keeps its own selected model entities, run selections, axis settings, labels, and other plot options. Time Plot and comparison Time Plot pages also keep independent **per-entity line styles**. All newly added plotted entities default to a solid line of width 2; select an item under **Selected Variable(s)** and use the single **Dash Type** and **Line Width** controls to customize that entity. XY plots use a fixed **Thick** line width. Plot Period is automatic and no longer exposed as a Figure property. Figure position and size are shared across all pages. Existing models without page data are treated as a one-page Figure.

All graph property dialogs provide **Export SVG** and **Export PNG** controls. PNG export is rasterized at 3× the on-screen logical resolution for sharper text and lines, with transparent edge padding so legends are not clipped. Exports use a transparent background and omit Figure page-navigation controls/page numbers. Plot legends are separated from the plotting area by a visible blank margin and reproduce each series dash pattern and line width. In XY plots, **Show Number** repeats the run/series number along each curve; the number of labels adapts to the rendered curve length, and the same number is used in the legend. Figure page navigation is positioned at the bottom-right corner.

## Equations

Choose the **Equations (E)** toolbar tool to open the equation documentation panel in the Output workspace. The panel can present stock equations in three equivalent teaching forms:

- **Integral equations** — stock state written as `Stock(t) = Stock(t0) +` the integral of net flow;
- **Differential equations** — stock derivative equals inflows minus outflows;
- **Difference equations** — the standard DT stock-update equation.

For stocks, all three equation forms use a dedicated **Initial Condition** field such as `Stock(t0) = 100`. Integral equations reference `Stock(t0)` directly rather than substituting the bare initial value. Top-level `Smooth`, `Delay`, and `Lag` definitions are documented the same way: their initial-value argument is represented by `Entity(t0)` in the Equation column and the actual initialization appears in **Initial Condition**. This keeps the formats consistent and keeps CSV rows single-line and readable.

Equations can be sorted by **Variable type** (Stock, Flow, Auxiliary, Constant, Lookup), **Variable name**, or **Order of computation**. Computation order treats stock state values as available at the beginning of a simulation step and then orders algebraic equations by their dependencies.

The selected equation view can be printed, exported as a plain-text list of equations (`.txt`), exported as a CSV table containing order, type, name, equation, initial condition, units, and comment, or exported as a standalone LaTeX (`.tex`) document. The **Comment** field from each model entity is included as the last documentation column. When the model uses RK4, the difference-equation view is a structural teaching representation; RK4 still evaluates rates at intermediate points internally.


### Plot and Table settings

Plot properties are opened with the **⚙ Settings** button at the bottom-right of each Figure rather than by double-clicking the graph. Tables also provide a dedicated floating **⚙ Settings** button, avoiding unreliable double-click behavior on scrollable output surfaces.

In multi-run plot dialogs, **Runs to compare** includes a **Display order** list with up/down controls. This order is saved with the Figure and determines the order in which runs/series are drawn and listed in the legend.
