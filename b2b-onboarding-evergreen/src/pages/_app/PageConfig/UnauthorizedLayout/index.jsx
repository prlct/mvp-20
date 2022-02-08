import PropTypes from 'prop-types';

import Logo from 'public/images/logo.svg';

import styles from './styles.module.css';

const UnauthorizedLayout = ({ children }) => (
  <div className={styles.wrapper}>
    <header className={styles.header}>
      <Logo className={styles.logo} />
      <p>HomeBase</p>
    </header>

    <main className={styles.content}>
      {children}
    </main>
  </div>
);

UnauthorizedLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UnauthorizedLayout;
