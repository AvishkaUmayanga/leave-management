const mongoose = require('mongoose')

const employeeSchema = mongoose.Schema({
    employeeID : {type: String, unique: true, required: true},
    firstName : {type: String, required: true},
    lastName : {type: String, required: true},
    email : {type: String, require: true},
    role : {type: String, require: true},
});

const Employees = mongoose.model('Employees', employeeSchema)
module.exports = Employees;