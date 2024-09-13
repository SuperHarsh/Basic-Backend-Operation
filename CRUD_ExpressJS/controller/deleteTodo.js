const todoModel = require('../model/todo');

exports.deleteTodo = async(req,res) => {
    try {
        const {id} = req.params;

        await todoModel.findByIdAndDelete(id); 

        res.status(200).json({
            success: true,
            message: "Todo Deleted"
        })
    } catch (error) {
        console.log(error);
        res.status(500);
    }
}