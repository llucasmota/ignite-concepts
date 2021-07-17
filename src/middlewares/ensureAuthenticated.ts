import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

interface IPayload {
  sub: string;
}

export async function ensureAutheticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const userRepository = new UsersRepository();

  const { authorization } = request.headers;
  if (!authorization) {
    throw new Error('Token missing');
  }
  const [, token] = authorization.split(' ');

  try {
    const { sub: user_id } = verify(
      token,
      '370f2ed80fb8f2311a135806591fc23f'
    ) as IPayload;

    const user = await userRepository.findById(user_id);

    if (!user) {
      throw new Error('User does not exists!');
    }
    next();
  } catch (err) {
    throw new Error(' um errinho');
  }
}
