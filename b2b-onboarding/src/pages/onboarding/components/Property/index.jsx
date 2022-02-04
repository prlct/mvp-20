import React, { memo } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button';

import HouseImage from './images/house.png';

import styles from './styles.module.css';

const Property = ({ onPressNext }) => (
  <div className={styles.wrapper}>
    <h2>Is this your property?</h2>
    <p>Review the following listing</p>

    <div className={styles.houseContainer}>
      <img src={HouseImage} alt="house" />

      <div className={styles.houseInfo}>
        <p>123 Sunshine Dr. Birmingham, AL 35242</p>
        <div>
          <p>3 Bed</p>
          <p>2 Bath</p>
          <p>2475 sqft</p>
        </div>
        <p>Last sold in 2012 for $375,000</p>
      </div>
    </div>

    <div className={styles.buttons}>
      <Button
        className={styles.button}
        type="secondary"
      >
        No, manually input info
      </Button>
      <Button
        className={styles.button}
        onClick={() => onPressNext({})}
      >
        Yes, continue
      </Button>
    </div>
  </div>
);

Property.propTypes = {
  onPressNext: PropTypes.func.isRequired,
};

export default memo(Property);
