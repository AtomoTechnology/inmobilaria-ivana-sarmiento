import { useState } from 'react';

export const useForm = <T extends Object>(initialState: T) => {
  const [values, setValues] = useState(initialState);

  const reset = () => {
    setValues(initialState);
  };

  const handleInputChange = <K extends Object>(value: K, name: keyof T) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  return { values, handleInputChange, reset, ...values };
};
