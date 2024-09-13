const todoModel = require('../model/todo');

exports.updateTodo = async(req,res) => {
    try {
        const {id} = req.params;
        const {title,description} = req.body;

        const todos = await todoModel.findByIdAndUpdate(
            {
                _id: id
            },
            {
                title, description, updatedAt: Date.now()
            }
        );

        res.status(200).json({
            success: true,
            data: todos,
            message: "Updated Succesfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500);
    }
}