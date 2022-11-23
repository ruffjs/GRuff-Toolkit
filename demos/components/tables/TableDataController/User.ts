export class User {
  id?: number;
  name!: string;
  email?: string;
  phone!: string;
  password!: string;
  remark!: string;
  roleIds: number[] = [];
  projectIds?: number[];
  allProject: boolean = false;

  constructor() {}
}
