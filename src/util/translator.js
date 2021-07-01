const { gray, yellow, blue } = require('chalk')

class Translator {
  constructor(translationsFile) {
    this.translations = require(translationsFile)
  }

  translate(message, output) {
    const [status, data1, data2] = message
    let translated = this.translations[status]?.[data1]
    if (!Array.isArray(translated)) translated = this.translations[status]?.[data1]?.[data2]

    if (translated) {
      console.log(gray(`${yellow('⋅')} ${message} --> ${blue(translated)}`))
    } else {
      console.log(`${yellow('⋅')} ${gray(message)}`)
    }
    output.sendMessage(translated || message)
  }
}

module.exports = Translator