import { generateApiClient } from '@utils/apiUtils';
const searchApi = generateApiClient('github');

export const getRepos = (repoName) => searchApi.get(`/search/repositories?q=${repoName}`);
