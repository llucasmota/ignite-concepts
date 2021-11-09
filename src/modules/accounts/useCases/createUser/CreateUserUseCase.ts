import 'reflect-metadata';

import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

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
    // eslint-disable-next-line @typescript-eslint/naming-convention
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const passwordHash = await hash(password, 8);

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError('User already exists');
    }

    await this.usersRepository.create({
      email,
      name,
      password: passwordHash,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      driver_license,
    });
  }
}

export { CreateUserUseCase };
