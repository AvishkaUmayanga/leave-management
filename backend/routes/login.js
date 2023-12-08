const express = require('express')
const bcrypt = require('bcrypt')
const signUp = require('../models/registrations')
const Employees = require('../models/employeeModel')
const router = express.Router()

router.post('/login', async(req,res)=>{
    try{
        const{employeeID, password} = req.body

        const existingSignup = await signUp.findOne({employeeID})
        if(!existingSignup){
            return res.status(404).json({message: 'Employee not registered'})
        }
        
        const passwordMatch = await bcrypt.compare(password, existingSignup.password)
        if(!passwordMatch){
            return res.status(401).json({message: 'Invalid password'})
        }
        const employeeRole = await Employees.findOne({employeeID})
        req.session.employeeID = existingSignup.employeeID;
        return res.status(200).json({message: 'Login successful', role: employeeRole.role})
    }
    catch(error){
         return res.status(500).json({message: 'Server error'})
    }
})

module.exports = router