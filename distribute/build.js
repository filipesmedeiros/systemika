'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUTPUT = path.join(__dirname, 'output');

function readSystemikaVersion() {
  const versionFile = path.join(ROOT, 'OpenSystemDynamics', 'src', 'version.js');
  const text = fs.readFileSync(versionFile, 'utf8');
  const match = text.match(/var\s+systemika\s*=\s*\{[\s\S]*?version\s*:\s*["']([^"']+)["']/);
  if (!match) {
    throw new Error(`Could not read Systemika version from ${versionFile}`);
  }
  return match[1];
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyFile(src, dest) {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

function copyTree(src, dest) {
  if (!fs.existsSync(src)) return;
  ensureDir(path.dirname(dest));
  fs.cpSync(src, dest, { recursive: true, force: true, dereference: false });
}

function copyNamedFiles(srcDir, destDir, names) {
  for (const name of names) {
    copyFile(path.join(srcDir, name), path.join(destDir, name));
  }
}

function bundleHtml(sourceHtml, sourceDir, destHtml) {
  const buildBlock = /<!--\s*build:(js|css)\s+([^\s]+)\s*-->([\s\S]*?)<!--\s*endbuild\s*-->/g;

  const rewritten = sourceHtml.replace(buildBlock, (whole, kind, target, body) => {
    const refs = [];
    const tagPattern = kind === 'js'
      ? /<script\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>\s*<\/script>/gi
      : /<link\b[^>]*\bhref\s*=\s*["']([^"']+)["'][^>]*>/gi;

    let tagMatch;
    while ((tagMatch = tagPattern.exec(body)) !== null) {
      const ref = tagMatch[1];
      if (/^(?:[a-z]+:)?\/\//i.test(ref) || ref.startsWith('data:')) {
        throw new Error(`Remote/data URL inside build block is not supported: ${ref}`);
      }
      refs.push(ref.split(/[?#]/, 1)[0]);
    }

    if (refs.length === 0) {
      throw new Error(`Build block ${kind}:${target} contains no source files.`);
    }

    const parts = refs.map((ref) => {
      const resolved = path.resolve(sourceDir, ref);
      const rel = path.relative(sourceDir, resolved);
      if (rel.startsWith('..' + path.sep) || path.isAbsolute(rel)) {
        throw new Error(`Build-block source escapes its directory: ${ref}`);
      }
      if (!fs.existsSync(resolved)) {
        throw new Error(`Build-block source not found: ${resolved}`);
      }
      return fs.readFileSync(resolved, 'utf8');
    });

    const targetPath = path.join(path.dirname(destHtml), target);
    ensureDir(path.dirname(targetPath));
    const separator = kind === 'js' ? '\n;\n' : '\n\n';
    fs.writeFileSync(targetPath, parts.join(separator) + '\n', 'utf8');

    return kind === 'js'
      ? `<script src="${target}"></script>`
      : `<link rel="stylesheet" href="${target}" />`;
  });

  ensureDir(path.dirname(destHtml));
  fs.writeFileSync(destHtml, rewritten, 'utf8');
}

function bundleHtmlFile(src, dest) {
  bundleHtml(fs.readFileSync(src, 'utf8'), path.dirname(src), dest);
}

function buildDesktop(dest) {
  copyFile(path.join(ROOT, 'LICENSE.txt'), path.join(dest, 'LICENSE.txt'));
  copyFile(path.join(ROOT, 'start.html'), path.join(dest, 'start.html'));
  copyFile(path.join(ROOT, 'package.json'), path.join(dest, 'package.json'));
  copyTree(path.join(ROOT, 'electron'), path.join(dest, 'electron'));
  copyTree(path.join(ROOT, 'OpenSystemDynamics'), path.join(dest, 'OpenSystemDynamics'));
  copyTree(path.join(ROOT, 'app-icons'), path.join(dest, 'app-icons'));
  copyTree(path.join(ROOT, 'MultiSimulationAnalyser'), path.join(dest, 'MultiSimulationAnalyser'));
}

function buildWeb(dest) {
  copyTree(path.join(ROOT, 'app-icons'), path.join(dest, 'app-icons'));
  copyFile(path.join(ROOT, 'start.html'), path.join(dest, 'index.html'));

  const msaSrc = path.join(ROOT, 'MultiSimulationAnalyser');
  const msaDest = path.join(dest, 'MultiSimulationAnalyser');
  copyNamedFiles(msaSrc, msaDest, [
    'multisimulationanalyser-manifest.json',
    'multisimulationanalyser-serviceworker.js',
    'systemika-128.png',
    'systemika-256.png'
  ]);

  const osdSrc = path.join(ROOT, 'OpenSystemDynamics', 'src');
  const osdDest = path.join(dest, 'OpenSystemDynamics', 'src');
  for (const name of fs.readdirSync(osdSrc)) {
    if (name.toLowerCase().endsWith('.html')) {
      bundleHtmlFile(path.join(osdSrc, name), path.join(osdDest, name));
    }
  }
  copyTree(path.join(osdSrc, 'graphics'), path.join(osdDest, 'graphics'));
  copyTree(
    path.join(osdSrc, 'jquery', 'jquery-ui-1.12.1', 'images'),
    path.join(osdDest, 'images')
  );

  bundleHtmlFile(path.join(msaSrc, 'index.html'), path.join(msaDest, 'index.html'));
  bundleHtmlFile(path.join(msaSrc, 'index.html'), path.join(msaDest, 'standalone.html'));
  for (const dir of ['img', 'images', 'icons', 'im_img']) {
    copyTree(path.join(msaSrc, dir), path.join(msaDest, dir));
  }
}

function copyLicenses(dest) {
  copyNamedFiles(path.join(ROOT, 'OpenSystemDynamics', 'src'), dest, [
    'license.html',
    'third-party-licenses.html'
  ]);
}

function main() {
  const version = readSystemikaVersion();
  console.log(`Building Systemika Studio version ${version}`);

  fs.rmSync(OUTPUT, { recursive: true, force: true });
  ensureDir(OUTPUT);

  buildDesktop(path.join(OUTPUT, 'app'));
  buildWeb(path.join(OUTPUT, 'web', version));
  copyLicenses(OUTPUT);

  console.log('Systemika build staging completed.');
}

main();
