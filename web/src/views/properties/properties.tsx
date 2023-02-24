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
import { DelayAlertToHide } from '../../helpers/variableAndConstantes';
import FieldsetGroup from '../../components/FieldsetGroup';
import { IPerson } from '../../interfaces/Iowners';
import { useOwners } from '../../hooks/useOwners';
import { Dropdown } from 'primereact/dropdown';
import { provinces } from '../../api/provinces';
import { Button } from 'primereact/button';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from 'primereact/inputtext';

const Properties = () => {
  const { authState, showAlert, hideAlert } = useContext(AuthContext);
  // const [selectedProducts2, setSelectedProducts2] = useState<IPerson[]>();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [show, setShow] = useState(false);
  const { values, handleInputChange, reset, updateAll } = useForm({
    ZoneId: '',
    PropertyId: '',
    OwnerId: '',
    street: '',
    number: '',
    floor: '',
    dept: '',
    isFor: '',
    state: '',
    description: ''
  });
  const { ZoneId, OwnerId, street, number, floor, dept, description, isFor, state, PropertyId } = values;
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [errors, setErrors] = useState<any>();
  const [editMode, setEditMode] = useState(false);
  const [cities, setCities] = useState([])
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    fullName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    cuit: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const currentOwner = useRef<IPerson | null>();

  const { data, isError, isLoading, error, isFetching, refetch } = useOwners();

  const edit = (data: IPerson) => {
    // handleInputChange(data.fullName, 'fullName');
    updateAll({
      "ZoneId": "data.ZoneId",
      "PropertyId": "data.PropertyId",
      "OwnerId": "data.OwnerId",
      "street": "data.street",
      "number": "data.number",
      "floor": "data.floor",
      "isFor": "data.isFor",
      "state": "data.state",
      "description": "data.description"
    });
    getCitiesByProvinces(data.province)
    setShowCreateModal(true);
    setEditMode(true);
    currentOwner.current = data;
  };

  const ConfirmDestroy = (data: IPerson) => {
    setShow(!show);
    currentOwner.current = data;
  };

  const verifyForm = () => {
    let ok = true;
    let error: any = {};
    if (!fullName?.trim().length) {
      ok = false;
      error.fullName = true;
    }
    if (!email?.trim().length) {
      ok = false;
      error.email = true;
    }

    if (!cuit?.trim().length) {
      ok = false;
      error.cuit = true;
    }
    if (!phone.trim().length) {
      ok = false;
      error.phone = true;
    }
    if (!address?.trim().length) {
      ok = false;
      error.address = true;
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
          const res = await http.put(`/owners/${currentOwner.current?.id}`, values);
          if (res.data.ok) {
            data?.data &&
              (data.data = data?.data.map((z) => {
                if (z.id === currentOwner.current?.id) {
                  // alert('hello')
                  // console.log(z, { ...values })
                  z =
                  {
                    fullName: values.fullName,
                    email: values.email,
                    phone: values.phone,
                    cuit: values.cuit,
                    province: values.province,
                    city: values.city,
                    address: values.address,
                    nroFax: values.nroFax,
                    obs: values.obs,
                    id: currentOwner.current.id,
                    uuid: currentOwner.current.uuid,
                    createdAt: currentOwner.current.createdAt,
                    updatedAt: currentOwner.current.updatedAt
                  };
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
          const res = await http.post('/owners', values);
          if (res.data.ok) {
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
      const res = await http.delete('/owners/' + id);
      if (res.data.ok) {
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
    setErrors({});
  };
  const onGlobalFilterChange = (e: any) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };
  const actionBodyTemplate = (rowData: any) => {
    return (
      <div className='flex gap-x-3 items-center justify-center'>
        <EditIcon action={() => edit(rowData)} />
        <DeleteIcon action={() => ConfirmDestroy(rowData)} />
      </div>
    );
  };

  const getCitiesByProvinces = async (prov: string) => {
    const resp = await fetch(
      `https://apis.datos.gob.ar/georef/api/localidades?provincia=${prov}&campos=nombre&max=1000`
    );
    const c = await resp.json();
    setCities(c.localidades);
  };

  const paginatorLeft = <Button onClick={() => refetch()} type="button" icon="pi pi-refresh" text />;
  const renderHeader = () => {
    return (
      <div className="flex justify-content-end ">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText className='w-full sm:!w-96 h-[50px] !border-gray-200 shadow-lg' value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Buscar propietario por nombre o cuit" />
        </span>
      </div>
    );
  };
  if (isLoading) return <Loading />;
  if (isError) return <RequestError error={error} />;

  return (
    <div className='container m-auto  flexsm:mx-0  flex-col justify-center sm:justify-center'>
      <div className='flex gap-x-4 mb-6 mx-3  items-center'>
        <h3 className='font-bold  text-slate-700 dark:text-slate-500 text-lg sm:text-4xl'>Propietarios</h3>
        <button
          onClick={() => {
            setEditMode(false);
            currentOwner.current = null;
            setShowCreateModal(true);
          }}
          className='btn !w-10 !h-10 !p-0 gradient !rounded-full'
        >
          <MdAdd size={50} />
        </button>
      </div>

      <input
        onChange={onGlobalFilterChange}
        className={`dark:!bg-gray-900 dark:text-slate-400 border dark:!border-slate-700 m-auto w-[92%] !mx-3 sm:mx-0 sm:w-96 ml-0 sm:ml-[10px] mb-4`}
        value={globalFilterValue}
        placeholder='Buscar propietario por nombre o cuit'
        type='search'
      />
      {/* <div className="flex mx-[10px] mb-4 justify-content-end ">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />

          <InputText className='w-full sm:!w-96 h-[50px] outline-none ring-0 dark:text-slate-400 dark:bg-slate-700 dark:!border-slate-800 !border-gray-200 shadow-lg'
            value={} onChange={onGlobalFilterChange}
            placeholder="Buscar propietario por nombre o cuit" />
        </span>
      </div> */}
      <Box className='!p-0 !overflow-hidden !border-none    mb-4 '>
        <DataTable
          size='small'
          emptyMessage='Aún no hay propietario'
          className='!overflow-hidden   !border-none'
          value={data?.data}
          paginator rows={10}
          // header={renderHeader}
          filters={filters}
          globalFilterFields={['fullName', 'cuit']}
          // rowsPerPageOptions={[5, 10, 25, 50]}
          paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} al {last} de {totalRecords}"
          paginatorLeft={paginatorLeft}
          // paginatorRight={paginatorRight}

          // paginator
          // selectionMode='checkbox'
          // selection={selectedProducts2}
          // onSelectionChange={(e: any) => setSelectedProducts2(e.value)}
          dataKey='id'
          responsiveLayout='scroll'
        >
          {/* <Column selectionMode='multiple' style={{ width: 10 }} headerStyle={{ width: 10 }} /> */}
          <Column
            field='fullName'
            header='Nombre'
            headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
            className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
            sortable
          />
          <Column
            field='cuit'
            header='Cuit/Cuil'
            headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
            className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
            sortable
          />
          <Column
            field='email'
            header='Correo'
            headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
            className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
          />
          <Column
            field='phone'
            header='Celular'
            headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
            className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
          />
          <Column
            field='address'
            body={(data) => <span> {data.city}  {data.province} ,  {data.address} </span>}
            header='Dirección'
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
        destroy={() => destroy(currentOwner.current?.id!)}
        text={`${currentOwner.current?.fullName}`}
      />

      <CreateModal
        show={showCreateModal}
        closeModal={closeCreateModal}
        overlayClick={false}
      >
        <form onSubmit={handleSave}>
          <div className=' flex justify-between'>
            <h2 className='title-form text-2xl sm:text-4xl'>{editMode ? 'Editar' : 'Crear'} propietario</h2>
          </div>

          <FieldsetGroup>
            <fieldset className=''>
              <label htmlFor='fullname'>Nombre Completo </label>
              <CustomInput
                placeholder='Juan Jose'
                initialValue={fullName || ''}
                onChange={(value) => handleInputChange(value, 'fullName')}
              />
              {errors?.fullName && <FormError text='El nombre es obligatorio.' />}
            </fieldset>
            <fieldset className=''>
              <label htmlFor='email'>Email </label>
              <CustomInput
                placeholder='example@gmail.com'
                initialValue={email || ''}
                type="email"
                onChange={(value) => handleInputChange(value, 'email')}
              />
              {errors?.email && <FormError text='El correo es obligatorio.' />}
            </fieldset>
          </FieldsetGroup>

          <FieldsetGroup>
            <fieldset className=''>
              <label htmlFor='cuit'>Cuit/Cuil </label>
              <CustomInput
                placeholder='20909239120'
                initialValue={cuit || ''}
                onChange={(value) => handleInputChange(value, 'cuit')}
              />
              {errors?.cuit && <FormError text='El cuit es obligatorio.' />}
            </fieldset>
            <fieldset className=''>
              <label htmlFor='phone'>Teléfono </label>
              <CustomInput
                placeholder='3417207882'
                initialValue={phone || ''}
                onChange={(value) => handleInputChange(value, 'phone')}
              />
              {errors?.phone && <FormError text='El teléfono es obligatorio.' />}
            </fieldset>
          </FieldsetGroup>

          <FieldsetGroup>
            <fieldset className=''>
              <label htmlFor='province'>Provincia</label>
              {/* <CustomInput
                placeholder='Santa fe'
                initialValue={province || ''}
                onChange={(value) => handleInputChange(value, 'province')}
              /> */}
              <Dropdown
                value={province}
                onChange={(e) => {
                  console.log(e.value)
                  handleInputChange(e.value, 'province')
                  getCitiesByProvinces(e.value)
                }}
                // onInput={(e) => handleInputChange(e.value.nombre, 'province')}
                options={provinces}
                optionValue='nombre'
                optionLabel="nombre"
                placeholder="elije una provincia"
                // filter
                // valueTemplate={selectedCountryTemplate}
                //  itemTemplate={countryOptionTemplate} 
                className="h-[42px] items-center" />
            </fieldset>
            <fieldset className=''>
              <label htmlFor='city'>Ciudad </label>
              {/* <CustomInput
                placeholder='Rosario'
                initialValue={city || ''}
                onChange={(value) => handleInputChange(value, 'city')}
              /> */}
              <Dropdown
                value={city}
                onChange={(e) => handleInputChange(e.value, 'city')}
                options={cities}
                optionLabel="nombre"
                optionValue='nombre'
                placeholder="elije una ciudad"
                filter
                // valueTemplate={selectedCountryTemplate}
                //  itemTemplate={countryOptionTemplate} 
                className="h-[42px] items-center" />
            </fieldset>
          </FieldsetGroup>

          <FieldsetGroup>
            <fieldset className=''>
              <label htmlFor='address'>Dirección</label>
              <CustomInput
                placeholder='Sarmiento 1247'
                initialValue={address || ''}
                onChange={(value) => handleInputChange(value, 'address')}
              />
              {errors?.address && <FormError text='La dirección es obligatoria.' />}
            </fieldset>
            <fieldset className=''>
              <label htmlFor='nroFax'>Número Fax </label>
              <CustomInput
                placeholder='1232421241212'
                initialValue={nroFax || ''}
                onChange={(value) => handleInputChange(value, 'nroFax')}
              />
            </fieldset>
          </FieldsetGroup>

          <fieldset className=''>
            <label htmlFor='obs'>Observación </label>
            <CustomInput
              placeholder='escribe una observación o nota de algo...'
              initialValue={obs || ''}
              onChange={(value) => handleInputChange(value, 'obs')}
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

export default Properties;
