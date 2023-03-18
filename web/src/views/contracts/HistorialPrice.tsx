import React, { useContext, useRef, useState } from 'react'
import { DataTable, DataTableExpandedRows } from 'primereact/datatable'
import { Column } from 'primereact/column'
import Box from '../../components/Box'
import DeleteIcon from '../../components/icons/DeleteIcon'
import DeleteModal from '../../components/DeleteModal'
import Loading from '../../components/Loading'
import http from '../../api/axios'
import CreateModal from '../../components/CreateModal'
import { AuthContext } from '../../context/authContext'
import { MdAdd, MdOutlineAttachMoney } from 'react-icons/md'
import CustomInput from '../../components/CustomInput'
import { useForm } from '../../hooks/useForm'
import FormError from '../../components/FormError'
import RequestError from '../../components/RequestError'
import { DelayAlertToHide } from '../../helpers/variableAndConstantes'
import FieldsetGroup from '../../components/FieldsetGroup'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import { FilterMatchMode } from 'primereact/api'
import { useContracts } from '../../hooks/useContracts'
import SeeIcon from '../../components/icons/SeeIcon'
import { Contract, IHistorialPrice } from '../../interfaces/Icontracts'
import { useNavigate } from 'react-router-dom'
import { TbReportMoney } from 'react-icons/tb'
import CloseOnClick from '../../components/CloseOnClick'
import EditIcon from '../../components/icons/EditIcon'

