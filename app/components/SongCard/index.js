/**
 *
 * MusicCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, Image, Typography, Button } from 'antd';
import { PlayCircleTwoTone, StopTwoTone } from '@ant-design/icons';
import { colors } from '@app/themes';
import handleMusic, { actions } from '@app/utils/audioControl.js';
import { translate } from '../IntlGlobalProvider/index';

const { Paragraph, Title } = Typography;

const Container = styled(Card)`
  && {
    width: 300px;
    height: 450px;
    background-color: ${colors.songCardBg};
    display: block;
    border-radius: 16px;
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

export function SongCard({ song }) {
  const { shortDescription, artworkUrl100, artistName, previewUrl } = song;
  const playStates = React.useState(false);
  const play = playStates[0];
  const songElement = React.useRef(null);

  return (
    <Container data-testid="song-card">
      <Image src={artworkUrl100} width="80%" preview="false" height="250px" />
      <Title style={{ color: '#fafafa', fontSize: 16 }} italic={true}>
        {artistName}
      </Title>
      <Paragraph style={{ color: 'lightblue', fontSize: 12, height: 40, overflow: 'hidden' }}>
        {shortDescription ? shortDescription : translate('no_description')}
      </Paragraph>
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
  song: PropTypes.object
};
export default SongCard;
