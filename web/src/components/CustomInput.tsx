import { useState } from 'react';

type Props = {
  placeholder: string;
  type?: string;
  onChange: (val: string) => void;
  className?: string;
  initialValue?: string | number;
};

const CustomInput = ({ initialValue = '', placeholder, type = 'text', onChange, className = '' }: Props) => {
  const [value, setValue] = useState<string | number>(initialValue);

  return (
    <input
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
      className={`dark:!bg-gray-900 dark:text-slate-400 border !border-gray-300 dark:!border-slate-700 !shadow ${className}`}
      value={value}
      placeholder={placeholder}
      type={type}
    />
  );
};

export default CustomInput;
