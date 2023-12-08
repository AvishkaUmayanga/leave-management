const express = require('express')
const leaveTypes = require('../../models/leaveTypesModel')
const {isAdmin, isAuthenticated} = require('../../middleware/authMiddleware')
const router = express.Router()

router.post('/add_leave_types', isAuthenticated, isAdmin ,async(req, res)=>{
    try{
        const{leaveType, description} = req.body

        const existingLeaveType = await leaveTypes.findOne({leaveType})
        if(existingLeaveType){
            return res.status(400).json({message: 'Leave type already exsist'})
        }
        const newLeaveType = new leaveTypes({leaveType, description})
        await newLeaveType.save()
        return res.status(201).json({message: 'Leave type added successfully'})
    }
    catch(error){
        return res.status(500).json({message: 'Server error'})
    }
})

module.exports = router