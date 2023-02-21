import React, { useContext, useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Box from '../../components/Box';
import EditIcon from '../../components/icons/EditIcon';
import DeleteIcon from '../../components/icons/DeleteIcon';
import DeleteModal from '../../components/DeleteModal';
import Loading from '../../components/Loading';
import http from '../../api/axios';
import CreateModal from '../../components/CreateModal';
import { AuthContext } from '../../context/authContext';
import { MdAdd } from 'react-icons/md';
import CustomInput from '../../components/CustomInput';
import { useForm } from '../../hooks/useForm';
import FormError from '../../components/FormError';
import RequestError from '../../components/RequestError';
import { Toast } from 'primereact/toast';
import { usePaymentTypes } from '../../hooks/usePaymentTypes';
import { IpaymentType } from '../../interfaces/IpaymentType';
import { DelayAlertToHide } from '../../helpers/variableAndConstantes';
import FieldsetGroup from '../../components/FieldsetGroup';

const AllClients = () => {
  const { authState, showAlert, hideAlert } = useContext(AuthContext);
  // const [selectedProducts2, setSelectedProducts2] = useState<IpaymentType[]>();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [show, setShow] = useState(false);
  const { values, handleInputChange, reset } = useForm({
    fullName: '',
    email: '',
    phone: '',
    cuit: '',
    country: '',
    province: '',
    city: '',
    adress: '',
    nrofax: '',
    observation: '',
  });
  const { fullName, email, phone, cuit, country, province, city, adress, nrofax, observation } = values;

  const [errors, setErrors] = useState<any>();
  const [editMode, setEditMode] = useState(false);
  const toast = useRef<Toast>(null);

  const currentPaymentType = useRef<IpaymentType | null>();

  const { data, isError, isLoading, error, isFetching } = usePaymentTypes();

  const edit = (data: IpaymentType) => {
    handleInputChange(data.name, 'fullName');
    setShowCreateModal(true);
    setEditMode(true);
    currentPaymentType.current = data;
  };

  const ConfirmDestroy = (data: IpaymentType) => {
    setShow(!show);
    currentPaymentType.current = data;
  };

  const verifyForm = () => {
    let ok = true;
    let error: any = {};
    if (!fullName.trim().length) {
      ok = false;
      error.name = true;
    }
    setErrors(error);
    return ok;
  };

  const showAndHideModal = (
    title: string,
    message: string,
    color: string = 'green',
    delay: number = DelayAlertToHide
  ) => {
    showAlert({ title, message, color, show: true });
    setTimeout(hideAlert, delay);
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (verifyForm()) {
      if (editMode) {
        try {
          const res = await http.put(`/paymenttypes/${currentPaymentType.current?.id}`, values);
          if (res.data.success) {
            data?.data &&
              (data.data = data?.data.map((z) => {
                if (z.id === currentPaymentType.current?.id) {
                  // z.name = values.name;
                }
                return z;
              }));
            reset();
            setShowCreateModal(false);
            showAndHideModal('Editado', res.data.message);
          } else {
            showAndHideModal('Error', res.data.message || 'Algo malo ocurrío.', 'red');
          }
        } catch (error: any) {
          if (error.response) showAndHideModal('Error', error.response.data?.message || 'Algo malo ocurrío.', 'red');
        }
      } else {
        try {
          const res = await http.post('/paymenttypes', values);
          if (res.data.success) {
            data?.data.push(res.data.data);
            reset();
            setShowCreateModal(false);
            showAndHideModal('Guardado', res.data.message);
          } else {
            showAndHideModal('Error', res.data.message || 'Algo malo ocurrío.', 'red');
          }
        } catch (error: any) {
          if (error.response) showAndHideModal('Error', error.response.data?.message || 'Algo malo ocurrío.', 'red');
        }
      }
    }
  };

  const destroy = async (id: number) => {
    try {
      const res = await http.delete('/paymenttypes/' + id);
      if (res.data.success) {
        data?.data && (data.data! = data?.data.filter((z) => z.id !== id));
        setShow(false);
        showAndHideModal('Borrado', res.data.message);
      } else {
        showAndHideModal('Error', res.data.message || 'Algo malo ocurrío.', 'red');
      }
    } catch (error: any) {
      if (error.response) showAndHideModal('Error', error.response.data?.message || 'Algo malo ocurrío.', 'red');
    }
  };
  const closeCreateModal = () => {
    reset();
    setShowCreateModal(false);
  };

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
      <div className='flex gap-x-4 mb-6 mx-3  items-center'>
        <h3 className='font-bold  text-slate-700 dark:text-slate-500 text-lg sm:text-4xl'>Inquilinos</h3>
        <button
          onClick={() => {
            setEditMode(false);
            currentPaymentType.current = null;
            setShowCreateModal(true);
          }}
          className='btn !w-10 !h-10 !p-0 gradient !rounded-full'
        >
          <MdAdd size={50} />
        </button>
      </div>

      <Box className='!p-0 !overflow-hidden !border-none    sm:w-[500px] mb-4 '>
        <DataTable
          size='small'
          emptyMessage='Aún no hay tipos de pago'
          className='!overflow-hidden   !border-none'
          value={data?.data}
          // selectionMode='checkbox'
          // selection={selectedProducts2}
          // onSelectionChange={(e: any) => setSelectedProducts2(e.value)}
          dataKey='id'
          responsiveLayout='scroll'
        >
          {/* <Column selectionMode='multiple' style={{ width: 10 }} headerStyle={{ width: 10 }} /> */}
          <Column
            field='name'
            header='Nombre'
            headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
            className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
          />
          <Column
            body={actionBodyTemplate}
            headerClassName='!border-none dark:!bg-gray-800'
            className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
            exportable={false}
            style={{ width: 90 }}
          />
        </DataTable>
      </Box>

      {isFetching && (
        <Loading
          h={40}
          w={40}
        />
      )}

      <DeleteModal
        show={show}
        setShow={setShow}
        destroy={() => destroy(currentPaymentType.current?.id!)}
        text={`${currentPaymentType.current?.name}`}
      />

      <CreateModal
        show={showCreateModal}
        closeModal={closeCreateModal}
        className=''
        overlayClick={false}
      // overlayBackground='rgb(227 227 227)'
      >
        <form
          action=''
          onSubmit={handleSave}
        >
          <div className=' flex justify-between'>
            <h2 className='title-form text-2xl sm:text-4xl'>{editMode ? 'Editar' : 'Crear'} inquilino</h2>
          </div>
          <FieldsetGroup>
            <fieldset className=''>
              <label htmlFor='fullname'>Nombre Completo </label>
              <CustomInput
                placeholder='Juan Jose'
                initialValue={fullName}
                onChange={(value) => handleInputChange(value, 'fullName')}
              />
              {errors?.fullName && <FormError text='El nombre es obligatorio.' />}
            </fieldset>
            <fieldset className=''>
              <label htmlFor='email'>Email </label>
              <CustomInput
                placeholder='example@gmail.com'
                initialValue={email}
                onChange={(value) => handleInputChange(value, 'email')}
              />
              {errors?.email && <FormError text='El correo es obligatorio.' />}
            </fieldset>
          </FieldsetGroup>

          <FieldsetGroup >
            <fieldset className=''>
              <label htmlFor='cuit'>Cuit/Cuil </label>
              <CustomInput
                placeholder='20909239120'
                initialValue={cuit}
                onChange={(value) => handleInputChange(value, 'cuit')}
              />
              {errors?.cuit && <FormError text='El cuit es obligatorio.' />}
            </fieldset>
            <fieldset className=''>
              <label htmlFor='phone'>Teléfono </label>
              <CustomInput
                placeholder='3417207882'
                initialValue={phone}
                onChange={(value) => handleInputChange(value, 'phone')}
              />
              {errors?.phone && <FormError text='El teléfono es obligatorio.' />}
            </fieldset>

          </FieldsetGroup>

          <FieldsetGroup>
            <fieldset className=''>
              <label htmlFor='province'>Provincia</label>
              <CustomInput
                placeholder='Santa fe'
                initialValue={province}
                onChange={(value) => handleInputChange(value, 'province')}
              />
              {errors?.province && <FormError text='La provincia es obligatoria.' />}
            </fieldset>
            <fieldset className=''>
              <label htmlFor='city'>Ciudad </label>
              <CustomInput
                placeholder='Rosario'
                initialValue={city}
                onChange={(value) => handleInputChange(value, 'city')}
              />
              {errors?.city && <FormError text='El correo es obligatorio.' />}
            </fieldset>
          </FieldsetGroup>


          <FieldsetGroup >
            <fieldset className=''>
              <label htmlFor='adress'>Dirección</label>
              <CustomInput
                placeholder='Sarmiento 1247'
                initialValue={adress}
                onChange={(value) => handleInputChange(value, 'adress')}
              />
              {errors?.adress && <FormError text='La dirección es obligatoria.' />}
            </fieldset>
            <fieldset className=''>
              <label htmlFor='nrofax'>Número Fax </label>
              <CustomInput
                placeholder='1232421241212'
                initialValue={nrofax}
                onChange={(value) => handleInputChange(value, 'nrofax')}
              />
            </fieldset>
          </FieldsetGroup>

          <fieldset className=''>
            <label htmlFor='observation'>Observación </label>
            <CustomInput
              placeholder='escribe una observación o nota de algo...'
              initialValue={observation}
              onChange={(value) => handleInputChange(value, 'observation')}
            />
          </fieldset>

          <section className='action flex items-center gap-x-3 mt-4'>
            <button
              className='btn !py-1'
              onClick={closeCreateModal}
              type='button'
            >
              Cerrar
            </button>
            <button
              className='btn gradient  !py-1'
              type='submit'
            >
              Guardar
            </button>
          </section>
        </form>
      </CreateModal>
    </div>
  );
};

export default AllClients;
