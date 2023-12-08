const express = require('express')
const Employees = require('../../models/employeeModel')
const { isAdmin, isAuthenticated} = require('../../middleware/authMiddleware')
const router = express.Router()

router.post('/add_employee',isAuthenticated, isAdmin, async(req, res)=>{
    try{
        const{employeeID, firstName, lastName, email, role} = req.body

        const existingEmployee = await Employees.findOne({employeeID})
        if(existingEmployee){
            return res.status(400).json({message: 'Already in the database'})
        }
        const newEmployee = new Employees({employeeID, firstName, lastName, email, role})
        await newEmployee.save()
        return res.status(201).json({message: 'Employee added successfully'})
    }
    catch(error){
        return res.status(500).json({message: 'Server error'})
    }
})

module.exports = router