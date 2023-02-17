import { useState } from 'react';

type Props = {
  placeholder: string;
  type?: string;
  onChange: (val: string) => void;
  className?: string;
  initialValue?: string;
};

const CustomInput = ({ initialValue = '', placeholder, type = 'text', onChange, className = '' }: Props) => {
  const [value, setValue] = useState<string>(initialValue);

  return (
    <input
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
      className={`dark:!bg-gray-900 dark:text-slate-400 ${className}`}
      value={value}
      placeholder={placeholder}
      type={type}
    />
  );
};

export default CustomInput;
