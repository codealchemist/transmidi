const fs = require('fs')
const path = require('path')
const midi = require('midi')
const printii = require('printii')(__dirname)
const { bold, red, gray, yellow } = require('chalk')
const selectPort = require('./util/select-port')
const Translator = require('./util/translator')
const printUsage = require('./util/print-usage')
const args = process.argv.slice(2)
const translationsFile = args[0] ? path.resolve(args[0]) : null
let translator

printii()

// Help / print usage.
if (args[0] === '--help') {
  printUsage(true)
}

// Validate translations file.
if (!translationsFile) {
  console.log('Translations file not set.')
  console.log(yellow('MONITOR MODE'))
}
if (translationsFile) {
  if (!fs.existsSync(translationsFile)) {
    console.log(red('ERROR:'), `Translations file not found:\n${gray(translationsFile)}\n`)
    printUsage(true)
  }
  console.log('TRANSLATIONS:\n  ⋅', gray(translationsFile))

  // Create translator.
  try {
    translator = new Translator(translationsFile)
  } catch (error) {
    console.log(red('ERROR:'), `Failed opening translations file:\n${translationsFile}\n`)
    console.log(error)
    process.exit()
  }
}

// Create IO ports.
const input = new midi.Input()
const output = new midi.Output()

// Message listener.
input.on('message', (deltaTime, message) => {
  if (translator) {
    // Translate.
    translator.translate(message, output)
  } else {
    // Monitor mode.
    console.log(`${yellow('⋅')} ${gray(message)}`)
  }
})

async function run() {
  // Select input.
  const inputPort = await selectPort('INPUT', input)
    .catch(error => {
      console.log('ERROR:', error)
      process.exit()
    })
  console.log(inputPort)
  input.openPort(inputPort.id)

  // Select output.
  const outputPort = await selectPort('OUTPUT', output)
    .catch(error => {
      console.log('ERROR:', error)
      process.exit()
    })
  console.log(outputPort)
  output.openPort(outputPort.id)
  console.log(bold('\nMESSAGES'))
}

run()
