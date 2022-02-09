import Joi from 'joi';
import { UserRole } from 'resources/user/user.constants';

const schema = Joi.object({
  _id: Joi.string(),
  createdOn: Joi.date(),
  updatedOn: Joi.date(),
  role: Joi.string().allow(...Object.values(UserRole)).default(UserRole.OWNER),
});

export default schema;
