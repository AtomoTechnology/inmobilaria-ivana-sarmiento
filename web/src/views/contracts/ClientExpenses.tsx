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
import { useClientExpenses } from '../../hooks/useClientExpenses'
import { useContracts } from '../../hooks/useContracts'
import FieldsetGroup from '../../components/FieldsetGroup'
import { Dropdown } from 'primereact/dropdown'
import { FilterMatchMode } from 'primereact/api'
import useShowAndHideModal from '../../hooks/useShowAndHideModal'
import { validateForm } from '../../helpers/form'
import HeaderData from '../../components/HeaderData'
import RefreshData from '../../components/RefreshData'
import { EmptyData } from '../../components/EmptyData'
import FormActionBtns from '../../components/FormActionBtns'
import { RowsToShow } from '../../helpers/variableAndConstantes'
import { formatDateDDMMYYYY } from '../../helpers/date'
import CloseOnClick from '../../components/CloseOnClick'

interface IClientExpense {
	id: number
	description: string
	amount: number
	date: string
	ContractId: number
}

const ClientExpenses = () => {
	const [showCreateModal, setShowCreateModal] = useState(false)
	const [show, setShow] = useState(false)
	const { description, amount, date, ContractId, values, handleInputChange, reset, updateAll } = useForm({
		description: '',
		amount: 0,
		date: new Date().toISOString().slice(0, 10),
		ContractId: 0,
	})
	const [errors, setErrors] = useState<any>()
	const [editMode, setEditMode] = useState(false)
	const [globalFilterValue, setGlobalFilterValue] = useState('')
	const [filters, setFilters] = useState({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
		description: { value: null, matchMode: FilterMatchMode.CONTAINS },
		'Contract.Property.street': { value: null, matchMode: FilterMatchMode.CONTAINS },
	})
	const currentClientExpense = useRef<IClientExpense | null>()
	const { showAndHideModal } = useShowAndHideModal()
	const [savingOrUpdating, setSavingOrUpdating] = useState(false)
	const { data, isError, isLoading, error, isFetching, refetch } = useClientExpenses()
	const contractQuery = useContracts()

	const edit = (data: IClientExpense) => {
		updateAll({ ...data })
		setShowCreateModal(true)
		setEditMode(true)
		currentClientExpense.current = data
	}

	const ConfirmDestroy = (data: IClientExpense) => {
		setShow(!show)
		currentClientExpense.current = data
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
			const res = await http.delete('/client-expenses/' + id)
			if (res.data.ok) {
				data?.data && (data.data! = data?.data.filter((z) => z.id !== id))
				setShow(false)
				showAndHideModal('Borrado', res.data.message)
			} else {
				showAndHideModal('Error', res.data.message || 'Algo malo ocurrío.', 'red')
			}
		} catch (error: any) {
			if (error.response) showAndHideModal('Error', error.response.data?.message || 'Algo malo ocurrío.', 'red')
		} finally {
			setSavingOrUpdating(false)
		}
	}

	const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const { error, ok } = validateForm({ ...values })
		setErrors(error)
		if (!ok) return false

		if (editMode) {
			try {
				setSavingOrUpdating(true)
				const res = await http.put(`/client-expenses/${currentClientExpense.current?.id}`, values)
				if (res.data.ok) {
					refetch()
					reset()
					setShowCreateModal(false)
					showAndHideModal('Editado', res.data.message)
				} else {
					showAndHideModal('Error', res.data.message || 'Algo malo ocurrío.', 'red')
				}
			} catch (error: any) {
				if (error.response) showAndHideModal('Error', error.response.data?.message || 'Algo malo ocurrío.', 'red')
			} finally {
				setSavingOrUpdating(false)
			}
		} else {
			try {
				setSavingOrUpdating(true)
				const res = await http.post('/client-expenses', values)
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
			} finally {
				setSavingOrUpdating(false)
			}
		}

	}

	const closeCreateModal = () => {
		reset()
		setShowCreateModal(false)
		setErrors({})
	}

	const actionBodyTemplate = (rowData: IClientExpense) => {
		return (
			<div className='flex gap-x-3 items-center justify-center'>
				<EditIcon action={() => edit(rowData)} />
				<DeleteIcon action={() => ConfirmDestroy(rowData)} />
			</div>
		)
	}
	const openCreateOrEditModel = () => {
		setEditMode(false)
		currentClientExpense.current = null
		setShowCreateModal(true)
	}

	if (isLoading) return <Loading />
	if (isError) return <RequestError error={error} />

	return (
		<div className='container m-auto  flex sm:mx-0  flex-col justify-center sm:justify-center'>
			<HeaderData action={openCreateOrEditModel} text='Impuestos Inquilinos' />

			{data.data.length > 0 ? (
				<>
					<CustomInput
						onChange={(val) => onGlobalFilterChange(val)}
						className=' w-auto mx-2 sm:mx-0 sm:w-96'
						initialValue={globalFilterValue}
						placeholder='Buscar impuesto'
						type='search'
					/>
					<Box className='!p-0 !overflow-hidden !border-none sm:mx-0    mb-4 '>
						<DataTable
							size='small'
							emptyMessage='Aún no hay impuesto'
							className='!overflow-hidden   !border-none'
							value={data?.data}
							paginator
							filters={filters}
							globalFilterFields={['Contract.Property.street', 'description']}
							rows={RowsToShow}
							paginatorTemplate='FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink'
							currentPageReportTemplate='{first} al {last} de {totalRecords}'
							paginatorLeft={<RefreshData action={refetch} />}
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
								field='description'
								body={(data) => (
									<span title={data.description}>
										{data.description.slice(0, 30)} {data.description.length > 30 ? '...' : ''}
									</span>
								)}
								sortable
								header='Descripción'
								headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
								className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
							/>
							<Column
								field='amount'
								sortable
								header='Monto'
								body={(data) => <span>$ {(data.amount)}</span>}
								headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
								className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
							/>
							<Column
								field='date'
								sortable
								body={(data) => <span>{formatDateDDMMYYYY(data.date)}</span>}
								header='Fecha'
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
			) : (<EmptyData text='Aún no hay Impuesto' />)}

			{isFetching && (<Loading h={40} w={40} />)}

			<DeleteModal
				show={show}
				savingOrUpdating={savingOrUpdating}
				setShow={setShow}
				destroy={() => destroy(currentClientExpense.current?.id!)}
				text={`${currentClientExpense.current?.description}`}
			/>

			<CreateModal
				show={showCreateModal}
				closeModal={closeCreateModal}
				overlayClick={false}
				className='max-w-[1000px] sm:w-[600px]'
				titleText={`${editMode ? 'Editar' : 'Agregar'} impuesto inquilino`}
			>
				<CloseOnClick action={closeCreateModal} />
				<form onSubmit={handleSave}				>
					<FieldsetGroup>
						<fieldset className='w-full sm:w-[70%]'>
							<label htmlFor='ContractId'>Contrato </label>
							<Dropdown
								value={ContractId}
								onChange={(e) => handleInputChange(e.value, 'ContractId')}
								options={contractQuery.data?.data}
								optionLabel='street'
								showClear
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
						</fieldset>
						<div className='w-full sm:w-[30%]'>
							<CustomInput
								placeholder='123.99'
								initialValue={amount || ''}
								type='number'
								onChange={(value) => handleInputChange(value, 'amount')}
								label='Monto'
								required
								hasError={errors?.amount}
								errorText='El monto es obligatorio.'
							/>
						</div>
					</FieldsetGroup>
					<CustomInput
						placeholder='Gasto bancario...'
						initialValue={description}
						onChange={(value) => handleInputChange(value, 'description')}
						label='Descripción'
						required
						hasError={errors?.description}
						errorText='La descripción es obligatoria.'
					/>
					<CustomInput
						placeholder='01/01/2023'
						type='date'
						initialValue={date}
						onChange={(value) => handleInputChange(value, 'date')}
						label='Fecha'
						required
						hasError={errors?.date}
						errorText='La fecha es obligatoria.'
					/>
					<FormActionBtns savingOrUpdating={savingOrUpdating} onClose={closeCreateModal} />
				</form>
			</CreateModal>
		</div>
	)
}

export default ClientExpenses
