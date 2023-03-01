import React from 'react'
import { AiOutlineEye, } from 'react-icons/ai'

const SeeIcon = ({ action, color = 'green', size = 25 }: { size?: number, color?: string, action?: any }) => {
  return (
    <AiOutlineEye color={color} size={size} onClick={action} />
  )
}

export default SeeIcon