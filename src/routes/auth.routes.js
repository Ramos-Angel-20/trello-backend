import { Router } from 'express';
import { check } from 'express-validator';

import { register, login } from '../controllers/authController';
import errorValidation from '../middlewares/errorValidation';

const router = Router();

router.post('/register', [
    check('firstName', 'You must provide your first name').not().isEmpty(),
    check('lastName', 'You must provide your last name').not().isEmpty(),
    check('password', 'Password must have at least 6 characters').isLength({ min: 6 }),
    check('email', 'Email provided is not valid').isEmail(),
    errorValidation
], register);

router.post('/login', [
    check('email', 'Email provided is not valid').isEmail(),
    check('password', 'Password must have at least 6 characters').not().isEmpty(),
    errorValidation
], login);

export default router;