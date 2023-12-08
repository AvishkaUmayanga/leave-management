const mongoose = require('mongoose')

const regSchema = mongoose.Schema({
    employeeID : {type: String, unique: true, required: true},
    password : {type: String, required: true}
});

const Registrations = mongoose.model('Registrations', regSchema)
module.exports = Registrations;

