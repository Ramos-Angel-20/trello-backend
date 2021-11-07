import Task from "../models/task";

export const changeTaskFromList = async (req, res) => {

    const { taskId } = req.params;

    const { columnId } = req.body.body;
    
    console.log(`llego una task con id ${taskId} para la lista ${columnId}`);

    try {

        const task = await Task.update({
            columnId: columnId
        }, {
            where:{
                id: taskId
            } 
        });

        if (!task) {
            throw new Error('An error occured during the product update...');
        }


        res.status(201).json(task);

    } catch (error) {

        res.status(404).json({
            message: error.message
        });
    }
}