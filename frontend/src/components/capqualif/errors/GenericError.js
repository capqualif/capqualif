import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './GenericError.module.scss';

import { ERROR } from '../../../dictionnary/common';
import { HOME_ROUTE } from '../../../app/routesDictionnary';

const GenericError = (props) => {
  return (
    <Fragment>
      <h3>{ERROR.MESSAGE}</h3>
      <Link to={HOME_ROUTE}>{ERROR.NEXT_ACTION}</Link>
    </Fragment>
  );
};

GenericError.propTypes = {};

export default GenericError;
