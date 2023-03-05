import { useState } from 'react';

type Props = {
  placeholder: string;
  type?: string;
  onChange: (val: string) => void;
  className?: string;
  initialValue?: string | number;
  disabled?: boolean;
  maxLength?: number | undefined;

};

const CustomInput = ({ initialValue = '', placeholder, type = 'text', onChange, maxLength = undefined, className = '', disabled = false }: Props) => {
  const [value, setValue] = useState<string | number>(initialValue);

  return (
    <input
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
      maxLength={maxLength}
      className={`dark:!bg-gray-900 dark:text-slate-400 border !border-gray-300 dark:!border-slate-700 !shadow ${className}`}
      value={value}
      placeholder={placeholder}
      type={type}
      disabled={disabled}
    />
  );
};

export default CustomInput;
