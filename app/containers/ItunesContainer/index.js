import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import { colors } from '@app/themes';
import { Card, Skeleton, Input } from 'antd';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import T from '@components/T';
import { injectSaga } from 'redux-injectors';
import { selectItunesContainer, selectGridData, selectSearchError, selectSearchTerm } from './selectors';
import { itunesContainerCreators } from './reducer';
import itunesContainerSaga from './saga';
import SongCard from '@app/components/SongCard';
import If from '@app/components/If/index';
import For from '@app/components/For/index';

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
    flex-direction: column;
    max-width: ${(props) => props.containerWidth}px;
    width: 100%;
    margin: 0 auto;
    padding: ${(props) => props.padding}px;
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
  grid-column-gap: 20;
  grid-row-gap: 30px;
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

  const renderGridData = () => {
    const songs = get(gridData, 'results', []);
    const totalCount = get(gridData, 'resultCount', 0);
    return (
      <If condition={!isEmpty(songs) || !loading} otherwise={null}>
        <Skeleton data-testid="skeleton-card" loading={loading} active>
          <If condition={!isEmpty(searchTerm)} otherwise={null}>
            <StyledT id="search_query" values={{ searchTerm }} />
          </If>
          <If condition={totalCount !== 0} otherwise={null}>
            <StyledT id="matching_songs" values={{ totalCount }} />
          </If>
          <For
            data-testid="grid"
            of={songs}
            ParentComponent={MusicGrid}
            renderItem={(song, index) => <SongCard song={song} key={index} />}
          ></For>
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
      <If condition={!loading && error}>
        <CustomCard color={searchError ? 'red' : 'grey'} title={intl.formatMessage({ id: 'list_songs' })}>
          {searchError ? <T text={error} /> : <T id={error} />}
        </CustomCard>
      </If>
    );
  };

  return (
    <>
      <Container containerWidth={containerWidth} padding={padding}>
        <CustomCard title={intl.formatMessage({ id: 'songs_search' })} maxWidth={containerWidth}>
          <T marginBottom={10} id="search_your_songs" />
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
  history: PropTypes.object,
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

function mapDispatchToProps(dispatch) {
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
