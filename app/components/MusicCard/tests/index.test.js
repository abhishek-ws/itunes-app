/**
 *
 * Tests for MusicCard
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl } from '@utils/testUtils';
import MusicCard from '../index';

describe('<MusicCard />', () => {
  const song = {
    shortDescription: 'Song Description',
    artworkUrl100:
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fdribbble.com%2Fshots%2F14395014-Music-Logo&psig=AOvVaw3I_T0J8_ZRKW_g4VF_KmKz&ust=1630933127025000&source=images&cd=vfe&ved=2ahUKEwiT5uO-8efyAhWVHLcAHVSbCvQQjRx6BAgAEAk',
    artistName: 'Artist Name'
  };

  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<MusicCard song={song} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 MusicCard component', () => {
    const { getAllByTestId } = renderWithIntl(<MusicCard song={song} />);
    expect(getAllByTestId('music-card').length).toBe(1);
  });
});
