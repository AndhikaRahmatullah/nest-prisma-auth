export interface DataUserInterface {
  id: number;
  email: string;
  name: string;
  active: boolean;
  createdAt: Date | string;
  updatedAt: Date | string | null;
}

export interface UserInterface {
  message: string;
  data: DataUserInterface[];
}

export interface UserDetailInterface {
  message: string;
  data: DataUserInterface;
}
