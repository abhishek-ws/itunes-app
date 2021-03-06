import React, { useEffect, memo, useState } from 'react';
import { injectSaga } from 'redux-injectors';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';
import { Card, Skeleton, Input } from 'antd';
import { colors, media } from '@app/themes';
import T from '@components/T';
import SongCard from '@app/components/SongCard';
import If from '@components/If';
import For from '@components/For';
import { selectItunesContainer, selectGridData, selectSearchError, selectSearchTerm } from './selectors';
import { itunesContainerCreators } from './reducer';
import itunesContainerSaga from './saga';

const { Search } = Input;

const CustomCard = styled(Card)`
  && {
    margin: 10px 0;
    max-width: ${(props) => props.containerWidth};
    color: ${(props) => props.color};
    ${(props) => props.color && `color: ${props.color}`};
  }
`;

const Container = styled.div`
  && {
    display: flex;
    margin: 0 auto;
    flex-direction: column;
    max-width: ${(props) => props.containerWidth}px;
    padding: ${(props) => props.padding}px;
    background-color: ${colors.musicGridBg};
  }
`;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${(props) => props.maxwidth}px;
  width: 90%;
  margin: 10px auto;
  padding: 5px 50px;
  background-color: ${colors.musicGridBg};
  border-radius: 40px;
`;

const MusicGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 0.5em;
  grid-row-gap: 3em;
  place-items: center;

  ${media.lessThan('desktop')`
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 1em;
  grid-row-gap: 2.2em;
`}
  ${media.lessThan('tablet')`
  grid-template-columns: repeat(1, 1fr);
  grid-column-gap: 1em;
  grid-row-gap: 2.2em;
`}
`;

const StyledT = styled(T)`
  && {
    font-size: 24;
    color: ${colors.styledTColor};
  }
`;

export function ItunesContainer({
  dispatchSearchSongs,
  dispatchClearGridData,
  intl,
  gridData = {},
  searchError = null,
  searchTerm,
  maxwidth,
  padding,
  containerWidth
}) {
  const [loading, setLoading] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
    const loaded = get(gridData, 'results', null) || searchError;
    if (loading && loaded) {
      setLoading(false);
    }
  }, [gridData]);

  useEffect(() => {
    if (searchTerm && !gridData?.results?.length) {
      dispatchSearchSongs(searchTerm);
      setLoading(true);
    }
  }, []);

  const handleOnChange = (searchTerm) => {
    if (!isEmpty(searchTerm)) {
      dispatchSearchSongs(searchTerm);
      setLoading(true);
    } else {
      dispatchClearGridData();
    }
  };

  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  const handleActionClick = (audioRef) => {
    if (currentTrack?.current?.src !== audioRef?.current.src) {
      setCurrentTrack(audioRef);
    }
    const isPaused = audioRef?.current?.paused;
    if (!isEmpty(currentTrack) && !isPaused && currentTrack?.current?.src !== audioRef?.current.src) {
      currentTrack.current.pause();
    }
  };

  const renderGridData = () => {
    const songs = get(gridData, 'results', []);
    const totalCount = get(gridData, 'resultCount', 0);
    return (
      <If condition={!isEmpty(songs) || !loading}>
        <Skeleton data-testid="skeleton-card" loading={loading} active>
          <If condition={totalCount !== 0}>
            <StyledT id="search_query" values={{ searchTerm }} />
            <StyledT id="matching_songs" values={{ totalCount }} />
          </If>
          <For
            data-testid="grid"
            of={songs}
            ParentComponent={MusicGrid}
            renderItem={(song, index) => (
              <SongCard data-testid="song-card" song={song} key={index} onActionClick={handleActionClick} />
            )}
          />
        </Skeleton>
      </If>
    );
  };

  const renderDefaultOrErrorState = () => {
    let error;
    if (searchError) {
      error = searchError;
    } else if (!get(gridData, 'resultsCount', 0)) {
      error = 'search_songs_default';
    }
    return (
      <If condition={!loading && error && isEmpty(gridData)}>
        <CustomCard color={searchError ? 'red' : 'grey'} title={intl.formatMessage({ id: 'list_songs' })}>
          <If condition={searchError} otherwise={<T data-testid="default-message" id={error} />}>
            <T data-testid="itunes-error-message" text={error} />
          </If>
        </CustomCard>
      </If>
    );
  };

  return (
    <>
      <Container maxwidth={maxwidth} padding={padding} containerWidth={containerWidth}>
        <CustomCard title={intl.formatMessage({ id: 'songs_search' })} maxwidth={maxwidth}>
          <T id="search_your_songs" />
          <Search
            data-testid="search-bar"
            defaultValue={searchTerm}
            type="text"
            onChange={(evt) => debouncedHandleOnChange(evt.target.value)}
          />
        </CustomCard>
      </Container>
      <ResultContainer maxWidth={maxwidth}>
        {renderGridData()}
        {renderDefaultOrErrorState()}
      </ResultContainer>
    </>
  );
}

ItunesContainer.propTypes = {
  dispatchSearchSongs: PropTypes.func,
  dispatchClearGridData: PropTypes.func,
  intl: PropTypes.object,
  gridData: PropTypes.shape({
    resultCount: PropTypes.number,
    results: PropTypes.array
  }),
  searchError: PropTypes.string,
  searchTerm: PropTypes.string,
  maxwidth: PropTypes.number,
  padding: PropTypes.number,
  containerWidth: PropTypes.number
};

ItunesContainer.defaultProps = {
  maxwidth: 500,
  padding: 20
};

const mapStateToProps = createStructuredSelector({
  itunesContainer: selectItunesContainer(),
  gridData: selectGridData(),
  searchError: selectSearchError(),
  searchTerm: selectSearchTerm()
});

export function mapDispatchToProps(dispatch) {
  const { searchItunes, clearGridData } = itunesContainerCreators;
  return {
    dispatchSearchSongs: (searchTerm) => dispatch(searchItunes(searchTerm)),
    dispatchClearGridData: () => dispatch(clearGridData())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  injectIntl,
  withConnect,
  memo,
  injectSaga({ key: 'itunesContainer', saga: itunesContainerSaga })
)(ItunesContainer);

export const ItunesContainerTest = compose(injectIntl)(ItunesContainer);
