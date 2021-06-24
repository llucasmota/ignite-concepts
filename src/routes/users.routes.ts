import { Router } from 'express';

import { CreateUsersController } from '../modules/accounts/useCases/createUser/CreateUserController';

const createUsersController = new CreateUsersController();

const usersRoutes = Router();

usersRoutes.post('/', createUsersController.handle);

export { usersRoutes };
