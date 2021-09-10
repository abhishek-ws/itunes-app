import React from 'react';
import { StaticRouter } from 'react-router';

const ReturnWithRouter = (props) => {
  return <StaticRouter>{props.children}</StaticRouter>;
};

export default ReturnWithRouter;
