import { generateApiClient } from '@utils/apiUtils';
const searchApi = generateApiClient('itunes');

export const getSearches = (searchTerm) => searchApi.get(`/search?term=${searchTerm}`);
