import React from 'react';
import { Modal } from 'react-responsive-modal';
import Box from './Box';

interface Props {
  children: any;
  show: boolean;
  className?: string;
  overlayBackground?: string;
  closeModal: any;
  overlayClick?: boolean;
}

const CreateModal = ({ show, closeModal, children, className, overlayClick = true, overlayBackground }: Props) => {
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
      <Box className={`modal-content  flex flex-col ${className}`}>{children}</Box>
    </Modal>
  );
};

export default CreateModal;
