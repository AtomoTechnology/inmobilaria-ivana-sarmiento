import React, { useContext } from 'react';
import { Modal } from 'react-responsive-modal';
import { AuthContext } from '../context/authContext';
import Box from './Box';

interface Props {
  children: any;
  show: boolean;
  className?: string;
  overlayBackground?: string;
  closeModal: any;
  overlayClick?: boolean;
  titleText: string
}

const CreateModal = ({ show, closeModal, children, className, overlayClick = false, overlayBackground, titleText }: Props) => {


  return (
    <Modal
      open={show}
      onClose={closeModal}
      center
      styles={{
        modalContainer: {
          background: overlayBackground ? overlayBackground : localStorage.theme === 'light' ? 'rgba(0,0,0,0.5)white' : 'rgba(0,0,0,0.1)',
        },
        modal: {
          background: 'transparent',
          boxShadow: 'none',
          padding: 0,
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
  );
};

export default CreateModal;
