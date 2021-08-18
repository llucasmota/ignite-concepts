import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '../errors/AppError';
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
    throw new AppError('Token missing', 401);
  }
  const [, token] = authorization.split(' ');

  try {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { sub: user_id } = verify(
      token,
      '370f2ed80fb8f2311a135806591fc23f'
    ) as IPayload;

    const user = await userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists!', 401);
    }
    next();
  } catch (err) {
    throw new AppError('Error');
  }
}
