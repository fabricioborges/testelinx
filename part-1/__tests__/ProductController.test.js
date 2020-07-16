const request = require('supertest');
const server = require('../src/app');
const routes = require('../src/routes');
const mongoose = require('mongoose');
const username = process.env.USERMONGO;
const password = process.env.PASSWORDMONGO;

beforeAll(async () => {
    console.log('iniciando testes do controllador de produtos');
    await mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.royef.mongodb.net/linxpart-1?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
    });
});

describe('inicio dos testes', () => {
    it('acesso a rota que recebe a requisições', async () => {
        const response = await request(routes).post('/products').send({
            id: 1,
            name: "name"
        });

        expect(response.status).toBe(200);
    })
})