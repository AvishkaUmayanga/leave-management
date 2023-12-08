const Employees = require('../models/employeeModel')

function isAuthenticated(req, res, next){
    if(req.session && req.session.employeeID){
        console.log('Authenticated')
        return next()
    }
    console.log('Not Authenticated')
    res.redirect('/login')
}

async function isAdmin(req, res, next) {
    console.log('Session:', req.session);
    const employee = await Employees.findOne({ employeeID: req.session.employeeID });
    if (!employee || employee.role !== 'admin') {
        console.log('Not admin');
        return res.status(401).json({ message: 'Access denied' });
    }
    console.log('Admin');
    next();
}

module.exports ={isAuthenticated, isAdmin}