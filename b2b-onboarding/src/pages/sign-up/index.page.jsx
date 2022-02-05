import { useEffect, useState, useCallback } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import Head from 'next/head';
import cn from 'classnames';

import { path } from 'pages/routes';

import { CheckMarkIcon } from 'public/icons';

import Input from 'components/Input';
import Button from 'components/Button';
import Link from 'components/Link';

import { supabase } from 'b2b-onboarding-supabase/utils/supabaseClient';

import styles from './styles.module.css';

const schema = yup.object().shape({
  firstName: yup.string().max(100).required('Field is required.'),
  lastName: yup.string().max(100).required('Field is required.'),
  email: yup.string().max(64).email('Email format is incorrect.').required('Field is required.'),
  password: yup.string().matches(
    /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W]{6,}$/g,
    'The password must contain 6 or more characters with at least one capital letter and one number (0-9).',
  ),
});

const passwordRules = [
  {
    title: 'Be a minimum of six characters',
    done: false,
  },
  {
    title: 'Have at least one capital letter',
    done: false,
  },
  {
    title: 'Have at least one number',
    done: false,
  },
];

const SignUp = () => {
  const [passwordValue, setPasswordValue] = useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);

  const [passwordRulesData, setPasswordRulesData] = useState(passwordRules);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const updatedPasswordRulesData = [...passwordRules];

    updatedPasswordRulesData[0].done = passwordValue.length >= 6;
    updatedPasswordRulesData[1].done = /[A-Z]/.test(passwordValue);
    updatedPasswordRulesData[2].done = /\d/.test(passwordValue);

    setPasswordRulesData(updatedPasswordRulesData);
  }, [passwordValue]);

  const {
    handleSubmit, setError, formState: { errors }, control, getValues,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onConfirmPasswordChange = useCallback((value) => {
    setConfirmPasswordValue(value);
    setConfirmPasswordError(null);
  }, []);

  const onSubmit = async (data) => {
    if (confirmPasswordValue !== passwordValue) {
      setConfirmPasswordError('Passwords doesn\'t match');
    }

    try {
      setLoading(true);

      const { user, session, error } = await supabase.auth.signUp(
        {
          email: data.email,
          password: data.password,
        },
        {
          data: {
            firstName: data.firstName,
            lastName: data.lastName,
          },
        },
      );
      if (error) throw error;

      if (!session) {
        // redirect to confirm email screen
      }
    } catch (e) {
      alert(e.error_description || e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>Create a free account</h2>
          <div className={styles.line} />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
        >
          <Input
            name="firstName"
            maxLength="100"
            placeholder="Your first name"
            control={control}
            error={errors.firstName}
          />
          <Input
            name="lastName"
            maxLength="100"
            placeholder="Your last name"
            control={control}
            error={errors.lastName}
          />
          <Input
            name="email"
            placeholder="Your email"
            control={control}
            error={errors.email}
          />
          <Input
            name="password"
            type="password"
            placeholder="Your password"
            control={control}
            onChange={setPasswordValue}
            error={errors.password}
          />
          <Input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            control={control}
            onChange={onConfirmPasswordChange}
            error={confirmPasswordError && { message: confirmPasswordError }}
          />
          <div className={styles.passwordRulesWrapper}>
            <p>Password must:</p>
            <div>
              {passwordRulesData.map((ruleData) => (
                <div key={ruleData.title} className={styles.passwordRulesItem}>
                  <div className={cn(styles.checkmark, ruleData.done && styles.activeCheckmark)}>
                    {ruleData.done && <CheckMarkIcon className={styles.checkmarkIcon} />}
                  </div>
                  <p>{ruleData.title}</p>
                </div>
              ))}
            </div>
          </div>
          <Button
            htmlType="submit"
            loading={loading}
            className={styles.button}
            size="s"
          >
            Sign Up For Free
          </Button>
        </form>

        <div className={styles.description}>
          <p>Already registered?</p>
          <Link
            type="router"
            href={path.signIn}
            className={styles.link}
          >
            Sign in now
          </Link>
        </div>

        <div className={styles.terms}>
          <p>
            By signing up for [PRODUCT NAME] you are agreeing to the
            {' '}
            <Link
              type="url"
              href="#"
              className={styles.termsLink}
            >
              Terms and Conditions
            </Link>

          </p>
        </div>

      </div>
    </>
  );
};

export default SignUp;
