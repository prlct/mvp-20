import { useQuery } from 'react-query';

import * as userService from 'resources/user/user.service';

import transactions from 'resources/transaction/transactions.json';

// eslint-disable-next-line no-promise-executor-return
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getUserTransactions = async (userId) => {
  await sleep(1000);

  return transactions.filter((transaction) => transaction.user_id === userId);
};

export default async function useUserTransactions() {
  const userId = userService.getUserId();

  return useQuery(
    ['transactions.getByUserId', userId],
    () => getUserTransactions(userId),
  );
}
