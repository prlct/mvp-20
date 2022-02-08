import React, { useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';

import Input from 'components/Input';
import Button from 'components/Button';

import styles from './styles.module.css';

const schema = yup.object().shape({
  field1: yup.string().required('Field is required.'),
  field2: yup.string().required('Field is required.'),
  field3: yup.string().required('Field is required.'),
  field4: yup.string().required('Field is required.'),
  field5: yup.string().required('Field is required.'),
});

const HomeExprectations = ({ onPressNext }) => {
  const onFormSubmit = useCallback((data) => {
    onPressNext({
      homeExpectations: {
        field1: data.field1,
        field2: data.field2,
        field3: data.field3,
        field4: data.field4,
        field5: data.field5,
      },
    });
  }, [onPressNext]);

  const {
    handleSubmit, formState: { errors }, control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div className={styles.wrapper}>
      <h2>What are you looking for in your next home?</h2>

      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className={styles.form}
      >
        <Input
          name="field1"
          control={control}
          error={errors.field1}
          className={styles.input}
        />
        <Input
          name="field2"
          control={control}
          error={errors.field2}
          className={styles.input}
        />
        <Input
          name="field3"
          control={control}
          error={errors.field3}
          className={styles.input}
        />
        <div className={styles.stateAndZipContainer}>
          <Input
            name="field4"
            control={control}
            error={errors.field4}
          />
          <Input
            name="field5"
            control={control}
            error={errors.field5}
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
          onClick={onPressNext}
        >
          Skip Step
        </Button>
      </form>
    </div>
  );
};

HomeExprectations.propTypes = {
  onPressNext: PropTypes.func.isRequired,
};

export default memo(HomeExprectations);
