interface ICreateUserDTO {
  name: string;
  username: string;
  password: string;
  email: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  driver_license: string;
}

export type { ICreateUserDTO };
