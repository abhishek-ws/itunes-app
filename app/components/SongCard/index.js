/**
 *
 * MusicCard
 *
 */

import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Card, Typography, Button } from 'antd';
import { PlayCircleTwoTone, StopTwoTone } from '@ant-design/icons';
import { colors } from '@app/themes';
import { translate } from '@components/IntlGlobalProvider';
import If from '@components/If';
import { T } from '@components/T';
import media from '@app/themes/media';

const { Paragraph } = Typography;

const Container = styled(Card)`
  && {
    width: ${(props) => props.width ?? 20}em;
    height: ${(props) => props.height ?? 32}em;
    margin-top: 1em;
    background-color: ${colors.songCardBg};
    display: block;
    border-radius: 2em;
    box-shadow: inset -6px -6px 12px rgba(0, 0, 0, 0.8), inset 6px 6px 12px rgba(255, 255, 255, 0.4);
    overflow-x: scroll;
    &::-webkit-scrollbar {
      display: none;
    }

    ${media.lessThan('desktop')`
    width: ${(props) => (props.width ? 32 : 22)}em;
    height: ${(props) => props.height ?? 34}em;;
  `}
    ${media.lessThan('tablet')`
    width: ${(props) => (props.width ? 30 : 22)}em;
    height: ${(props) => props.height ?? 34}em;;
    `}
    
    ${media.lessThan('mid')`
    width: ${(props) => (props.width ? 20 : 16)}em;
    height: ${(props) => props.height ?? 34}em;;
    `}
    ${media.lessThan('mobile')`
    width: ${(props) => (props.width ? 15 : 15)}em;
    height: ${(props) => props.height ?? 30}em;;
  `}
  }
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  ${media.lessThan('mid')`
    flex-direction:column;
    `}
`;

const ControlButton = styled(Button)`
  && {
    color: white;
    display: flex;
    margin: auto 3px;
    justify-content: space-between;
    align-items: center;
    background-color: transparent;
    width: 6em;
    height: 2em;
    ${media.lessThan('mid')`
      margin-top: 8px;
      width: 6em;
      height: 2em;
    `}
  }
`;

const StyledT = styled(T)`
  && {
    font-size: ${(props) => (props.trackdetails ? 2 : 1.1)}em;
    margin: ${(props) => (props.trackdetails ? '20 0' : 0)}px;
    ${media.lessThan('desktop')`
      font-size: ${(props) => (props.trackdetails ? 1.5 : 1.1)}em;
    `}
    ${media.lessThan('tablet')`
      font-size: ${(props) => (props.trackdetails ? 1.4 : 1.1)}em;
    `}
    ${media.lessThan('mid')`
      font-size: ${(props) => (props.trackdetails ? 1 : 1.1)}em;
    `}
    ${media.lessThan('mobile')`
      font-size: ${(props) => (props.trackdetails ? 0.9 : 1.1)}em;
    `}
  }
`;

const StyledPrice = styled(T)`
  && {
    color: ${colors.styledPriceColor};
    font-size: ${(props) => (props.full ? 2.2 : 1)}em;
    margin: 20px 10px;
    ${media.lessThan('tablet')`
      margin-top: 26px;
      font-size: ${(props) => (props.full ? 1.4 : 1)}em;
    `}
  }
`;

const StyledParagraph = styled(Paragraph)`
  && {
    margin-top: 10;
    color: ${colors.styledParaColor};
    font-size: ${(props) => (props.trackdetails ? 2 : 1)}em;
    height: ${(props) => (props.shortdescription ? 5 : 4.5)}em;
    overflow: hidden;
    ${media.greaterThan('desktop')`
    font-size: ${(props) => (props.trackdetails ? 1.5 : 0.7)}em;
    `}
    ${media.lessThan('desktop')`
    font-size: ${(props) => (props.trackdetails ? 1.2 : 0.7)}em;
    `}
    ${media.lessThan('tablet')`
    font-size: ${(props) => (props.trackdetails ? 1 : 0.7)}em;
    height: ${(props) => (props.shortdescription ? 5 : 6)}em;
    `}
    ${media.lessThan('mid')`
    font-size: ${(props) => (props.trackdetails ? 0.78 : 0.8)}em;
    height: ${(props) => (props.shortdescription ? 7 : 8)}em;
    `}
   
`;

const HeaderFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledImage = styled.img`
  width: 100px;
  height: ${(props) => (props.trackDetails ? 18 : 14)}em;
  margin-bottom: 2em;
`;

const StyledPlayIcon = styled(PlayCircleTwoTone)`
  && {
    font-size: 18px;
    ${media.lessThan('mid')`
    font-size: 12px;
    `}
  }
`;
const StyledStopIcon = styled(StopTwoTone)`
  && {
    font-size: 18px;
    ${media.lessThan('mid')`
    font-size: 12px;
    `}
  }
`;

export function SongCard({ song, trackDetails, width, height, onActionClick }) {
  const { trackName, trackPrice, artworkUrl100, previewUrl, trackId } = song;

  const songElement = useRef(null);
  const [play, setPlay] = useState(false);
  const history = useHistory();

  const isPlaying = () => (songElement.current ? !songElement.current.paused : false);

  const handleMusic = () => {
    setPlay(!play);
    const isPaused = songElement.current.paused;
    if (isPaused) {
      songElement.current.play();
    } else {
      songElement.current.pause();
    }
    onActionClick(songElement);
  };

  return (
    <Container width={width} height={height} data-testid="song-card">
      <HeaderFooter>
        <StyledImage src={artworkUrl100} />
        <StyledT
          onClick={() => history.push(`/details/${trackId}`)}
          trackdetails={trackDetails?.toString()}
          text={trackName}
        />
      </HeaderFooter>

      <StyledParagraph
        data-testid="para-test"
        trackdetails={trackDetails?.toString()}
        shortdescription={song.shortDescription}
      >
        <If
          condition={song.shortDescription}
          otherwise={song.longDescription ? song.longDescription : translate('no_description')}
        >
          {song.shortDescription}
        </If>
      </StyledParagraph>
      <IconsContainer>
        <ControlButton
          data-testid="play-btn"
          onClick={handleMusic}
          disabled={isPlaying()}
          type={isPlaying() ? 'text' : 'ghost'}
          icon={<StyledPlayIcon />}
        >
          {translate('play-btn')}
        </ControlButton>
        <ControlButton
          data-testid="stop-btn"
          disabled={!isPlaying()}
          onClick={handleMusic}
          type={!isPlaying() ? 'text' : 'ghost'}
          icon={<StyledStopIcon />}
          size="large"
        >
          {translate('stop-btn')}
        </ControlButton>
      </IconsContainer>
      <HeaderFooter>
        <If
          condition={trackPrice}
          otherwise={<StyledPrice data-testid="no-price-tag" id="no-price" full={trackDetails} />}
        >
          <StyledPrice id="track-price" values={{ trackPrice }} full={trackDetails} />
        </If>
      </HeaderFooter>
      <audio data-testid="audio-element" src={previewUrl} ref={songElement}></audio>
    </Container>
  );
}
SongCard.defaultProps = {
  onActionClick: () => {}
};
SongCard.propTypes = {
  song: PropTypes.shape({
    trackId: PropTypes.number,
    artworkUrl100: PropTypes.string,
    trackPrice: PropTypes.number,
    shortDescription: PropTypes.string,
    longDescription: PropTypes.string,
    previewUrl: PropTypes.string,
    trackName: PropTypes.string
  }),
  width: PropTypes.number,
  height: PropTypes.number,
  trackDetails: PropTypes.bool,
  onActionClick: PropTypes.func
};
export default SongCard;
