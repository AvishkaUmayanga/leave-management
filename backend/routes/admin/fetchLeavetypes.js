const express = require('express')
const LeaveTypes = require('../../models/leaveTypesModel')
const { isAdmin } = require('../../middleware/authMiddleware')
const router = express.Router()

router.get('/leave_types', isAdmin, async(req,res)=>{
    try{
        const Alltypes = await LeaveTypes.find({})
        return res.status(200).json({leaveTypes: Alltypes})
    }
    catch(error){
        return res.status(500).json({message :'Server error'})
    }
})

module.exports = router