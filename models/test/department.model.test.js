const Department = require('../department.model.js');
const expect = require('chai').expect;

describe('Department', () => {

    it('should throw an error if no "name" arg', () => {
        const dep = new Department({}); // create new Department, but don't set `name` attr value

        dep.validate(err => {
            expect(err.errors.name).to.exist;
        });

    });

    it('should throw an error if "name" is not a string', () => {

        const cases = [{}, []];
        for (let name of cases) {
            const dep = new Department({ name });

            dep.validate(err => {
                expect(err.errors.name).to.exist;
            });

        }

    });

    it('should throw an error if "name" is too short or too long', async () => {
        const cases = ['JUN', 'NEW', 'Mi', 'Pr'];
        for (let name of cases) {
            const dep = new Department({ name });

            try {
                await dep.validate();
            } catch (err) {
                expect(err.errors.name).to.exist;
            }
        }
    });

    it('should throw an error if "name" is okay', async () => {
        const cases = ['Summer', 'Mariusz', 'Mikołaj', 'Presley'];
        for (let name of cases) {
            const dep = new Department({ name });

            try {
                await dep.validate();
            } catch (err) {
                expect(err.errors.name).to.not.Throwexist;
            }
        }
    });
});