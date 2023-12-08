const express = require('express')
const LeaveDetails = require('../../models/leaveModel')
const { isAdmin, isAuthenticated } = require('../../middleware/authMiddleware')
const router = express.Router()

router.get('/manage_leave', isAuthenticated, isAdmin, async(req, res) =>{
    try{
        const allLeave = await LeaveDetails.find({})
        return res.status(200).json({allLeave: allLeave})
    }
    catch(error){
        return res.status(500).json({message: 'Server error'})
    }
})

router.put('/manage_leave/approve_leave/:employeeID/:startDate',isAuthenticated, isAdmin, async(req, res) =>{
    try{
        const {employeeID, startDate} = req.params
        await LeaveDetails.updateOne({employeeID,startDate}, {$set:{status: 'Approved'}})
        return res.status(200).json({message: 'Approved successfully'})

    }
    catch(error){
        return res.status(500).json({message: 'Server error'})
    }
})

router.put('/manage_leave/decline_leave/:employeeID/:startDate', isAuthenticated, isAdmin, async(req, res) =>{
    try{
        const{employeeID, startDate} = req.params
        await LeaveDetails.updateOne({employeeID,startDate}, {$set:{status: 'Declined'}})
        return res.status(200).json({message: 'Declined successfully'})
    }
    catch(error){
        return res.status(500).json({message: 'Server error'})
    }
})

module.exports = router