const createTag = require('./Tag').default

const tags = [
  'argsarray', 'argslength', 'commandname', 'iscc',
  'lb', 'rb', 'semi', 'zws',
  'abs', 'args', 'base', 'base64decode', 'base64encode',
  'brainfuck', 'capitalize', 'choose', 'clean', 'color', 'commit', 'debug',
  'decrement', 'delete', 'embed', 'embedbuild', 'emoji','fallback', 'for', 'function',
  'get', 'hash', 'if', 'increment', 'indexof', 'length', 'lock', 'logic', 'lower', 'math',
  'max', 'md5', 'min', 'newline', 'numformat', 'pad', 'parsefloat', 'parseint', 'randchoose',
  'randint', 'randstr', 'realpad', 'regexreplace', 'regexsplit', 'regextest', 'repeat',
  'replace', 'return', 'reverse', 'rollback', 'round', 'rounddown', 'roundup', 'set', 'shuffle',
  'sleep', 'space', 'substring', 'switch', 'throw', 'time', 'trim', 'upper', 'uriencode',
  'void', 'while', 'apply', 'concat', 'foreach', 'isarray', 'join', 'pop', 'push', 'regexmatch',
  'shift', 'slice', 'sort', 'splice', 'split', 'exec', 'execcc', 'flag', 'flagset', 'inject',
  'lang', 'modlog', 'nsfw', 'output', 'pardon', 'prefix', 'quiet', 'reason', 'subtagexists',
  'suppresslookup', 'timer', 'waitmessage', 'waitreaction', 'warn', 'warnings', 'ban',
  'channelcategories', 'channelcategory', 'channelid', 'channeliscategory',
  'channelisnsfw', 'channelistext', 'channelisvoice', 'channelname', 'channelpos',
  'channels', 'channeltype', 'dm', 'edit', 'emojis', 'guildcreatedat', 'guildicon', 'guildid',
  'guildmembers', 'guildname', 'guildownerid', 'guildsize', 'isstaff', 'kick', 'messageattachments',
  'messageedittime', 'messageembeds', 'messageid', 'messagesender', 'messagetext', 'messagetime',
  'randuser', 'reactadd', 'reactlist', 'reactremove', 'roleadd', 'rolecolor', 'rolecreate',
  'roledelete', 'roleid', 'rolemembers', 'rolemention', 'rolename', 'roleremove', 'roles',
  'rolesetmentionable', 'rolesize', 'send', 'unban', 'useravatar', 'usercreatedat',
  'userdiscrim', 'usergame', 'usergametype', 'userhasrole', 'userid', 'userisbot', 'userjoinedat',
  'usermention', 'username', 'usernick', 'usersetnick', 'userstatus', 'usertimezone', 'webhook'
]

const e = module.exports = {
  s: {},
  compile (f, args = []) {
    let ctx = Object.assign({}, this, { _d: [] })
    Object.keys(ctx.s).forEach(snippet => {
      ctx.createSnippet(snippet, ctx.s[snippet]._f)
    })
    f.bind(ctx)(...(args || [ this ]))
    let p = ctx._d.map(d => {
      if (typeof d === 'string')
        return d.replace(/[{};\n]/g, c => {
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
      else
        return `${d}`
    }).join('')
    return p
  },
  text (...args) {
    if (this._d)
      this._d.push(...args)
  },
  createSnippet (name, f) {
    this.s[name] = (function (...args) {
      let c = this.compile(f, args)
      if (this._d)
        this._d.push(c)
      return c
    }).bind(this)
    this.s[name]._f = f
  }
}

tags.forEach(t => {
  e[t] = function (...args) {
    let tag = createTag.bind(this)(t, args)
    if (this._d)
      this._d.push(tag)
    return tag
  }
})
