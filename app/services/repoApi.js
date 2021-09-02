import { generateApiClient } from '@utils/apiUtils';
const repoApi = generateApiClient('github');
const searchApi = generateApiClient('itunes');

export const getRepos = (repoName) => repoApi.get(`/search/repositories?q=${repoName}`);
export const getSearches = (searchTerm) => searchApi.get(`/search?term=${searchTerm}`);
