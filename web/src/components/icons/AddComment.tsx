import React from 'react'
import { BiMessageSquareAdd } from 'react-icons/bi'

const AddComment = ({ action, color = 'gray', size = 25 }: { size?: number; color?: string; action?: any }) => {
	return (
		<BiMessageSquareAdd
			color={color}
			size={size}
			onClick={action}
		/>
	)
}

export default AddComment
