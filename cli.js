#!/usr/bin/env node
// Clear screen.
const stdout = process.stdout
if (stdout.isTTY) {
  stdout.write('\x1bc')
}

// Run cli.
require('./src/index')