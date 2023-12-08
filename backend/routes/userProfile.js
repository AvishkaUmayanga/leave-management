const express = require('express')
const Employees = require('../models/employeeModel')
const LeaveDetails = require('../models/leaveModel')
const { isAuthenticated } = require('../middleware/authMiddleware')
const router = express.Router()

router.get('/user_profile', isAuthenticated, async(req, res)=>{
    try{
        const {employeeID} = req.session

        const employeeDetails = await Employees.findOne({employeeID})
        const leaveDetails = await LeaveDetails.find({employeeID})

        return res.status(200).json({employeeDetails: employeeDetails, leaveDetails: leaveDetails})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({message: 'Server error'})
    }
})

module.exports = router