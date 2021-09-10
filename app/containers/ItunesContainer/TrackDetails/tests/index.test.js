/**
 *
 * Tests for TrackDetails
 *
 *
 */

import React from 'react';
import { timeout, renderProvider } from '@utils/testUtils';
// import { fireEvent } from '@testing-library/dom'
import { mapDispatchToProps, TrackDetailsTest as TrackDetails } from '../index';
import ReturnWithRouter from '@utils/returnRouter';
import getIntl from '@utils/createIntl';
import { setIntl } from '@app/components/IntlGlobalProvider/';

function TrackDetailsWrapper(props) {
  return (
    <ReturnWithRouter>
      <TrackDetails {...props} />
    </ReturnWithRouter>
  );
}

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
    const { baseElement } = renderProvider(
      <TrackDetailsWrapper
        dispatchTrackSearch={submitSpyTrackSearch}
        dispatchClearTrackDetails={submitSpyClearTrackDetails}
      />
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('should dispatch ClearTrackDetails and SearchTrack in sequence when first mounted', async () => {
    renderProvider(
      <TrackDetailsWrapper
        dispatchTrackSearch={submitSpyTrackSearch}
        dispatchClearTrackDetails={submitSpyClearTrackDetails}
      />
    );
    await timeout(500);
    expect(submitSpyClearTrackDetails).toBeCalled();
    expect(submitSpyTrackSearch).toBeCalled();
  });

  it('should validate mapDispatchToProps actions', async () => {
    const dispatchSearchSpy = jest.fn();
    const trackId = 1234;
    const actions = {
      dispatchTrackSearch: { trackId: 1234, type: 'SEARCH_TRACK' },
      dispatchClearTrackDetails: { type: 'CLEAR_TRACK_DETAILS' }
    };
    const props = mapDispatchToProps(dispatchSearchSpy);
    props.dispatchTrackSearch(trackId);
    expect(dispatchSearchSpy).toHaveBeenCalledWith(actions.dispatchTrackSearch);

    await timeout(500);
    props.dispatchClearTrackDetails();
    expect(dispatchSearchSpy).toHaveBeenCalledWith(actions.dispatchClearTrackDetails);
  });
});
