import {
  object, string, number, date,
} from 'yup';

const companySchema = object({
  id: string().required(),
  name: string().required(),
  zip: number().positive().integer().required(),
  employees_range: string().required(),
  average_transaction_price_range: string().required(),
  created_at: date().default(() => new Date()),
});

export default companySchema;
