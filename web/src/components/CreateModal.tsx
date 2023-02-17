import React, { useState } from 'react'
import { Modal } from 'react-responsive-modal';
import Box from './Box';


const CreateModal = ({ show, setShow, destroy, text, title, children }: { children: any, title: string, show: boolean, setShow: any, destroy: any, text: string }) => {

  const closeModal = () => setShow(!show);

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
      <Box className="modal-content bg-red-400 max-w-[300px] flex flex-col">
        {children}
      </Box>
    </Modal>
  )
}

export default CreateModal