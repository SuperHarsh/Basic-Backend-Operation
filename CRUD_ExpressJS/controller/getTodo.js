const todoModel = require('../model/todo');

exports.getTodo = async(req,res) => {
    try {
        const todos = await todoModel.find({});

        res.status(200).json({
            success: true,
            data: todos,
            message: "All data fetched"
        })
    } catch (error) {
        console.log(error);
        res.status(500);
    }
}

exports.getTodoByID = async(req,res) => {
    try {
        const id = req.params.id;
        const todos = await todoModel.findById({_id: id});

        if(!todos){
            res.status(404).json({
                success: false,
                data: todos,
                message: "No data fetched"
            })
        }else{
            res.status(200).json({
                success: true,
                data: todos,
                message: "data fetched"
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500);
    }
}