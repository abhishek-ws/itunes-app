import { generateApiClient } from '@utils/apiUtils';
const songsApi = generateApiClient('itunes');

export const getSongs = (searchTerm) => songsApi.get(`/search?term=${searchTerm}`);
export const getTrackDetails = (trackId) => songsApi.get(`/lookup?id=${trackId}`);
