import {
  object, string,
} from 'yup';

const userSchema = object({
  id: string().required(),
  email: string().required(),
  phoneNumber: string().nullable(),
});

export default userSchema;
