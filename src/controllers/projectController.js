import Project from '../models/project';
import Column from '../models/column';

import fetchTask from '../helpers/fetchTask';

export const getProjectsList = async (req, res) => {

    const { userId } = req.params;

    try {

        const userProjects = await Project.findAll({
            attributes: ['id', 'title', 'createdAt'],
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
            attributes: ['id', 'title']
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

            for (const column of retrivedColumns) {
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

export const addProject = async (req, res) => {
    const { projectTitle, userId } = req.body;

    console.log(projectTitle, userId);

    try {

        const createdProject = await Project.create({
            title: projectTitle,
            userId: userId
        });



        if (!createdProject) {
            throw new Error('An error occurred while creating the project...');
        }

        res.status(201).json({
            createdProject
        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });
    }
}

export const deleteProject = async (req, res) => {

    const { projectId } = req.params;

    console.log(`llego un id para borrar: ${projectId}`);

    try {
        
        const deletedProject = await Project.destroy({where: {
            id: projectId
        }});

        if (!deletedProject) {
            throw new Error(`An error ocurred while deleting the project whit id: ${projectId}`);
        }

        res.status(201).json({
            deletedProject 
        });

    } catch (error) {
        console.log(error);

        res.status(400).json({
            message: error.message
        });
    }    

}