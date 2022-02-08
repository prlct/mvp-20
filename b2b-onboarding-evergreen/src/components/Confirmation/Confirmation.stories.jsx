import React from 'react';

import Avatar from 'components/Avatar';
import Button from 'components/Button';
import styles from './Confirmation.stories.css';

import { confirm } from './index';

export default {
  title: 'Components/Confirmation',
  controls: { hideNoControlsWarning: true },
  decorators: [
    (Story) => (
      <Story />
    ),
  ],
};

export const Basic = () => {
  const basicDialog = async (args) => {
    await confirm({
      ...args,
      heading: 'Delete',
      subheading: 'Deleting',
      body: 'Are you sure you want to delete this document ? It will be deleted immediately, you can not undo this action',
    });
  };

  return <Button onClick={basicDialog}>Basic dialog</Button>;
};

export const CustomBody = () => {
  const user = {
    fullName: 'Bachrimchuk Unknown',
    avatarUrl: 'https://i.ibb.co/RvDN9gG/photo-2021-11-12-10-16-15.jpg',
  };

  const customDialog = async (args) => {
    await confirm({
      ...args,
      heading: 'Delete user',
      submitButtonText: 'Delete',
      withoutBodyMargins: true,
      body: () => (
        <>
          <div className={styles.profileContainer}>
            <Avatar
              src={user.avatarUrl}
              fullName={user.fullName}
            />
            <div className={styles.profile}>
              <div className={styles.fullName}>
                {user.fullName}
              </div>
              <a
                href="https://www.instagram.com/bachrimchuk/"
                target="_blank"
                rel="noreferrer"
                className={styles.link}
              >
                View profile
              </a>
            </div>
          </div>
          <div className={styles.description}>
            Are you sure you want to delete this user?
            It will be deleted immediately, you can not undo this action.
          </div>
        </>
      ),
    });
  };

  return <Button onClick={customDialog}>Dialog with custom body</Button>;
};
