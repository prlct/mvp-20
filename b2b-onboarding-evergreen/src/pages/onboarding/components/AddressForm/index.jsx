import React, { useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';

import Input from 'components/Input';
import Button from 'components/Button';

import styles from './styles.module.css';

const schema = yup.object().shape({
  addressLine1: yup.string().required('Field is required.'),
  addressLine2: yup.string().required('Field is required.'),
  city: yup.string().required('Field is required.'),
  state: yup.string().required('Field is required.'),
  zip: yup.string().required('Field is required.'),
});

const AddressForm = ({ onSubmit }) => {
  const onFormSubmit = useCallback((data) => {
    onSubmit({
      address: {
        line1: data.addressLine1,
        line2: data.addressLine2,
        city: data.city,
        state: data.state,
        zip: data.zip,
      },
    });
  }, [onSubmit]);

  const {
    handleSubmit, formState: { errors }, control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div className={styles.wrapper}>
      <h2>What is the address of the property you would like to sell?</h2>

      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className={styles.form}
      >
        <Input
          name="addressLine1"
          label="Address Line 1"
          placeholder="Placeholder"
          control={control}
          error={errors.addressLine1}
          className={styles.input}
        />
        <Input
          name="addressLine2"
          label="Address Line 2"
          placeholder="Placeholder"
          control={control}
          error={errors.addressLine2}
          className={styles.input}
        />
        <Input
          name="city"
          label="City"
          placeholder="Placeholder"
          control={control}
          error={errors.city}
          className={styles.input}
        />
        <div className={styles.stateAndZipContainer}>
          <Input
            name="state"
            label="State"
            placeholder="Placeholder"
            control={control}
            error={errors.state}
          />
          <Input
            name="zip"
            label="Zip"
            placeholder="Placeholder"
            control={control}
            error={errors.zip}
          />
        </div>

        <Button
          className={styles.button}
          htmlType="submit"
        >
          Next
        </Button>

        <Button
          type="minimal"
          className={styles.linkButton}
          onClick={onSubmit}
        >
          Skip Step
        </Button>
      </form>
    </div>
  );
};

AddressForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default memo(AddressForm);