const HistorialPrices = () => {
	const { authState, showAlert, hideAlert } = useContext(AuthContext)
	// const [selectedProducts2, setSelectedProducts2] = useState<Contract[]>();
	const [showCreateModal, setShowCreateModal] = useState(false)
	const [show, setShow] = useState(false)
	const {
		amount,
		percent,
		year,
		ContractId,
		values: values,
		handleInputChange: handleInputChange,
		updateAll,
		reset,
	} = useForm({
		ContractId: 0,
		amount: 0,
		year: 0,
		percent: 0,
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
	const currentPrice = useRef<IHistorialPrice | null>()
	const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows>()

	const { data, isError, isLoading, error, isFetching, refetch } = useContracts()

	const edit = (data: IHistorialPrice) => {
		console.log(data)
		// return
		updateAll({ ...data })
		// TODO: fix date  and complete  edit  and show detail
		setShowCreateModal(true)
		setEditMode(true)
		currentPrice.current = data
	}
	const ConfirmDestroy = (data: IHistorialPrice) => {
		setShow(!show)
		currentPrice.current = data
	}

	const verifyForm = () => {
		let ok = true
		let error: any = {}
		if (!amount) {
			ok = false
			error.amount = true
		}
		if (!year) {
			ok = false
			error.year = true
		}
		if (!percent) {
			ok = false
			error.percent = true
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

	const destroy = async (id: number) => {
		try {
			const res = await http.delete('/price-historial/' + id)
			if (res.data.ok) {
				refetch()
				setShow(false)
				showAndHideModal('Borrado', res.data.message)
			} else {
				showAndHideModal('Error', res.data.message || 'Algo malo ocurrío.', 'red')
			}
		} catch (error: any) {
			if (error.response) showAndHideModal('Error', error.response.data?.message || 'Algo malo ocurrío.', 'red')
		}
	}
	const openModalAddPrice = (data: Contract) => {
		// alert('hello')
		reset()
		currentPrice.current = null
		console.log(currentPrice)
		currentContract.current = data
		let prevYear = data.PriceHistorials[data.PriceHistorials.length! - 1].year
		let prevAmount = data.PriceHistorials[data.PriceHistorials.length! - 1].amount
		updateAll({ ...values, year: prevYear + 1, amount: prevAmount, ContractId: data.id })
		setShowCreateModal(true)
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

	const actionBodyTemplate = (rowData: Contract) => {
		return (
			<div className='flex gap-x-3 items-center justify-start'>
				{rowData.PriceHistorials.length <= 2 && (
					<div
						onClick={() => openModalAddPrice(rowData)}
						className='btn-add-price '
						title='Ajustar precio siguiente año'
					>
						<MdOutlineAttachMoney size={25} />
					</div>
				)}
			</div>
		)
	}

	const handleAddPrice = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (verifyForm()) {
			if (editMode) {
				try {
					const res = await http.put(`/price-historial/${currentPrice.current?.id}`, { ...values })
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
				}
			} else {
				console.log('hereeee')
				try {
					const res = await http.post('/price-historial', { ...values })
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
	const paginatorLeft = (
		<Button
			onClick={() => refetch()}
			type='button'
			icon='pi pi-refresh'
			text
		/>
	)
	const allowExpansion = (rowData: Contract) => rowData?.PriceHistorials.length > 0 || false

	const rowExpansionTemplate = (data: Contract) => {
		return (
			<div className='p-3'>
				<h2 className='text-lg font-semibold'>Histórico de precio</h2>
				<DataTable value={data.PriceHistorials}>
					<Column
						field='amount'
						body={(data) => <span> $ {data.amount} </span>}
						header='Monto'
						headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
						className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
						sortable
					></Column>
					<Column
						header='Año'
						field='year'
						headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
						className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
						sortable
					></Column>
					<Column
						header='Porcentaje'
						field='percent'
						headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
						className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
					></Column>
					<Column
						headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
						className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
						field='createdAt'
						body={(data) => <span> {data.createdAt.slice(0, 10)} </span>}
						header='Fecha'
					></Column>
					<Column
						body={actionBodyTemplate2}
						headerClassName='!border-none dark:!bg-gray-800'
						className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
						exportable={false}
						style={{ width: 90 }}
					/>
				</DataTable>
			</div>
		)
	}

	const actionBodyTemplate2 = (rowData: any) => {
		return (
			<div className='flex gap-x-3 items-center justify-center'>
				<EditIcon action={() => edit(rowData)} />
				<DeleteIcon action={() => ConfirmDestroy(rowData)} />
			</div>
		)
	}
	if (isLoading) return <Loading />
	if (isError) return <RequestError error={error} />

	return (
		<div className='container m-auto  flex sm:mx-0  flex-col justify-center sm:justify-center'>
			<div className='flex gap-x-4 mb-6 mx-3  items-center'>
				<h3 className='font-bold  text-slate-700 dark:text-slate-500 text-lg sm:text-4xl'>
					Histórico de precio de los Contratos
				</h3>
				{/* <button
					onClick={() => {
						setEditMode(false)
						currentContract.current = null
						setShowCreateModal(true)
					}}
					className='btn !w-10 !h-10 !p-0 gradient !rounded-full'
				>
					<MdAdd size={50} />
				</button> */}
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
					expandedRows={expandedRows}
					onRowToggle={(e: any) => setExpandedRows(e.data)}
					rowExpansionTemplate={rowExpansionTemplate}
					size='small'
					emptyMessage='Aún no hay contrato'
					className='!overflow-hidden   !border-none'
					value={data?.data}
					filters={filters}
					globalFilterFields={['Property.street', 'Client.fullName']}
					paginator
					rows={10}
					paginatorTemplate='FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink'
					currentPageReportTemplate='{first} al {last} de {totalRecords}'
					paginatorLeft={paginatorLeft}
					dataKey='id'
					responsiveLayout='scroll'
				>
					<Column
						expander={allowExpansion}
						headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
						className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
						style={{ width: '0.5rem' }}
					/>
					<Column
						field='Property.street'
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
						field='Client.fullName'
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
						field='startDate'
						header='Fecha inicio'
						body={(data) => <span>{data.startDate.slice(0, 10)}</span>}
						headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
						className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
						sortable
					/>
					<Column
						field='endDate'
						header='Fecha fin'
						body={(data) => <span>{data.endDate.slice(0, 10)}</span>}
						headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
						className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
						sortable
					/>
					<Column
						field='state'
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
						field='state'
						header='Año'
						body={(data) => (
							<span className={`${data.PriceHistorials.length === 3 && 'text-yellow-500 font-bold'}`}>
								{data.PriceHistorials[data.PriceHistorials.length - 1]?.year}
							</span>
						)}
						headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
						className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
					/>
					<Column
						field=''
						header='Monto Actual'
						body={(data) => (
							<span className={`font-bold ${data.state === 'En curso' ? 'text-green-500' : 'text-red-500'}`}>
								${data.PriceHistorials[data.PriceHistorials.length - 1]?.amount}
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
						style={{ width: 50 }}
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
				destroy={() => destroy(currentPrice.current?.id!)}
				text={` El precio del ${currentPrice.current?.year} año con el monto de  $ ${currentPrice.current?.amount}`}
			/>
			{/* modal histprial-price */}
			<CreateModal
				show={showCreateModal}
				closeModal={closeCreateModal}
				overlayClick={false}
				titleText='Agregar  eventualidad'
				className='shadow-none border-0 max-w-[500px]'
				// overlayBackground={localStorage.theme === 'light' ? 'rgb(227 227 227)' : 'rgb(15 23 42)'}
			>
				<form
					onSubmit={handleAddPrice}
					className='!relative'
				>
					<FieldsetGroup>
						<fieldset className=''>
							<label htmlFor='ContractId'>Contrato </label>
							<CustomInput
								disabled={true}
								initialValue={
									editMode
										? currentPrice.current?.ContractId
										: currentContract.current?.Client.fullName +
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
					<fieldset className=''>
						<label htmlFor='percent'>Porcentaje de aumento</label>
						<CustomInput
							placeholder='40'
							type='number'
							initialValue={percent || ''}
							onChange={(value) => {
								// handleInputChange(value, 'percent')
								// updateAll({ ...values, percent: Number(value) })
								if (currentContract.current?.PriceHistorials) {
									let prevValue =
										currentContract.current?.PriceHistorials[currentContract.current?.PriceHistorials.length! - 1]
											.amount
									let v = prevValue * (Number(value) / 100)
									// console.log(v)
									updateAll({ ...values, amount: v + prevValue, percent: Number(value) })
									// handleInputChange(v + prevValue, 'amount')
								} else {
									handleInputChange(value, 'percent')
								}
							}}
						/>
						{errors?.percent && <FormError text='El porcentaje  es obligatorio.' />}
					</fieldset>
					<FieldsetGroup>
						<fieldset className=''>
							<label htmlFor='amount'>Monto</label>
							<input
								placeholder='123.99'
								disabled={editMode ? false : true}
								type='number'
								value={amount}
								onChange={(e: any) => handleInputChange(e.target.value, 'amount')}
							/>
							{errors?.amount && <FormError text='El monto del cliente es obligatorio.' />}
						</fieldset>
						<fieldset className=''>
							<label htmlFor='year'>Año</label>
							<Dropdown
								value={year}
								onChange={(e) => handleInputChange(e.value, 'year')}
								options={[1, 2, 3]}
								placeholder='Elije el año'
								name='year'
								className='h-[42px] items-center !border-gray-200 dark:!border-gray-700 shadow dark:bg-slate-900 dark:!text-slate-400 '
							/>
							{errors?.year && <FormError text='El año  es obligatorio.' />}
						</fieldset>
					</FieldsetGroup>

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

export default HistorialPrices

// TODO: agregar clientExpenses and ownerExpenses for each contract
