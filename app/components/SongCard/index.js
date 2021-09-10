/**
 *
 * MusicCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, Typography, Button } from 'antd';
import { PlayCircleTwoTone, StopTwoTone } from '@ant-design/icons';
import { colors } from '@app/themes';
import handleMusic, { actions } from '@app/utils/audioControl.js';
import { translate } from '../IntlGlobalProvider/index';
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

const CommonIconStyle = {
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
    font-size: 16;
    color: ${colors.styledTColor};
  }
`;

const StyledParagraph = styled(Paragraph)`
  && {
    margin-top: 10;
    color: ${colors.styledParaColor};
    font-size: 12;
    height: 40;
    overflow: hidden;
  }
`;

const StyledImage = styled.img`
  width: 100;
  height: 14em;
  margin-bottom: 2em;
`;

export function SongCard({ song, width, height }) {
  const { shortDescription, artworkUrl100, artistName, previewUrl } = song;
  const playStates = React.useState(false);
  const play = playStates[0];
  const songElement = React.useRef(null);

  return (
    <Container data-testid="song-card">
      <StyledImage src={artworkUrl100} />
      <StyledT text={artistName} />
      <StyledParagraph>{shortDescription ? shortDescription : translate('no_description')}</StyledParagraph>
      <IconsContainer>
        <ControlButton
          data-testid="play-btn"
          onClick={() => handleMusic(actions.PLAY, playStates, songElement, previewUrl)}
          disabled={play ? true : false}
          type={play ? 'text' : 'ghost'}
          icon={<PlayCircleTwoTone style={CommonIconStyle} />}
        >
          {translate('play-btn')}
        </ControlButton>
        <ControlButton
          data-testid="stop-btn"
          disabled={play ? false : true}
          onClick={() => handleMusic(actions.STOP, playStates, songElement, previewUrl)}
          type={play ? 'ghost' : 'text'}
          icon={<StopTwoTone style={CommonIconStyle} />}
          size="large"
        >
          {translate('stop-btn')}
        </ControlButton>
      </IconsContainer>
      <audio data-testid="audio-element" ref={songElement}></audio>
    </Container>
  );
}

SongCard.propTypes = {
  song: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number
};
export default SongCard;
