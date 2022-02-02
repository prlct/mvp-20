import * as yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import Head from 'next/head';

import config from 'config';
import { path } from 'pages/routes';

import { CheckMarkIcon } from 'public/icons';

import Input from 'components/Input';
import Button from 'components/Button';
import Link from 'components/Link';

import styles from './styles.module.css';

const schema = yup.object().shape({
  firstName: yup.string().max(100).required('Field is required.'),
  lastName: yup.string().max(100).required('Field is required.'),
  email: yup.string().max(64).email('Email format is incorrect.').required('Field is required.'),
  password: yup.string().matches(
    /^(?=.*[a-z])(?=.*\d)[A-Za-z\d\W]{6,}$/g,
    'The password must contain 6 or more characters with at least one letter (a-z) and one number (0-9).',
  ),
});

const passwordRules = ['Be a minimum of six characters', 'Have at least one capital letter', 'Have at least one number'];

const SignUp = () => {
  const [values, setValues] = useState({});
  const [registered, setRegistered] = useState(false);

  const [signupToken, setSignupToken] = useState();

  const [loading, setLoading] = useState(false);

  const {
    handleSubmit, setError, formState: { errors }, control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // TODO: signup
      const response = null;

      if (response.signupToken) setSignupToken(response.signupToken);

      setRegistered(true);
      setValues(data);
    } catch (e) {
      console.log('sign up error: ', e);
    } finally {
      setLoading(false);
    }
  };

  if (registered) {
    return (
      <>
        <Head>
          <title>Sign up</title>
        </Head>
        <div className={styles.registeredContainer}>
          <h2>Thanks!</h2>
          <div className={styles.registeredDescription}>
            Please follow the instructions from the email to complete a sign up process.
            We sent an email with a confirmation link to
            {' '}
            <b>{values.email}</b>
          </div>
          {signupToken && (
            <div>
              You look like a cool developer.
              {' '}
              <Link size="l" href={`${config.apiUrl}/account/verify-email?token=${signupToken}`}>
                Verify email
              </Link>
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>Sign Up</h2>
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
            error={errors.password}
          />
          <div className={styles.passwordRulesWrapper}>
            <p>Password must:</p>
            <div>
              {passwordRules.map((text) => (
                <div key={text} className={styles.passwordRulesItem}>
                  <div className={styles.checkmark}>
                    <CheckMarkIcon className={styles.checkmarkIcon} />
                  </div>
                  <p>{text}</p>
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
