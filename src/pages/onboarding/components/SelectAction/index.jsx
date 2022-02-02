import React, { memo } from 'react';
import PropTypes from 'prop-types';

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

const SelectAction = ({ onPressNext }) => (
  <div className={styles.wrapper}>
    <h2>Which of the following are you interested in?</h2>
    <p>Select which one of the following to describe what you would like to accomplish.</p>

    <div className={styles.actions}>
      {ACTIONS.map((item) => (
        <div key={item.id} className={styles.actionItem}>
          <p>{item.title}</p>
          <div className={styles.icon}>{item.icon()}</div>
        </div>
      ))}
    </div>

    <Button
      className={styles.button}
      onClick={onPressNext}
    >
      Next
    </Button>
  </div>
);

SelectAction.propTypes = {
  onPressNext: PropTypes.func.isRequired,
};

export default memo(SelectAction);
