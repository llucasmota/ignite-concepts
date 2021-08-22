import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    // receber arquivo

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const avatar_file = request.file.filename;

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    // eslint-disable-next-line @typescript-eslint/naming-convention
    await updateUserAvatarUseCase.execute({ user_id: id, avatar_file });

    return response.status(204).send();
  }
}

export { UpdateUserAvatarController };
