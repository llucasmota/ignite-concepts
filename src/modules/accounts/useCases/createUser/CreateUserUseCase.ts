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
    username,
  }: ICreateUserDTO): Promise<void> {
    await this.usersRepository.create({
      email,
      name,
      password,
      driver_license,
      username,
    });
  }
}

export { CreateUserUseCase };
