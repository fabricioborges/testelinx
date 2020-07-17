const fs = require('fs');

module.exports = {
     async readFile(){
        const content = await fs.readFileSync('src/input-dump', 'utf-8');

        const object =  content.length;

         const fileJSON = JSON.parse(object);
        
        // fs.writeFileSync('src/test', fileJSON);        
 }
}