import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { Button as EvergreenButton } from 'evergreen-ui';

import styles from './Button.module.css';

const types = {
  primary: 'primary',
  secondary: 'secondary',
  text: 'text',
  link: 'link',
};

const Button = ({
  children, onClick, type, htmlType,
  loading, disabled, className,
}) => (
  <EvergreenButton
    // eslint-disable-next-line react/button-has-type
    type={htmlType}
    onClick={onClick}
    className={cn(
      styles.button,
      className,
    )}
    appearance={type}
    isLoading={loading}
    disabled={disabled}
    height={44}
  >
    {children}
  </EvergreenButton>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(Object.values(types)),
  htmlType: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

Button.defaultProps = {
  onClick: null,
  type: types.primary,
  htmlType: 'button',
  loading: false,
  disabled: false,
  className: null,
};

export default React.memo(Button);
