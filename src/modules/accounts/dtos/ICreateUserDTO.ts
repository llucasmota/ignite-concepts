interface ICreateUserDTO {
  name: string;
  password: string;
  email: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  driver_license: string;
  avatar?: string;
  id?: string;
}

export type { ICreateUserDTO };
