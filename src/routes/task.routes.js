import { Router } from 'express';

import { changeTaskFromList, addTaskToProject, deleteTaskById } from '../controllers/taskController';

const router = Router();

router.put('/task/:taskId', changeTaskFromList);
router.post('/task', addTaskToProject);
router.delete('/task/:taskId', deleteTaskById);

export default router;