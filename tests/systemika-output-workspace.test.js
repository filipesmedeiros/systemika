const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'OpenSystemDynamics', 'src', 'index.html'), 'utf8');
const editor = fs.readFileSync(path.join(root, 'OpenSystemDynamics', 'src', 'editor.js'), 'utf8');
const runs = fs.readFileSync(path.join(root, 'OpenSystemDynamics', 'src', 'systemika-run-manager.js'), 'utf8');
const css = fs.readFileSync(path.join(root, 'OpenSystemDynamics', 'src', 'style', 'editor.css'), 'utf8');
const main = fs.readFileSync(path.join(root, 'electron', 'main.js'), 'utf8');

test('text entry is isolated from single-key modeling/output shortcuts', () => {
  assert.match(editor, /\/\^\(INPUT\|TEXTAREA\|SELECT\)\$\/[\s\S]{0,260}if \(editableTarget\) return;/);
  assert.match(editor, /this\.nameInput\.on\("keydown keyup keypress", event => event\.stopPropagation\(\)\)/);
  assert.doesNotMatch(editor, /n: "numberbox"/);
  assert.doesNotMatch(html, /id="btn_numberbox"/);
});

test('Run Name accepts Enter and run shortcuts without leaving the field', () => {
  assert.match(runs, /event\.key === 'Enter' \|\| runShortcut/);
  assert.match(runs, /key === '1' \|\| key === 'r'/);
  assert.match(runs, /root\.systemikaRunModel\(\)/);
  assert.match(editor, /window\.systemikaRunModel = \(\) => RunTool\.enterTool\(\)/);
});

test('output and run/variable selectors have fixed scrollable compact heights', () => {
  assert.match(css, /\.systemika-compare-run-options,[\s\S]{0,120}\.systemika-compare-run-order[\s\S]{0,220}height:\s*78px\s*!important[\s\S]{0,180}overflow-y:\s*auto\s*!important/);
  assert.match(css, /\.included-list-div,[\s\S]{0,100}\.excluded-list-div[\s\S]{0,220}height:\s*145px\s*!important[\s\S]{0,180}overflow-y:\s*auto\s*!important/);
});

