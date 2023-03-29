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
import { useClientExpenses } from '../../hooks/useClientExpenses'
import { useContracts } from '../../hooks/useContracts'
import FieldsetGroup from '../../components/FieldsetGroup'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import { FilterMatchMode } from 'primereact/api'
import { useEventualities } from '../../hooks/useEventualities'
import { IEventuality } from '../../interfaces/Ieventualities'
import CustomTextArea from '../../components/CustomTextArea'
import { diffenceBetweenDates, formatDateDDMMYYYY } from '../../helpers/date'



const Eventualities = () => {
	const { showAlert, hideAlert } = useContext(AuthContext)
	const [showCreateModal, setShowCreateModal] = useState(false)
	const [show, setShow] = useState(false)
	const { description, clientAmount, expiredDate, ownerAmount, ContractId, values, handleInputChange, reset, updateAll } = useForm({
		ContractId: 0,
		clientAmount: 0,
		ownerAmount: 0,
		description: '',
		expiredDate: '',
	})
	const [errors, setErrors] = useState<any>()
	const [editMode, setEditMode] = useState(false)
	const [to, setTo] = useState<any>()
	const [globalFilterValue, setGlobalFilterValue] = useState('')
	const [filters, setFilters] = useState({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
		description: { value: null, matchMode: FilterMatchMode.CONTAINS },
		'Contract.Property.street': { value: null, matchMode: FilterMatchMode.CONTAINS },
	})
	const currentEventuality = useRef<IEventuality | null>()

	const { data, isError, isLoading, error, isFetching, refetch } = useEventualities()
	const contractQuery = useContracts()

	const edit = (data: IEventuality) => {
		updateAll({ ...data })
		setShowCreateModal(true)
		setEditMode(true)
		currentEventuality.current = data
	}

	const ConfirmDestroy = (data: IEventuality) => {
		setShow(!show)
		currentEventuality.current = data
	}
	const onGlobalFilterChange = (e: any) => {
		const value = e.target.value
		let _filters = { ...filters }

		_filters['global'].value = value

		setFilters(_filters)
		setGlobalFilterValue(value)
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

	const destroy = async (id: number) => {
		try {
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
		}
	}

	const verifyForm = () => {
		let ok = true
		let error: any = {}
		if (!description.trim().length) {
			ok = false
			error.description = true
		}
		if (!expiredDate.trim().length) {
			ok = false
			error.expiredDate = true
		}
		if (!clientAmount) {
			ok = false
			error.clientAmount = true
		}
		if (!ownerAmount) {
			ok = false
			error.ownerAmount = true
		}
		if (!ContractId) {
			ok = false
			error.ContractId = true
		}
		setErrors(error)
		return ok
	}

	const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (verifyForm()) {

			if (editMode) {
				try {
					// @ts-expect-error
					const res = await http.put(`/eventualities/${currentEventuality.current?.id}`, { ...values, ContractId: values.ContractId.id })
					if (res.data.ok) {
						// refetch()
						data?.data &&
							(data.data = data?.data.map((z) => {
								if (z.id === currentEventuality.current?.id) {
									// @ts-expect-error
									z = { ...values }
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
				}
			} else {
				try {
					// @ts-expect-error
					const res = await http.post('/eventualities', { ...values, ContractId: values.ContractId.id })
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
				}
			}
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
			<div className='flex gap-x-4 mb-6 mx-4  items-center justify-between sm:justify-start'>
				<h3 className='font-bold  text-slate-700 dark:text-slate-500 text-lg sm:text-4xl'>Eventualidades</h3>
				<button
					onClick={() => {
						setEditMode(false)
						currentEventuality.current = null
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
						className={`dark:!bg-gray-900 dark:text-slate-400 border dark:!border-slate-700 m-auto w-[92%] !mx-[15px] sm:mx-0 sm:w-96 ml-0 sm:ml-[10px] mb-4`}
						value={globalFilterValue}
						placeholder='Busca eventualidad'
						type='search'
					/>
					<Box className='!p-0 !overflow-hidden !border-none !mx-4    mb-4 '>
						<DataTable
							size='small'
							emptyMessage='Aún no hay eventualidad'
							className='!overflow-hidden   !border-none'
							value={data?.data}
							paginator
							filters={filters}
							globalFilterFields={['Contract.Property.street', 'description']}
							rows={10}
							paginatorTemplate='FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink'
							currentPageReportTemplate='{first} al {last} de {totalRecords}'
							paginatorLeft={paginatorLeft}
							dataKey='id'
							responsiveLayout='scroll'
						>
							<Column
								field='Contract.Property.street'
								body={(data) => (
									<span>
										{data.Contract?.Property?.street} {data.Contract?.Property?.number} {data.Contract?.Property?.floor}{' '}
										{data.Contract?.Property?.dept}
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
								header='Monto Cliente'
								headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
								className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
							/>
							<Column
								field='ownerAmount'
								body={(data) => <span>$ {data.ownerAmount}</span>}
								sortable
								header='Monto inq'
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
								header='Dueño Pago'
								headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
								className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
							/>
							<Column
								field='expiredDate'
								sortable
								body={(data) => <span className={` ${diffenceBetweenDates(data.expiredDate, new Date().toString()) < 0 ? 'text-green-500' : 'text-red-500'} `}>{formatDateDDMMYYYY(data.expiredDate)}</span>}
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
				<div className='text-slate-400 mx-3 text-center'>Aún no hay eventualidad.</div>
			)}

			{isFetching && (<Loading h={40} w={40} />)}

			<DeleteModal
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
			// overlayBackground={localStorage.theme === 'light' ? 'rgb(227 227 227)' : 'rgb(15 23 42)'}
			>
				<form
					onSubmit={handleSave}
					className='!relative'
				>
					<FieldsetGroup>
						<fieldset className=''>
							<label htmlFor='ContractId'>Contrato </label>
							{/* {JSON.stringify(editMode ? contractQuery.data?.data.find((p) => p.id === currentEventuality.current?.ContractId) : ContractId)} */}
							<Dropdown
								value={editMode ? contractQuery.data?.data.find((p) => p.id === currentEventuality.current?.ContractId) : ContractId}
								onChange={(e) => handleInputChange(e.value, 'ContractId')}
								options={contractQuery.data?.data}
								optionLabel='street'
								showClear
								disabled={editMode}
								valueTemplate={(data, props) => {
									if (!data) return props.placeholder
									return (
										<span>
											{data.Client.fullName} | {data.Property.street} {data.Property.number} {data.Property.floor}-
											{data.Property.dept}
										</span>
									)
								}}
								itemTemplate={(data) => {
									return (
										<span>
											{data.Client.fullName} | {data.Property.street} {data.Property.number} {data.Property.floor}-
											{data.Property.dept}
										</span>
									)
								}}
								filterBy='Client.fullName,Property.street,Property.number,Property.floor,Property.dept'
								// optionValue='id'
								placeholder='elije contrato'
								filter
								filterPlaceholder='Busca contrato'
								className='h-[42px] items-center !border-gray-200 shadow '
							/>
							{errors?.ContractId && <FormError text='El contrato es obligatorio.' />}
						</fieldset>
					</FieldsetGroup>
					<FieldsetGroup>
						<fieldset className=''>
							<label htmlFor='clientAmount'>Monto Inquilino</label>
							<CustomInput
								placeholder='123.99'
								type='number'
								initialValue={clientAmount || ''}
								onChange={(value) => handleInputChange(value, 'clientAmount')}
							/>
							{errors?.clientAmount && <FormError text='El monto del cliente es obligatorio.' />}
						</fieldset>
						<fieldset className=''>
							<label htmlFor='ownerAmount'>Monto dueño </label>
							<CustomInput
								placeholder='123.99'
								type='number'
								initialValue={ownerAmount || ''}
								onChange={(value) => handleInputChange(value, 'ownerAmount')}
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
							onChange={(value) => handleInputChange(value, 'expiredDate')}
						/>
						{errors?.expiredDate && <FormError text='La fecha de vencimiento es obligatorio.' />}
					</fieldset>
					<fieldset className=''>
						<label htmlFor='description'>Descripción </label>
						<CustomTextArea
							placeholder='Escribe una breve descripción ...'
							initialValue={description || ''}
							onChange={(value) => handleInputChange(value, 'description')}
						/>
						{errors?.description && <FormError text='La descripción es obligatoria.' />}
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
	)
}

export default Eventualities
