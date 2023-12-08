const express = require('express')
const router = express.Router()

router.post('/logout', async(req, res)=>{
    req.session.destroy((error) =>{
        if(error){
            console.log(error)
            return res.status(500).json({message: 'Logout failed'})
        }
        res.clearCookie('connect.sid')
        return res.status(200).json({message: 'Logout successfull'})
    })
}) 

module.exports = router