import {
  selectSearchError,
  selectGridData,
  selectSearchTerm,
  selectItunesContainer,
  selectItunesContainerDomain
} from '../selectors';

describe('ItunesContainer selector tests', () => {
  let mockedState;
  let searchTerm;
  let gridData;
  let searchError;
  let mockedStateWithoutInitialState = {};
  let initialState = {
    gridData: {},
    searchError: null,
    searchTerm: null
  };

  beforeEach(() => {
    searchTerm = 'Disco';
    gridData = { songName: 'Disco', songArtist: 'Disco Man' };
    searchError = 'Some Error Occurred';

    mockedState = {
      itunesContainer: {
        searchTerm,
        gridData,
        searchError
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
});
