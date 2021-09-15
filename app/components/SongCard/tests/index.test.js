/**
 *
 * Tests for MusicCard
 *
 */

import React from 'react';
import { fireEvent } from '@testing-library/dom';
import { renderWithIntl, timeout } from '@utils/testUtils';
import SongCard from '../index';
import { setIntl, translate } from '@app/components/IntlGlobalProvider/';
import getIntl from '@utils/createIntl';

describe('<SongCard/> tests', () => {
  beforeAll(() => {
    setIntl(getIntl());
  });
  const song = {
    trackName: 'Track',
    trackPrice: 200,
    trackId: 1234,
    shortDescription: 'Song Description',
    artworkUrl100:
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fdribbble.com%2Fshots%2F14395014-Music-Logo&psig=AOvVaw3I_T0J8_ZRKW_g4VF_KmKz&ust=1630933127025000&source=images&cd=vfe&ved=2ahUKEwiT5uO-8efyAhWVHLcAHVSbCvQQjRx6BAgAEAk',
    artistName: 'Artist Name',
    previewUrl: 'https://mockurl.com/'
  };

  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<SongCard song={song} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 SongCard component', () => {
    const { getAllByTestId } = renderWithIntl(<SongCard song={song} />);
    expect(getAllByTestId('song-card').length).toBe(1);
  });

  it('should render No-price translation when trackPrice is not available', () => {
    const song = {
      trackName: 'Track',
      trackPrice: null,
      trackId: 1234,
      shortDescription: 'Song Description',
      artworkUrl100:
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fdribbble.com%2Fshots%2F14395014-Music-Logo&psig=AOvVaw3I_T0J8_ZRKW_g4VF_KmKz&ust=1630933127025000&source=images&cd=vfe&ved=2ahUKEwiT5uO-8efyAhWVHLcAHVSbCvQQjRx6BAgAEAk',
      artistName: 'Artist Name',
      previewUrl: 'https://mockurl.com/'
    };

    const { getByTestId } = renderWithIntl(<SongCard song={song} />);
    expect(getByTestId('no-price-tag')).toHaveTextContent(translate('no-price'));
  });

  it('should render the song`s short description accordingly when rendering the card on Home Page / Grid from given from song prop', () => {
    const song = {
      trackName: 'Track',
      trackPrice: 200,
      trackId: 1234,
      shortDescription: 'SongShortDescription',
      artworkUrl100:
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fdribbble.com%2Fshots%2F14395014-Music-Logo&psig=AOvVaw3I_T0J8_ZRKW_g4VF_KmKz&ust=1630933127025000&source=images&cd=vfe&ved=2ahUKEwiT5uO-8efyAhWVHLcAHVSbCvQQjRx6BAgAEAk',
      artistName: 'Artist Name',
      previewUrl: 'https://mockurl.com/'
    };

    const { getByTestId } = renderWithIntl(<SongCard song={song} />);
    expect(getByTestId('para-test')).toHaveTextContent(song.shortDescription);
  });

  it('should render the song`s long description accordingly when rendering the card on Track Details Page from given from song prop', () => {
    const song = {
      trackName: 'Track',
      trackPrice: 200,
      trackId: 1234,
      longDescription: 'LongShortDescription',
      artworkUrl100:
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fdribbble.com%2Fshots%2F14395014-Music-Logo&psig=AOvVaw3I_T0J8_ZRKW_g4VF_KmKz&ust=1630933127025000&source=images&cd=vfe&ved=2ahUKEwiT5uO-8efyAhWVHLcAHVSbCvQQjRx6BAgAEAk',
      artistName: 'Artist Name',
      previewUrl: 'https://mockurl.com/'
    };

    const { getByTestId } = renderWithIntl(<SongCard song={song} />);
    expect(getByTestId('para-test')).toHaveTextContent(song.longDescription);
  });

  it('should disable-Enable the Play-Stop buttons once, song is played or stopped accordingly', async () => {
    let audio;

    const playFn = jest.spyOn(window.HTMLMediaElement.prototype, 'play').mockImplementation(() => {
      audio.paused = !audio.paused;
    });
    const pauseFn = jest.spyOn(window.HTMLMediaElement.prototype, 'pause').mockImplementation(() => {
      audio.paused = !audio.paused;
    });

    const { getByTestId } = renderWithIntl(<SongCard song={song} onActionClick={jest.fn()} />);
    audio = getByTestId('audio-element');
    fireEvent.click(getByTestId('play-btn'));

    await timeout(500);
    expect(getByTestId('play-btn')).toBeDisabled();
    expect(getByTestId('stop-btn')).toBeEnabled();

    expect(playFn).toBeCalled();
    expect(pauseFn).not.toBeCalled();

    fireEvent.click(getByTestId('stop-btn'));

    await timeout(500);

    expect(pauseFn).toBeCalled();
    expect(getByTestId('play-btn')).toBeEnabled();
    expect(getByTestId('stop-btn')).toBeDisabled();
  });
});
