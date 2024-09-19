const express = require('express');
const router = express.Router();
const user = require('../model/userModel');

const {signup, login} = require('../controller/auth');
const {auth, isStudent, isAdmin, isVisitor} = require('../middleware/check');

// authentication routes
router.post('/signup', signup);
router.post('/login', login)

//protected routes
router.get('/student', auth, isStudent, (req,res) => {
    res.json({
        success: true,
        message: "Routes for Student"
    })
})

router.get('/admin', auth, isAdmin, (req,res) => {
    res.json({
        success: true,
        message: "Routes for Admin"
    })
})

router.get('/visitor', auth, isVisitor, (req,res)=> {
    res.json({
        success: true,
        message: "Route for Visitor"
    })
})

router.get('/test', auth, (req,res)=> {
    res.json({
        success: true,
        message: "Test Route Successfull"
    })
})

router.get('/getData', auth, async (req,res)=> {
    try {
        const id = req.user.id;
        const userData = await user.findById(id);

        res.status(200).json({
            success: true,
            userData,
            message: "User Data Extracted"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            userexist,
            message: "Error in Data Extraction"
        })
    }
})


module.exports = router;