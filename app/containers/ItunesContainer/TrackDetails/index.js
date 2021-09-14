/**
 *
 * TrackDetails
 *
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { useParams } from 'react-router';
import { Skeleton } from 'antd';
import SongCard from '@app/components/SongCard/index';
import styled from 'styled-components';
import T from '@app/components/T/index';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectSaga } from 'redux-injectors';
import { selectItunesContainer, selectTrackDetails, selectTrackSearchError } from '../selectors';
import itunesContainerSaga from '../saga';
import { itunesContainerCreators } from '../reducer';
import { Link } from 'react-router-dom';
import { colors } from '@app/themes';
import If from '@components/If/index';
import { isEmpty } from 'lodash';

const Container = styled.div`
  display: grid;
  place-items: center;
`;

const StyledT = styled(T)`
  && {
    color: ${colors.backToHome};
    text-decoration: underline;
  }
`;

export function TrackDetails({
  dispatchTrackSearch,
  dispatchClearTrackDetails,
  intl,
  trackSearchError = null,
  trackDetails = {},
  width,
  height,
  padding
}) {
  const { trackId } = useParams();

  useEffect(() => {
    dispatchClearTrackDetails();
    dispatchTrackSearch(trackId);
  }, []);

  return (
    <Container>
      <If
        condition={isEmpty(trackSearchError)}
        otherwise={<T data-testid="track-detail-error" id="something_went_wrong" />}
      >
        <Skeleton data-testid="skeleton-card" loading={isEmpty(trackDetails)} active>
          <SongCard song={trackDetails} trackDetails width={width} height={height} padding={padding} />
        </Skeleton>
      </If>
      <Link to="/">
        <StyledT id="back-to-home" />
      </Link>
    </Container>
  );
}

TrackDetails.propTypes = {
  dispatchTrackSearch: PropTypes.func,
  dispatchClearTrackDetails: PropTypes.func,
  track: PropTypes.number,
  intl: PropTypes.object,
  trackDetails: PropTypes.object,
  trackSearchError: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  padding: PropTypes.number
};

const mapStateToProps = createStructuredSelector({
  itunesContainer: selectItunesContainer(),
  trackDetails: selectTrackDetails(),
  trackSearchError: selectTrackSearchError()
});

export function mapDispatchToProps(dispatch) {
  const { searchTrack, clearTrackDetails } = itunesContainerCreators;
  return {
    dispatchTrackSearch: (trackId) => dispatch(searchTrack(trackId)),
    dispatchClearTrackDetails: () => dispatch(clearTrackDetails())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  injectSaga({ key: 'itunesContainer', saga: itunesContainerSaga }),
  memo
)(TrackDetails);

export const TrackDetailsTest = compose(injectIntl)(TrackDetails);
