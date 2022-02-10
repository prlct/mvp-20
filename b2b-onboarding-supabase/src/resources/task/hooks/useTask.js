import { useQuery } from 'react-query';

import tasks from 'resources/task/tasks.json';

// eslint-disable-next-line no-promise-executor-return
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getTask = async (id) => {
  await sleep(1000);

  return tasks.find((task) => task.id === id);
};

export default function useTask(id) {
  return useQuery(
    ['tasks.getById', id],
    () => getTask(id),
  );
}
