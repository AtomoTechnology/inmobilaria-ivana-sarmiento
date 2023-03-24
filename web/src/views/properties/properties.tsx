import React, { useContext, useRef, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import Box from '../../components/Box'
import EditIcon from '../../components/icons/EditIcon'
import DeleteIcon from '../../components/icons/DeleteIcon'
import DeleteModal from '../../components/DeleteModal'
import Loading from '../../components/Loading'
import http from '../../api/axios'
import CreateModal from '../../components/CreateModal'
import { AuthContext } from '../../context/authContext'
import { MdAdd } from 'react-icons/md'
import CustomInput from '../../components/CustomInput'
import { useForm } from '../../hooks/useForm'
import FormError from '../../components/FormError'
import RequestError from '../../components/RequestError'
import { DelayAlertToHide } from '../../helpers/variableAndConstantes'
import FieldsetGroup from '../../components/FieldsetGroup'
import { useOwners } from '../../hooks/useOwners'
import { Dropdown } from 'primereact/dropdown'
import { provinces } from '../../api/provinces'
import { Button } from 'primereact/button'
import { FilterMatchMode, FilterOperator } from 'primereact/api'
import { InputText } from 'primereact/inputtext'
import { Iproperty } from '../../interfaces/Iproperties'
import { useProperties } from '../../hooks/useProperties'
import CustomTextArea from '../../components/CustomTextArea'
import { useZones } from '../../hooks/useZones'
import { usePropertyTypes } from '../../hooks/usePropertyTypes'
import CloseOnClick from '../../components/CloseOnClick'
import SeeIcon from '../../components/icons/SeeIcon'

const Properties = () => {
	const { authState, showAlert, hideAlert } = useContext(AuthContext)
	// const [selectedProducts2, setSelectedProducts2] = useState<Iproperty[]>();
	const [showCreateModal, setShowCreateModal] = useState(false)
	const [show, setShow] = useState(false)
	const { values, handleInputChange, reset, updateAll } = useForm({
		ZoneId: 0,
		PropertyTypeId: 0,
		OwnerId: 0,
		street: '',
		number: '',
		floor: '',
		dept: '',
		isFor: '',
		state: '',
		description: '',
		nroPartWater: '',
		nroPartMuni: '',
		nroPartAPI: '',
		nroPartGas: '',
		folderNumber: '',
	})
	const {
		ZoneId,
		OwnerId,
		street,
		number,
		floor,
		dept,
		description,
		isFor,
		state,
		nroPartWater,
		nroPartMuni,
		nroPartAPI,
		nroPartGas,
		folderNumber,
		PropertyTypeId,
	} = values
	const [globalFilterValue, setGlobalFilterValue] = useState('')
	const [errors, setErrors] = useState<any>()
	const [editMode, setEditMode] = useState(false)
	const [viewMode, setViewMode] = useState(false)
	const [filters, setFilters] = useState({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
		'Owner.fullName': { value: null, matchMode: FilterMatchMode.CONTAINS },
		'PropertyType.description': { value: null, matchMode: FilterMatchMode.CONTAINS },
		'Zone.name': { value: null, matchMode: FilterMatchMode.CONTAINS },
		street: { value: null, matchMode: FilterMatchMode.CONTAINS },
	})
	const [to, setTo] = useState<any>()

	const currentProperty = useRef<Iproperty | null>()

	const { data, isError, isLoading, error, isFetching, refetch } = useProperties()
	const zoneQuery = useZones()
	const propietyType = usePropertyTypes()
	const ownerQuery = useOwners()

	const edit = (data: Iproperty) => {
		updateAll({ ...data })
		// updateAll({
		// 	ZoneId: data.ZoneId,
		// 	PropertyTypeId: data.PropertyTypeId,
		// 	OwnerId: data.OwnerId,
		// 	street: data.street,
		// 	number: data.number,
		// 	floor: data.floor,
		// 	dept: data.dept,
		// 	isFor: data.isFor,
		// 	state: data.state,
		// 	description: data.description,
		// 	nroPartWater: data.nroPartWater,
		// 	nroPartMuni: data.nroPartMuni,
		// 	nroPartAPI: data.nroPartAPI,
		// 	nroPartGas: data.nroPartGas,
		// 	folderNumber: data.folderNumber,
		// })
		setViewMode(false)
		setShowCreateModal(true)
		setEditMode(true)
		currentProperty.current = data
	}

	const ConfirmDestroy = (data: Iproperty) => {
		setViewMode(false)
		setShow(!show)
		currentProperty.current = data
	}

	const verifyForm = () => {
		let ok = true
		let error: any = {}
		console.log(!ZoneId)
		if (!ZoneId) {
			ok = false
			error.ZoneId = true
		}
		if (!PropertyTypeId) {
			ok = false
			error.PropertyTypeId = true
		}
		if (!OwnerId) {
			ok = false
			error.OwnerId = true
		}

		if (!street?.trim().length) {
			ok = false
			error.street = true
		}
		if (!number.trim().length) {
			ok = false
			error.number = true
		}
		// if (!floor?.trim().length) {
		//   ok = false;
		//   error.floor = true;
		// }
		// if (!dept?.trim().length) {
		//   ok = false;
		//   error.dept = true;
		// }
		if (!isFor?.trim().length) {
			ok = false
			error.isFor = true
		}
		setErrors(error)
		return ok
	}

	const showAndHideModal = (
		title: string,
		message: string,
		color: string = 'green',
		delay: number = DelayAlertToHide
	) => {
		clearTimeout(to)
		showAlert({ title, message, color, show: true })
		setTo(setTimeout(hideAlert, delay))
	}

	const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (verifyForm()) {
			if (editMode) {
				try {
					const res = await http.put(`/properties/${currentProperty.current?.id}`, values)
					if (res.data.ok) {
						refetch()
						// data?.data &&
						//   (data.data = data?.data.map((z) => {
						//     if (z.id === currentProperty.current?.id) {
						//       // alert('hello')
						//       // console.log(z, { ...values })
						//       z =
						//       {
						//         ZoneId: values.ZoneId!,
						//         Zone: { name: values.ZoneId! },
						//         PropertyTypeId: values.PropertyTypeId!,
						//         number: values.number,
						//         street: values.street,
						//         OwnerId: values.OwnerId!,
						//         isFor: values.isFor,
						//         floor: values.floor,
						//         dept: values.dept,
						//         state: values.state,
						//         description: values.description,
						//         id: currentProperty.current.id,
						//         uuid: currentProperty.current.uuid,
						//         createdAt: currentProperty.current.createdAt,
						//         updatedAt: currentProperty.current.updatedAt
						//       };
						//     }
						//     return z;
						//   }));
						reset()
						setShowCreateModal(false)
						showAndHideModal('Editado', res.data.message)
					} else {
						showAndHideModal('Error', res.data.message || 'Algo malo ocurrío.', 'red')
					}
				} catch (error: any) {
					if (error.response) showAndHideModal('Error', error.response.data?.message || 'Algo malo ocurrío.', 'red')
				}
			} else {
				try {
					const res = await http.post('/properties', values)
					if (res.data.ok) {
						refetch()
						// data?.data.push(res.data.data);
						reset()
						setShowCreateModal(false)
						showAndHideModal('Guardado', res.data.message)
					} else {
						showAndHideModal('Error', res.data.message || 'Algo malo ocurrío.', 'red')
					}
				} catch (error: any) {
					if (error.response) showAndHideModal('Error', error.response.data?.message || 'Algo malo ocurrío.', 'red')
				}
			}
		}
	}

	const destroy = async (id: number) => {
		try {
			const res = await http.delete('/properties/' + id)
			if (res.data.ok) {
				data?.data && (data.data! = data?.data.filter((z) => z.id !== id))
				setShow(false)
				showAndHideModal('Borrado', res.data.message)
			} else {
				showAndHideModal('Error', res.data.message || 'Algo malo ocurrío.', 'red')
			}
		} catch (error: any) {
			if (error.response) showAndHideModal('Error', error.response.data?.message || 'Algo malo ocurrío.', 'red')
		}
	}
	const closeCreateModal = () => {
		reset()
		setShowCreateModal(false)
		setErrors({})
	}
	const onGlobalFilterChange = (e: any) => {
		const value = e.target.value
		let _filters = { ...filters }

		_filters['global'].value = value

		setFilters(_filters)
		setGlobalFilterValue(value)
	}
	const ViewItem = (data: Iproperty) => {
		updateAll(data)
		setViewMode(true)
		currentProperty.current = data
		setShowCreateModal(true)
	}
	const actionBodyTemplate = (rowData: any) => {
		return (
			<div className='flex gap-x-3 items-center justify-center'>
				<SeeIcon action={() => ViewItem(rowData)} />
				<EditIcon action={() => edit(rowData)} />
				<DeleteIcon action={() => ConfirmDestroy(rowData)} />
			</div>
		)
	}

	const paginatorLeft = (
		<Button
			onClick={() => refetch()}
			type='button'
			icon='pi pi-refresh'
			text
		/>
	)

	if (isLoading) return <Loading />
	if (isError) return <RequestError error={error} />

	return (
		<div className='container m-auto  flex sm:mx-0  flex-col justify-center sm:justify-center'>
			<div className='flex gap-x-4 mb-6 mx-3  items-center'>
				<h3 className='font-bold  text-slate-700 dark:text-slate-500 text-lg sm:text-4xl'>Propiedades</h3>
				<button
					onClick={() => {
						setEditMode(false)
						setViewMode(false)
						currentProperty.current = null
						setShowCreateModal(true)
					}}
					className='btn !w-10 !h-10 !p-0 gradient !rounded-full'
				>
					<MdAdd size={50} />
				</button>
			</div>

			{data.data.length > 0 ? (
				<>
					<input
						onChange={onGlobalFilterChange}
						className={`dark:!bg-gray-900 dark:text-slate-400 border dark:!border-slate-700 m-auto w-[92%] !mx-[10px] sm:mx-0 sm:w-96 ml-0 sm:ml-[10px] mb-4`}
						value={globalFilterValue}
						placeholder='Buscar propiedad'
						type='search'
					/>
					<Box className='!p-0 !overflow-hidden !border-none    mb-4 '>
						<DataTable
							size='small'
							emptyMessage='Aún no hay propiedad'
							className='!overflow-hidden   !border-none'
							value={data?.data}
							filters={filters}
							globalFilterFields={['PropertyType.description', 'Owner.fullName', 'Zone.name', 'street']}
							// rowsPerPageOptions={[5, 10, 25, 50]}
							paginator
							rows={10}
							paginatorTemplate='FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink'
							currentPageReportTemplate='{first} al {last} de {totalRecords}'
							paginatorLeft={paginatorLeft}
							dataKey='id'
							responsiveLayout='scroll'
						>
							<Column
								field='PropertyType.description'
								header='Tipo Propiedad'
								headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
								className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
								sortable
							/>
							<Column
								field='Owner.fullName'
								header='Propietario'
								headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
								className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
								sortable
							/>
							<Column
								field='street'
								header='Dirección'
								body={(data) => (
									<span>
										{data.street} {data.number} {data.floor}-{data.dept}
									</span>
								)}
								headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
								className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
								sortable
							/>
							<Column
								field='Zone.name'
								header='Zona'
								sortable
								headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
								className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
							/>
							<Column
								field='state'
								header='Estado'
								sortable
								body={(data) => (
									<span className={`font-bold ${data.state === 'Libre' ? 'text-green-500' : 'text-red-500'}`}>
										{data.state}{' '}
									</span>
								)}
								headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
								className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
							/>
							<Column
								field='isFor'
								header='Para'
								headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
								className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
							/>
							{/* <Column
            field='floor'
            // body={(data) => <span> {data.city}  {data.province} ,  {data.floor} </span>}
            header='Piso'
            headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
            className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
          /> */}
							{/* <Column
            field='dept'
            // body={(data) => <span> {data.city}  {data.province} ,  {data.floor} </span>}
            header='Depto'
            headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
            className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
          /> */}

							<Column
								body={actionBodyTemplate}
								headerClassName='!border-none dark:!bg-gray-800'
								className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
								exportable={false}
								style={{ width: 90 }}
							/>
						</DataTable>
					</Box>
				</>
			) : (
				<div className='text-slate-400 mx-3 text-center'>Aún no hay propiedad.</div>
			)}

			{isFetching && (
				<Loading
					h={40}
					w={40}
				/>
			)}

			<DeleteModal
				show={show}
				setShow={setShow}
				destroy={() => destroy(currentProperty.current?.id!)}
				text={`${currentProperty.current?.street} ${currentProperty.current?.number} ${currentProperty.current?.floor} ${currentProperty.current?.dept} de ${currentProperty.current?.Owner?.fullName} `}
			/>

			<CreateModal
				show={showCreateModal}
				closeModal={closeCreateModal}
				overlayClick={viewMode}
				className=' max-w-[650px] sm:w-fit'
				titleText={`${editMode ? 'Editar' : viewMode ? ' Ver  ' : 'Crear'}  propiedad `}
			>
				<form
					onSubmit={handleSave}
					className={`${viewMode && 'disabled-all'}`}
				>
					{!viewMode && <CloseOnClick action={closeCreateModal} />}
					<FieldsetGroup>
						<FieldsetGroup className='w-full sm:w-[50%]'>
							<fieldset className=''>
								<label htmlFor='street'>Calle</label>
								<CustomInput
									placeholder='Sarmiento'
									initialValue={street || ''}
									onChange={(value) => handleInputChange(value, 'street')}
								/>
								{errors?.street && <FormError text='La calle  es obligatoria.' />}
							</fieldset>
							<fieldset className=''>
								<label htmlFor='number'>Número </label>
								<CustomInput
									placeholder='1247'
									initialValue={number || ''}
									maxLength={5}
									onChange={(value) => handleInputChange(value, 'number')}
								/>
								{errors?.number && <FormError text='El número es obligatorio.' />}
							</fieldset>
						</FieldsetGroup>
						<FieldsetGroup className='w-full sm:w-[50%]'>
							<fieldset className=''>
								<label htmlFor='floor'>
									Piso <span className='text-xs opacity-50'>(opcional)</span>
								</label>
								<CustomInput
									placeholder='10'
									maxLength={2}
									initialValue={floor || ''}
									onChange={(value) => handleInputChange(value, 'floor')}
								/>
							</fieldset>
							<fieldset className=''>
								<label htmlFor='dept'>
									Depto <span className='text-xs opacity-50'>(opcional)</span>{' '}
								</label>
								<CustomInput
									placeholder='02,B'
									maxLength={2}
									initialValue={dept || ''}
									onChange={(value) => handleInputChange(value, 'dept')}
								/>
							</fieldset>
						</FieldsetGroup>
					</FieldsetGroup>

					<FieldsetGroup>
						<FieldsetGroup className='w-full sm:w-[50%]'>
							<fieldset className=''>
								<label htmlFor='ZoneId'>Zona </label>
								<Dropdown
									value={ZoneId}
									onChange={(e) => handleInputChange(e.value, 'ZoneId')}
									options={zoneQuery.data?.data}
									optionLabel='name'
									filterPlaceholder='Busca zona'
									optionValue='id'
									placeholder='elije una zona'
									filter
									className='h-[42px] items-center w-full sm:w-[125px] !border-gray-200 shadow'
								/>
								{errors?.ZoneId && <FormError text='La zona es obligatoria.' />}
							</fieldset>
							<fieldset className='w-full'>
								<label htmlFor='folderNumber'>Nro carpeta </label>
								<CustomInput
									initialValue={folderNumber ?? ''}
									onChange={(value) => handleInputChange(value, 'folderNumber')}
									placeholder='0000'
									className='h-[42px] items-center '
								/>
								{errors?.folderNumber && <FormError text='La zona es obligatoria.' />}
							</fieldset>
						</FieldsetGroup>
						<FieldsetGroup className='w-full sm:w-[50%]'>
							<fieldset className=''>
								<label htmlFor='ZoneId'>Tipo de propiedad </label>
								<Dropdown
									value={PropertyTypeId}
									onChange={(e) => handleInputChange(e.value, 'PropertyTypeId')}
									options={propietyType.data?.data}
									optionLabel='description'
									filterPlaceholder='Busca tipo de propiedad'
									optionValue='id'
									placeholder='elije un tipo de propiedad'
									filter
									className='h-[42px] items-center !border-gray-200 shadow '
								/>
								{errors?.PropertyTypeId && <FormError text='El tipo de propiedad es obligatorio.' />}
							</fieldset>
						</FieldsetGroup>
					</FieldsetGroup>

					<FieldsetGroup>
						<FieldsetGroup className='w-full sm:w-[80%]'>
							<fieldset>
								<label htmlFor='OwnerId'>Propietario</label>
								<Dropdown
									value={OwnerId}
									onChange={(e) => handleInputChange(e.value, 'OwnerId')}
									options={ownerQuery.data?.data}
									optionLabel='fullName'
									filterBy='fullName,cuit'
									filterPlaceholder='Busca propietario por nombre o cuit'
									optionValue='id'
									placeholder='elije un propietario'
									filter
									valueTemplate={(data, props) => {
										if (!data) return props.placeholder
										return (
											<span>
												{data.fullName} | {data.cuit}
											</span>
										)
									}}
									itemTemplate={(data) => {
										return (
											<span>
												{data.fullName} | {data.cuit}
											</span>
										)
									}}
									className='h-[42px] items-center !border-gray-200 shadow '
								/>
								{errors?.OwnerId && <FormError text='El propietario es obligatoria.' />}
							</fieldset>
						</FieldsetGroup>

						<fieldset className='w-full sm:w-[20%]'>
							<label htmlFor='isFor'>Para</label>
							<Dropdown
								value={isFor}
								onChange={(e) => handleInputChange(e.value, 'isFor')}
								options={['Alquiler', 'Venta']}
								placeholder='elije una opción'
								className='h-[42px] items-center !border-gray-200 shadow '
							/>
							{errors?.isFor && <FormError text='Este campo es obligatorio.' />}
						</fieldset>
					</FieldsetGroup>
					<FieldsetGroup>
						<fieldset className=''>
							<label htmlFor='nroPartWater'>
								Nro Part. TGI <span className='text-xs opacity-50'>(opcional)</span>
							</label>

							<CustomInput
								initialValue={nroPartMuni ?? ''}
								onChange={(value) => handleInputChange(value, 'nroPartMuni')}
								placeholder='000000000'
								className='h-[42px] items-cente '
							/>
						</fieldset>
						<fieldset className=''>
							<label htmlFor='nroPartWater'>
								Nro Part. API <span className='text-xs opacity-50'>(opcional)</span>
							</label>

							<CustomInput
								initialValue={nroPartAPI ?? ''}
								onChange={(value) => handleInputChange(value, 'nroPartAPI')}
								placeholder='000000000'
								className='h-[42px] items-cente '
							/>
						</fieldset>
					</FieldsetGroup>
					<FieldsetGroup>
						<fieldset>
							<label htmlFor='nroPartWater'>
								Nro Part. Agua <span className='text-xs opacity-50'>(opcional)</span>
							</label>

							<CustomInput
								initialValue={nroPartWater ?? ''}
								onChange={(value) => handleInputChange(value, 'nroPartWater')}
								placeholder='000000000'
								className='h-[42px] items-center '
							/>
						</fieldset>
						<fieldset className=''>
							<label htmlFor='nroPartGas'>
								Nro Part. GAS <span className='text-xs opacity-50'>(opcional)</span>
							</label>

							<CustomInput
								initialValue={nroPartGas ?? ''}
								onChange={(value) => handleInputChange(value, 'nroPartGas')}
								placeholder='000000000'
								className='h-[42px] items-cente '
							/>
						</fieldset>
					</FieldsetGroup>
					<fieldset>
						<label htmlFor='description'>
							Descripción <span className='text-xs opacity-50'>(opcional)</span>{' '}
						</label>
						<CustomTextArea
							placeholder='Escribe una descripción para esa propiedad'
							initialValue={description || ''}
							onChange={(value) => handleInputChange(value, 'description')}
						/>
					</fieldset>
					{!viewMode && (
						<section className='action flex items-center gap-x-3 mt-8'>
							<button
								className='btn !py-1 sec'
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
					)}
				</form>
				{viewMode && <CloseOnClick action={closeCreateModal} />}
			</CreateModal>
		</div>
	)
}

export default Properties
