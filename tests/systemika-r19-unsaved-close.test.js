'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const editorPath = path.join(root, 'OpenSystemDynamics/src/editor.js');
const editor = fs.readFileSync(editorPath, 'utf8');
const main = fs.readFileSync(path.join(root, 'electron/main.js'), 'utf8');
const preload = fs.readFileSync(path.join(root, 'electron/preload.js'), 'utf8');

function extractClass(source, className) {
  const start = source.indexOf(`class ${className} {`);
  assert.notEqual(start, -1, `${className} not found`);
  const end = source.indexOf(`\n${className}.init();`, start);
  assert.notEqual(end, -1, `${className}.init() marker not found`);
  return source.slice(start, end);
}

test('Undoing back to the saved XML clears Unsaved Changes and redo marks it dirty again', () => {
  const classSource = extractClass(editor, 'History');
  const ui = { hidden: true };
  const context = {
    console,
    checkBeforeClose() {},
    createModelFileData: () => 'A',
    loadModelFromXml: () => {},
    window: {
      addEventListener() {},
      removeEventListener() {},
    },
    localStorage: {
      getItem() { return null; },
      setItem() {},
      removeItem() {},
    },
    $: () => ({
      prop() { return this; },
      addClass(name) { if (name === 'hidden') ui.hidden = true; return this; },
      removeClass(name) { if (name === 'hidden') ui.hidden = false; return this; },
    }),
  };
  vm.createContext(context);
  vm.runInContext(`${classSource}\nHistory.init(); globalThis.__History = History;`, context);
  const History = context.__History;

  History.undoStates = ['A', 'B'];
  History.undoIndex = 1;
  History.lastUndoState = 'B';
  History.savedState = 'A';
  History.updateUnsavedState('B');
  assert.equal(History.unsavedChanges, true);
  assert.equal(ui.hidden, false);

  History.doUndo();
  assert.equal(History.undoIndex, 0);
  assert.equal(History.unsavedChanges, false);
  assert.equal(ui.hidden, true);

  History.doRedo();
  assert.equal(History.undoIndex, 1);
  assert.equal(History.unsavedChanges, true);
  assert.equal(ui.hidden, false);
});

test('History persists the saved snapshot across editor restart/reload', () => {
  assert.match(editor, /localStorage\.setItem\("history_saved_state", this\.savedState\)/);
  assert.match(editor, /this\.savedState = localStorage\.getItem\("history_saved_state"\)/);
  assert.match(editor, /static markSaved\(savedState = null\)/);
});

test('Discarding unsaved changes closes through an acknowledged IPC path', () => {
  assert.match(editor, /case "no":\s*continueHandler\(\);/);
  assert.match(preload, /confirmClose:\s*\(\) => ipcRenderer\.invoke\("window:confirm-close"\)/);
  assert.match(main, /ipcMain\.handle\("window:confirm-close"/);
  assert.match(main, /if \(!mainWindow\.isDestroyed\(\)\) mainWindow\.destroy\(\);/);
  assert.doesNotMatch(preload, /confirmClose:\s*\(\) => ipcRenderer\.send\("window:confirm-close"\)/);
});
