const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;