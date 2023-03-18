import React, { useContext, useRef, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import Box from '../../components/Box'
import EditIcon from '../../components/icons/EditIcon'
import DeleteIcon from '../../components/icons/DeleteIcon'
import DeleteModal from '../../components/DeleteModal'
import Loading from '../../components/Loading'
import { useZones } from '../../hooks/useZones'
import { Izone } from '../../interfaces/Izones'
import http from '../../api/axios'
import CreateModal from '../../components/CreateModal'
import { AuthContext } from '../../context/authContext'
import { MdAdd } from 'react-icons/md'
import CustomInput from '../../components/CustomInput'
import { useForm } from '../../hooks/useForm'
import FormError from '../../components/FormError'
import RequestError from '../../components/RequestError'
import { DelayAlertToHide, monthsInSpanish, selectedYears } from '../../helpers/variableAndConstantes'
import FieldsetGroup from '../../components/FieldsetGroup'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import { useContracts } from '../../hooks/useContracts'
import { usePaymentTypes } from '../../hooks/usePaymentTypes'
import { Checkbox, CheckboxChangeEvent } from 'primereact/checkbox'
import { IClientExpensesResponseSimple, IClientExpItem } from '../../interfaces/clientExpenses'
import { IEventualitiesResponse, IEventuality } from '../../interfaces/Ieventualities'
import CloseOnClick from '../../components/CloseOnClick'
import { useClientPayments } from '../../hooks/useClientPayments'

const ClientPayments = () => {
	const { showAlert, hideAlert } = useContext(AuthContext)
	const [showCreateModal, setShowCreateModal] = useState(false)
	const [show, setShow] = useState(false)
	const {
		ContractId,
		PaymentTypeId,
		recharge,
		rentingAmount,
		month,
		year,
		updateAll,
		total,
		values,
		qteDays,
		handleInputChange,
		reset,
		dailyPunitive,
		isRecharged,
	} = useForm({
		extraExpenses: 0,
		ContractId: null,
		PaymentTypeId: null,
		month: monthsInSpanish[new Date().getMonth()],
		year: new Date().getFullYear(),
		total: 0,
		recharge: 0,
		rentingAmount: 0,
		qteDays: 0,
		isRecharged: 0,
		dailyPunitive: 0,
	})
	const [errors, setErrors] = useState<any>()
	const [editMode, setEditMode] = useState(false)
	const [to, setTo] = useState<any>()
	const [selectedEventualities, setSelectedEventualities] = useState<IEventuality[]>([])
	const [selectedExpensesClient, setSelectedExpensesClient] = useState<IClientExpItem[]>([])
	const eventTotal = useRef(0)
	const expsTotal = useRef(0)
	const currentPayment = useRef<Izone | null>()
	const [expenseDetails, setExpenseDetails] = useState<IClientExpItem[]>([])
	const [eventualityDetails, setEventualityDetails] = useState<IEventuality[]>([])
	const clientPaymentQuery = useClientPayments()
	const { data, isError, isLoading, error, isFetching } = useContracts()
	const [loadingExpenses, setLoadingExpenses] = useState(false)
	// const contractQuery = useContracts()
	const paymentTypeQuery = usePaymentTypes()

	const edit = (data: Izone) => {
		// handleInputChange(data.name, 'name')
		setShowCreateModal(true)
		setEditMode(true)
		currentPayment.current = data
	}

	const ConfirmDestroy = (data: Izone) => {
		setShow(!show)
		currentPayment.current = data
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
			const res = await http.delete('/payment-clients/' + id)
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
		if (!ContractId) {
			ok = false
			error.ContractId = true
		}
		setErrors(error)
		return ok
	}

	const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		values.total = rentingAmount + eventTotal.current + expsTotal.current + recharge
		console.log({ ...values, expenseDetails: selectedExpensesClient, eventualityDetails: selectedEventualities })
		return
		if (verifyForm()) {
			if (editMode) {
				// @ts-expect-error
				values.ContractId = values.ContractId!.id
				try {
					const res = await http.put(`/payment-clients/${currentPayment.current?.id}`, {
						...values,
						expenseDetails: selectedExpensesClient,
						eventualityDetails: selectedEventualities,
					})
					if (res.data.ok) {
						data?.data &&
							(data.data = data?.data.map((z) => {
								if (z.id === currentPayment.current?.id) {
									// z.name = values.name
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
				console.log({ ...values, expenseDetails: selectedExpensesClient, eventualityDetails: selectedEventualities })
				// @ts-expect-error
				values.ContractId = values.ContractId!.id
				try {
					const res = await http.post('/payment-clients', {
						...values,
						expenseDetails: selectedExpensesClient,
						eventualityDetails: selectedEventualities,
					})
					if (res.data.ok) {
						data?.data.unshift(res.data.data)
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

	const onExpensesClienteChange = (e: CheckboxChangeEvent) => {
		let _selectedExps = [...selectedExpensesClient]

		if (e.checked) _selectedExps.push(e.value)
		else _selectedExps = _selectedExps.filter((evt) => evt.id !== e.value.id)
		expsTotal.current = _selectedExps.reduce((acc: any, cur: any) => acc + cur.amount, 0)
		setSelectedExpensesClient(_selectedExps)
	}
	const onEventualityChange = (e: CheckboxChangeEvent) => {
		let _selectedEvents = [...selectedEventualities]

		if (e.checked) _selectedEvents.push(e.value)
		else _selectedEvents = _selectedEvents.filter((evt) => evt.id !== e.value.id)
		eventTotal.current = _selectedEvents.reduce((acc: any, cur: any) => acc + cur.clientAmount, 0)
		setSelectedEventualities(_selectedEvents)
	}

	const handleChangeContract = async (e: DropdownChangeEvent) => {
		// alert('ffdg')
		setLoadingExpenses(true)
		reset()
		setSelectedEventualities([])
		setSelectedExpensesClient([])
		eventTotal.current = 0
		expsTotal.current = 0
		// handleInputChange(e.value, 'ContractId')
		let day = new Date().getDate()
		if (day > 10) {
			let qte = day - 10
			console.log(qte * e.value.PriceHistorials[e.value.PriceHistorials.length - 1]?.amount * (4 / 100))
			updateAll({
				...values,
				recharge: Number(
					(qte * e.value.PriceHistorials[e.value.PriceHistorials.length - 1]?.amount * (4 / 100)).toFixed(2)
				),
				qteDays: qte,
				rentingAmount: e.value.PriceHistorials[e.value.PriceHistorials.length - 1]?.amount,
				ContractId: e.value,
				dailyPunitive: e.value.PriceHistorials[e.value.PriceHistorials.length - 1]?.amount * (4 / 100),
			})
		} else {
			updateAll({
				...values,
				rentingAmount: e.value.PriceHistorials[e.value.PriceHistorials.length - 1]?.amount,
				ContractId: e.value,
			})
		}

		try {
			const docsExps = await http.get<IClientExpensesResponseSimple>(
				`/client-expenses?amount=0:gt&ContractId=${e.value.id}&include=true`
			)
			const docsEvents = await http.get<IEventualitiesResponse>(
				`/eventualities?clientPaid=0&ContractId=${e.value.id}&include=true`
			)
			setEventualityDetails(docsEvents.data.data)
			setExpenseDetails(docsExps.data.data)
		} catch (error) {}
		setLoadingExpenses(false)
	}
	if (clientPaymentQuery.isLoading) return <Loading />
	if (clientPaymentQuery.isError) return <RequestError error={clientPaymentQuery.error} />
	// console.log(values)
	return (
		<div className='container m-auto  flexsm:mx-0  flex-col justify-center sm:justify-center'>
			<div className='flex gap-x-4 mb-6 mx-4  items-center justify-between sm:justify-start'>
				<h3 className='font-bold  text-slate-700 dark:text-slate-500 text-lg sm:text-4xl'>Cobro a Inquilino</h3>
				<button
					onClick={() => {
						setEditMode(false)
						currentPayment.current = null
						setShowCreateModal(true)
					}}
					className='btn !w-10 !h-10 !p-0 gradient !rounded-full'
				>
					<MdAdd size={50} />
				</button>
			</div>
			{clientPaymentQuery?.data?.data.length > 0 ? (
				<>
					<Box className='!p-0 !overflow-hidden !border-none !mx-4    mb-4 '>
						<DataTable
							size='small'
							emptyMessage='Aún no hay cobro'
							className='!overflow-hidden   !border-none'
							value={clientPaymentQuery?.data?.data}
							dataKey='id'
							responsiveLayout='scroll'
						>
							<Column
								field='Contract.id'
								// body={(data) => (
								// 	<span>
								// 		{data.Property.street} {data.Property.number} {data.Property.floor} {data.Property.dept}
								// 	</span>
								// )}
								header='Propiedad'
								headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
								className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
								sortable
							/>
							<Column
								field='month'
								body={(data) => (
									<span>
										{data.month}/{data.year}
									</span>
								)}
								header='Periodo'
								headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
								className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
								sortable
							/>
							<Column
								field='total'
								body={(data) => <span>${data.total}</span>}
								header='Total Cobrado'
								headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
								className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
								sortable
							/>
							<Column
								field='PaymentType.name'
								// body={(data) => <span>${data.total}</span>}
								header='Formato de pago'
								headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
								className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
								sortable
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
				<div className='text-slate-400 mx-3 text-center'>Aún no hay Cobro.</div>
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
				destroy={() => destroy(currentPayment.current?.id!)}
				text={`${currentPayment.current?.name}`}
			/>

			<CreateModal
				show={showCreateModal}
				closeModal={closeCreateModal}
				overlayClick={false}
				// className='shadow-none border-0 w-full sm:w-[640px] md:w-[768px] lg:w-[1024px] !p-3'
				titleText={'Cobros'}
				overlayBackground={localStorage.theme === 'light' ? 'rgb(227 227 227)' : 'rgb(15 23 42)'}
			>
				{/* <div className='flex justify-between f-full gap-x-6 mt-3'> */}
				<form
					action=''
					onSubmit={handleSave}
					// bg-gray-100 p-2 rounded-md shadow-xl
					className=' w-[650px] '
				>
					<CloseOnClick action={closeCreateModal} />
					<FieldsetGroup>
						<fieldset className=''>
							<label htmlFor='ContractId'>Contrato</label>
							<Dropdown
								value={ContractId}
								onChange={handleChangeContract}
								options={data?.data}
								optionLabel='id'
								valueTemplate={(data, props) => {
									if (!data) return props.placeholder
									return (
										<span>
											{data.Client.fullName} - {data.Client.cuit} | {data.Property.street} {data.Property.number}{' '}
											{data.Property.floor}-{data.Property.dept}
										</span>
									)
								}}
								itemTemplate={(data) => {
									return (
										<span>
											{data.Client.fullName} - {data.Client.cuit} | {data.Property.street} {data.Property.number}{' '}
											{data.Property.floor}-{data.Property.dept}
										</span>
									)
								}}
								filterPlaceholder='Busca contrato'
								filterBy='Property.street,Property.number,Client.fullName'
								// optionValue='id'
								placeholder='elije contrato'
								filter
								className='h-[42px] items-center !border-gray-200 shadow '
							/>
							{errors?.ContractId && <FormError text='El contrato es obligatorio.' />}
						</fieldset>
					</FieldsetGroup>

					{!loadingExpenses ? (
						<>
							{expenseDetails.length > 0 && (
								<div className=''>
									<h1 className='title-form mb-2'>Gastos inquilino</h1>
									<div className='eventualities-section flex flex-wrap items-center gap-y-2 gap-x-3'>
										{expenseDetails.map((evt, index) => (
											<div
												key={evt.id.toString() + evt.createdAt}
												className='align-items-center flex items-center flex-auto   border border-gray-300 p-2'
											>
												<Checkbox
													inputId={evt.id.toString() + evt.createdAt}
													name='expenseClients'
													value={evt}
													onChange={onExpensesClienteChange}
													checked={selectedExpensesClient.some((item: any) => item.id === evt.id)}
												/>
												<label
													htmlFor={evt.id.toString() + evt.createdAt}
													className='ml-2'
												>
													${evt.amount} - {evt.description}
												</label>
											</div>
										))}
									</div>
								</div>
							)}

							{eventualityDetails.length > 0 && (
								<div className='my-4'>
									<h1 className='title-form mb-2'>Eventualidades</h1>
									<div className='eventualities-section flex flex-wrap items-center gap-y-2 gap-x-3'>
										{eventualityDetails.map((evt, index) => (
											<div
												key={evt.updatedAt + evt.description}
												className='align-items-center flex items-center flex-auto   border border-gray-300 p-2'
											>
												<Checkbox
													inputId={evt.updatedAt + evt.description}
													value={evt}
													name='eventuality'
													onChange={onEventualityChange}
													checked={selectedEventualities.some((item: any) => item.id === evt.id)}
												/>
												<label
													htmlFor={evt.updatedAt + evt.description}
													className='ml-2'
												>
													${evt.clientAmount} - {evt.description}
												</label>
											</div>
										))}
									</div>
								</div>
							)}
						</>
					) : (
						<Loading />
					)}
					<FieldsetGroup>
						<FieldsetGroup className='w-full sm:w-[50%]'>
							<fieldset>
								<label htmlFor='month'>Mes de pago</label>
								<Dropdown
									value={month || ''}
									placeholder='Elija un mes'
									filterPlaceholder='Busca mes'
									options={monthsInSpanish}
									onChange={(event: DropdownChangeEvent) => handleInputChange(event.value, 'month')}
									filter
									className='h-[42px] items-center !border-gray-200 shadow'
								/>
								{errors?.PaymentTypeId && <FormError text='El mes de pago es obligatorio.' />}
							</fieldset>
							<fieldset>
								<label htmlFor='year'>Año de pago</label>
								<Dropdown
									placeholder='Elija un año'
									value={year || ''}
									options={selectedYears()}
									onChange={(event: DropdownChangeEvent) => handleInputChange(event.value, 'year')}
									className='h-[42px] items-center !border-gray-200 shadow'
								/>
								{errors?.PaymentTypeId && <FormError text='El año de pago es obligatorio.' />}
							</fieldset>
						</FieldsetGroup>
						<FieldsetGroup className='w-full sm:w-[50%]'>
							<fieldset className=''>
								<label htmlFor='PaymentTypeId'>Formato de pago </label>
								<Dropdown
									value={PaymentTypeId}
									onChange={(e) => handleInputChange(e.value, 'PaymentTypeId')}
									options={paymentTypeQuery.data?.data}
									optionLabel='name'
									filterPlaceholder='Busca un formato de pago'
									optionValue='id'
									placeholder='elije una un formato de pago'
									filter
									className='h-[42px] items-center !border-gray-200 shadow'
								/>
								{errors?.PaymentTypeId && <FormError text='El formato de pago es obligatorio.' />}
							</fieldset>
						</FieldsetGroup>
					</FieldsetGroup>
					<FieldsetGroup>
						<FieldsetGroup className='w-full sm:w-[50%]'>
							<fieldset className=''>
								<label htmlFor=''>Total event.</label>
								<input
									placeholder='1234.90'
									type='number'
									disabled={true}
									value={eventTotal.current}
									onChange={(value) => {}}
								/>
							</fieldset>
							<fieldset className=''>
								<label htmlFor=''>Total impuestos</label>
								<input
									placeholder='1234.90'
									type='number'
									disabled={true}
									value={expsTotal.current}
									onChange={(value) => {}}
								/>
							</fieldset>
						</FieldsetGroup>
						<FieldsetGroup className='w-full sm:w-[50%]'>
							<fieldset className=''>
								<label htmlFor='rentingAmount'>Valor alquiler</label>
								<input
									placeholder='1234.90'
									type='number'
									disabled={true}
									value={rentingAmount || ''}
									onChange={() => {}}
								/>
								{/* {errors?.rentingAmount && <FormError text='EL formato de pago es obligatorio.' />} */}
							</fieldset>
							<fieldset className=''>
								<label htmlFor='total'>Total a cobrar</label>
								<input
									placeholder='1234.90'
									disabled={true}
									name='total'
									type='number'
									value={rentingAmount + eventTotal.current + expsTotal.current + recharge}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e.target.value, 'total')}
								/>
							</fieldset>
						</FieldsetGroup>
					</FieldsetGroup>
					<FieldsetGroup>
						<FieldsetGroup className='w-full sm:w-[50%]'>
							{/* <fieldset className=''>
							<label htmlFor='isRecharged'>Cobrar recargo (S/N)</label>
							<input
								type='checkbox'
								name='isRecharged'
								style={{ boxShadow: 'none' }}
								className='w-12 !border-none !ml-0 !pl-0'
								id='isRecharged'
							/>
						</fieldset> */}
							<fieldset className=''>
								<label htmlFor='total'>Días atrasados</label>

								<input
									placeholder='1234.90'
									name='qteDays'
									className='w-24'
									min={0}
									type='number'
									value={qteDays ?? ''}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
										// handleInputChange(e.target.value, 'qteDays')
										updateAll({
											...values,
											qteDays: Number(e.target.value),
											recharge: Number((Number(e.target.value) * dailyPunitive).toFixed(2)),
										})
									}}
								/>
							</fieldset>
							<fieldset className=''>
								<label htmlFor='recharge'>Totla recargo</label>
								<input
									placeholder='1234.90'
									disabled={true}
									name='total'
									type='number'
									value={Number((qteDays * dailyPunitive).toFixed(2))}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e.target.value, 'recharge')}
								/>
							</fieldset>
						</FieldsetGroup>
						<FieldsetGroup className='w-full sm:w-[50%]'></FieldsetGroup>
					</FieldsetGroup>

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

				{/* <div className='payment-pdf bg-gray-50 flex-1'>
						{expenseDetails.map((evt, index) => (
							<div
								key={index}
								className='align-items-center flex items-center flex-auto   border border-gray-300 p-2'
							>
								<Checkbox
									inputId={index.toString()}
									name='expenseClients'
									value={evt}
									onChange={onExpensesClienteChange}
									checked={selectedExpensesClient.some((item: any) => item.id === evt.id)}
								/>
								<label
									htmlFor={index.toString()}
									className='ml-2'
								>
									${evt.amount} - {evt.description}
								</label>
							</div>
						))}
					</div> */}
				{/* </div> */}
			</CreateModal>
		</div>
	)
}

export default ClientPayments