class Tag {
  constructor (name, args) {
    this.name = name
    this.args = args
  }
  escape (a) {
    if (typeof a === 'string')
      a = a.replace(/[{};\n]/g, c => {
        switch (c) {
          case '{':
            return '{lb}'
          case '}':
            return '{rb}'
          case ';':
            return '{semi}'
          case '\n':
            return '{nl}'
          case '\u200b':
            return '{zws}'
        }
      })
    return `${a}`
  }
  toString () {
    return `{${[].concat(this.name, this.args).map(a => {
      switch (a.constructor) {
        case Tag:
          return `{${[].concat(a.name, a.args).join(';')}}`
        case Array: case Object:
          return JSON.stringify(a)
        case RegExp: case String: case Number:
          return this.escape(`${a}`)
      }
    }).join(';')}}`
  }
}
module.exports = function (name, args = []) {
  let p = args.map(a => {
    if (typeof a !== 'function')
      return a
    return this.compile(a)
  })
  return new Tag(name, p)
}
module.exports.Tag = Tag
