/**
 * Helper function and action Object for Music controls
 */

export const actions = {
  PLAY: 'playMusic',
  STOP: 'stopMusic'
};

const handleMusic = (action, playStates, songEl, songUrl) => {
  const [play, setter] = playStates;
  switch (action) {
    case actions.PLAY:
      songEl.current.src = songUrl;
      setter(!play);
      songEl.current.play();
      break;
    case actions.STOP:
      songEl.current.src = '';
      setter(!play);
  }
};

export default handleMusic;
