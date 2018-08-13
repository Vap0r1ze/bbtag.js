const bb = require('./src/')

bb.createSnippet('greet', function (name) {
  this.text(`Hello **${name}**!! :wave:`)
})

let t = bb.compile(function () {
  this.switch(bb.args(0),
  'help', function () {
    this.text('No help lol')
  },
  'greet', function () {
    this.s.greet('Vap0r1ze')
  })
})

console.log(t)
