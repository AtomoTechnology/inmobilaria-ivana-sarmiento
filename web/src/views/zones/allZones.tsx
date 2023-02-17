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

const AllZones = () => {
  const { authState } = useContext(AuthContext);
  const [selectedProducts2, setSelectedProducts2] = useState<Izone[]>();
  const [showDestroyModal, setShowDestroyModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [show, setShow] = useState(false);
  const currentId = useRef<Izone>();
  const { name, values, handleInputChange, reset } = useForm({ name: '' })
  const [errors, setErrors] = useState<any>();


  const { data, isError, isLoading, error, refetch, isFetching } = useZones();

  const edit = (data: Izone) => {
    console.log(data);
  };
  const destroy = (data: Izone) => {
    setShow(!show);
    currentId.current = data;
    console.log(data);
  };

  const destroyt = async (id: number) => {
    const res = await http.delete('/zones/' + id);
    if (res.data.success) {
      console.log('exito!!!');
      setShow(false);
      // refetch();
    } else {
      console.log('somes wrong hapenn!');
      console.log(res.data);
    }
  };

  const actionBodyTemplate = (rowData: any) => {
    return (
      <div className='flex gap-x-3 items-center justify-center'>
        <EditIcon action={() => edit(rowData)} />
        <DeleteIcon action={() => destroy(rowData)} />
      </div>
    );
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

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (verifyForm()) {
      console.log('okkkk')
    } else {
      console.log(values)
    }
  }
  if (isLoading) return <Loading />;

  return (
    <div className='container m-auto  flexsm:mx-0  flex-col justify-center sm:justify-center'>
      {/* <span>{authState.token}</span> */}
      <div className='flex gap-x-4 mb-4 mx-3  items-center'>
        <h3 className='title-form !text-slate-700 text-lg sm:text-4xl'>Zonas</h3>
        <button onClick={() => setShowCreateModal(true)} className='btn !w-10 !h-10 !p-0 gradient !rounded-full'>
          <MdAdd size={50} />
        </button>
      </div>
      <Box className='!p-0 overflow-hidden    sm:w-[500px] mb-4 '>
        <DataTable
          size='small'
          emptyMessage='Aún no hay zona'
          className='overflow-hidden'
          value={data?.data}
          selectionMode='checkbox'
          selection={selectedProducts2}
          onSelectionChange={(e: any) => setSelectedProducts2(e.value)}
          dataKey='id'
          responsiveLayout='scroll'
        >
          <Column selectionMode='multiple' style={{ width: 10 }} headerStyle={{ width: 10 }} />
          <Column field='name' header='Nombre' />
          <Column body={actionBodyTemplate} exportable={false} style={{ width: 90 }} />
        </DataTable>
      </Box>
      {isFetching && (<Loading h={40} w={40} />)}
      <DeleteModal
        show={show}
        setShow={setShow}
        destroy={() => destroyt(currentId.current?.id!)}
        text={`${currentId.current?.name}`}
      />
      <CreateModal
        title='Crear zona'
        show={showCreateModal}
        setShow={setShowCreateModal}
        destroy={() => destroyt(currentId.current?.id!)}
        text={`${currentId.current?.name}`}
      >
        <form action="" onSubmit={handleSave}>

          <div className=' flex justify-between'>
            <h2 className='title-form'>Creer zona</h2>
          </div>

          <fieldset className=''>
            <CustomInput placeholder='Sur,Este,Norte' onChange={(value) => handleInputChange(value, 'name')} />
            {errors?.name && <FormError text='El nombre es obligatorio.' />}
          </fieldset>
          <section className='action flex items-center gap-x-3 mt-4'>
            <button className='btn !py-1' onClick={() => setShowCreateModal(false)} type='button'>
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
