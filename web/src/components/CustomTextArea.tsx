import { useState } from 'react';

type Props = {
  placeholder: string;
  onChange: (val: string) => void;
  className?: string;
  initialValue?: string;
};

const CustomTextArea = ({ initialValue = '', placeholder, onChange, className = '' }: Props) => {
  const [value, setValue] = useState<string>(initialValue);

  return (
    <textarea
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
      className={`dark:!bg-gray-900 dark:text-slate-400 border !border-gray-300 !shadow dark:!border-slate-700 ${className}`}
      value={value}
      placeholder={placeholder}
    />
  );
};

export default CustomTextArea;
