const select = require('cli-select')
const { yellow, white } = require('chalk')

function selectPort(title, input) {
  const totalPorts = input.getPortCount()
  const options = {
    values: [],
    selected: `(${yellow('⬤')})`
  }

  // Add port options.
  for (let i = 0; i < totalPorts; i++) {
    const name = input.getPortName(i)
    options.values.push(name)
  }

  console.log(white(title))
  return select(options)
}

module.exports = selectPort