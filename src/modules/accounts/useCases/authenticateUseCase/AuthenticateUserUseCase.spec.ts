/* eslint-disable @typescript-eslint/naming-convention */

import { AppError } from '@errors/AppError';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/InMemoryUsersRepository';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });
  it('Must be possible Autheticate user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '3232343',
      email: 'teste@teste.com',
      name: 'Naruto Silva',
      password: 'erewe34343',
    };

    await createUserUseCase.exectute(user);

    const authenticate = await authenticateUseCase.execute({
      email: user.email,
      password: user.password,
    });
    expect(authenticate).toHaveProperty('token');
  });
  it('Should not be able to authenticate with invalid passoword', async () => {
    const user: ICreateUserDTO = {
      driver_license: '323dsds',
      email: 'test@test.com',
      name: 'Naruto Oliveira',
      password: 'erewe34343',
    };
    const invalidPassword = '333333';

    await createUserUseCase.exectute(user);

    expect(async () => {
      const authenticate = await authenticateUseCase.execute({
        email: user.email,
        password: invalidPassword,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able to authenticate with invalid email', async () => {
    const user: ICreateUserDTO = {
      driver_license: '323dsds',
      email: 'test@test.com',
      name: 'Naruto Oliveira',
      password: 'erewe34343',
    };
    const invalidMail = 'luc@luc.com';

    await createUserUseCase.exectute(user);

    expect(async () => {
      const authenticate = await authenticateUseCase.execute({
        email: invalidMail,
        password: user.password,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it('Should be not be able to autheticate a nonexistent user', async () => {
    const user: ICreateUserDTO = {
      driver_license: 'sdsdsds',
      email: 'tes@tes.com',
      name: 'Naruto Costa',
      password: 'erewe34',
    };
    expect(async () => {
      const authenticate = await authenticateUseCase.execute({
        email: user.email,
        password: user.password,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
