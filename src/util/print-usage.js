const { yellow, gray, bold } = require('chalk')

function printUsage(exit) {
  console.log(`
    ${bold('USAGE:')}
    ${yellow('transmidi')} ${gray('[translations-file]')}

    ${bold('Example:')}
    ${yellow('transmidi')} ${gray('roland-fc-100-bias-fx.js')}

    ${bold('Sample translations file:')}
    const translations = {
      192: {
        0: [176, 81, 0],
        1: [176, 82, 0],
        2: [176, 83, 0],
        3: [176, 84, 0],
        4: [176, 85, 0],
        5: [176, 86, 0],
        6: [176, 87, 0],
        7: [176, 88, 0]
      },
      176: {
        80: {
          127: [176, 81, 0],
          0: [176, 82, 0]
        }
      }
    }
    
    module.exports = translations
  `)

  if (exit) process.exit()
}

module.exports = printUsage
