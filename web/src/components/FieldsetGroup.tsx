import React from 'react'

const FieldsetGroup = ({ children }: any) => {
  return (
    <div className='fieldset-groug-2 flex flex-col sm:flex-row gap-2 sm:gap-8 items-center justify-between  '>
      {children}
    </div>
  )
}

export default FieldsetGroup