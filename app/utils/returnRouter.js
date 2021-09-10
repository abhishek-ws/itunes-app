import React from 'react';
import { StaticRouter } from 'react-router';
import PropTypes from 'prop-types';

const ReturnWithRouter = (props) => {
  return <StaticRouter>{props.children}</StaticRouter>;
};

ReturnWithRouter.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
export default ReturnWithRouter;
