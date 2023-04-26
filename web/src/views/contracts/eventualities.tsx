import React, { useRef, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import Box from '../../components/Box'
import EditIcon from '../../components/icons/EditIcon'
import DeleteIcon from '../../components/icons/DeleteIcon'
import DeleteModal from '../../components/DeleteModal'
import Loading from '../../components/Loading'
import http from '../../api/axios'
import CreateModal from '../../components/CreateModal'
import CustomInput from '../../components/CustomInput'
import { useForm } from '../../hooks/useForm'
import FormError from '../../components/FormError'
import RequestError from '../../components/RequestError'
import { useContracts } from '../../hooks/useContracts'
import FieldsetGroup from '../../components/FieldsetGroup'
import { Dropdown } from 'primereact/dropdown'
import { FilterMatchMode } from 'primereact/api'
import { useEventualities } from '../../hooks/useEventualities'
import { IEventuality } from '../../interfaces/Ieventualities'
import CustomTextArea from '../../components/CustomTextArea'
import { diffenceBetweenDates, formatDateDDMMYYYY } from '../../helpers/date'
import useShowAndHideModal from '../../hooks/useShowAndHideModal'
import { validateForm } from '../../helpers/form'
import HeaderData from '../../components/HeaderData'
import RefreshData from '../../components/RefreshData'
import { EmptyData } from '../../components/EmptyData'
import CloseOnClick from '../../components/CloseOnClick'
import FormActionBtns from '../../components/FormActionBtns'
import { useProperties } from '../../hooks/useProperties'
import BoxContainerPage from '../../components/BoxContainerPage'



const Eventualities = () => {
	const [showCreateModal, setShowCreateModal] = useState(false)
	const [show, setShow] = useState(false)
	const { description, clientAmount, expiredDate, ownerAmount, PropertyId, values, handleInputChange, reset, updateAll } = useForm({
		PropertyId: 0,
		clientAmount: 0,
		ownerAmount: 0,
		description: '',
		expiredDate: new Date().toISOString().slice(0, 10),
	})
	const [savingOrUpdating, setSavingOrUpdating] = useState(false)
	const [errors, setErrors] = useState<any>()
	const [editMode, setEditMode] = useState(false)
	const [globalFilterValue, setGlobalFilterValue] = useState('')
	const [filters, setFilters] = useState({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
		description: { value: null, matchMode: FilterMatchMode.CONTAINS },
		'Property.street': { value: null, matchMode: FilterMatchMode.CONTAINS },
	})
	const currentEventuality = useRef<IEventuality | null>()
	const { showAndHideModal } = useShowAndHideModal()
	const { data, isError, isLoading, error, isFetching, refetch } = useEventualities()
	// const contractQuery = useContracts()
	const propertyQuery = useProperties()


	const edit = (data: IEventuality) => {
		console.log(data)
		updateAll({ ...data })
		setShowCreateModal(true)
		setEditMode(true)
		currentEventuality.current = data
	}

	const ConfirmDestroy = (data: IEventuality) => {
		setShow(!show)
		currentEventuality.current = data
	}

	const onGlobalFilterChange = (val: any) => {
		const value = val
		let _filters = { ...filters }
		_filters['global'].value = value
		setFilters(_filters)
		setGlobalFilterValue(value)
	}

	const destroy = async (id: number) => {
		try {
			setSavingOrUpdating(true)
			const res = await http.delete('/eventualities/' + id)
			if (res.data.ok) {
				data?.data && (data.data! = data?.data.filter((z) => z.id !== id))
				setShow(false)
				showAndHideModal('Borrado', res.data.message)
			} else {
				showAndHideModal('Error', res.data.message || 'Algo malo ocurrío.', 'red')
			}
		} catch (error: any) {
			if (error.response) showAndHideModal('Error', error.response.data?.message || 'Algo malo ocurrío.', 'red')
		} finally { setSavingOrUpdating(false) }
	}

	const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const { error, ok } = validateForm({ ...values }, ['clientPaid', 'ownerPaid', 'isReverted', 'ContractId'])
		setErrors(error)
		if (!ok) return false
		if (editMode) {
			try {
				setSavingOrUpdating(true)
				const res = await http.put(`/eventualities/${currentEventuality.current?.id}`, { ...values })
				if (res.data.ok) {
					// refetch()
					data?.data &&
						(data.data = data?.data.map((z) => {
							if (z.id === currentEventuality.current?.id) {
								// @ts-expect-error
								z = { ...values, Contract: propertyQuery.data?.data.find((x) => x.id === values.PropertyId) }
								// eslint-disable-line no-use-before-define
							}
							return z
						}))
					reset()
					setShowCreateModal(false)
					showAndHideModal('Editado', res.data.message)
				} else {
					showAndHideModal('Error', res.data.message || 'Algo malo ocurrío.', 'red')
				}
			} catch (error: any) {
				if (error.response) showAndHideModal('Error', error.response.data?.message || 'Algo malo ocurrío.', 'red')
			} finally { setSavingOrUpdating(false) }
		} else {
			try {
				setSavingOrUpdating(true)
				const res = await http.post('/eventualities', { ...values })
				if (res.data.ok) {
					refetch()
					reset()
					setShowCreateModal(false)
					showAndHideModal('Guardado', res.data.message)
				} else {
					showAndHideModal('Error', res.data.message || 'Algo malo ocurrío.', 'red')
				}
			} catch (error: any) {
				if (error.response) showAndHideModal('Error', error.response.data?.message || 'Algo malo ocurrío.', 'red')
			} finally { setSavingOrUpdating(false) }
		}

	}

	const closeCreateModal = () => {
		reset()
		setShowCreateModal(false)
		setErrors({})
	}

	const actionBodyTemplate = (rowData: any) => {
		return (
			<div className='flex gap-x-3 items-center justify-center'>
				<EditIcon action={() => edit(rowData)} />
				<DeleteIcon action={() => ConfirmDestroy(rowData)} />
			</div>
		)
	}
	const openCreateOrEditModel = () => {
		setEditMode(false)
		currentEventuality.current = null
		setShowCreateModal(true)
	}

	if (isLoading) return <Loading />
	if (isError) return <RequestError error={error} />

	return (
		<BoxContainerPage>
			<HeaderData action={openCreateOrEditModel} text='Eventualidades' />
			{data.data.length > 0 ? (
				<>
					<CustomInput
						onChange={(val) => onGlobalFilterChange(val)}
						className=' w-auto mx-2 sm:mx-0 sm:w-96'
						initialValue={globalFilterValue}
						placeholder='Buscar eventualidad'
						type='search'
					/>
					<Box className='!p-0 !overflow-hidden !border-none sm:mx-0  mb-4 '>
						<DataTable
							size='small'
							emptyMessage='Aún no hay eventualidad'
							className='!overflow-hidden   !border-none'
							value={data?.data}
							filters={filters}
							globalFilterFields={['Property.street', 'description']}
							// paginator
							// rows={10}
							// paginatorTemplate='FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink'
							// currentPageReportTemplate='{first} al {last} de {totalRecords}'
							// paginatorLeft={<RefreshData action={refetch} />}
							dataKey='id'
							responsiveLayout='scroll'
						>
							<Column
								field='Property.street'
								// body={(data) => (
								// 	<span>
								// 		{data.Contract?.Property?.street} {data.Contract?.Property?.number} {data.Contract?.Property?.floor}{' '}
								// 		{data.Contract?.Property?.dept}
								// 	</span>
								// )}
								body={(data) => (
									<span>
										{data.Property?.street} {data.Property?.number} {data.Property?.floor}{' '}
										{data.Property?.dept}
									</span>
								)}
								header='Propiedad'
								headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
								className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
								sortable
							/>
							<Column
								field='clientAmount'
								body={(data) => <span>$ {data.clientAmount}</span>}
								sortable
								header='Monto inquilino'
								headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
								className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
							/>
							<Column
								field='ownerAmount'
								body={(data) => <span>$ {data.ownerAmount}</span>}
								sortable
								header='Monto Propietario'
								headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
								className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
							/>
							<Column
								field='description'
								body={(data) => (
									<span title={data.description}>
										{data.description.slice(0, 30)} {data.description.length > 30 ? '...' : ''}
									</span>
								)}
								header='Descripción'
								headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
								className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
							/>

							<Column
								field='clientPaid'
								body={(data) => <span className={` ${data.clientPaid ? 'text-green-500' : 'text-red-400'} `}>{data.clientPaid ? 'Si' : 'No'}</span>}
								header='Inquilino Pago'
								headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
								className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
							/>
							<Column
								field='ownerPaid'
								body={(data) => <span className={` ${data.ownerPaid ? 'text-green-500' : 'text-red-400'} `}>{data.ownerPaid ? 'Si' : 'No'}</span>}
								header='Propietario Pago'
								headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
								className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
							/>
							<Column
								field='expiredDate'
								sortable
								body={(data) => <span className={` ${diffenceBetweenDates(data.expiredDate, new Date().toISOString().slice(0, 10)) < 0 ? 'text-green-500' : 'text-red-500'} `}>{formatDateDDMMYYYY(data.expiredDate)}</span>}
								header='Fecha Vencimiento'
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
				</>
			) : (
				<EmptyData text='Aún no hay eventualidad' />
			)}

			{isFetching && (<Loading h={40} w={40} />)}

			<DeleteModal
				savingOrUpdating={savingOrUpdating}
				show={show}
				setShow={setShow}
				destroy={() => destroy(currentEventuality.current?.id!)}
				text={`${currentEventuality.current?.description}`}
			/>

			<CreateModal
				show={showCreateModal}
				closeModal={closeCreateModal}
				overlayClick={false}
				titleText='Agregar  eventualidad'
				className='shadow-none border-0 max-w-[500px]'
			>
				<CloseOnClick action={closeCreateModal} />
				<form onSubmit={handleSave}				>
					<FieldsetGroup>
						{/* <fieldset className=''>
							<label htmlFor='ContractId'>Contrato </label>
							<Dropdown
								value={ContractId}
								onChange={(e) => handleInputChange(e.value, 'ContractId')}
								options={contractQuery.data?.data}
								optionLabel='street'
								showClear
								// disabled={editMode}
								valueTemplate={(data, props) => !data ? props.placeholder : (<span> {data.Client.fullName} | {data.Property.street} {data.Property.number} {data.Property.floor}-{data.Property.dept} </span>)}
								itemTemplate={(data) => (<span> {data.Client.fullName} | {data.Property.street} {data.Property.number} {data.Property.floor}-{data.Property.dept} </span>)}
								filterBy='Client.fullName,Property.street,Property.number,Property.floor,Property.dept'
								optionValue='id'
								placeholder='elije contrato'
								filter
								filterPlaceholder='Busca contrato'
								className='h-[42px] items-center !border-gray-200 shadow '
							/>
							{errors?.ContractId && <FormError text='El contrato es obligatorio.' />}
						</fieldset> */}


						<fieldset className=''>
							<label htmlFor='PropertyId'>Propiedad</label>
							<Dropdown
								value={PropertyId}
								onChange={(e) => handleInputChange(e.value, 'PropertyId')}
								options={propertyQuery.data?.data}
								optionLabel='street'
								showClear
								filterPlaceholder='Busca propiedad'
								optionValue='id'
								filterBy='street,number,dept,floor'
								placeholder='Elije una propiedad'
								filter
								valueTemplate={(data, props) => !data ? props.placeholder : <span>{data.street} {data.number} {data.floor}-{data.dept}</span>}
								itemTemplate={(data) => (<span> {data.street} {data.number} {data.floor}-{data.dept} </span>)}
								className='h-[42px] items-center !border-gray-200 shadow'
							/>
							{PropertyId > 0 && (
								<span className='text-blue-600 dark:text-blue-400 text-sm ' >
									Propietario :  {propertyQuery.data?.data.find((p) => p.id === PropertyId)?.Owner?.fullName}
								</span>
							)}
							{errors?.PropertyId && <FormError text='La propiedad es obligatoria.' />}
						</fieldset>
					</FieldsetGroup>
					<FieldsetGroup>
						<CustomInput
							placeholder='202.99'
							type='number'
							initialValue={clientAmount || ''}
							onChange={(value) => handleInputChange(value, 'clientAmount')}
							label='Monto Inquilino'
							required
							hasError={errors?.clientAmount}
							errorText='El monto del cliente es obligatorio.'
						/>
						<CustomInput
							placeholder='120.99'
							type='number'
							initialValue={ownerAmount || ''}
							onChange={(value) => handleInputChange(value, 'ownerAmount')}
							label='Monto propietario'
							required
							hasError={errors?.ownerAmount}
							errorText='El monto del propietario es obligatorio.'
						/>
					</FieldsetGroup>
					<CustomInput
						placeholder=''
						initialValue={expiredDate || ''}
						type='date'
						onChange={(value) => handleInputChange(value, 'expiredDate')}
						label='Fecha Vencimiento'
						required
						hasError={errors?.expiredDate}
						errorText='La fecha de vencimiento es obligatorio.'
					/>
					<CustomTextArea
						placeholder='Escribe una breve descripción ...'
						initialValue={description || ''}
						onChange={(value) => handleInputChange(value, 'description')}
						maxLength={255}
						label='Descripción'
						required
						hasError={errors?.description}
						errorText='La descripción es obligatoria.'
					/>
					<FormActionBtns savingOrUpdating={savingOrUpdating} onClose={closeCreateModal} />
				</form>
			</CreateModal>

		</BoxContainerPage>
	)
}

export default Eventualities
