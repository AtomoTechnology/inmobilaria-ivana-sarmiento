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
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import { FilterMatchMode } from 'primereact/api'
import { useProperties } from '../../hooks/useProperties'
import CustomTextArea from '../../components/CustomTextArea'
import { useContracts } from '../../hooks/useContracts'
import { useClients } from '../../hooks/useClients'
import CloseIcon from '../../components/icons/CloseIcon'
import AddGuarantee from '../../components/icons/AddGuarantee'
import SeeIcon from '../../components/icons/SeeIcon'
import { Contract } from '../../interfaces/Icontracts'
import { useNavigate } from 'react-router-dom'
import { TbReportMoney } from 'react-icons/tb'
import { validateMail } from '../../helpers/general'
import CloseOnClick from '../../components/CloseOnClick'

export interface Iassurance {
	fullName: string
	email: string
	phone: string
	cuit: string
	address: string
	obs: string
	ContractId: number | null
	id: number
}
const Contracts = () => {
	const { authState, showAlert, hideAlert } = useContext(AuthContext)
	// const [selectedProducts2, setSelectedProducts2] = useState<Contract[]>();
	const [showCreateModal, setShowCreateModal] = useState(false)
	const [showAddGuaranteeModal, setShowAddGuaranteeModal] = useState(false)
	const [showAddEventualityModal, setShowAddEventualityModal] = useState(false)
	const [show, setShow] = useState(false)
	const [assurances, setAssurances] = useState<Iassurance[]>([])
	const [assuranceItem, setAssuranceItem] = useState<any>()
	const [editing, setEditing] = useState(false)
	const { values, handleInputChange, reset, updateAll } = useForm({
		ClientId: null,
		PropertyId: null,
		startDate: '',
		endDate: '',
		commission: 0,
		description: '',
		stamped: 0,
		warrantyInquiry: 0,
		fees: 0,
		amount: 0,
	})
	const { ClientId, PropertyId, startDate, endDate, commission, description, stamped, warrantyInquiry, amount, fees } =
		values
	const {
		values: Gvalues,
		handleInputChange: GhandleInputChange,
		reset: Greset,
		updateAll: GupdateAll,
	} = useForm({
		fullName: '',
		email: '',
		phone: '',
		cuit: '',
		address: '',
		obs: '',
		ContractId: 0,
		id: 0,
	})

	const { fullName, email, phone, cuit, address, obs } = Gvalues

	const {
		clientAmount,
		ownerAmount,
		description: descEvent,
		expiredDate,
		values: Evalues,
		handleInputChange: EhandleInputChange,
		reset: Ereset,
	} = useForm({
		ContractId: null,
		clientAmount: 0.0,
		ownerAmount: 0.0,
		expiredDate: null,
		description: '',
	})
	const [globalFilterValue, setGlobalFilterValue] = useState('')
	const [errors, setErrors] = useState<any>()
	const [editMode, setEditMode] = useState(false)
	const [filters, setFilters] = useState({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
		'Client.fullName': { value: null, matchMode: FilterMatchMode.CONTAINS },
		'PropertyType.description': { value: null, matchMode: FilterMatchMode.CONTAINS },
	})
	const navigate = useNavigate()
	const currentContract = useRef<Contract | null>()

	const { data, isError, isLoading, error, isFetching, refetch } = useContracts()
	const clientQuery = useClients()
	const propertyQuery = useProperties('state=Libre')

	const edit = (data: Contract) => {
		console.log(data)
		// updateAll({ ...data, startDate: data.startDate.slice(0, 10) })
		// TODO: fix date  and complete  edit  and show detail
		setShowCreateModal(true)
		setEditMode(true)
		currentContract.current = data
	}
	const ConfirmDestroy = (data: Contract) => {
		setShow(!show)
		currentContract.current = data
	}
	const showAddGuarantee = (data: Contract) => {
		setShowAddGuaranteeModal(true)
		currentContract.current = data
		GhandleInputChange(data.id, 'ContractId')
	}
	const verifyForm = () => {
		let ok = true
		let error: any = {}
		if (!PropertyId) {
			ok = false
			error.PropertyId = true
		}
		if (!ClientId) {
			ok = false
			error.ClientId = true
		}
		if (!startDate?.trim().length) {
			ok = false
			error.startDate = true
		}
		if (!startDate?.trim().length) {
			ok = false
			error.startDate = true
		}
		if (!endDate.trim().length) {
			ok = false
			error.endDate = true
		}
		if (!amount) {
			ok = false
			error.amount = true
		}
		if (!commission) {
			ok = false
			error.commission = true
		}
		if (!stamped) {
			ok = false
			error.stamped = true
		}
		if (!fees) {
			ok = false
			error.fees = true
		}
		if (!warrantyInquiry) {
			ok = false
			error.warrantyInquiry = true
		}
		setErrors(error)
		return ok
	}
	const verifyFormEventuality = () => {
		let ok = true
		let error: any = {}
		if (!clientAmount) {
			ok = false
			error.clientAmount = true
		}
		if (!ownerAmount) {
			ok = false
			error.ownerAmount = true
		}
		if (!expiredDate) {
			ok = false
			error.expiredDate = true
		}
		if (!descEvent?.trim().length) {
			ok = false
			error.descEvent = true
		}

		setErrors(error)
		return ok
	}
	const verifyFormGuaranteesModal = () => {
		let ok = true
		let error: any = {}
		if (!fullName) {
			ok = false
			error.fullName = true
		}
		if (!cuit) {
			ok = false
			error.cuit = true
		}
		if (!phone) {
			ok = false
			error.phone = true
		}
		if (!address) {
			ok = false
			error.address = true
		}
		if (!email?.trim().length || !validateMail(email)) {
			ok = false
			error.email = true
		}

		setErrors(error)
		return ok
	}
	const verifyFormGuarantees = () => {
		let ok = true
		let error: any = {}
		if (!assuranceItem?.fullName) {
			ok = false
			error.fullName = true
		}
		if (!assuranceItem?.cuit) {
			ok = false
			error.cuit = true
		}
		if (!assuranceItem?.phone) {
			ok = false
			error.phone = true
		}
		if (!assuranceItem?.address) {
			ok = false
			error.address = true
		}
		if (!assuranceItem?.email?.trim().length || !validateMail(assuranceItem?.email)) {
			ok = false
			error.email = true
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
		showAlert({ title, message, color, show: true })
		setTimeout(hideAlert, delay)
	}
	const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		// console.log(values)
		// console.log({ ...values, assurances })
		// return;
		if (verifyForm()) {
			if (editMode) {
				try {
					// @ts-expect-error
					values.PropertyId = values.PropertyId?.id!
					// @ts-expect-error
					values.ClientId = values.ClientId?.id!
					const res = await http.put(`/contracts/${currentContract.current?.id}`, { ...values, assurances })
					if (res.data.ok) {
						refetch()
						setAssurances([])
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
					// @ts-expect-error
					values.PropertyId = values.PropertyId?.id!
					// @ts-expect-error
					values.ClientId = values.ClientId?.id!
					const res = await http.post('/contracts', { ...values, assurances })
					if (res.data.ok) {
						refetch()
						// data?.data.push(res.data.data);
						setAssurances([])
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
			const res = await http.delete('/contracts/' + id)
			if (res.data.ok) {
				data?.data && (data.data! = data?.data.filter((z: any) => z.id !== id))
				setShow(false)
				showAndHideModal('Borrado', res.data.message)
			} else {
				showAndHideModal('Error', res.data.message || 'Algo malo ocurrío.', 'red')
			}
		} catch (error: any) {
			if (error.response) showAndHideModal('Error', error.response.data?.message || 'Algo malo ocurrío.', 'red')
		}
	}
	const handleAddGuarantee = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!verifyFormGuaranteesModal()) return
		try {
			const res = await http.post('/assurances', Gvalues)
			if (res.data.ok) {
				setShowAddGuaranteeModal(false)
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
	const closeGuaranteeModal = () => {
		Greset()
		setShowAddGuaranteeModal(false)
		setErrors({})
	}
	const closeAddEventualitiesModal = () => {
		Ereset()
		setShowAddEventualityModal(false)
		setErrors({})
	}
	const onGlobalFilterChange = (e: any) => {
		const value = e.target.value
		let _filters = { ...filters }

		_filters['global'].value = value

		setFilters(_filters)
		setGlobalFilterValue(value)
	}
	const openModalAddEvent = (data: any) => {
		Ereset()
		currentContract.current = data
		EhandleInputChange(data.id, 'ContractId')
		setShowAddEventualityModal(true)
	}
	const actionBodyTemplate = (rowData: any) => {
		return (
			<div className='flex gap-x-3 items-center justify-start'>
				<SeeIcon
					action={() => navigate(`/contracts/${rowData.id}/${rowData.uuid}`)}
					color=''
				/>
				{rowData.state !== 'Finalizado' && (
					<AddGuarantee
						action={() => showAddGuarantee(rowData)}
						color=''
					/>
				)}
				<TbReportMoney
					size={25}
					color=''
					onClick={() => openModalAddEvent(rowData)}
				/>
				<EditIcon
					action={() => edit(rowData)}
					color=''
				/>
				<DeleteIcon
					action={() => ConfirmDestroy(rowData)}
					color='#F48484'
				/>
			</div>
		)
	}

	const addAssurance = () => {
		if (!verifyFormGuarantees()) return
		let v: Iassurance[] | null = assurances
		if (assurances.find((a) => a.id === assuranceItem.id)) {
			v = assurances.filter((a) => a.id !== assuranceItem.id)
			setAssurances(v)
		}
		setAssurances([...v, { ...assuranceItem, id: Date.now() }])
		setAssuranceItem({
			fullName: '',
			email: '',
			address: '',
			obs: '',
			phone: '',
			ContractId: 0,
		})
		setEditing(false)
	}
	const removeAssurance = (item: Iassurance) => {
		setAssurances(assurances.filter((a) => a.id !== item.id))
	}
	const handleAddEventualities = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log(Evalues)
		// return;
		if (verifyFormEventuality()) {
			try {
				const res = await http.post('/eventualities', Evalues)
				if (res.data.ok) {
					// data?.data && (data.data! = data?.data.filter((z: any) => z.id !== id));
					Ereset()
					setShowAddEventualityModal(false)
					showAndHideModal('Guardado', res.data.message)
				} else {
					showAndHideModal('Error', res.data.message || 'Algo malo ocurrío.', 'red')
				}
			} catch (error: any) {
				if (error.response) showAndHideModal('Error', error.response.data?.message || 'Algo malo ocurrío.', 'red')
			}
		}
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
				<h3 className='font-bold  text-slate-700 dark:text-slate-500 text-lg sm:text-4xl'>Contratos</h3>
				<button
					onClick={() => {
						setEditMode(false)
						currentContract.current = null
						setShowCreateModal(true)
					}}
					className='btn !w-10 !h-10 !p-0 gradient !rounded-full'
				>
					<MdAdd size={50} />
				</button>
			</div>
			<input
				onChange={onGlobalFilterChange}
				className={`dark:!bg-gray-900 dark:text-slate-400 border dark:!border-slate-700 m-auto w-[92%] !mx-[10px] sm:mx-0 sm:w-96 ml-0 sm:ml-[10px] mb-4`}
				value={globalFilterValue}
				placeholder='Busca contrato'
				type='search'
			/>
			<Box className='!p-0 !overflow-hidden !border-none    mb-4 '>
				<DataTable
					size='small'
					emptyMessage='Aún no hay contrato'
					className='!overflow-hidden   !border-none'
					value={data?.data}
					// value={[]}
					filters={filters}
					globalFilterFields={['Property.street', 'Client.fullName']}
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
						// field='Property.street'
						body={(data) => (
							<span>
								{data.Property.street} {data.Property.number} {data.Property.floor} {data.Property.dept}
							</span>
						)}
						header='Propiedad'
						headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
						className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
						sortable
					/>
					<Column
						// field='Client.fullName'
						body={(data) => (
							<span>
								{data.Client.fullName} <span className='text-sm'> ({data.Client.cuit}) </span>
							</span>
						)}
						header='Inquilino'
						headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
						className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
						sortable
					/>
					<Column
						// field='startDate'
						header='Fecha inicio'
						body={(data) => <span>{data.startDate.slice(0, 10)}</span>}
						headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
						className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
						sortable
					/>
					<Column
						// field='endDate'
						header='Fecha fin'
						body={(data) => (
							<span>{data.endDate.slice(0, 10)}</span>
							// <span>
							// 	{new Date(data.endDate.slice(0, 10)).toLocaleDateString('es-es', {
							// 		year: 'numeric',
							// 		month: 'short',
							// 		day: 'numeric',
							// 	})}
							// </span>
						)}
						headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
						className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
						sortable
					/>
					<Column
						// field='status'
						header='Estado'
						sortable
						body={(data) => (
							<span className={`font-bold ${data.state === 'En curso' ? 'text-green-500' : 'text-red-500'}`}>
								{data.state}{' '}
							</span>
						)}
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
				destroy={() => destroy(currentContract.current?.id!)}
				text={`${currentContract.current?.Client?.fullName} de la calle ${currentContract.current?.Property.street} ${currentContract.current?.Property.number}  ${currentContract.current?.Property.floor} ${currentContract.current?.Property.dept}`}
			/>

			{/* Create modal */}
			<CreateModal
				show={showCreateModal}
				closeModal={closeCreateModal}
				overlayClick={false}
				className='shadow-none border-0'
				titleText={`${editMode ? 'Editar' : 'Crear'} contrato `}
				overlayBackground={localStorage.theme === 'light' ? 'rgb(227 227 227)' : 'rgb(15 23 42)'}
			>
				<button
					onClick={closeCreateModal}
					type='button'
					className='fixed bg-white right-8 sm:right-[4rem] top-12 w-10 h-10 rounded-full shadow-lg flex items-center justify-center border border-gray-200'
				>
					<CloseIcon />
				</button>
				<form onSubmit={handleSave}>
					<FieldsetGroup>
						<fieldset className=''>
							<label htmlFor='ClientId'>Inquilino</label>
							<Dropdown
								value={ClientId}
								onChange={(e) => handleInputChange(e.value, 'ClientId')}
								options={clientQuery.data?.data}
								optionLabel='fullName'
								filterPlaceholder='Busca  inquilino...'
								filter
								// optionValue='id'
								showClear
								placeholder='elije un inquilino'
								valueTemplate={(data, props) => {
									if (!data) return props.placeholder
									return (
										<span>
											{data.fullName} - {data.cuit}
										</span>
									)
								}}
								itemTemplate={(data) => {
									return (
										<span>
											{data.fullName} - {data.cuit}
										</span>
									)
								}}
								className='h-[42px] items-center !border-gray-200 dark:!border-gray-700 shadow dark:bg-slate-900 dark:!text-slate-400 '
							/>
							{ClientId && (
								<span className='text-brand2'>
									{/* @ts-expect-error*/}
									{ClientId?.email!} - {ClientId?.phone!}
								</span>
							)}
							{errors?.ClientId && <FormError text='El inquilino es obligatorio.' />}
						</fieldset>

						<fieldset className=''>
							<label htmlFor='PropertyId'>Propiedad </label>
							<Dropdown
								value={PropertyId}
								onChange={(e) => handleInputChange(e.value, 'PropertyId')}
								options={propertyQuery.data?.data}
								optionLabel='street'
								showClear
								filterPlaceholder='Busca propiedad'
								// optionValue='id'
								placeholder='elije una propiedad'
								filter
								valueTemplate={(data, props) => {
									if (!data) return props.placeholder
									return (
										<span>
											{data.street} {data.number} {data.floor}-{data.dept}
										</span>
									)
								}}
								itemTemplate={(data) => {
									return (
										<span>
											{data.street} {data.number} {data.floor}-{data.dept}
										</span>
									)
								}}
								className='h-[42px] items-center !border-gray-200 shadow'
							/>
							{/* @ts-expect-error */}
							{PropertyId?.Owner && (
								<span className='text-brand2'>
									{/* @ts-expect-error */}
									{PropertyId.Owner?.fullName} - {PropertyId.Owner?.phone}
								</span>
							)}
							{errors?.PropertyId && <FormError text='La propiedad es obligatoria.' />}
						</fieldset>
					</FieldsetGroup>

					<FieldsetGroup>
						<FieldsetGroup className='w-full sm:w-[50%]'>
							<fieldset className='w-full sm:w-[50%]'>
								<label htmlFor='startDate'>Fecha inicio</label>
								<CustomInput
									placeholder='2'
									type='date'
									initialValue={startDate || ''}
									onChange={(value) => handleInputChange(value, 'startDate')}
								/>
								{errors?.startDate && <FormError text='La fecha de inicio  es obligatoria.' />}
							</fieldset>
							<fieldset className=''>
								<label htmlFor='endDate'>Fecha fin</label>
								<CustomInput
									placeholder=''
									type='date'
									initialValue={endDate || ''}
									onChange={(value) => handleInputChange(value, 'endDate')}
								/>
								{errors?.endDate && <FormError text='La fecha fin  es obligatoria.' />}
							</fieldset>
						</FieldsetGroup>
						<FieldsetGroup className='w-full sm:w-[50%]'>
							<fieldset className=''>
								<label htmlFor='amount'>Valor contrato</label>
								<CustomInput
									placeholder='46000.00'
									type='number'
									initialValue={amount || ''}
									onChange={(value) => handleInputChange(value, 'amount')}
								/>
								{errors?.amount && <FormError text='El valor del contrato es obligatorio.' />}
							</fieldset>
							<fieldset className=''>
								<label htmlFor='commission'>% Comisión</label>
								<CustomInput
									placeholder='10'
									type='number'
									initialValue={commission || ''}
									onChange={(value) => handleInputChange(value, 'commission')}
								/>
								{errors?.commission && <FormError text='La comisión  es obligatoria.' />}
							</fieldset>
						</FieldsetGroup>
					</FieldsetGroup>

					<FieldsetGroup>
						<FieldsetGroup className='w-full sm:w-[50%]'>
							<fieldset className=''>
								<label htmlFor='fees'>Total a abonar </label>
								<input
									placeholder='10000.00'
									min={0}
									value={(values.amount - (values.commission / 100) * values.amount).toFixed(2)?.toString()}
									disabled={true}
									type='number'
									onChange={(value) => handleInputChange(value, 'fees')}
								/>
							</fieldset>
							<fieldset className=''>
								<label htmlFor='fees'>Honorarios </label>
								<CustomInput
									placeholder='10000.00'
									initialValue={fees || ''}
									type='number'
									onChange={(value) => handleInputChange(value, 'fees')}
								/>
								{errors?.fees && <FormError text='El hononario es obligatorio.' />}
							</fieldset>
						</FieldsetGroup>
						<FieldsetGroup className='w-full sm:w-[50%]'>
							<fieldset className=''>
								<label htmlFor='warrantyInquiry'>Ave. de Gtía</label>
								<CustomInput
									placeholder='1000.99'
									type='number'
									initialValue={warrantyInquiry || ''}
									onChange={(value) => handleInputChange(value, 'warrantyInquiry')}
								/>
								{errors?.warrantyInquiry && <FormError text='Este campo es obligatorio.' />}
							</fieldset>
							<fieldset className=''>
								<label htmlFor='stamped'>Sellado </label>
								<CustomInput
									placeholder='500.00'
									type='number'
									initialValue={stamped || ''}
									onChange={(value) => handleInputChange(value, 'stamped')}
								/>
								{errors?.stamped && <FormError text='Este campo es obligatorio.' />}
							</fieldset>
						</FieldsetGroup>
					</FieldsetGroup>

					<fieldset>
						<label htmlFor='description'>
							Descripción <span className='text-xs opacity-50'>(opcional)</span>{' '}
						</label>
						<CustomTextArea
							placeholder='Escribe una descripción para ese contrato'
							initialValue={description || ''}
							onChange={(value) => handleInputChange(value, 'description')}
						/>
					</fieldset>

					{!editMode && (
						<>
							<h1 className='text-lg mb-4 title-form'>Agregar garante(s)</h1>

							<div className='mx-3'>
								<div className='list-guarantees-to-add flex gap-x-2 flex-wrap gap-y-3'>
									{assurances?.map((as, index) => (
										<div
											className='relative text-sm'
											key={index}
										>
											<span
												onClick={() => removeAssurance(as)}
												className='absolute right-2 top-1'
											>
												<CloseIcon color='#dd8888' />
											</span>
											<div
												className='cursor-pointer'
												onClick={() => {
													setAssuranceItem(as)
													setEditing(true)
												}}
											>
												<Box className='max-w-[300px] dark:!bg-gray-900'>
													{/* <h1><span className="font-bold"> ID : </span> {as.id}</h1> */}
													<h1>
														<span className='font-bold'> Nombre Completo : </span> {as.fullName}
													</h1>
													<h1>
														<span className='font-bold'> Email : </span>
														{as.email}
													</h1>
													<h1>
														<span className='font-bold'> CUIT : </span>
														{as.cuit}
													</h1>
													<h1>
														<span className='font-bold'> Celular : </span>
														{as.phone}
													</h1>
													<h1>
														<span className='font-bold'> Dirección : </span>
														{as.address}
													</h1>
													<h1>
														<span className='font-bold'> Observación : </span>
														{as.obs}
													</h1>
												</Box>
											</div>
										</div>
									))}
								</div>
								<div className='guarantees mb-12'>
									<FieldsetGroup>
										<fieldset className=''>
											<label htmlFor='fullname'>Nombre Completo </label>
											<input
												className={`dark:!bg-gray-900 dark:text-slate-400 border !border-gray-300 dark:!border-slate-700 !shadow`}
												placeholder='Juan Jose'
												value={assuranceItem?.fullName || ''}
												onChange={(e) => setAssuranceItem((prev: any) => ({ ...prev, fullName: e.target.value }))}
											/>
											{errors?.fullName && <FormError text='El nombre es obligatorio.' />}
										</fieldset>
										<fieldset className=''>
											<label htmlFor='email'>Email </label>
											<input
												placeholder='ejemplo@gmail.com'
												className={`dark:!bg-gray-900 dark:text-slate-400 border !border-gray-300 dark:!border-slate-700 !shadow`}
												value={assuranceItem?.email || ''}
												type='text'
												onChange={(e) => setAssuranceItem((prev: any) => ({ ...prev, email: e.target.value }))}
											/>
											{errors?.email && <FormError text='El correo es obligatorio y debe ser válido.' />}
										</fieldset>
									</FieldsetGroup>
									<FieldsetGroup>
										<fieldset className=''>
											<label htmlFor='cuit'>Cuit/Cuil </label>
											<input
												placeholder='20-01010101-0'
												className={`dark:!bg-gray-900 dark:text-slate-400 border !border-gray-300 dark:!border-slate-700 !shadow`}
												value={assuranceItem?.cuit || ''}
												onChange={(e) => setAssuranceItem((prev: any) => ({ ...prev, cuit: e.target.value }))}
											/>
											{errors?.cuit && <FormError text='El cuit es obligatorio.' />}
										</fieldset>
										<fieldset className=''>
											<label htmlFor='phone'>Teléfono </label>
											<input
												placeholder='3417207882'
												className={`dark:!bg-gray-900 dark:text-slate-400 border !border-gray-300 dark:!border-slate-700 !shadow`}
												value={assuranceItem?.phone || ''}
												onChange={(e) => setAssuranceItem((prev: any) => ({ ...prev, phone: e.target.value }))}
											/>
											{errors?.phone && <FormError text='El teléfono es obligatorio.' />}
										</fieldset>
									</FieldsetGroup>
									<FieldsetGroup>
										<fieldset className=''>
											<label htmlFor='address'>Dirección</label>
											<input
												placeholder='Sarmiento 190'
												className={`dark:!bg-gray-900 dark:text-slate-400 border !border-gray-300 dark:!border-slate-700 !shadow`}
												value={assuranceItem?.address || ''}
												onChange={(e) => setAssuranceItem((prev: any) => ({ ...prev, address: e.target.value }))}
											/>
											{errors?.address && <FormError text='La dirección es obligatoria.' />}
										</fieldset>
									</FieldsetGroup>
									<fieldset className=''>
										<label htmlFor='obs'>Observación </label>
										<textarea
											placeholder='Escribe una observación ...'
											className={`dark:!bg-gray-900 dark:text-slate-400 border !border-gray-300 dark:!border-slate-700 !shadow`}
											value={assuranceItem?.obs || ''}
											onChange={(e) => setAssuranceItem((prev: any) => ({ ...prev, obs: e.target.value }))}
										/>
									</fieldset>
									<button
										type='button'
										onClick={addAssurance}
										className='btn !bg-gray-300 !mr-6'
									>
										{!editing ? 'Agregar garante' : 'Guardar garante'}
									</button>
									{editing && (
										<button
											className='btn'
											type='button'
											onClick={() => {
												setEditing(false)
												setAssuranceItem({})
											}}
										>
											Salir de la edición
										</button>
									)}
								</div>
							</div>
						</>
					)}

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

			{/* Guarantee modal  */}
			<CreateModal
				show={showAddGuaranteeModal}
				closeModal={closeGuaranteeModal}
				overlayClick={false}
				titleText='Agregar  garante'
				className='shadow-none border-0'
				overlayBackground={localStorage.theme === 'light' ? 'rgb(227 227 227)' : 'rgb(15 23 42)'}
			>
				<CloseOnClick action={closeGuaranteeModal} />
				<form
					onSubmit={handleAddGuarantee}
					className='!relative'
				>
					<FieldsetGroup>
						<fieldset className=''>
							<label htmlFor='PropertyId'>
								Contrato : <span className='text-brand'>#</span>
								{currentContract.current?.Client.fullName +
									' - ' +
									currentContract.current?.Client.cuit +
									'  | ' +
									currentContract.current?.Property.street +
									' ' +
									currentContract.current?.Property.number +
									' '}
							</label>
							<CustomInput
								disabled={true}
								initialValue={currentContract.current?.id}
								onChange={(val) => {}}
								placeholder=''
							/>
						</fieldset>
					</FieldsetGroup>
					<FieldsetGroup>
						<fieldset className=''>
							<label htmlFor='fullname'>Nombre Completo </label>
							<CustomInput
								placeholder='Juan Jose'
								initialValue={fullName || ''}
								onChange={(value) => GhandleInputChange(value, 'fullName')}
							/>
							{errors?.fullName && <FormError text='El nombre es obligatorio.' />}
						</fieldset>
						<fieldset className=''>
							<label htmlFor='email'>Email </label>
							<CustomInput
								placeholder='example@gmail.com'
								initialValue={email || ''}
								type='email'
								onChange={(value) => GhandleInputChange(value, 'email')}
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
								onChange={(value) => GhandleInputChange(value, 'cuit')}
							/>
							{errors?.cuit && <FormError text='El cuit es obligatorio.' />}
						</fieldset>
						<fieldset className=''>
							<label htmlFor='phone'>Teléfono </label>
							<CustomInput
								placeholder='3417207882'
								initialValue={phone || ''}
								onChange={(value) => GhandleInputChange(value, 'phone')}
							/>
							{errors?.phone && <FormError text='El teléfono es obligatorio.' />}
						</fieldset>
					</FieldsetGroup>
					<FieldsetGroup>
						<fieldset className=''>
							<label htmlFor='address'>Dirección</label>
							<CustomInput
								placeholder='Sarmiento 1247'
								initialValue={address || ''}
								onChange={(value) => GhandleInputChange(value, 'address')}
							/>
							{errors?.address && <FormError text='La dirección es obligatoria.' />}
						</fieldset>
					</FieldsetGroup>
					<fieldset className=''>
						<label htmlFor='obs'>Observación </label>
						<CustomTextArea
							placeholder='Escribe una observación o nota de algo...'
							initialValue={obs || ''}
							onChange={(value) => GhandleInputChange(value, 'obs')}
						/>
					</fieldset>
					<section className='action flex items-center gap-x-3 mt-4'>
						<button
							className='btn !py-1'
							onClick={closeGuaranteeModal}
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

			{/* modal eventuality */}
			<CreateModal
				show={showAddEventualityModal}
				closeModal={closeAddEventualitiesModal}
				overlayClick={false}
				titleText='Agregar  eventualidad'
				className='shadow-none border-0 max-w-[500px]'
				// overlayBackground={localStorage.theme === 'light' ? 'rgb(227 227 227)' : 'rgb(15 23 42)'}
			>
				<form
					onSubmit={handleAddEventualities}
					className='!relative'
				>
					<FieldsetGroup>
						<fieldset className=''>
							<label htmlFor='ContractId'>Contrato </label>
							<CustomInput
								disabled={true}
								initialValue={
									currentContract.current?.Client.fullName +
									' - ' +
									currentContract.current?.Client.cuit +
									'  | ' +
									currentContract.current?.Property.street +
									' ' +
									currentContract.current?.Property.number +
									' '
								}
								onChange={(val) => {}}
								placeholder=''
							/>
						</fieldset>
					</FieldsetGroup>
					<FieldsetGroup>
						<fieldset className=''>
							<label htmlFor='clientAmount'>Monto Inquilino</label>
							<CustomInput
								placeholder='123.99'
								type='number'
								initialValue={clientAmount || ''}
								onChange={(value) => EhandleInputChange(value, 'clientAmount')}
							/>
							{errors?.clientAmount && <FormError text='El monto del cliente es obligatorio.' />}
						</fieldset>
						<fieldset className=''>
							<label htmlFor='ownerAmount'>Monto dueño </label>
							<CustomInput
								placeholder='123.99'
								type='number'
								initialValue={ownerAmount || ''}
								onChange={(value) => EhandleInputChange(value, 'ownerAmount')}
							/>
							{errors?.ownerAmount && <FormError text='El monto del dueño es obligatorio.' />}
						</fieldset>
					</FieldsetGroup>
					<fieldset className=''>
						<label htmlFor='expiredDate'>Fecha Vencimiento </label>
						<CustomInput
							placeholder='example@gmail.com'
							initialValue={expiredDate || ''}
							type='date'
							onChange={(value) => EhandleInputChange(value, 'expiredDate')}
						/>
						{errors?.expiredDate && <FormError text='La fecha de vencimiento es obligatorio.' />}
					</fieldset>
					<fieldset className=''>
						<label htmlFor='descEvent'>Descripción </label>
						<CustomTextArea
							placeholder='Escribe una breve descripción ...'
							initialValue={descEvent || ''}
							onChange={(value) => EhandleInputChange(value, 'description')}
						/>
						{errors?.descEvent && <FormError text='La descripción es obligatoria.' />}
					</fieldset>
					<section className='action flex items-center gap-x-3 mt-4'>
						<button
							className='btn !py-1'
							onClick={closeAddEventualitiesModal}
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
	)
}

export default Contracts

// TODO: agregar clientExpenses and ownerExpenses for each contract
