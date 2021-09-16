/**
 *
 * Tests for TrackDetails
 *
 *
 */

import React from 'react';
import { timeout, renderWithIntl } from '@utils/testUtils';
import { mapDispatchToProps, TrackDetailsTest as TrackDetails } from '../index';
import getIntl from '@utils/createIntl';
import { setIntl } from '@app/components/IntlGlobalProvider/';
import { itunesContainerTypes } from '../../reducer';

describe('<TrackDetails /> container tests', () => {
  let submitSpyTrackSearch;
  let submitSpyClearTrackDetails;
  beforeEach(() => {
    submitSpyTrackSearch = jest.fn();
    submitSpyClearTrackDetails = jest.fn();
  });

  beforeAll(() => {
    setIntl(getIntl());
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(
      <TrackDetails dispatchTrackSearch={submitSpyTrackSearch} dispatchClearTrackDetails={submitSpyClearTrackDetails} />
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('should dispatch ClearTrackDetails and SearchTrack in sequence when first mounted', async () => {
    renderWithIntl(
      <TrackDetails dispatchTrackSearch={submitSpyTrackSearch} dispatchClearTrackDetails={submitSpyClearTrackDetails} />
    );
    await timeout(500);
    expect(submitSpyClearTrackDetails).toBeCalled();
    expect(submitSpyTrackSearch).toBeCalled();
  });

  it('should validate mapDispatchToProps actions', async () => {
    const dispatchSearchSpy = jest.fn();
    const trackId = 1234;
    const actions = {
      dispatchTrackSearch: { trackId, type: itunesContainerTypes.SEARCH_TRACK },
      dispatchClearTrackDetails: { type: itunesContainerTypes.CLEAR_TRACK_DETAILS }
    };
    const props = mapDispatchToProps(dispatchSearchSpy);
    props.dispatchTrackSearch(trackId);
    expect(dispatchSearchSpy).toHaveBeenCalledWith(actions.dispatchTrackSearch);

    await timeout(500);
    props.dispatchClearTrackDetails();
    expect(dispatchSearchSpy).toHaveBeenCalledWith(actions.dispatchClearTrackDetails);
  });

  it('should render error when trackSearchError occurs', async () => {
    const { getByTestId } = renderWithIntl(
      <TrackDetails
        dispatchTrackSearch={submitSpyTrackSearch}
        dispatchClearTrackDetails={submitSpyClearTrackDetails}
        trackSearchError="error"
      />
    );
    await timeout(500);
    expect(getByTestId('track-detail-error')).toBeInTheDocument();
  });
});
