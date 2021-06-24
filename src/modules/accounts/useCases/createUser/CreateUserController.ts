/* eslint-disable @typescript-eslint/naming-convention */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import 'reflect-metadata';

import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, name, password, driver_license } = request.body;

    const createUseCase = container.resolve(CreateUserUseCase);

    await createUseCase.exectute({
      email,
      name,
      password,
      driver_license,
    });

    return response.status(201).send();
  }
}

export { CreateUsersController };
