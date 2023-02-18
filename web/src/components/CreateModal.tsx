import React from 'react'
import { Modal } from 'react-responsive-modal';
import Box from './Box';


const CreateModal = ({ show, closeModal, children, className }: { children: any, show: boolean, className?: string, closeModal: any }) => {


  return (

    <Modal open={show} onClose={closeModal} center styles={{
      modalContainer: {
        background: 'rgba(0,0,0,0.5)'
      },
      modal: {
        background: 'transparent',
        boxShadow: 'none',
        padding: 0,
      }
    }}
      showCloseIcon={false}
    >
      <Box className={`modal-content  flex flex-col ${className}`}>
        {children}
      </Box>
    </Modal>
  )
}

export default CreateModal