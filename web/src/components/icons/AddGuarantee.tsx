import React from 'react'
import { AiOutlineUsergroupAdd, } from 'react-icons/ai'

const AddGuarantee = ({ action, color = 'green', size = 25 }: { size?: number, color?: string, action?: any }) => {
  return (
    <AiOutlineUsergroupAdd color={color} size={size} onClick={action} />
  )
}

export default AddGuarantee