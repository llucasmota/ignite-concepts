/* eslint-disable @typescript-eslint/naming-convention */
import { injectable, inject } from 'tsyringe';
import 'reflect-metadata';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) { }

  async exectute({
    email,
    name,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    await this.usersRepository.create({
      email,
      name,
      password,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
