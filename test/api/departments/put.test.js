const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const mongoose = require('mongoose')
const Department = require('../../../models/department.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('PUT /api/departments', () => {
    before(async () => {
        const NODE_ENV = process.env.NODE_ENV;
        let dbUri = '';

        if (NODE_ENV === 'production') dbUri = 'url to remote db';
        else if (NODE_ENV === 'test') dbUri = 'mongodb://localhost:27017/companyDBtest';
        else dbUri = 'mongodb://localhost:27017/companyDB';

        await mongoose.connect(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

        const testDepOne = new Department({ _id: '5d9f1140f10a81216cfd4408', name: 'Department #1' });
        await testDepOne.save();
    });

    after(async () => {
        await Department.deleteMany();
        await mongoose.disconnect();
    });

    it('/:id should update chosen document and return success', async () => {
        const res = await request(server).put('/api/departments/5d9f1140f10a81216cfd4408').send({ name: '=#Department #1=' });
        expect(res.status).to.be.equal(200);
        expect(res.body).to.not.be.null;
    });
});