const supertest = require('supertest');
const mongoose = require('mongoose');
const dbHandler = require('../db-handler');
const server = require('../../src/server');
const request = supertest(server);
const Product = require('../../src/app/models/Product');

beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

describe('inicio dos testes, controlador de produtos', () => {
    const formData = {
        "id": 2,
        "name": "name"
    }

    it('Deveria gravar a solicitação e retornar status 200', async () => {

        const response = await request.post('/products').send(formData).set('Accept', 'application/json');

        expect(response.status).toBe(200);
    })

    it('Deveria retornar status 403, duas solicitações iguais em menos de 10 minutos', async () => {

        await request.post('/products').send(formData).set('Accept', 'application/json');

        const response = await request.post('/products').send(formData).set('Accept', 'application/json');

        expect(response.status).toBe(403);
    })

    it('Deveria retornar status 200, duas solicitações distintas', async () => {

        const data = {
            "id": 3,
            "name": "newName"
        }

        await request.post('/products').send(formData).set('Accept', 'application/json');

        const response = await request.post('/products').send(data).set('Accept', 'application/json');

        expect(response.status).toBe(200);
    })

    it('Deveria retornar status 200, duas solicitações iguais mais de 10 minutos', async () => {

        await request.post('/products').send(formData).set('Accept', 'application/json');

        const filter = { id: formData.id, name: formData.name };

        const date = new Date();

        date.setMinutes(-10);

        const update = { createAt: date }

        await Product.findOneAndUpdate(filter, update).update();

        const response = await request.post('/products').send(formData).set('Accept', 'application/json');

        expect(response.status).toBe(200);
    })
})