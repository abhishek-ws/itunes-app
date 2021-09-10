import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from '@utils/apiUtils';
import { getSongs, getTrackDetails } from '../songsApi';

describe('SearchApi tests', () => {
  const songName = 'Abhi';
  const trackId = 1234;
  it(' getSongs Api should make the api call to "/search?term="', async () => {
    const mock = new MockAdapter(getApiClient().axiosInstance);
    const data = [
      {
        resultCount: 1,
        results: [{ songName }]
      }
    ];
    mock.onGet(`/search?term=${songName}`).reply(200, data);
    const res = await getSongs(songName);
    expect(res.data).toEqual(data);
  });

  it('getTrackDetails Api should make the api call to "/lookup/id="', async () => {
    const mock = new MockAdapter(getApiClient().axiosInstance);
    const data = [
      {
        resultCount: 1,
        results: [{ songName }]
      }
    ];
    mock.onGet(`/lookup?id=${trackId}`).reply(200, data);
    const res = await getTrackDetails(trackId);
    expect(res.data).toEqual(data);
  });
});
