const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
    before(async () => {
        try {
            await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
            const employee = new Employee({ firstName: 'Phillip', lastName: 'Doe', department: mongoose.Types.ObjectId() });
            await employee.save();
        } catch (err) {
            console.error(err);
        }
    });

    after(async () => {
        await Employee.deleteMany();
        await mongoose.disconnect();
    });

    describe('Reading data', () => {
        it('should return all the data with "find" method', async () => {
            const employees = await Employee.find();
            const expectedLength = 1;
            expect(employees.length).to.be.equal(expectedLength);
        });
        it('should return a proper document by "name" with "findOne" method', async () => {
            const employee = await Employee.findOne({ firstName: 'Phillip' });
            expect(employee.firstName).to.be.equal('Phillip');
        });

    });
    describe('Creating data', () => {

        it('should insert new document with "insertOne" method', async () => {
            const employee = new Employee({ firstName: 'Employee', lastName: '#1', department: mongoose.Types.ObjectId() });
            await employee.save();
            expect(employee.isNew).to.be.false;
        });

    });

    describe('Updating data', () => {
        beforeEach(async () => {
            const testEmployeeOne = new Employee({ firstName: 'Phillip', lastName: 'Doe', department: mongoose.Types.ObjectId() });
            await testEmployeeOne.save();

            const testEmployeeTwo = new Employee({ firstName: 'Joe', lastName: 'Newton', department: mongoose.Types.ObjectId() });
            await testEmployeeTwo.save();
        });
        it('should properly update one document with "save" method', async () => {
            const employee = await Employee.findOne({ name: 'Employee #1' });
            if (employee) {
                employee.name = '=Employee #1=';
                await employee.save();

                const updatedEmployee = await Employee.findOne({ name: '=Employee #1=' });
                expect(updatedEmployee).to.not.be.null;
            }
        });
        it('should properly update one document with "updateMany" method', async () => {
            await Employee.updateMany({}, { $set: { firstName: 'Updated!' } });
            const updatedEmployees = await Employee.find();
            expect(updatedEmployees[0].firstName).to.be.equal('Updated!');
            expect(updatedEmployees[1].firstName).to.be.equal('Updated!');
        });
        afterEach(async () => {
            await Employee.deleteMany();
        });
    });
    describe('Removing data', () => {

        beforeEach(async () => {
            const testEmployeeOne = new Employee({ firstName: 'John', lastName: 'Doe', name: 'Employee #1' });
            await testEmployeeOne.save();

            const testEmployeeTwo = new Employee({ firstName: 'Jane', lastName: 'Doe', name: 'Employee #2' });
            await testEmployeeTwo.save();
        });

        it('should properly remove one document with "deleteOne" method', async () => {
            await Employee.deleteOne({ firstName: 'Employee', lastName: '#1' });
            const removedEmployee = await Employee.findOne({ firstName: 'Employee', lastName: '#1' });
            expect(removedEmployee).to.be.null;
        });

        it('should properly remove one document with "remove" method', async () => {
            const employee = await Employee.findOne({ firstName: 'John', lastName: 'Doe' });
            await employee.remove();
            const removedEmployee = await Employee.findOne({ firstName: 'John', lastName: 'Doe' });
            expect(removedEmployee).to.be.null;
        });
        it('should properly remove multiple documents with "deleteMany" method', async () => {
            await Employee.deleteMany();
            const employees = await Employee.find();
            expect(employees.length).to.be.equal(0);
        });

        afterEach(async () => {
            await Employee.deleteMany();
        });
    });

});

