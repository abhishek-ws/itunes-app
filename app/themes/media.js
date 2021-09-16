import { generateMedia } from 'styled-media-query';

const screenBreakPoints = {
  MOBILE: 320,
  MID: 526,
  TABLET: 768,
  DESKTOP: 992
};

const media = generateMedia({
  mobile: `${screenBreakPoints.MOBILE / 16}em`,
  mid: `${screenBreakPoints.MID / 16}em`,
  tablet: `${screenBreakPoints.TABLET / 16}em`,
  desktop: `${screenBreakPoints.DESKTOP / 16}em`
});

export default media;
