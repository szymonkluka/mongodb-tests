const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const Department = require('../../../models/department.model');
chai.use(chaiHttp);
const server = require('../../../server.js');

const expect = chai.expect;
const request = chai.request;

describe('GET /api/departments', () => {
    before(async () => {
        const NODE_ENV = process.env.NODE_ENV;
        let dbUri = '';

        if (NODE_ENV === 'production') dbUri = 'url to remote db';
        else if (NODE_ENV === 'test') dbUri = 'mongodb://localhost:27017/companyDBtest';
        else dbUri = 'mongodb://localhost:27017/companyDB';

        await mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
        const testDepOne = new Department({ _id: '5d9f1140f10a81216cfd4408', name: 'Department #1' });
        await testDepOne.save();

        const testDepTwo = new Department({ _id: '5d9f1159f81ce8d1ef2bee48', name: 'Department #2' });
        await testDepTwo.save();
    });

    after(async () => {
        await Department.deleteMany();
        await mongoose.disconnect();
    });

    it('/ should return all departments', (done) => {
        request(server)
            .get('/api/departments')
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.be.equal(2);
                done();
            });
    });

    it('/:id should return one department by :id ', async () => {
        const res = await request(server).get('/api/departments/5d9f1140f10a81216cfd4408');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.not.be.null;
    });
    it('/random should return one random department', async () => {
        const res = await request(server).get('/api/departments/random');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.not.be.null;
    });

});