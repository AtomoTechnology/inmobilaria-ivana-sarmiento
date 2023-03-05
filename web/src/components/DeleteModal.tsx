import { Modal } from 'react-responsive-modal';
import Box from './Box';


const DeleteModal = ({ show, setShow, destroy, text }: { show: boolean, setShow: any, destroy: any, text: string }) => {

  const closeModal = () => setShow(!show);

  return (
    <Modal open={show} onClose={closeModal} center styles={{
      modalContainer: {
        background: localStorage.theme === 'light' ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.1)'
      },
      modal: {
        background: 'transparent',
        boxShadow: 'none',
        padding: 0,
      }
    }}
      showCloseIcon={false}
    >
      <Box className="modal-content  max-w-[400px] flex flex-col">
        <div className=" flex justify-between">
          <h2 className='title-form text-2xl'>Borrar registro</h2>
        </div>
        <br />
        <span className="message">
          ¿Estás seguro de eliminar : <span className="text-base text-red-500 dark:text-red-400 font-bold">{text} ?</span>
        </span>
        <section className="action flex items-center gap-x-3 mt-8">
          <button className='btn sec !py-1' onClick={closeModal} >Cerrar</button>
          <button className='btn gradient  !py-1' onClick={destroy} >Borrar</button>
        </section>
      </Box>
    </Modal>
  )
}

export default DeleteModal