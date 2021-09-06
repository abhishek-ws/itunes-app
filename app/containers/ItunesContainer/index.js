import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import { Card, Input } from 'antd';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import T from '@components/T';
import { injectSaga } from 'redux-injectors';
import { selectItunesContainer, selectGridData, selectSearchError, selectSearchTerm } from './selectors';
import { itunesContainerCreators } from './reducer';
import itunesContainerSaga from './saga';

const { Search } = Input;

const CustomCard = styled(Card)`
  && {
    margin: 10px 0;
    max-width: ${(props) => props.maxwidth};
    color: ${(props) => props.color};
    ${(props) => props.color && `color: ${props.color}`};
  }
`;

const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    max-width: ${(props) => props.maxwidth}px;
    width: 100%;
    margin: 0 auto;
    padding: ${(props) => props.padding}px;
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
  padding
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

  return (
    <Container maxwidth={maxwidth} padding={padding}>
      <CustomCard title={intl.formatMessage({ id: 'songs_search' })} maxwidth={maxwidth}>
        <T marginBottom={10} id="search_your_songs" />
        <Search
          data-testid="search-bar"
          defaultValue={searchTerm}
          type="text"
          onChange={(evt) => debouncedHandleOnChange(evt.target.value)}
          onSearch={(searchText) => debouncedHandleOnChange(searchText)}
        />
      </CustomCard>
    </Container>
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
  padding: PropTypes.number
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
