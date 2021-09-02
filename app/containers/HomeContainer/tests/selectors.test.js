import { selectHomeContainer, selectRepoName, selectReposData, selectReposError } from '../selectors';

describe('HomeContainer selector tests', () => {
  let mockedState;
  let repoName;
  let reposData;
  let reposError;

  beforeEach(() => {
    repoName = 'mac';
    reposData = { totalCount: 1, items: [{ repoName }] };
    reposError = 'There was some error while fetching the repository details';

    mockedState = {
      homeContainer: {
        repoName,
        reposData,
        reposError
      }
    };
  });
  it('should select the homeContainer state', () => {
    const homeContainerSelector = selectHomeContainer();
    expect(homeContainerSelector(mockedState)).toEqual(mockedState.homeContainer);
  });
  it('should select the repoName', () => {
    const repoSelector = selectRepoName();
    expect(repoSelector(mockedState)).toEqual(repoName);
  });

  it('should select reposData', () => {
    const reposDataSelector = selectReposData();
    expect(reposDataSelector(mockedState)).toEqual(reposData);
  });

  it('should select the reposError', () => {
    const reposErrorSelector = selectReposError();
    expect(reposErrorSelector(mockedState)).toEqual(reposError);
  });
});
