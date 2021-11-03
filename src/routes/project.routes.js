import { Router } from 'express';

import { getProjectById, getProjectsList } from '../controllers/projectController';

const router = Router();

// Obtenemos el listado de proyectos/
router.get('/projects/:userId', getProjectsList);

//Obtenemos un proyecto por id, traemos todas sus columnas.
router.get('/project/:projectId', getProjectById);

export default router;