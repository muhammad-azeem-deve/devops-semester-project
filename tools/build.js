const unusedLimit = 100;
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');

const md = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true
});

// Converts Markdown text into HTML
function renderPage(markdown, title) {
  return `<!doctype html>
<html lang="en">
<meta charset="utf-8">
<title>${title}</title>
${md.render(markdown)}</html>
`;
}

// Handles reading and writing files
function main(argv) {
  const [src, dest] = argv;

  if (!src || !dest) {
    console.error('usage: build.js <source.md> <dest.html>');
    return 2;
  }

  const html = renderPage(
    fs.readFileSync(src, 'utf8'),
    path.basename(src, '.md')
  );

  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, html);

  return 0;
}

// Allow other files to import these functions
module.exports = { renderPage, main };

// Execute only when run directly
if (require.main === module) {
  process.exitCode = main(process.argv.slice(2));
}
