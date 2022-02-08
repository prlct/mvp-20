import React, { forwardRef, memo } from 'react';
import PropTypes from 'prop-types';
import { Checkbox as EvergreenCheckbox } from 'evergreen-ui';

const Checkbox = forwardRef(({
  checked, onChange, name, text, disabled, className,
}, ref) => (
  <EvergreenCheckbox
    ref={ref}
    name={name}
    label={text}
    checked={checked}
    disabled={disabled}
    className={className}
    onChange={onChange}
  />
));

Checkbox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  name: PropTypes.string,
  text: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

Checkbox.defaultProps = {
  checked: null,
  onChange: null,
  name: null,
  text: '',
  disabled: false,
  className: null,
};

export default memo(Checkbox);
