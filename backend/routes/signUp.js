const express = require('express')
const bcrypt  = require('bcrypt')
const Employees = require('../models/employeeModel')
const signUP = require('../models/registrations')
const router = express.Router()

router.post('/signup', async(req, res)=>{
    try{
        const{employeeID, password} = req.body;

        const existingRegEmp = await Employees.findOne({employeeID})
        if(!existingRegEmp){
            return res.status(400).json({ message: 'EmployeeID not found'})
        }

        const existingSignup = await signUP.findOne({employeeID})
        if(existingSignup){
            return res.status(400).json({ message: 'Already registered' })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newSignup = new signUP({employeeID, password:hashedPassword})
        await newSignup.save()

        return res.status(201).json({message: 'Signup successful'})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({message: 'Server error'})
    }  
})
module.exports = router