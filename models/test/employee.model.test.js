const Employee = require('../employee.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;


describe('Employee', () => {

    it('should throw an error if no "firstName", "lastName", "department" arg', (done) => {
        const employee = new Employee({}); // create new Employee, but don't set required fields

        employee.validate((err) => {
            expect(err).to.exist;
            done();
        });
    });

    it('should throw an error if "firstName", "lastName", "department" is not a string', (done) => {
        const cases = [{}, []];

        let count = 0;

        for (let value of cases) {
            const employee = new Employee({
                firstName: value,
                lastName: value,
                department: value
            });

            employee.validate((err) => {
                expect(err.errors.firstName).to.exist;
                expect(err.errors.lastName).to.exist;
                expect(err.errors.department).to.exist;
                count++;

                if (count === cases.length) {
                    done();
                }
            });
        }
    });

    it('should create a new employee with valid inputs', (done) => {
        const departmentId = new ObjectId('60abde55b3a1c32f3c4e4b4c');
        const employee = new Employee({
            firstName: 'John',
            lastName: 'Doe',
            department: departmentId
        });

        employee.validate((err) => {
            expect(err).to.not.exist;
            expect(employee.firstName).to.equal('John');
            expect(employee.lastName).to.equal('Doe');
            expect(employee.department).to.deep.equal(new ObjectId('60abde55b3a1c32f3c4e4b4c'));
            done();
        });
    });

});