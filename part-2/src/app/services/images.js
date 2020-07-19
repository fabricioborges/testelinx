const fs = require('fs');
const axios = require('axios');
const targz = require('targz');
const readline = require('readline');

module.exports = {
   async readFile() {

      const requestObject = [{
         productId: Number,
         images: []
      }]

      const dumpTar = 'src/app/files/input-dump.tar.gz';

      this.extract(dumpTar);

      const resultDump = JSON.parse(fs.readFileSync('src/app/files/dump.json'));

      const productIds = []

      resultDump.forEach(element => {
         if (productIds.includes(element.productId) === false) {
            productIds.push(element.productId);
         }
      });

      productIds.forEach(element => {
         const object = {
            productId: Number,
            images: []
         }
         object.productId = element;

          resultDump.forEach(dump => {
            if (dump.productId === element) {
               if (object.images.includes(dump.image) === false){
                  axios.get(dump.image)
                     .then(res => {
                        object.images.push(dump.image);
                        console.log('deu boa')
                     })
                     .catch(() => {  });                  
               }                  
            }
         })

         requestObject.push(object);
      });   
  
      console.log(requestObject[0].images);
   },

   extract(dumpTar) {
      const fileUnzip = 'src/app/files/';
      const filepath = 'src/app/files/input-dump';
      const fileJson = 'src/app/files/dump.json';

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

      function convert(file) {
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
