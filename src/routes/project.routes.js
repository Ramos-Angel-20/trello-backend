import { Router } from 'express';

import { getProjectById, getProjectsList, addProJect } from '../controllers/projectController';

const router = Router();

router.post('/projects', addProJect);

// Obtenemos el listado de proyectos/
router.get('/projects/:userId', getProjectsList);

//Obtenemos un proyecto por id, traemos todas sus columnas.
router.get('/project/:projectId', getProjectById);


export default router;