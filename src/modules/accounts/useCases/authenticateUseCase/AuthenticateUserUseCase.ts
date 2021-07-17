import 'reflect-metadata';

import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}
@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) { }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    // Usário existe?
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new Error('Email or password incorrect');
    }
    // Senha está correta?

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Email or password incorrect');
    }
    // gerar jsonWebToken

    const token = sign({}, 'rentx-370f2ed80fb8f2311a135806591fc23f', {
      subject: user.id,
      expiresIn: '1d',
    });
    return { user: { name: user.name, email: user.email }, token };
  }
}

export { AuthenticateUserUseCase };
