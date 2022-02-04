import React, { useState, memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { KeyIcon, HomeIcon, RefreshHomeIcon } from 'public/icons';

import Button from 'components/Button';

import styles from './styles.module.css';

const ACTIONS = [
  {
    id: 1,
    title: 'Buy a home',
    icon: KeyIcon,
  },
  {
    id: 2,
    title: 'Sell a home',
    icon: HomeIcon,
  },
  {
    id: 3,
    title: 'Both',
    icon: RefreshHomeIcon,
  },
];

const SelectAction = ({ onPressNext }) => {
  const [selectedAction, setSelectedAction] = useState(ACTIONS[0]);

  const onGoNext = useCallback(() => {
    onPressNext({ interestedIn: selectedAction.title });
  }, [onPressNext, selectedAction.title]);

  return (
    <div className={styles.wrapper}>
      <h2>Which of the following are you interested in?</h2>
      <p>Select which one of the following to describe what you would like to accomplish.</p>

      <div className={styles.actions}>
        {ACTIONS.map((item) => (
          <div
            key={item.id}
            className={cn(
              styles.actionItem,
              selectedAction.id === item.id && styles.selectedActionItem,
            )}
            onClick={() => setSelectedAction(item)}
            aria-hidden
          >
            <p>{item.title}</p>
            <div className={styles.icon}>{item.icon()}</div>
          </div>
        ))}
      </div>

      <Button
        className={styles.button}
        onClick={onGoNext}
      >
        Next
      </Button>
    </div>
  );
};

SelectAction.propTypes = {
  onPressNext: PropTypes.func.isRequired,
};

export default memo(SelectAction);
