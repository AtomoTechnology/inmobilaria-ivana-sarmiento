import React from 'react'
import { AiOutlineUsergroupAdd, } from 'react-icons/ai'

const AddGuarantee = ({ action, color, size = 25 }: { size?: number, color?: string, action?: any }) => {
  return (
    <AiOutlineUsergroupAdd title='Agregar Garante' color={color} size={size} onClick={action} />
  )
}

export default AddGuarantee