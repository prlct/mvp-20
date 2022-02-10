import {
  object, string, array, date, number,
} from 'yup';

import { TRANSACTION_TYPES, TRANSACTION_STATUSES } from 'resources/transaction/transaction.constants';

const transactionSchema = object({
  id: string().required(),
  user_id: string().required(),
  type: string().oneOf(Object.values(TRANSACTION_TYPES)).required(),
  image_url: string().nullable(),
  address: object({
    line1: string().nullable(),
    line2: string().nullable(),
    city: string().nullable(),
    state: string().nullable(),
    zip: number().positive().integer().nullable(),
  }),
  task_ids: array().of(string()).default([]),
  status: string().oneOf(Object.values(TRANSACTION_STATUSES)).default(TRANSACTION_STATUSES.ACTIVE),
  fileUrls: array().of(string()).default([]),
  closing_on: date().required(),
});

export default transactionSchema;
