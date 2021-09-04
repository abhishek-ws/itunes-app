import { generateApiClient } from '@utils/apiUtils';
const songsApi = generateApiClient('itunes');

export const getSongs = (searchTerm) => songsApi.get(`/search?term=${searchTerm}`);
