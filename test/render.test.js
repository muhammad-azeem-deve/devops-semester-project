
const { test } = require('node:test');
const assert = require('node:assert');

const { renderPage, main } = require('../tools/build');

// Test 1: Markdown heading conversion
test('a heading becomes an h1', () => {
  assert.match(
    renderPage('# Hello', 'x'),
    /<h1>Hello<\/h1>/
  );
});

// Test 2: HTML title generation
test('the title is the one we pass in', () => {
  assert.match(
    renderPage('text', 'notes'),
    /<title>notes<\/title>/
  );
});

// Test 3: Missing command-line arguments
test('missing arguments give the usage exit code', () => {
  assert.strictEqual(main([]), 2);
});
// Test 4
test('main writes the page it was asked for', () => {
  const os = require('os');
  const fs = require('fs');
  const path = require('path');

  // Create a temporary directory
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'render-'));

  // Create a temporary Markdown file
  const src = path.join(dir, 'hello.md');
  fs.writeFileSync(src, '# Hi');

  // Generate an HTML file
  const dest = path.join(dir, 'out', 'hello.html');

  assert.strictEqual(main([src, dest]), 0);

  // Verify the generated HTML
  assert.match(
    fs.readFileSync(dest, 'utf8'),
    /<title>hello<\/title>/
  );
});
