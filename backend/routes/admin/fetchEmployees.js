const express = require('express')
const Employees = require('../../models/employeeModel')
const { isAdmin, isAuthenticated } = require('../../middleware/authMiddleware')
const router = express.Router()

router.get('/all_employees',isAuthenticated, isAdmin, async(req,res) =>{
    try{
        const allEmployees = await Employees.find({})
        return res.status(200).json({employees:allEmployees})
    }
    catch(error){
        return res.status(500).json({message :'Server error'})
    }
})

module.exports = router