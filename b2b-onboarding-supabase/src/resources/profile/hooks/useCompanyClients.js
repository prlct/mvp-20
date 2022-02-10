import { useQuery } from 'react-query';

import * as companyService from 'resources/company/company.service';

import { PROFILE_STATUSES, PROFILE_TYPES } from 'resources/profile/profile.constants';

import profiles from 'resources/profile/profiles.json';

// eslint-disable-next-line no-promise-executor-return
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getCompanyClients = async (companyId) => {
  await sleep(1000);

  return profiles.filter((profile) => profile.company_id === companyId
  && profile.status === PROFILE_STATUSES.ACTIVE
  && profile.type === PROFILE_TYPES.CLIENT);
};

export default async function useCompanyClients() {
  const companyId = await companyService.getCurrentUserCompanyId();

  return useQuery(
    ['profiles.companyClients', companyId],
    () => getCompanyClients(companyId),
  );
}
