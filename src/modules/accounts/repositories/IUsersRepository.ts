/* eslint-disable @typescript-eslint/naming-convention */
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';

interface IUserRepository {
  create(data: ICreateUserDTO): Promise<void>;
}

export type { IUserRepository };
