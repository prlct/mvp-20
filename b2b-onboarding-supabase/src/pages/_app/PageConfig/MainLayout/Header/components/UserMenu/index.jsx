import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';

import { path } from 'pages/routes';

import { useOutsideClick } from 'hooks/use-outside-click';

import * as userService from 'resources/user/user.service';

import Avatar from 'components/Avatar';

import styles from './styles.module.css';

const UserMenu = () => {
  const router = useRouter();

  const avatarRef = useRef();

  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const onSignOutClick = useCallback(async () => {
    await userService.signOut();
  }, []);

  const onSettingsClick = useCallback(async () => {
    await router.push(path.profile);
    setIsMenuOpened((prev) => !prev);
  }, [router]);

  const handleOutsideClick = () => setIsMenuOpened(false);

  const handleAvatarClick = () => setIsMenuOpened((prev) => !prev);

  useOutsideClick(avatarRef, handleOutsideClick);

  useEffect(() => {
    setIsMenuOpened(false);
  }, [router]);

  return (
    <div className={styles.container}>
      <button
        ref={avatarRef}
        type="button"
        className={styles.avatarWrapper}
        onClick={handleAvatarClick}
      >
        <Avatar
          onClick={() => router.push(path.profile)}
          fullName="User fullName"
          src={null}
        />
      </button>

      <div className={cn({
        [styles.isOpen]: isMenuOpened,
      }, styles.menu)}
      >
        <button
          type="button"
          className={styles.menuButton}
          onClick={onSettingsClick}
        >
          Profile
        </button>
        <button
          type="button"
          onClick={onSignOutClick}
          className={styles.menuButton}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
