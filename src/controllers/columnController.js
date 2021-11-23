import Column from '../models/column';
import Task from '../models/task';
import { db } from '../db/database';
import { deleteTask } from '../helpers/deleteTask';

export const addColumn = async (req, res) => {

    const { projectId } = req.params;
    const { columnTitle } = req.body;

    console.log('llego algo', columnTitle, projectId);

    try {

        const result = await Column.create({
            title: columnTitle,
            projectId: projectId
        });

        if (!result) {
            throw new Error('An error ocurred while creating the new column');
        }
        console.log(result);
        res.status(201).json(result);

    } catch (error) {
        res.status(500).json({
            message: error
        });
    }

}

export const deleteColumnById = async (req, res) => {

    const { columnId } = req.params;
    const { tasksIds } = req.body;

    const t = await db.transaction();

    try {

        const deletedColumn = await Column.destroy({
            where: {
                id: columnId
            },
            transaction: t
        });

        const deletePromises = [];

        for (const taskId of tasksIds) {
            deletePromises.push(deleteTask(taskId, t));
        }

        const deletedTasks = await Promise.all(deletePromises);

        await t.commit();

        res.status(201).json({
            deletedColumn,
            deletedTasks,
            message: 'Column deleted with all the tasks'
        });


    } catch (error) {
        console.log(error);
        t.rollback();
        res.status(500).json({
            message: 'Something went wrong while deleting the column'
        });
    }
}

export const changeColumnTitle = async (req, res) => {

    const { columnId } = req.params;
    const { newTitle } = req.body;

    console.log('llego algo')
    try {

        const updatedColumn = await Column.update({
            title: newTitle
        }, {
            where: {
                id: columnId
            }
        });

        console.log(updatedColumn);

        if (!updatedColumn) {
            throw new Error('An error ocurred while changing the column title...');
        }

        res.status(201).json({
            message: 'Column title changed succesfully'
        });

    } catch (error) {
        
        console.log(err);
        
        res.status(500).json({
            message: error.message
        });
    }
}

