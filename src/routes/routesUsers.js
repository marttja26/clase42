import { Router } from 'express';
import { upload } from '../middlewares/middleware.js';
import { isAuth, isAdmin } from '../middlewares/middleware.js';
import users from '../controllers/users.js';

const routerUsers = new Router();

routerUsers.get('/user', isAuth, users.getUserController);

routerUsers.get('/auth', isAuth, users.getAuth);

routerUsers.get('/admin', isAdmin, users.getAdmin);

routerUsers.get('/logout', isAuth, users.logoutController);

routerUsers.post('/register', upload.single('avatar'), users.registerController);

routerUsers.post('/login', users.loginController);

export default routerUsers;
