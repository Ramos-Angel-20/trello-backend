import { Router } from 'express';

import { addColumn, deleteColumnById, changeColumnTitle } from '../controllers/columnController';

const router = Router();

router.post('/column/:projectId', addColumn);

router.put('/column/:columnId', deleteColumnById);

router.patch('/column/:columnId', changeColumnTitle);

export default router;