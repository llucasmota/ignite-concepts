import 'reflect-metadata';

import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

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
    const passwordHash = await hash(password, 8);

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    await this.usersRepository.create({
      email,
      name,
      password: passwordHash,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
