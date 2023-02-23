import React, { useContext, useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Box from '../../components/Box';
import EditIcon from '../../components/icons/EditIcon';
import DeleteIcon from '../../components/icons/DeleteIcon';
import DeleteModal from '../../components/DeleteModal';
import Loading from '../../components/Loading';
import { useZones } from '../../hooks/useZones';
import { Izone } from '../../interfaces/Izones';
import http from '../../api/axios';
import CreateModal from '../../components/CreateModal';
import { AuthContext } from '../../context/authContext';
import { MdAdd } from 'react-icons/md';
import CustomInput from '../../components/CustomInput';
import { useForm } from '../../hooks/useForm';
import FormError from '../../components/FormError';
import RequestError from '../../components/RequestError';
import { DelayAlertToHide } from '../../helpers/variableAndConstantes';

const AllZones = () => {

  const { showAlert, hideAlert } = useContext(AuthContext);
  const [selectedProducts2, setSelectedProducts2] = useState<Izone[]>();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [show, setShow] = useState(false);
  const { name, values, handleInputChange, reset } = useForm({ name: '' })
  const [errors, setErrors] = useState<any>();
  const [editMode, setEditMode] = useState(false)

  const currentZone = useRef<Izone | null>();

  const { data, isError, isLoading, error, isFetching, } = useZones();

  const edit = (data: Izone) => {
    handleInputChange(data.name, 'name');
    setShowCreateModal(true)
    setEditMode(true)
    currentZone.current = data;
  };

  const ConfirmDestroy = (data: Izone) => {
    setShow(!show);
    currentZone.current = data;
  };
  const showAndHideModal = (title: string, message: string, color: string = 'green', delay: number = DelayAlertToHide) => {
    showAlert({ title, message, color, show: true })
    setTimeout(hideAlert, delay)
  }

  const destroy = async (id: number) => {
    try {
      const res = await http.delete('/zones/' + id);
      if (res.data.ok) {
        data?.data && (data.data! = data?.data.filter(z => z.id !== id));
        setShow(false);
        showAndHideModal('Borrado', res.data.message)
      } else {
        showAndHideModal('Error', res.data.message || 'Algo malo ocurrío.', 'red')
      }
    } catch (error: any) {
      if (error.response) showAndHideModal('Error', error.response.data?.message || 'Algo malo ocurrío.', 'red')
    }
  };

  const verifyForm = () => {
    let ok = true;
    let error: any = {};
    if (!name.trim().length) {
      ok = false;
      error.name = true;
    }
    setErrors(error);
    return ok;
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (verifyForm()) {
      if (editMode) {
        try {
          const res = await http.put(`/zones/${currentZone.current?.id}`, values);
          if (res.data.ok) {
            data?.data && (data.data = data?.data.map(z => {
              if (z.id === currentZone.current?.id) {
                z.name = values.name
              }
              return z;
            }))
            reset();
            setShowCreateModal(false);
            showAndHideModal('Editado', res.data.message)
          } else {
            showAndHideModal('Error', res.data.message || 'Algo malo ocurrío.', 'red')
          }
        } catch (error: any) {
          if (error.response) showAndHideModal('Error', error.response.data?.message || 'Algo malo ocurrío.', 'red')
        }
      } else {
        try {
          const res = await http.post('/zones', values);
          if (res.data.ok) {
            data?.data.push(res.data.data)
            reset();
            setShowCreateModal(false);
            showAndHideModal('Guardado', res.data.message)
          } else {
            showAndHideModal('Error', res.data.message || 'Algo malo ocurrío.', 'red')
          }
        } catch (error: any) {
          console.log(error)
          if (error.response) showAndHideModal('Error', error.response.data?.message || 'Algo malo ocurrío.', 'red')
        }
      }

    }
  }

  const closeCreateModal = () => {
    reset();
    setShowCreateModal(false);
  }

  const actionBodyTemplate = (rowData: any) => {
    return (
      <div className='flex gap-x-3 items-center justify-center'>
        <EditIcon action={() => edit(rowData)} />
        <DeleteIcon action={() => ConfirmDestroy(rowData)} />
      </div>
    );
  };

  if (isLoading) return <Loading />;
  if (isError) return <RequestError error={error} />;


  return (
    <div className='container m-auto  flexsm:mx-0  flex-col justify-center sm:justify-center'>

      <div className='flex gap-x-4 mb-6 mx-4  items-center justify-between sm:justify-start'>
        <h3 className='font-bold  text-slate-700 dark:text-slate-500 text-lg sm:text-4xl'>Zonas</h3>
        <button onClick={() => { setEditMode(false); currentZone.current = null; setShowCreateModal(true) }} className='btn !w-10 !h-10 !p-0 gradient !rounded-full'>
          <MdAdd size={50} />
        </button>
      </div>

      <Box className='!p-0 !overflow-hidden !border-none !mx-4   sm:w-[500px] mb-4 '>
        <DataTable
          size='small'
          emptyMessage='Aún no hay zona'
          className='!overflow-hidden   !border-none'
          value={data?.data}
          selectionMode='checkbox'
          selection={selectedProducts2}
          onSelectionChange={(e: any) => setSelectedProducts2(e.value)}
          dataKey='id'
          responsiveLayout='scroll'
        >
          {/* <Column selectionMode='multiple' style={{ width: 10 }} headerStyle={{ width: 10 }} /> */}
          <Column field='name' header='Nombre' headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400' className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 ' />
          <Column body={actionBodyTemplate} headerClassName='!border-none dark:!bg-gray-800' className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 ' exportable={false} style={{ width: 90 }} />
        </DataTable>
      </Box>

      {isFetching && (<Loading h={40} w={40} />)}

      <DeleteModal
        show={show}
        setShow={setShow}
        destroy={() => destroy(currentZone.current?.id!)}
        text={`${currentZone.current?.name}`}
      />

      <CreateModal
        show={showCreateModal}
        closeModal={closeCreateModal}
        className='max-w-[400px] w-[300px]'
      >
        <form action="" onSubmit={handleSave}>

          <div className=' flex justify-between'>
            <h2 className='title-form'>{editMode ? 'Editar' : 'Crear'} zona</h2>
          </div>

          <fieldset className=''>
            <CustomInput placeholder='Sur,Este,Norte' initialValue={name} onChange={(value) => handleInputChange(value, 'name')} />
            {errors?.name && <FormError text='El nombre es obligatorio.' />}
          </fieldset>
          <section className='action flex items-center gap-x-3 mt-4'>
            <button className='btn !py-1' onClick={closeCreateModal} type='button'>
              Cerrar
            </button>
            <button className='btn gradient  !py-1' type='submit'>
              Guardar
            </button>
          </section>
        </form>

      </CreateModal>
    </div>
  );
};

export default AllZones;
