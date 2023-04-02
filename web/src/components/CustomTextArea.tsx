import { useState } from 'react';
import FormError from './FormError';

type Props = {
  placeholder: string;
  onChange: (val: string) => void;
  className?: string;
  initialValue?: string;
  maxLength?: number | undefined
  minLength?: number | undefined
  label?: string
  required?: boolean
  hasError?: boolean
  errorText?: string
};

const CustomTextArea = (
  { initialValue = '',
    placeholder,
    onChange,
    className = '',
    label = undefined,
    required = false,
    hasError = false,
    maxLength = undefined,
    minLength = undefined,
    errorText = 'El campo es obligatorio'
  }: Props) => {
  const [value, setValue] = useState<string>(initialValue);

  return (
    <fieldset>
      {label && (<label htmlFor={label}>{label}</label>)}
      <textarea
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        className={`dark:!bg-gray-900 dark:text-slate-400 border !border-gray-300 !shadow dark:!border-slate-700 ${className}`}
        value={value}
        maxLength={maxLength}
        required={required}
        minLength={minLength}
        name={label}
        placeholder={placeholder}
      />
      {hasError && <FormError text={errorText} />}

    </fieldset>
  );
};

export default CustomTextArea;
