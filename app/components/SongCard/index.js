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

const { Paragraph, Title } = Typography;

const Container = styled(Card)`
  && {
    max-width: 300px;
    height: 450px;
    background-color: #313131;
    display: block;
    border-radius: 16px;
    box-shadow: inset -6px -6px 12px rgba(0, 0, 0, 0.8), inset 6px 6px 12px rgba(255, 255, 255, 0.4);
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
// const CommonIconSize = 10;

export function SongCard({ song }) {
  const { shortDescription, artworkUrl100, artistName, previewUrl } = song;
  const [play, setPlay] = React.useState(false);
  const songElement = React.useRef(null);

  const actions = {
    PLAY: 'playMusic',
    STOP: 'stopMusic'
  };

  const handleMusic = (action) => {
    if (action === actions.PLAY) {
      songElement.current.src = previewUrl;
      setPlay(!play);
      songElement.current.play();
    } else if (action === actions.STOP) {
      songElement.current.src = '';
      setPlay(!play);
    } else {
      return;
    }
  };

  return (
    // <div data-testid="song-card">
    <Container data-testid="song-card">
      <Image src={artworkUrl100} width="80%" preview="false" height="250px" />
      <Title style={{ fontSize: 18 }} italic={true}>
        {artistName}
      </Title>
      <Paragraph style={{ fontSize: 12, height: '50px' }}>
        {shortDescription ? shortDescription : 'No Description available'}
      </Paragraph>
      <IconsContainer>
        <ControlButton
          onClick={() => handleMusic(actions.PLAY)}
          disabled={play ? true : false}
          type={play ? 'text' : 'ghost'}
          icon={<PlayCircleTwoTone style={CommonIconStyle} />}
        >
          Play
        </ControlButton>
        {/* <ControlButton
          type="ghost"
          onClick={() => handleMusic(actions.PAUSE)}
          disabled={play ? false : true}
          icon={<PauseCircleTwoTone style={CommonIconStyle} />}
          size="large"
}
        >
          Pause
        </ControlButton> */}
        <ControlButton
          disabled={play ? false : true}
          onClick={() => handleMusic(actions.STOP)}
          type={play ? 'ghost' : 'text'}
          icon={<StopTwoTone style={CommonIconStyle} />}
          size="large"
        >
          Stop
        </ControlButton>
      </IconsContainer>
      <audio ref={songElement}></audio>
    </Container>
    // </div>
  );
}

SongCard.propTypes = {
  song: PropTypes.object
};
export default SongCard;
