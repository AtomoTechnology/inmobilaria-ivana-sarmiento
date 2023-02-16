import React from 'react';

const Box = ({ children, className }: { children: any, className?: string }) => {
  return (
    <div className={`dark:bg-slate-800 text-slate-900 dark:text-slate-400 rounded-md shadow-md border border-gray-200 dark:border-slate-800   bg-white  p-6 mx-2 ` + className}>
      {children}
    </div>
  );
};

export default Box;
