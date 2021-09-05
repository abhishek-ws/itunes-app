/**
 *
 * MusicCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, Image, Typography, Button } from 'antd';
import { PauseCircleTwoTone, PlayCircleTwoTone, StopTwoTone } from '@ant-design/icons';

const { Paragraph, Title } = Typography;

const Container = styled(Card)`
  && {
    max-width: 300px;
    height: 500px;
    background-color: darkgray;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
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

const CommonButtonStyle = {
  display: 'flex',
  margin: 'auto 3px',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'transparent'
};
// const CommonIconSize = 10;

export function MusicCard({ song }) {
  const { shortDescription, artworkUrl100, artistName } = song;
  return (
    // <div data-testid="music-card">
    <Container data-testid="music-card">
      <Image src={artworkUrl100} width="80%" preview="false" height="80%" />
      <Title style={{ fontSize: 18 }} italic={true}>
        {artistName}
      </Title>
      <Paragraph style={{ fontSize: 12, height: '50px' }}>
        {shortDescription ? shortDescription : 'No Description available'}
      </Paragraph>
      <IconsContainer>
        <Button type="ghost" icon={<PlayCircleTwoTone style={CommonIconStyle} />} style={CommonButtonStyle}>
          Play
        </Button>
        <Button
          type="ghost"
          disabled={true}
          icon={<PauseCircleTwoTone style={CommonIconStyle} />}
          size="large"
          style={CommonButtonStyle}
        >
          Pause
        </Button>
        <Button type="ghost" icon={<StopTwoTone style={CommonIconStyle} />} style={CommonButtonStyle} size="large">
          Stop
        </Button>
      </IconsContainer>
    </Container>
    // </div>
  );
}

MusicCard.propTypes = {
  song: PropTypes.object
};
export default MusicCard;
