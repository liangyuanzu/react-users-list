export interface SingleUserType {
  id: number;
  name: string;
  email: string;
  create: string;
  update_time: string;
  create_time: string;
  status: number;
}

export interface FormValues {
  [name: string]: any;
}
