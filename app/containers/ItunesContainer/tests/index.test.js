/**
 *
 * Tests for ItunesContainer
 *
 */
import React from 'react';
import { timeout, renderProvider } from '@utils/testUtils';
import { fireEvent } from '@testing-library/dom';
import { ItunesContainerTest as ItunesContainer } from '../index';

describe('ItunesContainer Tests', () => {
  let mockDispatchSearch;

  beforeEach(() => {
    mockDispatchSearch = jest.fn();
  });
  it('should render and match to the snapshot', () => {
    const { baseElement } = renderProvider(<ItunesContainer dispatchSearchSongs={mockDispatchSearch} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dispatchClearGridData on empty change in SerchBox', async () => {
    const searchSongsSpy = jest.fn();
    const clearGridDataSpy = jest.fn();

    const { getByTestId } = renderProvider(
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
    const { getByTestId } = renderProvider(<ItunesContainer dispatchSearchSongs={mockDispatchSearch} />);
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'Despacito' }
    });
    await timeout(500);
    expect(mockDispatchSearch).toBeCalled();
  });
});
