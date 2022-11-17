import { useState } from 'react';

function useInput(defaulValue = '') {
  const [value, setValue] = useState(defaulValue);

  function handleValueChange({ target }) {
    setValue(target.value);
  }

  return [value, handleValueChange, setValue];
}

export default useInput;
