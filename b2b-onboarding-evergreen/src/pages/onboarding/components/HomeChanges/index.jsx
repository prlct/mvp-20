import React, { useState, memo, useCallback } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button';
import Checkbox from 'components/Checkbox';

import styles from './styles.module.css';

const checkboxes = [
  'Upgraded appliances', 'Additions',
  'New HVAC', 'Upgraded Flooring',
  'Smart Home', 'New windows',
  'Bathroom remodel', 'Exterior upgrades',
  'Kitchen remodel', 'Landscape remodel',
];

const HomeChanges = ({ onPressNext }) => {
  const [checkboxesData, setCheckboxesData] = useState(checkboxes.map((label) => ({
    label,
    checked: false,
  })));

  const onCheckboxChange = useCallback((label) => {
    setCheckboxesData(checkboxesData.map((checkbox) => {
      if (checkbox.label === label) {
        // eslint-disable-next-line no-param-reassign
        checkbox.checked = !checkbox.checked;
      }

      return checkbox;
    }));
  }, [checkboxesData]);

  const onGoNext = useCallback(() => {
    onPressNext({
      changes: checkboxesData.filter((checkbox) => checkbox.checked).map((c) => c.label),
    });
  }, [onPressNext, checkboxesData]);

  return (
    <div className={styles.wrapper}>
      <h2>Have you made any of the following changes to your home?</h2>
      <p>Please indicate any changes you have made to your home.</p>

      <div className={styles.checkboxesContainer}>
        {checkboxesData.map((checkboxData) => (
          <Checkbox
            key={checkboxData.label}
            className={styles.checkbox}
            name={checkboxData.label}
            text={checkboxData.label}
            checked={checkboxData.checked}
            onChange={() => onCheckboxChange(checkboxData.label)}
          />
        ))}
      </div>

      <Button
        className={styles.button}
        onClick={onGoNext}
      >
        Save changes
      </Button>

      <Button
        type="minimal"
        className={styles.linkButton}
      >
        Skip Step
      </Button>
    </div>
  );
};

HomeChanges.propTypes = {
  onPressNext: PropTypes.func.isRequired,
};

export default memo(HomeChanges);
