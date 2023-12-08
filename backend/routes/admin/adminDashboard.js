const express = require('express')
const Employees = require('../../models/employeeModel')
const RegEmployees = require('../../models/registrations')
const LeaveTypes = require('../../models/leaveTypesModel')
const LeaveDetails = require('../../models/leaveModel')
const {isAdmin, isAuthenticated} = require('../../middleware/authMiddleware')
const router = express.Router()

router.get('/admin_dashboard',isAuthenticated, isAdmin, async(req, res) =>{
    try{
        const employeeCount = await Employees.countDocuments({})
        const regEmployeeCount = await RegEmployees.countDocuments({})
        const leveTypesCount = await LeaveTypes.countDocuments({})
        const leaveCount = await LeaveDetails.countDocuments({})

        return res.status(200).json({
            'totalEmployees': employeeCount, 
            'totalRegEmployees': regEmployeeCount, 
            'totalLeaveTypes': leveTypesCount ,
            'totalLeave': leaveCount})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({message: 'Server error'})
    }
})

module.exports = router