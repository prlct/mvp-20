import {
  object, string, array, date,
} from 'yup';

import { TASK_STATUSES, TASK_ASSIGN_TYPES } from 'resources/task/task.constants';

const taskSchema = object({
  id: string().required(),
  status: string().oneOf(Object.values(TASK_STATUSES)).default(TASK_STATUSES.ACTIVE),
  title: string().required(),
  description: string().nullable(),
  assignedTo: array().of(Object.values(TASK_ASSIGN_TYPES)).required(),
  created_at: date().default(() => new Date()),
  file_urls: array().of(string()).default([]),
});

export default taskSchema;
