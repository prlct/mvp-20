import React, { useState, memo, useCallback } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import PropTypes from 'prop-types';
import Head from 'next/head';

import Button from 'components/Button';
import Input from 'components/Input';
import Checkbox from 'components/Checkbox';

import styles from './styles.module.css';

const schema = yup.object().shape({
  firstName: yup.string().max(100).required('Field is required.'),
  lastName: yup.string().max(100).required('Field is required.'),
});

const ACTIONS = [
  {
    id: 1,
    title: 'Buying',
  },
  {
    id: 2,
    title: 'Selling',
  },
  {
    id: 3,
    title: 'Buying and selling',
  },
  {
    id: 4,
    title: 'Other',
  },
];

const SelectAction = ({ onPressNext }) => {
  const [selectedAction, setSelectedAction] = useState(ACTIONS[0]);

  const {
    handleSubmit, formState: { errors }, control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitData = useCallback((data) => {
    onPressNext({
      firstName: data.title,
      lastName: data.lastName,
      interestedIn: selectedAction.title,
    });
  }, [onPressNext, selectedAction.title]);

  return (
    <>
      <Head>
        <title>Onboarding</title>
      </Head>
      <div className={styles.wrapper}>
        <h2>Tell me about yourself</h2>
        <p>
          This information will not be shared with anyone and
          will only be used for your agent to contact you.
        </p>

        <form
          onSubmit={handleSubmit(onSubmitData)}
          className={styles.form}
        >
          <Input
            name="firstName"
            placeholder="First Name"
            control={control}
            error={errors.firstName}
            className={styles.input}
          />

          <Input
            name="lastName"
            placeholder="Last Name"
            control={control}
            error={errors.firstName}
            className={styles.input}
          />

          <Input
            value="example@gmail.com"
            name="email"
            placeholder="Email Address"
            className={styles.input}
            disabled
          />

          <div className={styles.actions}>
            <p>I am interested in:</p>
            {ACTIONS.map((item) => (
              <Checkbox
                key={item.id}
                className={styles.actionItem}
                checked={selectedAction.id === item.id}
                onChange={() => setSelectedAction(item)}
                text={item.title}
              />
            ))}
          </div>

          <Button
            className={styles.button}
            htmlType="submit"
          >
            Next
          </Button>
        </form>
      </div>
    </>
  );
};

SelectAction.propTypes = {
  onPressNext: PropTypes.func.isRequired,
};

export default memo(SelectAction);
