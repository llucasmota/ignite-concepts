import { Router } from 'express';
import multer from 'multer';

import upload from '../config/upload';
import { ensureAutheticated } from '../middlewares/ensureAuthenticated';
import { CreateUsersController } from '../modules/accounts/useCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';

const usersRoutes = Router();

const updateAvatar = multer(upload.upload('./tmp/avatar'));

const createUsersController = new CreateUsersController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post('/', createUsersController.handle);

usersRoutes.patch(
  '/avatar',
  ensureAutheticated,
  updateAvatar.single('avatar'),
  updateUserAvatarController.handle
);

export { usersRoutes };
