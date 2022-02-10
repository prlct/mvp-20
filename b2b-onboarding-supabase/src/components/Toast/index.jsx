import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './styles.module.css';

import { TYPES } from './constants';

const classByAnimationState = {
  entered: styles.appeared,
  exiting: styles.disappeared,
};

const classByAppearance = {
  [TYPES.ERROR]: styles.error,
  [TYPES.SUCCESS]: styles.success,
};

const Toast = ({
  appearance,
  className,
  children,
  transitionState,
}) => (
  <div
    className={cn(
      styles.toast,
      classByAppearance[appearance],
      classByAnimationState[transitionState],
      className,
    )}
  >
    <p>{children}</p>
  </div>
);

Toast.propTypes = {
  appearance: PropTypes.oneOf(Object.values(TYPES)),
  className: PropTypes.string,
  children: PropTypes.string,
  transitionState: PropTypes.string.isRequired,
};

Toast.defaultProps = {
  appearance: TYPES.ERROR,
  className: '',
  children: '',
};

export default React.memo(Toast);
