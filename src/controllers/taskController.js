import Task from '../models/task';

export const changeTaskFromList = async (req, res) => {

    const { taskId } = req.params;
    const { columnId } = req.body.body;

    try {

        const task = await Task.update({
            columnId: columnId
        }, {
            where: {
                id: taskId
            }
        });

        if (!task) {
            throw new Error('An error occured during the task update...');
        }


        res.status(201).json(task);

    } catch (error) {

        res.status(404).json({
            message: error.message
        });
    }
}

export const addTaskToProject = async (req, res) => {
    const { columnId, description } = req.body;

    try {

        const createdTask = await Task.create({
            description: description,
            columnId: columnId
        });

        if (!createdTask) {
            throw new Error('An error ocurred while creating the task');
        }

        res.status(201).json(createdTask);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

}

export const deleteTaskById = async (req, res) => {
    const { taskId } = req.params;

    try {
        
        const deletedTask = await Task.destroy({
            where: {
                id: taskId
            }
        });

        if (!deletedTask) {
            throw new Error('An error occured while deleting the task...');
        }

        res.status(201).json({
            message: 'Task succesfully deleted'
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}