import React from 'react';
import { DefaultToastContainer } from 'react-toast-notifications';

import styles from './styles.module.css';

const ToastContainer = (props) => (
  <DefaultToastContainer {...props} className={styles.toastContainer} />
);

export default React.memo(ToastContainer);
