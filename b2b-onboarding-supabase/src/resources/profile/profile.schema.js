import {
  object, string, array,
} from 'yup';

const profileSchema = object({
  id: string().required(),
  user_id: string().required(),
  company_id: string().required(),
  first_name: string().required(),
  last_name: string().required(),
  status: string().oneOf(['active', 'blocked']).default('active'),
  type: string().oneOf(['client', 'realtor']).required(),
  realtor_roles: array().of(
    string().oneOf(['owner']),
  ).nullable(),
  client_roles: array().of(
    string().oneOf(['seller', 'buyer']),
  ).nullable(),
});

export default profileSchema;
