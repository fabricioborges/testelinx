const fs = require('fs');
const targz = require('targz');
const readline = require('readline');
const handlerRequest = require('./requestService');

module.exports = {
   async readFile() {

      const dumpTar = 'src/app/files/input-dump.tar.gz';
      const fileUnzip = 'src/app/files/';
      const filepath = 'src/app/files/input-dump';
      const fileJson = 'src/app/files/dump.json';

      await this.extract(dumpTar, fileUnzip, filepath, fileJson);

      const productIds = [];

      handlerDump();

      function handlerDump() {
         if (!fs.existsSync(fileJson)) {
            setTimeout(() => {
               handlerDump()
            }, 500);

         } else {
            const resultDump = JSON.parse(fs.readFileSync(fileJson));

            resultDump.forEach(element => {
               if (productIds.includes(element.productId) === false) {
                  productIds.push(element.productId);
               }
            });
            handlerRequest(productIds, resultDump);
         }
      }
   },

   async extract(dumpTar, fileUnzip, filepath, fileJson) {
           
      targz.decompress({
         src: dumpTar,
         dest: fileUnzip
      }, function (err) {
         if (err) {
            console.log(err);
         } else {
            convert(filepath)
               .then(res => {
                  fs.writeFileSync(fileJson, JSON.stringify(res));

               })
               .catch(err => console.error(err));
         }
      });

      async function convert(file) {
         return new Promise((resolve, reject) => {

            const stream = fs.createReadStream(file);

            stream.on('error', reject);

            const reader = readline.createInterface({
               input: stream
            });

            const array = [];

            reader.on('line', line => {
               array.push(JSON.parse(line));
            });

            reader.on('close', () => resolve(array));
         });
      }
   }
}
