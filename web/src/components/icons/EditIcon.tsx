import React from 'react'
import { CiEdit } from 'react-icons/ci'
import { PrimaryColor, SecondaryColor } from '../../helpers/variableAndConstantes';


interface Props {
  color?: string;
  size?: number;
  action?: any
}
const EditIcon = ({ size = 25, color = SecondaryColor, action }: Props) => {
  return (
    <CiEdit size={size} color={color} onClick={action} />
  )
}

export default EditIcon