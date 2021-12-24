import express from 'express';
import { signup, login } from '../Controllers/AccountController';
let PostController = require('../Controllers/PostController');

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);




export default router;