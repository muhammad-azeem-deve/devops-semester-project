# DevOps Pipeline

A small command-line tool that converts Markdown files into HTML pages.

## Requirements

- Node.js
- npm

## Usage

Convert a Markdown file into HTML:

    npx devops-build input.md output.html

The output directory is created automatically if needed.

## Development

Install locked dependencies and run the build and tests:

    npm ci
    make ci
