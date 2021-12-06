import { Router } from 'express';

import { getProjectById, getProjectsList, addProject, deleteProject } from '../controllers/projectController';

const router = Router();

// Obtenemos el listado de proyectos/
router.get('/projects/:userId', getProjectsList);

//Obtenemos un proyecto por id, traemos todas sus columnas.
router.get('/project/:projectId', getProjectById);

router.post('/projects', addProject);

router.delete('/projects/:projectId', deleteProject);

export default router;