const mongoose = require('mongoose');

(() => {
    mongoose.models = {};
})();

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20
    }
});

console.log(mongoose.Types.ObjectId.isValid("643d571fc4798fc69121008b"));

module.exports = mongoose.model('Department', departmentSchema);