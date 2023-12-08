const mongoose = require('mongoose')

const leaveSchema = mongoose.Schema({
    employeeID : {type: String, required: true},
    leaveType : {type: String, required: true},
    startDate : {type: Date, required: true},
    endDate : {type: Date, required: true},
    status : {type: String, required: true, default: 'pending'},
    createdAt: { type: Date, default: Date.now },
})

const LeaveDetails = mongoose.model('LeaveDetails', leaveSchema)
module.exports = LeaveDetails