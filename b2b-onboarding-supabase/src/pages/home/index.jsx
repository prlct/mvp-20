import { useState } from 'react';
import Head from 'next/head';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

import * as userService from 'resources/user/user.service';
import * as companyService from 'resources/company/company.service';

import Input from 'components/Input';
import Button from 'components/Button';

import styles from './styles.module.css';

const schema = yup.object().shape({
  email: yup.string().max(64).email('Email format is incorrect.').required('Field is required.'),
});

const Home = () => {
  const [loading, setIsLoading] = useState(false);

  const onInviteUser = async (data) => {
    setIsLoading(true);

    try {
      const companyId = await companyService.getCurrentUserCompanyId();

      await userService.sendEmailInvitationWithMagicLink({
        email: data.email,
        data: { company_id: companyId },
      });
    } catch (e) {
      alert(e.error_description || e.message);
    }

    setIsLoading(false);
  };

  const {
    handleSubmit, formState: { errors }, control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className={styles.content}>
        <form
          onSubmit={handleSubmit(onInviteUser)}
        >
          <Input
            name="email"
            control={control}
            error={errors.email}
          />
          <Button
            htmlType="submit"
            loading={loading}
            className={styles.button}
            size="s"
          >
            Invite user
          </Button>
        </form>
      </div>
    </>
  );
};

export default Home;
