import {
  object, string, array,
} from 'yup';

import {
  PROFILE_STATUSES, PROFILE_TYPES, REALTOR_ROLES, CLIENT_ROLES,
} from 'resources/profile/profile.constants';

const profileSchema = object({
  id: string().required(),
  user_id: string().required(),
  company_id: string().required(),
  first_name: string().required(),
  last_name: string().required(),
  status: string().oneOf(Object.values(PROFILE_STATUSES)).default(PROFILE_STATUSES.ACTIVE),
  type: string().oneOf(Object.values(PROFILE_TYPES)).required(),
  realtor_roles: array().of(
    string().oneOf(Object.values(REALTOR_ROLES)),
  ).nullable(),
  client_roles: array().of(
    string().oneOf(Object.values(CLIENT_ROLES)),
  ).nullable(),
});

export default profileSchema;
