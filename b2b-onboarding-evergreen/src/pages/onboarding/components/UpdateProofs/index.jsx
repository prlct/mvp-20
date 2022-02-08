import React, {
  useState, useCallback, memo, createRef, useEffect,
} from 'react';
import PropTypes from 'prop-types';

import {} from 'public/icons';

import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import FileUpload from 'components/FileUpload';

import styles from './styles.module.css';

const checkboxes = ['Kitchen remodel', 'Upgraded Flooring', 'New windows'];

const UpdateProofs = ({ onPressNext }) => {
  const [uploadersRefs, setUploadersRefs] = useState([]);
  const [checkboxesData, setCheckboxesData] = useState(checkboxes.map((label) => ({
    label,
    checked: true,
    imageData: null,
  })));

  useEffect(() => {
    setUploadersRefs((elRefs) => Array(checkboxes.length)
      .fill()
      .map((_, i) => elRefs[i] || createRef()));
  }, []);

  const onCheckboxChange = useCallback((label) => {
    setCheckboxesData(checkboxesData.map((checkbox) => {
      if (checkbox.label === label) {
        // eslint-disable-next-line no-param-reassign
        checkbox.checked = !checkbox.checked;
      }

      return checkbox;
    }));
  }, [checkboxesData]);

  const getAllUploadedFiles = useCallback(() => uploadersRefs.reduce((acc, ref) => {
    const files = ref.current.getAllFiles();

    return [...acc, ...files];
  }, []), [uploadersRefs]);

  const onGoNext = useCallback(() => {
    const uploadedFiles = getAllUploadedFiles();

    onPressNext({
      changesFiles: uploadedFiles.map(({ file }) => file),
    });
  }, [getAllUploadedFiles, onPressNext]);

  return (
    <div className={styles.wrapper}>
      <h2>Upload proof of updates</h2>
      <p>
        This could be invoices from contractors, photos of receipts,
        or snap a picture of the upgrade itself.
      </p>

      <div>
        {checkboxesData.map((checkboxData, index) => (
          <div key={checkboxData.label} className={styles.checkbox}>
            <Checkbox
              name={checkboxData.label}
              text={checkboxData.label}
              checked={checkboxData.checked}
              onChange={() => onCheckboxChange(checkboxData.label)}
            />
            {checkboxData.checked && (
            <div className={styles.fileUploaderContainer}>
              <FileUpload
                ref={uploadersRefs[index]}
                className={styles.fileUploader}
              />
            </div>
            )}
          </div>
        ))}
      </div>

      <Button
        className={styles.button}
        onClick={onGoNext}
      >
        Save changes
      </Button>

      <Button
        type="minimal"
        className={styles.linkButton}
      >
        Skip Step
      </Button>
    </div>
  );
};

UpdateProofs.propTypes = {
  onPressNext: PropTypes.func.isRequired,
};

export default memo(UpdateProofs);
