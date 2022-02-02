import React, { memo } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import { FileUploadIcon } from 'public/icons';

import styles from './FileUpload.module.css';

const Input = ({
  accept, onFiles, getFilesFromEvent, extra, error,
}) => (
  <label htmlFor="fileInput" className={styles.browseButton}>
    <div className={cn({
      [styles.error]: error.message,
      [styles.active]: extra.active,
    }, styles.uploadArea)}
    >
      <div className={styles.contentContainer}>
        <FileUploadIcon className={styles.uploadDocumentIcon} />
        <div className={styles.uploadAreaText}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          Tap here to select an invoice,  receipt, or photo of upgrade
          <input
            id="fileInput"
            style={{ display: 'none' }}
            type="file"
            accept={accept}
            multiple
            onChange={(e) => {
              getFilesFromEvent(e).then((chosenFiles) => {
                onFiles(chosenFiles);
              });
            }}
          />
        </div>
      </div>
    </div>
  </label>
);

Input.propTypes = {
  accept: PropTypes.string.isRequired,
  onFiles: PropTypes.func.isRequired,
  getFilesFromEvent: PropTypes.func.isRequired,
  extra: PropTypes.shape({
    active: PropTypes.bool.isRequired,
  }).isRequired,
  error: PropTypes.shape({
    message: PropTypes.string,
  }).isRequired,
};

export default memo(Input);
