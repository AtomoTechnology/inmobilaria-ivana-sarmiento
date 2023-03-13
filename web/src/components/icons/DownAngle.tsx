import React from 'react'
import { BiChevronDown } from 'react-icons/bi'
interface Props {
	color?: string
	size?: number
}
const DownAngle = ({ size = 25, color = localStorage.theme === 'dark' ? 'gray' : 'SecondaryColor' }: Props) => {
	return (
		<BiChevronDown
			size={size}
			color={color}
		/>
	)
}

export default DownAngle
