import {
  object, string, array, date,
} from 'yup';

const taskSchema = object({
  id: string().required(),
  status: string().oneOf(['active', 'finished']).default('active'),
  title: string().required(),
  description: string().nullable(),
  created_at: date().default(() => new Date()),
  file_urls: array().of(string()).default([]),
});

export default taskSchema;
