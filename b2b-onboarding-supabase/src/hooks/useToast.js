import { useCallback } from 'react';
import { useToasts } from 'react-toast-notifications';

import { TYPES } from 'components/Toast/constants';

const DEFAULT_ERROR = 'Something went wrong. Try again later.';

export default function useToast() {
  const { addToast } = useToasts();

  const doToast = useCallback((content, appearance, options) => {
    addToast(content, { ...options, appearance });
  }, [addToast]);

  return {
    /* eslint-disable max-len */
    success: useCallback((content, options = {}) => doToast(content, TYPES.SUCCESS, options), [doToast]),
    error: useCallback((content = DEFAULT_ERROR, options = {}) => doToast(content, TYPES.ERROR, options), [doToast]),
  };
}
