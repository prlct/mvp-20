import _ from 'lodash';
import User from './user.types';

const privateFields = [
  'passwordHash',
  'signupToken',
  'resetPasswordToken',
];

export function getPublic(user: User) {
  return _.omit(user, privateFields);
}
