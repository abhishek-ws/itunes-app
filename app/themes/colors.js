/**
 * This file contains the application's colors.
 *
 * Define color here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

const primary = '#fcedda';
const text = '#212529';
const secondary = '#f8c49c';
const success = '#28a745';
const error = '#dc3545';
const songCardBg = '#434';
const musicGridBg = '#434122';
const styledPriceColor = '#fafafa';
const styledTColor = '#fafafa';
const styledParaColor = 'lightblue';
const backToHome = 'indigo';

const colors = {
  transparent: 'rgba(0,0,0,0)',
  // Example colors:
  text,
  primary,
  secondary,
  success,
  error,
  songCardBg,
  musicGridBg,
  styledPriceColor,
  styledParaColor,
  styledTColor,
  backToHome,
  theme: {
    lightMode: {
      primary,
      secondary
    },
    darkMode: {
      primary: secondary,
      secondary: primary
    }
  }
};
module.exports = colors;
