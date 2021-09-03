import selectGridContainer, { selectSearchTerm, selectGridData, selectSearchesError } from '../selectors';

describe('GridContainer selector tests', () => {
  let mockedState;
  let searchTerm;
  let searchesError;
  let gridData;

  beforeEach(() => {
    searchTerm = 'Abhishek';
    gridData = { music: 'ABC', music2: 'BCA' };
    searchesError = 'Some error occurred';

    mockedState = {
      gridContainer: {
        searchTerm,
        gridData,
        searchesError
      }
    };
  });

  it('should select the user state', () => {
    const gridContainerSelector = selectGridContainer();
    expect(gridContainerSelector(mockedState)).toEqual(mockedState.gridContainer);
  });

  it('should select the search term', () => {
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
