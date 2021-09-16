/**
 *
 * Tests for ItunesContainer
 *
 */
import React from 'react';
import { renderWithIntl, timeout } from '@utils/testUtils';
import { fireEvent } from '@testing-library/dom';
import { ItunesContainerTest as ItunesContainer, mapDispatchToProps } from '../index';

describe('ItunesContainer Tests', () => {
  let mockDispatchSearch;

  beforeEach(() => {
    mockDispatchSearch = jest.fn();
  });

  it('should render and match to the snapshot', () => {
    const { baseElement } = renderWithIntl(<ItunesContainer dispatchSearchSongs={mockDispatchSearch} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dispatchClearGridData on empty change in SerchBox', async () => {
    const searchSongsSpy = jest.fn();
    const clearGridDataSpy = jest.fn();

    const { getByTestId } = renderWithIntl(
      <ItunesContainer dispatchSearchSongs={searchSongsSpy} dispatchClearGridData={clearGridDataSpy} />
    );

    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'a' }
    });
    await timeout(500);
    expect(searchSongsSpy).toBeCalled();
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: '' }
    });
    await timeout(500);
    expect(clearGridDataSpy).toBeCalled();
  });

  it('should call dispatchSearchSongs on change', async () => {
    const { getByTestId } = renderWithIntl(<ItunesContainer dispatchSearchSongs={mockDispatchSearch} />);
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'Despacito' }
    });
    await timeout(500);
    expect(mockDispatchSearch).toBeCalled();
  });

  it('should update the loading state and render the Grid when gridData is available', () => {
    const gridData = {
      resultCount: 50,
      results: [{ songName: 'Song1' }, { songName: 'Song2' }]
    };
    const { getByTestId } = renderWithIntl(<ItunesContainer gridData={gridData} />);
    expect(getByTestId('for')).toBeInTheDocument();
  });

  it('should dispatchSearchSongs on load, if searchTerm is already persisted and avaiable', async () => {
    const searchTerm = 'Justin Beiber';
    renderWithIntl(<ItunesContainer searchTerm={searchTerm} dispatchSearchSongs={mockDispatchSearch} />);
    await timeout(500);
    expect(mockDispatchSearch).toBeCalled();
  });

  it('should validate mapDispatchToProps actions', async () => {
    const dispatchSearchSpy = jest.fn();
    const searchTerm = 'Justin Beiber';
    const actions = {
      dispatchSearchSongs: { searchTerm, type: 'SEARCH_ITUNES' },
      dispatchClearGridData: { type: 'CLEAR_GRID_DATA' }
    };

    const props = mapDispatchToProps(dispatchSearchSpy);
    props.dispatchSearchSongs(searchTerm);
    expect(dispatchSearchSpy).toHaveBeenCalledWith(actions.dispatchSearchSongs);

    await timeout(500);
    props.dispatchClearGridData();
    expect(dispatchSearchSpy).toHaveBeenCalledWith(actions.dispatchClearGridData);
  });

  it('should render the error message', async () => {
    const { getByTestId } = renderWithIntl(
      <ItunesContainer dispatchSearchSongs={mockDispatchSearch} searchError="error" />
    );

    await timeout(500);
    expect(getByTestId('itunes-error-message')).toBeInTheDocument();
  });

  it('should render the default message', async () => {
    const { getByTestId } = renderWithIntl(<ItunesContainer dispatchSearchSongs={mockDispatchSearch} />);

    await timeout(500);
    expect(getByTestId('default-message')).toBeInTheDocument();
  });

  it('should make sure, the number of SongCard rendered should be equal to the number of Grid results', () => {
    const resultCount = 3;
    const gridData = {
      resultCount,
      results: [{ songName: 'Song1' }, { songName: 'song2' }, { songName: 'song3' }]
    };

    const { getAllByTestId } = renderWithIntl(
      <ItunesContainer dispatchSearchSongs={mockDispatchSearch} gridData={gridData} />
    );

    expect(getAllByTestId('song-card')).toHaveLength(resultCount);
  });
});
