import {
  selectSearchError,
  selectGridData,
  selectSearchTerm,
  selectItunesContainer,
  selectItunesContainerDomain,
  selectTrackId,
  selectTrackDetails,
  selectSongsCache,
  selectTrackSearchError
} from '../selectors';
import { initialState } from '../reducer';

describe('ItunesContainer selector tests', () => {
  let mockedState;
  let searchTerm;
  let gridData;
  let searchError;
  let trackId;
  let trackSearchError;
  let songsCache;
  let trackDetails;
  let mockedStateWithoutInitialState = {};

  beforeEach(() => {
    searchTerm = 'Disco';
    gridData = { songName: 'Disco', songArtist: 'Disco Man' };
    searchError = 'Some Error Occurred';
    trackId = 12345;
    trackSearchError = 'Some Error Occurred';
    songsCache = { song1: 'SomeSong', songName1: 'AnotherSong' };
    trackDetails = { songName: 'Song1', artist: 'Artist' };
    mockedState = {
      itunesContainer: {
        searchTerm,
        gridData,
        searchError,
        trackId,
        songsCache,
        trackDetails,
        trackSearchError
      }
    };
  });

  it('should return state', () => {
    expect(selectItunesContainerDomain(mockedState)).toEqual(mockedState.itunesContainer);
  });

  it('should return initialState', () => {
    expect(selectItunesContainerDomain(mockedStateWithoutInitialState)).toEqual(initialState);
  });

  it('should select the user state', () => {
    const itunesContainerSelector = selectItunesContainer();
    expect(itunesContainerSelector(mockedState)).toEqual(mockedState.itunesContainer);
  });

  it('should select the searchTerm', () => {
    const searchTermSelector = selectSearchTerm();
    expect(searchTermSelector(mockedState)).toEqual(searchTerm);
  });

  it('should select the gridData', () => {
    const gridDataSelector = selectGridData();
    expect(gridDataSelector(mockedState)).toEqual(gridData);
  });

  it('should select the searchError', () => {
    const searchErrorSelector = selectSearchError();
    expect(searchErrorSelector(mockedState)).toEqual(searchError);
  });

  it('should select trackId', () => {
    const trackIdSelector = selectTrackId();
    expect(trackIdSelector(mockedState)).toEqual(trackId);
  });

  it('should select trackDetails', () => {
    const trackDetailSelector = selectTrackDetails();
    expect(trackDetailSelector(mockedState)).toEqual(trackDetails);
  });

  it('should select songsCache', () => {
    const songsCacheSelector = selectSongsCache();
    expect(songsCacheSelector(mockedState)).toEqual(songsCache);
  });

  it('should select trackSearchError', () => {
    const trackSearchErrorSelector = selectTrackSearchError();
    expect(trackSearchErrorSelector(mockedState)).toEqual(trackSearchError);
  });
});
