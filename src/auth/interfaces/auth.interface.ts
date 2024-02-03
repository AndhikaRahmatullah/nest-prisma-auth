export interface DataRegisterAuthInterface {
  id: number;
  email: string;
  name: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface RegisterAuthInterface {
  message: string;
  data: DataRegisterAuthInterface;
}

export interface PayloadLoginAuthInterface {
  email: string;
  password: string;
}

export interface PayloadRegisterAuthInterface {
  name: string;
  email: string;
  password: string;
}
