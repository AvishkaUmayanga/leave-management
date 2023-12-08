const express = require('express')
const session = require('express-session');
const mongoose = require('mongoose')
const cors = require('cors')
const mongoDBStore = require('connect-mongodb-session')(session);
const app = express()
require('dotenv').config();

const addEmployee = require('./routes/admin/addEmployees')
const signupEmployee = require('./routes/signUp')
const loginUser = require('./routes/login')
const addLeaveTypes = require('./routes/admin/addLeaveTypes')
const requestLeave = require('./routes/requestLeave')
const adminDashboard = require('./routes/admin/adminDashboard')
const fetchAllEmployees = require('./routes/admin/fetchEmployees')
const fetchLeaveTypes = require('./routes/admin/fetchLeavetypes')
const userProfile = require('./routes/userProfile')
const manageLeave = require('./routes/admin/manageLeave')
const logoutUser = require('./routes/logout')

app.use(cors({ credentials: true, origin: 'http://localhost:3000'}))
app.use(express.json())

const URL = process.env.MONGODB_URL
const PORT = process.env.PORT
const KEY = process.env.SECRET

mongoose.connect(URL).then(()=>{
    console.log('connected..')
}).catch((error)=>{
    console.log(error)
});

const store = new mongoDBStore({
    uri: URL,
    collection: 'sessions',
});

app.use(
    session({
      secret: KEY,
      resave: false,
      saveUninitialized: true,
      store: store,
      cookie:{
        maxAge: 60 * 60 * 1000,
      }
    })
);

app.listen(PORT,()=>{
    console.log('running..')
})

app.use(addEmployee)
app.use(signupEmployee)
app.use(loginUser)
app.use(addLeaveTypes)
app.use(requestLeave)
app.use(adminDashboard)
app.use(fetchAllEmployees)
app.use(fetchLeaveTypes)
app.use(userProfile)
app.use(manageLeave)
app.use(logoutUser)