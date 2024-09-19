const jwt = require('jsonwebtoken');

require('dotenv').config();

exports.auth = (req,res,next) => {
    try {
        const token = req.cookies.token || req.header('Authorization').replace('Bearer ','');

        if(!token){
            res.json({
                success: false,
                message: ' "Token Missing" '
            })
        }

        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;

        } catch (error){
            return res.status(401).json({
                success: false,
                message: "Invalid Token"
            })
        }
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Something went Wrong with Token verification"
        })
    }
}

exports.isStudent = (req,res,next) => {
    try {
        if(req.user.role !== "Student"){
            return res.status(401).json({
                success: false,
                message: "You don't have access to Student route"
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to Verify User Role"
        })
    }
}

exports.isAdmin = (req,res,next) => {
    try {
        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success: false,
                message: "You don't have access to Admin route"
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to Verify User Role"
        })
    }
}

exports.isVisitor = (req,res,next) => {
    try {
        if(req.user.role !== "Visitor"){
            return res.status(401).json({
                success: false,
                message: "You don't have access to Visitor route"
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to Verify User Role"
        })
    }
}
