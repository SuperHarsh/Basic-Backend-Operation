const todoModel = require('../model/todo');

exports.createTodo = async(req,res) => {
    try {
        const {title,description} = req.body;
        const response = await todoModel.create({title,description});
        res.status(200).json({
            success: true,
            data: response,
            message: "Entry Created Succesfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            data: "Server Error",
            message: error.message
        });

    }
}