import Project from '../models/project';
import Column from '../models/column';

import fetchTask from '../helpers/fetchTask';

export const getProjectsList = async (req, res) => {

    const { userId } = req.params;

    try {

        const userProjects = await Project.findAll({
            attributes: ['id', 'title', 'description'],
            where: {
                userId: userId
            }
        });

        if (!userProjects || userProjects.length < 1) {
            throw new Error('There was an error fetching the projects...');
        }

        res.status(200).json(userProjects);

    } catch (error) {

        res.status(404).json({
            message: error.message
        });
    }
}

export const getProjectById = async (req, res) => {
    const { projectId } = req.params;

    try {

        const retrivedProject = await Project.findByPk(projectId, {
            attributes: ['id', 'title', 'description']
        });

        if (!retrivedProject) {
            throw new Error(`Theres no project with id ${projectId}`);
        }

        const retrivedColumns = await Column.findAll({
            attributes: ['id', 'title', 'createdAt'],
            where: {
                projectId: projectId
            }
        });


        let taskPromises = []; //Arreglo para el promise.all
        if (retrivedColumns) {
            
            for(const column of retrivedColumns) {
                const task = fetchTask(column.id);
                taskPromises.push(task);
            }
        }

        const responseTasks = await Promise.all(taskPromises);
        const retrivedTasks = responseTasks.flatMap(item => item); //Usamos flatMap para evitar tener un arreglo de arreglos.

        const projectResponse = {
            project: retrivedProject,
            columns: retrivedColumns,
            tasks: retrivedTasks
        };

        res.status(200).json(projectResponse);

    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
}