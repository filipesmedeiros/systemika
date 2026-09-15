const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const rootPackage = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const distPackage = JSON.parse(fs.readFileSync(path.join(root, 'distribute', 'package.json'), 'utf8'));
const linuxLauncher = fs.readFileSync(path.join(root, 'run-systemika-linux.sh'), 'utf8');

test('portable and packaged builds use the same exact Electron 44.3.0 runtime', () => {
  assert.equal(rootPackage.devDependencies.electron, '44.3.0');
  assert.equal(distPackage.devDependencies.electron, '44.3.0');
});

test('Linux source launcher replaces a stale Electron runtime instead of silently reusing it', () => {
  assert.match(linuxLauncher, /REQUIRED_ELECTRON_VERSION=.*devDependencies\.electron/);
  assert.match(linuxLauncher, /INSTALLED_ELECTRON_VERSION/);
  assert.match(linuxLauncher, /"\$INSTALLED_ELECTRON_VERSION" != "\$REQUIRED_ELECTRON_VERSION"/);
  assert.match(linuxLauncher, /npm install --no-audit --no-fund/);
});
