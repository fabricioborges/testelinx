//const fs = require('fs');
var tar = require('tar')    

module.exports = {
   async readFile() {

      const data = []

      const file = 'src/input-dump.tar.gz'

      const onentry = entry => {
         if (entry.path === 'input-dump')
            entry.on('data', c => data.push(c))
      }

      tar.t({
         onentry,
         file,
      }, er => {
         const buf = Buffer.concat(data)
         console.log(JSON.stringify(buf))
      })       
   }
}
