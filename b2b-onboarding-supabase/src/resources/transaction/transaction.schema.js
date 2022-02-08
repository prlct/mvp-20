import {
  object, string, array, date, number,
} from 'yup';

const transactionSchema = object({
  id: string().required(),
  user_id: string().required(),
  type: string().oneOf(['seller', 'buyer']).required(),
  image_url: string().nullable(),
  address: object({
    line1: string().nullable(),
    line2: string().nullable(),
    city: string().nullable(),
    state: string().nullable(),
    zip: number().positive().integer().nullable(),
  }),
  task_ids: array().of(string()).default([]),
  status: string().oneOf(['active', 'finished']).default('active'),
  fileUrls: array().of(string()).default([]),
  closing_on: date().required(),
});

export default transactionSchema;
