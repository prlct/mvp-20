import { useQuery } from 'react-query';

import { TASK_STATUSES } from 'resources/task/task.constants';

import tasks from 'resources/task/tasks.json';

// eslint-disable-next-line no-promise-executor-return
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getCompletedTasks = async () => {
  await sleep(1000);

  return tasks.filter((task) => task.status === TASK_STATUSES.COMPLETED);
};

export default function useCompetedTasks() {
  return useQuery(
    ['tasks.completed'],
    getCompletedTasks,
  );
}
