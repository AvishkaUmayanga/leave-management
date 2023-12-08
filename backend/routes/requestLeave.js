const express = require('express')
const requestLeave = require('../models/leaveModel')
const { isAuthenticated } = require('../middleware/authMiddleware')
const router = express.Router()

router.post('/request_leave', isAuthenticated, async(req, res)=>{
    try{
        const {employeeID, selectLeaveType, startDate, endDate} = req.body
        const sessionEmpId = req.session.employeeID

        if(employeeID !== sessionEmpId){
            return res.status(400).json({message: 'Please enter your EmployeeID' })
        }

        const existingLeaveRequest = await requestLeave.findOne({employeeID, startDate})
        if(existingLeaveRequest){
            return res.status(400).json({message: 'Already requested the leave at the same date' })
        }

        const newLeaveRequest = new requestLeave({employeeID, leaveType:selectLeaveType, startDate, endDate})
        await newLeaveRequest.save()
        return res.status(201).json({message: 'Request added successfully'})
    }
    catch(error){
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
})

module.exports = router