import React, { useContext } from 'react'
import { Modal } from 'react-responsive-modal'
import { AuthContext } from '../context/authContext'
import Box from './Box'

interface Props {
	children: any
	show: boolean
	className?: string
	overlayBackground?: string
	closeModal: any
	overlayClick?: boolean
	titleText: string
	custom?: boolean
}

const CreateModal = ({
	show,
	closeModal,
	children,
	className,
	overlayClick = false,
	overlayBackground,
	titleText,
	custom = false
}: Props) => {
	return (
		<Modal
			open={show}
			onClose={closeModal}
			center
			styles={{
				modalContainer: {
					maxWidth: '100wv !important',
					width: '100vw !important',
					background: overlayBackground
						? overlayBackground
						: localStorage.theme === 'light'
							? 'rgba(0,0,0,0.5)white'
							: 'rgba(0,0,0,0.1)',
				},
				modal: {
					background: 'transparent',
					boxShadow: 'none',
					padding: 0,
					maxWidth: custom ? '95%' : '100wv !important',
					width: custom ? '95%' : '100vw !important',
					// maxWidth: '100wv',
					// width: '100vw',
				},
			}}
			showCloseIcon={false}
			closeOnOverlayClick={overlayClick}
		>
			<Box className={`modal-content    flex flex-col ${className}`}>
				<div className=' flex justify-between'>
					<h2 className='title-form text-1xl sm:text-2xl'>{titleText}</h2>
				</div>
				{children}
			</Box>
		</Modal>
	)
}

export default CreateModal
