import {
  object, string,
} from 'yup';

const userSchema = object({
  id: string().required(),
  email: string().required(),
  passwordEncoded: string().nullable(),
  phoneNumber: string().nullable(),
  raw_user_meta_data: object().nullable(),
});

export default userSchema;