test('workspace is a 75/25 modeling-output split with toolbar-only output navigation', () => {
  assert.match(html, /class="workspace-row"[\s\S]*id="svgplanebackground"[\s\S]*id="systemika-output-splitter"[\s\S]*id="systemika-output-panel"/);
  assert.match(html, /id="systemika-output-view"[\s\S]*id="systemika-output-horizontal-splitter"[\s\S]*id="systemika-output-settings"/);
  assert.match(html, /id="systemika-output-title">Equations/);
  assert.match(html, /id="systemika-output-detach"[\s\S]*graphics\/unlink\.svg[\s\S]*<span>Detach<\/span>/);
  assert.doesNotMatch(html, /systemika-output-selector|systemika-output-new|systemika-output-equations/);
  assert.match(html, /id="btn_equations"[^>]*data-title="Equations \(E\)"[\s\S]*graphics\/equations\.svg/);
  assert.match(css, /\.systemika-output-panel\s*\{[\s\S]*flex:\s*0 0 25%[\s\S]*min-width:\s*300px/);
  assert.match(editor, /const SystemikaOutputDock = \{/);
  assert.match(editor, /showEquations\(\)[\s\S]{0,1800}equationList\.renderPanelHtml\(\)/);
  assert.match(editor, /SystemikaOutputDock\.openType\(\$\(this\)\.attr\("data-tool"\)\)/);
  assert.match(editor, /\["e", "p", "t", "x", "h"\]/);
});

test('Auxiliary and Equations toolbar tools use distinct icons', () => {
  assert.match(html, /id="btn_equations"[\s\S]{0,180}graphics\/equations\.svg/);
  assert.match(html, /id="btn_variable"[\s\S]{0,180}graphics\/variable\.svg/);
  assert.notEqual(
    fs.readFileSync(path.join(root, 'OpenSystemDynamics', 'src', 'graphics', 'equations.svg'), 'utf8'),
    fs.readFileSync(path.join(root, 'OpenSystemDynamics', 'src', 'graphics', 'variable.svg'), 'utf8')
  );
});

test('Equations reset plot/table split sizing and output settings default to 60 percent', () => {
  assert.match(editor, /showEquations\(\)[\s\S]{0,900}view\.style\.removeProperty\("flex"\)/);
  assert.match(editor, /showEquations\(\)[\s\S]{0,1000}settings\.style\.removeProperty\("flex"\)/);
  assert.match(editor, /activateVisual\(visual\)[\s\S]{0,1000}view\.style\.flex = this\._visualViewFlex \|\| "0 0 40%"/);
  assert.match(editor, /settings\.style\.flex = "1 1 60%"/);
  assert.match(css, /\.systemika-output-view\s*\{[\s\S]{0,120}flex:\s*0 0 40%/);
  assert.match(css, /\.systemika-output-settings\s*\{[\s\S]{0,120}flex:\s*1 1 60%/);
  assert.match(css, /systemika-output-equations-mode \.systemika-output-view[\s\S]{0,120}flex:\s*1 1 auto !important/);
});

test('Detach opens a true external window and Attach returns the live panel', () => {
  assert.match(editor, /window\.open\("about:blank", "SystemikaOutputWindow"/);
  assert.match(editor, /host\.appendChild\(panel\)/);
  assert.match(editor, /attachExternalWindow\(fromWindowClose = false\)/);
  assert.match(editor, /label\.textContent = this\._detached \? "Attach" : "Detach"/);
  assert.match(main, /setWindowOpenHandler/);
  assert.match(main, /frameName === "SystemikaOutputWindow"/);
  assert.match(main, /parent:\s*null/);
  assert.match(css, /\.systemika-output-panel\.systemika-output-external/);
});

test('Equations have no lower settings pane and use a compact top summary', () => {
  assert.match(css, /systemika-output-equations-mode \.systemika-output-horizontal-splitter,[\s\S]*systemika-output-settings[\s\S]*display:\s*none/);
  assert.match(editor, /equation-document-summary/);
  assert.match(editor, /equation-entity-count/);
  assert.match(editor, /equation-document-table/);
  assert.doesNotMatch(editor, /documentation-print/);
});

test('active plot/table settings are mounted below the output and both dividers are draggable', () => {
  assert.match(editor, /mountInDock\(container\)[\s\S]{0,800}systemika-dock-apply/);
  assert.match(editor, /SystemikaOutputDock\.activateVisual\(visual\)/);
  assert.match(editor, /startVerticalResize[\s\S]{0,900}panel\.style\.flexBasis/);
  assert.match(editor, /systemika-output-horizontal-splitter[\s\S]{0,2600}view\.style\.flex/);
});


test('dialogs close on Escape even when focused text controls stop propagation', () => {
  assert.match(editor, /this\.dialogDiv\.addEventListener\("keydown"[\s\S]{0,300}event\.key === "Escape"[\s\S]{0,220}dialog\("close"\)/);
});

test('Table settings and loading state expose the selected variables', () => {
  assert.match(editor, /class TableSelectorComponent[\s\S]{0,900}<th>Selected Variable\(s\)<\/th>/);
  assert.match(editor, /<b>Selected Variable\(s\):<\/b> \${selected}/);
  assert.match(editor, /this\.data\.namesToDisplay = IdsToDisplay\.map\(findID\)\.filter\(Boolean\)\.map\(getName\)/);
  assert.match(editor, /systemika-table-selection-summary/);
  assert.match(editor, /class TableSelectorComponent[\s\S]{0,2600}syncLiveSelection\(\)[\s\S]{0,900}setDisplayIds\(this\.primitive, this\.displayIds\)[\s\S]{0,900}visual\.render\(\)/);
});

test('clipboard and Delete remain usable for outputs after plots leave the canvas', () => {
  assert.match(editor, /Clipboard\.captureIds\(\[selectedGraph\.id\], "copy"\)/);
  assert.match(editor, /Clipboard\.captureIds\(\[selectedGraph\.id\], "cut"\)/);
  assert.match(editor, /let dockOutput = window\.SystemikaOutputDock \? SystemikaOutputDock\.activeVisual : null;[\s\S]{0,360}tool_deletePrimitive\(String\(dockOutput\.id\)\)/);
});
