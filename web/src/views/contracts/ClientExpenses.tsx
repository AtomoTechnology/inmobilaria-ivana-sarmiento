import React, { useContext, useRef, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import Box from '../../components/Box'
import EditIcon from '../../components/icons/EditIcon'
import DeleteIcon from '../../components/icons/DeleteIcon'
import DeleteModal from '../../components/DeleteModal'
import Loading from '../../components/Loading'
import { useZones } from '../../hooks/useZones'
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

interface IClientExpense {
	id: number
	description: string
	amount: number
	date: string
	ContractId: number
}

const ClientExpenses = () => {
	const { showAlert, hideAlert } = useContext(AuthContext)
	const [showCreateModal, setShowCreateModal] = useState(false)
	const [show, setShow] = useState(false)
	const { description, amount, date, ContractId, values, handleInputChange, reset, updateAll } = useForm({
		description: '',
		amount: 0,
		date: '',
		ContractId: 0,
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
	const currentClientExpense = useRef<IClientExpense | null>()

	const { data, isError, isLoading, error, isFetching, refetch } = useClientExpenses()
	const contractQuery = useContracts()

	const edit = (data: IClientExpense) => {
		updateAll({ ...data, date: data.date })
		setShowCreateModal(true)
		setEditMode(true)
		currentClientExpense.current = data
	}

	const ConfirmDestroy = (data: IClientExpense) => {
		setShow(!show)
		currentClientExpense.current = data
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
		}
	}

	const verifyForm = () => {
		let ok = true
		let error: any = {}
		if (!description.trim().length) {
			ok = false
			error.description = true
		}
		if (!date.trim().length) {
			ok = false
			error.date = true
		}
		if (!amount) {
			ok = false
			error.amount = true
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
		// console.log(values)
		// return
		if (verifyForm()) {
			if (editMode) {
				try {
					const res = await http.put(`/client-expenses/${currentClientExpense.current?.id}`, values)
					if (res.data.ok) {
						refetch()
						// data?.data &&
						// 	(data.data = data?.data.map((z) => {
						// 		if (z.id === currentClientExpense.current?.id) {
						// 			z = { ...values }
						// 		}
						// 		return z
						// 	}))
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
					const res = await http.post('/client-expenses', values)
					if (res.data.ok) {
						// data?.data.unshift(res.data.data)
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
				<h3 className='font-bold  text-slate-700 dark:text-slate-500 text-lg sm:text-4xl'>Impuestos Inquilinos</h3>
				<button
					onClick={() => {
						setEditMode(false)
						currentClientExpense.current = null
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
						placeholder='Busca contrato'
						type='search'
					/>
					<Box className='!p-0 !overflow-hidden !border-none !mx-4    mb-4 '>
						<DataTable
							size='small'
							emptyMessage='Aún no hay impuesto'
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
								header='Monto'
								headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
								className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
							/>
							<Column
								field='date'
								sortable
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
			) : (
				<div className='text-slate-400 mx-3 text-center'>Aún no hay Impuesto.</div>
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
				destroy={() => destroy(currentClientExpense.current?.id!)}
				text={`${currentClientExpense.current?.description}`}
			/>

			<CreateModal
				show={showCreateModal}
				closeModal={closeCreateModal}
				overlayClick={false}
				className='max-w-[1000px] w-[600px]'
				titleText={`${editMode ? 'Editar' : 'Crear'} impuesto `}
			>
				<form
					action=''
					onSubmit={handleSave}
				>
					<FieldsetGroup>
						<fieldset className='w-[70%]'>
							<label htmlFor='ZoneId'>Contrato</label>
							<Dropdown
								value={ContractId}
								onChange={(e) => handleInputChange(e.value, 'ContractId')}
								options={contractQuery.data?.data}
								optionLabel='id'
								showClear
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
								filterPlaceholder='Busca contrato'
								optionValue='id'
								placeholder='elije contrato'
								filter
								className='h-[42px] items-center !border-gray-200 shadow '
							/>
							{errors?.ContractId && <FormError text='El contrato es obligatorio.' />}
						</fieldset>
						<fieldset className='w-[30%]'>
							<label htmlFor='amount'>Monto</label>
							<CustomInput
								placeholder='123.99'
								initialValue={amount || ''}
								type='number'
								onChange={(value) => handleInputChange(value, 'amount')}
							/>
							{errors?.amount && <FormError text='El monto es obligatorio.' />}
						</fieldset>
					</FieldsetGroup>

					<fieldset className=''>
						<label htmlFor='description'>Descripción</label>
						<CustomInput
							placeholder='Gasto bancario...'
							initialValue={description}
							onChange={(value) => handleInputChange(value, 'description')}
						/>
						{errors?.description && <FormError text='La descripción es obligatoria.' />}
					</fieldset>
					<fieldset className=''>
						<label htmlFor='date'>Fecha</label>
						<CustomInput
							placeholder='01/01/2023'
							type='date'
							initialValue={date}
							onChange={(value) => handleInputChange(value, 'date')}
						/>
						{errors?.date && <FormError text='La fecha es obligatoria.' />}
					</fieldset>
					<section className='action flex items-center gap-x-3 mt-8'>
						<button
							className='btn sec !py-1'
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

export default ClientExpenses
