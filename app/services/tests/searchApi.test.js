import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from '@utils/apiUtils';
import { getSearches } from '../repoApi';
import { searchResults } from './searchTestResult';

describe('Search Itunes Api tests', () => {
  const searchTerm = 'Michael';
  it('should make the api call to "/search?term="', async () => {
    const mock = new MockAdapter(getApiClient().axiosInstance);
    mock.onGet(`/search?term=${searchTerm}`).reply(200, searchResults);
    const res = await getSearches(searchTerm);
    expect(res.data).toEqual(searchResults);
  });
});
