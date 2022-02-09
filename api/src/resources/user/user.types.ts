import { UserRole } from './user.constants';

export type User = {
  _id: string,
  createdOn: Date,
  updatedOn: Date,
  role: UserRole,
};

export default User;
