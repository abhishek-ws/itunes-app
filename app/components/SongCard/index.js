/**
 *
 * MusicCard
 *
 */

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, Typography, Button } from 'antd';
import { PlayCircleTwoTone, StopTwoTone } from '@ant-design/icons';
import { colors } from '@app/themes';
import { translate } from '../IntlGlobalProvider/index';
import If from '../If/index';
import { T } from '../T/index';

const { Paragraph } = Typography;

const Container = styled(Card)`
  && {
    width: ${(props) => (props.width ? props.width : 25)}em;
    height: ${(props) => (props.height ? props.height : 32)}em;
    background-color: ${colors.songCardBg};
    display: block;
    border-radius: 2em;
    box-shadow: inset -6px -6px 12px rgba(0, 0, 0, 0.8), inset 6px 6px 12px rgba(255, 255, 255, 0.4);
    overflow-x: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const commonIconStyle = {
  fontSize: 18
};

const ControlButton = styled(Button)`
  && {
    color: white;
    display: flex;
    margin: auto 3px;
    justify-content: space-between;
    align-items: center;
    background-color: transparent;
  }
`;

const StyledT = styled(T)`
  && {
    font-size: ${(props) => (props.trackDetails ? 2 : 1.1)}em;
    margin: ${(props) => (props.trackDetails ? '20 0' : 0)};
  }
`;
const StyledPrice = styled(T)`
  && {
    color: ${colors.styledPriceColor};
    font-size: ${(props) => (props.trackDetails ? 40 : 16)};
    margin: 20 10;
  }
`;

const StyledParagraph = styled(Paragraph)`
  && {
    margin-top: 10;
    color: ${colors.styledParaColor};
    font-size: ${(props) => (props.trackDetails ? 1.5 : 1)}em;
    height: ${(props) => (props.shortDescription ? 7 : 4.5)}em;
    overflow: hidden;
  }
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

export function SongCard({ song, trackDetails, width, height }) {
  const { trackName, trackPrice, artworkUrl100, previewUrl } = song;
  const [play, setPlay] = useState(false);
  const songElement = useRef(null);

  const actions = {
    PLAY: 'playMusic',
    STOP: 'stopMusic'
  };

  const handleMusic = async (action, songEl, songUrl) => {
    switch (action) {
      case actions.PLAY:
        songEl.current.src = songUrl;
        setPlay(!play);
        await songEl.current.play();
        break;
      case actions.STOP:
        songEl.current.src = '';
        setPlay(!play);
    }
  };

  return (
    <Container width={width} height={height} data-testid="song-card">
      <HeaderFooter>
        <StyledImage src={artworkUrl100} />
        <StyledT trackDetails={trackDetails} text={trackName} />
      </HeaderFooter>

      <StyledParagraph data-testid="para-test" trackDetails={trackDetails} shortDescription={song.shortDescription}>
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
          onClick={() => handleMusic(actions.PLAY, songElement, previewUrl)}
          disabled={play}
          type={play ? 'text' : 'ghost'}
          icon={<PlayCircleTwoTone style={commonIconStyle} />}
        >
          {translate('play-btn')}
        </ControlButton>
        <ControlButton
          data-testid="stop-btn"
          disabled={!play}
          onClick={() => handleMusic(actions.STOP, songElement, previewUrl)}
          type={play ? 'ghost' : 'text'}
          icon={<StopTwoTone style={commonIconStyle} />}
          size="large"
        >
          {translate('stop-btn')}
        </ControlButton>
      </IconsContainer>
      <HeaderFooter>
        <If condition={trackPrice} otherwise={<StyledPrice data-testid="no-price-tag" id="no-price" />}>
          <StyledPrice id="track-price" values={{ trackPrice }} />
        </If>
      </HeaderFooter>
      <audio data-testid="audio-element" ref={songElement}></audio>
    </Container>
  );
}

SongCard.propTypes = {
  song: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
  trackDetails: PropTypes.bool
};
export default SongCard;
