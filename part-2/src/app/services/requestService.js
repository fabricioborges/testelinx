const axios = require('axios');
const fs = require('fs');

module.exports = async function handlerRequest(productIds, resultDump) {

    const requestObject = [];

    console.log('handlerRequest')

    productIds.forEach(element => {
        const objectProducts = {}
        objectProducts.productId = element;

        const result = resultDump
            .filter(dump => dump.productId === element)
            .map(x => x.image);

        objectProducts.images = result;

        requestObject.push(objectProducts);
    });
    
    executeRequest(requestObject);     
}

function executeRequest(requestObject) {
    const arr = [];

    for (let i = 0; i < requestObject.length - 1; i++) {
        const auxImages = []
        const object = {}

        const productId = requestObject[i];

        const images = requestObject[i].images;

        object.productId = productId

        images.forEach(element => {
            axios.get(element)
                .then(() => {
                    auxImages.push(element)

                    const aux = auxImages.slice(0, 3)
                    object.images = aux;

                })
                .catch((err) => { });
        })

        arr.push(object);

        fs.writeFileSync('src/dumpsanitizado.json', JSON.stringify(arr));
    }
}

