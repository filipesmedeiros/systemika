'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const editor = fs.readFileSync(path.join(root, 'OpenSystemDynamics/src/editor.js'), 'utf8');
const index = fs.readFileSync(path.join(root, 'OpenSystemDynamics/src/index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'OpenSystemDynamics/src/style/editor.css'), 'utf8');

function between(source, startText, endText) {
  const start = source.indexOf(startText);
  assert.notEqual(start, -1, `missing ${startText}`);
  const end = source.indexOf(endText, start + startText.length);
  return source.slice(start, end === -1 ? source.length : end);
}

test('Manage Runs no longer exposes Duplicate and toolbar uses Run Name capitalization', () => {
  const manager = between(editor, 'class SystemikaRunsManagerDialog', 'class YesNoCancelDialog');
  assert.doesNotMatch(manager, /"Duplicate"\s*:/);
  assert.match(manager, /"Rename"\s*:/);
  assert.match(manager, /"Delete All"\s*:/);
  assert.match(index, /<label for="systemika-run-name">Run Name<\/label>/);
});

test('Runs to compare exposes persistent user-controlled display ordering', () => {
  const compare = between(editor, 'class CompareRunsSelectorComponent', 'class RunSelectorComponent');
  assert.match(compare, /Display order/);
  assert.match(compare, /systemika-run-order-up/);
  assert.match(compare, /systemika-run-order-down/);
  assert.match(compare, /moveRun\(index, delta\)/);
  assert.match(compare, /setCompareRunNames\(this\.primitive, names\)/);
  assert.match(compare, /return this\.syncOrderWithChecked\(\)/);
});

test('plot and Table selectors consistently use Selected Variable(s)', () => {
  const generic = between(editor, 'class PrimitiveSelectorComponent', 'class LineOptionsComponent');
  const time = between(editor, 'class TimePlotSelectorComponent', 'class GraphExportComponent');
  const xy = between(editor, 'class XySelectorComponent', 'class XyPlotDialog');
  const table = between(editor, 'class TableSelectorComponent', 'class TableData');
  assert.match(generic, /Selected Variable\(s\)/);
  assert.match(time, /Selected Variable\(s\)/);
  assert.match(xy, /Selected Variable\(s\)/);
  assert.match(table, /Selected Variable\(s\)/);
});

test('plots use plus/minus page controls without a redundant settings button', () => {
  const plot = between(editor, 'class PlotVisual', 'class TimePlotVisual');
  assert.match(plot, /class="plot-page-add"[^>]*>\+<\/button>/);
  assert.match(plot, /class="plot-page-delete"[^>]*>−<\/button>/);
  assert.doesNotMatch(plot, /plot-settings-button/);
  assert.match(plot, /\.off\("dblclick contextmenu"\)/);
  assert.match(css, /\.plot-page-add,[\s\S]*\.plot-page-delete[\s\S]*font-size:\s*18px/);
});

test('Table uses a dedicated settings button instead of double-clicking', () => {
  const table = between(editor, 'class TableVisual', 'class HtmlOverlayTwoPointer');
  assert.match(table, /className = "table-settings-button"/);
  assert.match(table, /textContent = "⚙"/);
  assert.match(table, /this\.dialog\.show\(\)/);
  assert.doesNotMatch(table, /cutDiv\)\.dblclick/);
  assert.match(css, /\.table-settings-button\s*\{/);
});
