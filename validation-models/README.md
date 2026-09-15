# Systemika validation models

These models are permanent regression fixtures for Systemika. They are deliberately small enough to inspect by eye and can also be opened in Systemika as ordinary `.ssd` files.

The set covers constant flows, exponential growth/decay, stock transfer and conservation, auxiliary/constant evaluation, linear and discrete Lookups, `IfThenElse`, multiple flows, goal seeking, nonnegative stocks, Euler/RK4 behavior, and Link polarity annotation.

`manifest.js` contains the corresponding numerical specifications and expected results used by the automated test suite. When engine or file-format behavior changes intentionally, update both the `.ssd` fixture and its manifest entry in the same change.

## 0.8 function-extension fixtures

- `16-programming-functions.ssd` — validates `Smooth`, `Delay`, and `Lag`.
- `17-statistical-functions.ssd` — validates the five supported random distribution functions with a fixed seed.
