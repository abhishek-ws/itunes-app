import {
  selectSearchesError,
  selectGridData,
  selectSearchTerm,
  selectItunesContainer,
  selectItunesContainerDomain
} from '../selectors';

describe('ItunesContainer selector tests', () => {
  let mockedState;
  let searchTerm;
  let gridData;
  let searchesError;

  beforeEach(() => {
    searchTerm = 'Disco';
    gridData = { songName: 'Disco', songArtist: 'Disco Man' };
    searchesError = 'Some Error Occurred';

    mockedState = {
      itunesContainer: {
        searchTerm,
        gridData,
        searchesError
      }
    };
  });

  it('should return state', () => {
    expect(selectItunesContainerDomain(mockedState)).toEqual(mockedState.itunesContainer);
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

  it('should select the searchesError', () => {
    const searchesErrorSelector = selectSearchesError();
    expect(searchesErrorSelector(mockedState)).toEqual(searchesError);
  });
});
