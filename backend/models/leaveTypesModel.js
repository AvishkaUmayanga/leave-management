const mongoose = require('mongoose')

const leaveTypesSchema = mongoose.Schema({
    leaveType : {type: String, required: true},
    description : {type: String, required: true},
})

const LeaveTypes = mongoose.model('LeaveTypes', leaveTypesSchema)
module.exports = LeaveTypes