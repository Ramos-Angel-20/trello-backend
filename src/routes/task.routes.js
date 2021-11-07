import { Router } from 'express';

import { changeTaskFromList } from '../controllers/taskController';

const router = Router();

router.put('/task/:taskId', changeTaskFromList);

export default router;