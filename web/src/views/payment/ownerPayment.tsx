import React, { useRef, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import Box from '../../components/Box'
import DeleteModal from '../../components/DeleteModal'
import Loading from '../../components/Loading'
import http from '../../api/axios'
import CreateModal from '../../components/CreateModal'
import CustomInput from '../../components/CustomInput'
import { useForm } from '../../hooks/useForm'
import FormError from '../../components/FormError'
import RequestError from '../../components/RequestError'
import { monthsInSpanish } from '../../helpers/variableAndConstantes'
import FieldsetGroup from '../../components/FieldsetGroup'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import { usePaymentTypes } from '../../hooks/usePaymentTypes'
import { Checkbox, CheckboxChangeEvent } from 'primereact/checkbox'
import { IClientExpensesResponseSimple, IClientExpItem } from '../../interfaces/clientExpenses'
import { IEventualitiesResponse, IEventuality } from '../../interfaces/Ieventualities'
import CloseOnClick from '../../components/CloseOnClick'
import { Idebt, IdebtsResponse } from '../../interfaces/IDebtsResponse'
import { IClienyPayment } from '../../interfaces/IclientPayments'
import { diffenceBetweenDates, formatDateDDMMYYYY, padTo2Digits, padToNDigit } from '../../helpers/date'
import { BsPrinter } from 'react-icons/bs'
import { TfiBackLeft } from 'react-icons/tfi'
import { useOwners } from '../../hooks/useOwners'
import { useOwnerPayments } from '../../hooks/userOwnerPayment'
import logoApp from '../../assets/images/logo.png'
// @ts-expect-error
import html2pdf from 'html2pdf.js'
import useShowAndHideModal from '../../hooks/useShowAndHideModal'
import { validateForm } from '../../helpers/form'
import RefreshData from '../../components/RefreshData'
import HeaderData from '../../components/HeaderData'
import { FilterMatchMode } from 'primereact/api'
import { EmptyData } from '../../components/EmptyData'
import FormActionBtns from '../../components/FormActionBtns'
const OwnerPayment = () => {
	const [showCreateModal, setShowCreateModal] = useState(false)
	const [show, setShow] = useState(false)
	const {
		OwnerId,
		PaymentTypeId,
		month,
		year,
		updateAll,
		total,
		values,
		handleInputChange,
		reset,
	} = useForm({
		OwnerId: null,
		PaymentTypeId: null,
		month: monthsInSpanish[new Date().getMonth()],
		year: new Date().getFullYear(),
		total: 0,
	})
	const [errors, setErrors] = useState<any>()
	const [editMode, setEditMode] = useState(false)
	const [selectedEventualities, setSelectedEventualities] = useState<IEventuality[]>([])
	const [selectedExpensesClient, setSelectedExpensesClient] = useState<IClientExpItem[]>([])
	const [selectedDebts, setSelectedDebts] = useState<Idebt[]>([])
	const { showAndHideModal } = useShowAndHideModal()

	const [savingOrUpdating, setSavingOrUpdating] = useState(false)
	const eventTotal = useRef(0)
	const expsTotal = useRef(0)
	const debtsTotal = useRef(0)
	const currentPayment = useRef<IClienyPayment | null>()
	const [expenseDetails, setExpenseDetails] = useState<IClientExpItem[]>([])
	const [eventualityDetails, setEventualityDetails] = useState<IEventuality[][]>([])
	const [debts, setDebts] = useState<Idebt[]>([])
	const [loadingPdf, setLoadingPdf] = useState(false)
	const [downloadPdf, setDownloadPdf] = useState(false)
	const [upToDate, setUpToDate] = useState(false)

	const [contractRows, setContractRows] = useState<any[]>([])
	const [globalFilterValue, setGlobalFilterValue] = useState('')
	const [filters, setFilters] = useState({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
		month: { value: null, matchMode: FilterMatchMode.CONTAINS },
		year: { value: null, matchMode: FilterMatchMode.CONTAINS },
		'Contract.Property.street': { value: null, matchMode: FilterMatchMode.CONTAINS }
	})
	const ownerPaymentQuery = useOwnerPayments()
	const { data, isError, isLoading, error, isFetching } = useOwners()
	const [loadingExpenses, setLoadingExpenses] = useState(false)
	// const contractQuery = useContracts()
	const paymentTypeQuery = usePaymentTypes()

	const edit = (data: IClienyPayment) => {
		// handleInputChange(data.name, 'name')
		setShowCreateModal(true)
		setEditMode(true)
		currentPayment.current = data
	}

	const ConfirmDestroy = (data: IClienyPayment) => {
		setShow(!show)
		currentPayment.current = data
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
			const res = await http.delete('/payment-owners/' + id)
			if (res.data.ok) {
				ownerPaymentQuery.data?.data && (ownerPaymentQuery.data.data! = ownerPaymentQuery.data?.data.filter((z) => z.id !== id))
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
		values.total = eventTotal.current + expsTotal.current + debtsTotal.current
		const { error, ok } = validateForm({ ...values })
		setErrors(error)
		if (!ok) return false
		// return
		// @ts-expect-error
		values.OwnerId = values.OwnerId!.id
		try {
			setSavingOrUpdating(true)

			const res = await http.post('/payment-owners', {
				...values,
				expenseDetails: [...selectedExpensesClient, ...selectedDebts],
				eventualityDetails: selectedEventualities,
			})
			if (res.data.ok) {
				ownerPaymentQuery.refetch()
				reset()
				// setShowCreateModal(false)
				closeCreateModal()
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

	const closeCreateModal = () => {
		reset()
		setSelectedEventualities([])
		setSelectedExpensesClient([])
		setSelectedDebts([])

		setEventualityDetails([])
		setExpenseDetails([])
		setDebts([])

		setContractRows([])

		eventTotal.current = 0
		expsTotal.current = 0
		debtsTotal.current = 0

		setShowCreateModal(false)
		setErrors({})
	}

	const actionBodyTemplate = (rowData: any) => {
		return (
			<div className='flex gap-x-3 items-center justify-center'>
				<BsPrinter title='Imprimir comprobante' size={22} onClick={() => printPdf(rowData)} />
				{/* <EditIcon action={() => edit(rowData)} /> */}
				<TfiBackLeft title='Revertir cobro' size={23} onClick={() => ConfirmDestroy(rowData)} />
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
		eventTotal.current = _selectedEvents.reduce((acc: any, cur: any) => acc + cur.ownerAmount, 0)
		setSelectedEventualities(_selectedEvents)
	}
	const onDebtsChanges = (e: CheckboxChangeEvent) => {
		let _selectedExps = [...selectedDebts]
		if (e.checked) _selectedExps.push(e.value)
		else _selectedExps = _selectedExps.filter((evt) => evt.id !== e.value.id)
		debtsTotal.current = _selectedExps.reduce((acc: any, cur: any) => acc + cur.amount, 0)
		setSelectedDebts(_selectedExps)
	}

	const handleChangeOwner = async (e: DropdownChangeEvent) => {
		setUpToDate(false)
		setLoadingExpenses(true)
		reset()
		setSelectedEventualities([])
		setSelectedExpensesClient([])
		setSelectedDebts([])

		setEventualityDetails([])
		setExpenseDetails([])
		setDebts([])

		setContractRows([])

		eventTotal.current = 0
		expsTotal.current = 0
		debtsTotal.current = 0
		// get alll contract owner first
		updateAll({
			...values,
			OwnerId: e.value,
		})


		// validate if the contract has a payment for the current month
		try {
			const res = await http.get(`/payment-owners?OwnerId=${e.value.id}&month=${month}&year=${year}&include=true`)
			if (res.data.results > 0) {
				setUpToDate(true)
				updateAll({
					...values,
					OwnerId: e.value,
					total: 0,
				})
				// return
			}
		} catch (error) {
			showAndHideModal('Error', 'Error al intentar validar si el contrato ya tiene cobro para el mes y ano actual', 'red')
		} finally { setLoadingExpenses(false) }

		try {

			const ownerContracts = await http.get(`contracts/owner/${e.value.id}/all`)
			ownerContracts.data.data.map(async (contract: any) => {

				console.log(contract)


				const docsExpss = http.get<IClientExpensesResponseSimple>(`/owner-expenses?ContractId=${contract.id}&include=true`)
				const docsEventss = http.get<IEventualitiesResponse>(`/eventualities?ownerPaid=0&PropertyId=${contract.PropertyId}&include=true`)
				const docsDebtss = http.get<IdebtsResponse>(`/debt-owners?paid=0&ContractId=${contract.id}`)

				const [docsExps, docsEvents, docsDebts] = await Promise.all([docsExpss, docsEventss, docsDebtss])
				setContractRows(prev => [...prev, {

					expenseDetails: [
						{
							amount: contract.PriceHistorials[contract.PriceHistorials?.length - 1]?.amount,
							description: 'ALQUILER ' + contract?.Property?.street + ' ' + contract?.Property?.number + ' ' + contract?.Property?.floor + '-' + contract?.Property?.dept + ' ' + month + '/' + year,
							id: Number(Math.floor(Math.random() * 100000).toFixed(0) + contract.id.toFixed(0) + new Date().getTime().toFixed(0)),
							ContractId: contract.id,
							createdAt: new Date().toISOString(),
							updatedAt: new Date().toISOString(),
						},
						{
							amount: - (contract.PriceHistorials[contract.PriceHistorials?.length - 1]?.amount * e.value.commision / 100),
							description: 'HONORARIOS ' + contract?.Property?.street + ' ' + contract?.Property?.number + ' ' + contract?.Property?.floor + '-' + contract?.Property?.dept + ' ' + month + '/' + year,
							id: Number(Math.floor(Math.random() * 10000).toFixed(0) + contract.id.toFixed(0) + new Date().getTime().toFixed(0)),
							ContractId: contract.id,
							createdAt: new Date().toISOString(),
							updatedAt: new Date().toISOString(),
						},
						// ...docsExps.data.data.map((d) => ({ ...d, description: d.description + ' ' + month + '/' + year })),
						...docsExps.data.data.filter((d) => {
							if (d.description !== 'AGUAS' && d.description !== 'API') {
								return { ...d, description: d.description + ' ' + month + '/' + year }
							} else {
								if (d.description === 'AGUAS' && ((new Date().getMonth() + 1) % 2) === 0) {
									return { ...d, description: d.description + ' ' + month + '/' + year }
								}
								if (d.description === 'API' && ((new Date().getMonth() + 1) % 2) !== 0) {
									return { ...d, description: d.description + ' ' + month + '/' + year }
								}
							}
						})
					],
					eventualityDetails: docsEvents.data.data,
					debts: docsDebts.data.data,
					contract: contract,
				}]);
			})
		} catch (error) { }
		finally { setLoadingExpenses(false) }
	}

	const printPdf = async (data: IClienyPayment) => {
		currentPayment.current = data

		let pd: any = {};
		data.eventualityDetails.map((d) => {
			if (pd.hasOwnProperty(d.ContractId)) {
				pd[d.ContractId] = [...pd[d.ContractId], d]
			} else {
				pd[d.ContractId] = [d]

			}
		})
		data.expenseDetails.map((d) => {
			if (pd.hasOwnProperty(d.ContractId)) {
				pd[d.ContractId] = [...pd[d.ContractId], d]
			} else {
				pd[d.ContractId] = [d]
			}
		})
		currentPayment.current!.printData = Object.values(pd)

		setDownloadPdf(true)
	}
	const closePrintPdfModal = () => {
		setDownloadPdf(false)
		currentPayment.current = null
	}
	const handleDownloadPdf = async () => {
		setLoadingPdf(true)
		var element = document.getElementById('pdf-download');

		var opt = {
			margin: [.1, .1],
			filename: `${currentPayment.current?.Owner!.fullName}_${currentPayment.current?.month}_${currentPayment.current?.year}_${formatDateDDMMYYYY(new Date().toISOString())}.pdf`,
			image: { type: 'png', quality: 0.98 },
			html2canvas: { scale: 2 },
			jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
		};
		try {
			await html2pdf().from(element).set(opt).save();
			closePrintPdfModal()
		} catch (error) {
			console.log(error)
		} finally {
			setLoadingPdf(false)
		}
	}

	const openCreateOrEditModel = () => {
		setEditMode(false)
		currentPayment.current = null
		setShowCreateModal(true)
	}
	if (ownerPaymentQuery.isLoading) return <Loading />
	if (ownerPaymentQuery.isError) return <RequestError error={ownerPaymentQuery.error} />
	return (
		<div className='container m-auto  flexsm:mx-0  flex-col justify-center sm:justify-center'>
			<HeaderData action={openCreateOrEditModel} text='Pago a propietario' />
			{ownerPaymentQuery?.data?.data.length > 0 ? (
				<>
					<CustomInput
						onChange={(val) => onGlobalFilterChange(val)}
						className=' w-auto mx-2 sm:mx-0 sm:w-96'
						initialValue={globalFilterValue}
						placeholder='Buscar cobro'
						type='search'
					/>
					<Box className='!p-0 !overflow-hidden !border-none sm:mx-0   mb-4 '>
						<DataTable
							size='small'
							emptyMessage='Aún no hay cobro'
							className='!overflow-hidden   !border-none'
							value={ownerPaymentQuery?.data?.data}
							dataKey='id'
							responsiveLayout='scroll'
						// paginator
						// rows={10}
						// paginatorTemplate='FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink'
						// currentPageReportTemplate='{first} al {last} de {totalRecords}'
						// paginatorLeft={<RefreshData action={ownerPaymentQuery.refetch} />}
						>
							<Column
								field='Owner.fullName'
								body={(data) => (
									<span>
										{data.Owner?.fullName} {data.Owner?.cuit}
									</span>
								)}
								header='Propietario'
								headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
								className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
								sortable
							/>
							<Column
								field='month'
								body={(data) => (<span>{data.month}/{data.year}</span>)}
								header='Periodo'
								headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
								className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
								sortable
							/>
							<Column
								field='createdAt'
								body={(data) => <span>{formatDateDDMMYYYY(data.createdAt)}</span>}
								header='Fecha de Cobro'
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
				<EmptyData text='Aún no hay pago' />
			)}

			{ownerPaymentQuery.isFetching && (<Loading h={40} w={40} />)}

			<DeleteModal
				savingOrUpdating={savingOrUpdating}
				show={show}
				setShow={setShow}
				destroy={() => destroy(currentPayment.current?.id!)}
				text={`El cobro de  ${currentPayment.current?.Owner!.fullName} ${currentPayment.current?.month} - ${currentPayment.current?.year}`}
			/>

			<CreateModal
				show={showCreateModal}
				closeModal={closeCreateModal}
				overlayClick={false}
				// className='shadow-none border-0 w-full sm:w-[640px] md:w-[768px] lg:w-[1024px] !p-3'
				titleText={'Pagos'}
			// overlayBackground={localStorage.theme === 'light' ? 'rgb(227 227 227)' : 'rgb(15 23 42)'}
			>
				<CloseOnClick action={closeCreateModal} />
				<div className='flex justify-between w-full flex-col md:flex-row gap-x-6 mt-3'>
					<form
						onSubmit={handleSave}
						// bg-gray-100 p-2 rounded-md shadow-xl
						className='w-full sm:w-[600px] '
					>
						<FieldsetGroup>
							<fieldset>
								<label htmlFor='OwnerId'>Propietario</label>
								<Dropdown
									value={OwnerId}
									onChange={handleChangeOwner}
									options={data?.data}
									optionLabel='fullName'
									filterBy='fullName,cuit'
									filterPlaceholder='Busca propietario por nombre o cuit'
									optionValue=''
									placeholder='elije un propietario'
									filter
									valueTemplate={(data, props) => !data ? props.placeholder : <span>{data.fullName} | {data.cuit}</span>}
									itemTemplate={(data) => (<span>{data.fullName} | {data.cuit}</span>)}
									className='h-[42px] items-center !border-gray-200 shadow '
								/>
								{errors?.OwnerId && <FormError text='El propietario es obligatoria.' />}
							</fieldset>
						</FieldsetGroup>
						{
							(upToDate && OwnerId) && (
								<div className="text-green-500 dark:text-green-400 text-center my-2">
									{/* @ts-ignore */}
									El propietario  {OwnerId.fullName}  ya cobro el mes de {month} - {year}
								</div>
							)
						}
						{!loadingExpenses ? (

							<div className='flex flex-col gap-y-4 mt-4'>
								{
									contractRows.map((contract, l) => (
										<div key={l} className="bg-gray-50 shadow-sm border border-gray-300 dark:border-slate-700 dark:bg-slate-900 p-2">
											<h2 className='font-semibold text-lg mb-3'>
												{contract.contract.Property.street} {contract.contract.Property.number} {contract.contract.Property.floor}-{contract.contract.Property.dept} | {contract.contract.Client.fullName}
											</h2>
											{contract.expenseDetails?.length > 0 && (
												<div className=''>
													<h1 className='title-form mb-2'>Alquiler y Gastos propietarios</h1>
													<div className='eventualities-section flex flex-wrap items-center gap-y-2 gap-x-3'>
														{contract.expenseDetails.map((evt: any, index: any) => (
															<div
																key={evt.id.toString() + evt.createdAt + index + evt.amount + evt.description}
																className='align-items-center flex items-center flex-wrap   border border-gray-300 dark:border-slate-700 p-2'
															>
																<Checkbox
																	inputId={evt.id.toString() + evt.createdAt + index + evt.amount + evt.description}
																	name='expenseClients'
																	value={evt}
																	onChange={onExpensesClienteChange}
																	checked={selectedExpensesClient.some((item: any) => item.id === evt.id)}
																/>
																<label
																	htmlFor={evt.id.toString() + evt.createdAt + index + evt.amount + evt.description}
																	className='ml-2'
																>
																	${evt.amount} - {evt.description}
																</label>
															</div>
														))}
													</div>
												</div>
											)}

											{contract.eventualityDetails?.length > 0 && (
												<div className='my-4'>
													<h1 className='title-form mb-2'>Eventualidades</h1>
													<div className="eventualities-section  flex flex-wrap   items-center gap-y-2  gap-x-3">
														{contract.eventualityDetails.map((evt: any, index: any) => (
															<div
																key={evt.updatedAt + evt.description + index + evt.ownerAmount + evt.description}
																className='align-items-center flex items-center flex-wrap   border border-gray-300 dark:border-slate-700 p-2'
															>
																<Checkbox
																	inputId={evt.updatedAt + evt.description + index + evt.ownerAmount + evt.description}
																	value={evt}
																	name='eventuality'
																	onChange={onEventualityChange}
																	checked={selectedEventualities.some((item: any) => item.id === evt.id)}
																/>
																<label
																	htmlFor={evt.updatedAt + evt.description + index + evt.ownerAmount + evt.description}
																	className='ml-2'
																>
																	${evt.ownerAmount} - {evt.description}
																</label>
															</div>
														))}
													</div>
												</div>
											)}

											{contract.debts?.length > 0 && (
												<div className='my-4'>
													<h1 className='title-form mb-2'>Deudas anteriores</h1>
													<div className='eventualities-section flex flex-wrap items-center gap-y-2 gap-x-3'>
														{contract.debts.map((evt: any, index: any) => (
															<div
																key={evt.updatedAt + evt.id + index + evt.amount + evt.description}
																className={`align-items-center flex items-center  flex-wrap border border-gray-300 dark:border-slate-700 p-1 ${diffenceBetweenDates(evt.year + '-' + padTo2Digits(evt.month) + '-10', new Date().toString()) > 70 ? ' !border-red-500 dark:!border-red-400' : ''}`}
															>
																<Checkbox
																	inputId={evt.updatedAt + evt.id + index + evt.amount + evt.description}
																	value={evt}
																	name='debtsProperties'
																	onChange={onDebtsChanges}
																	checked={selectedDebts.some((item: any) => item.id === evt.id)}
																/>
																<label
																	htmlFor={evt.updatedAt + evt.id + index + evt.amount + evt.description}
																	className='ml-2 '
																>
																	<span className=''>
																		${evt.amount} {evt.description}
																	</span>
																</label>
															</div>
														))}
													</div>
												</div>
											)}


										</div>
									))
								}

							</div>
						) : (
							<Loading />
						)}
						<FieldsetGroup>
							<FieldsetGroup className='w-full sm:w-[50%]'>
								<CustomInput
									initialValue={month || ''}
									placeholder=''
									label='Mes'
									onChange={() => { }}
									required
									disabled
									hasError={errors?.month}
									errorText='El mes de pago es obligatorio.'
								/>
								<CustomInput
									initialValue={year || ''}
									placeholder=''
									label='Año'
									onChange={() => { }}
									required
									disabled
									hasError={errors?.year}
									errorText='El año de pago es obligatorio.'
								/>
							</FieldsetGroup>
							<FieldsetGroup className='w-full sm:w-[50%]'>
								<fieldset className=''>
									<label htmlFor='PaymentTypeId'>Forma de pago </label>
									<Dropdown
										value={PaymentTypeId}
										onChange={(e) => handleInputChange(e.value, 'PaymentTypeId')}
										options={paymentTypeQuery.data?.data}
										optionLabel='name'
										filterPlaceholder='Busca forma de pago'
										optionValue='id'
										placeholder='elije  forma de pago'
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
										onChange={() => { }}
									/>
								</fieldset>
								<fieldset className=''>
									<label htmlFor=''>Total impuestos</label>
									<input
										placeholder='1234.90'
										type='number'
										disabled={true}
										value={expsTotal.current + debtsTotal.current}
										onChange={() => { }}
									/>
								</fieldset>
							</FieldsetGroup>
							<FieldsetGroup className='w-full sm:w-[50%]'>
								<fieldset className=''>
									<label htmlFor='total'>Total a cobrar</label>
									<input
										placeholder='1234.90'
										disabled={true}
										name='total'
										type='number'
										value={eventTotal.current + expsTotal.current + debtsTotal.current}
										onChange={() => { }}
									/>
								</fieldset>
							</FieldsetGroup>
						</FieldsetGroup>
						<FormActionBtns savingOrUpdating={savingOrUpdating} onClose={closeCreateModal} />
					</form>
					{
						OwnerId && (
							<Box className="shadow-md rounded-lg border mx-0  border-gray-200 dark:!from-gray-700 dark:!to-gray-800 dark:!bg-gradient-to-tr p-2">
								<h3 className='font-bold mb-2 text-lg '>Lista de conceptos a pagar</h3>
								<div className="flex justify-between flex-col min-h-[300px] h-[95%]">

									<div className='payment-pdf  pt-4 flex-1 gap-y-1 flex flex-col px-1'>
										{selectedExpensesClient.map((evt, index) => (
											<div
												key={index}
												className='align-items-center uppercase text-sm  flex gap-x-3 items-center  justify-between    border-gray-300'
											>
												<span className=''>{evt.description}</span>
												<span>${evt.amount}</span>

											</div>
										))}
										{selectedEventualities.map((evt, index) => (
											<div
												key={index}
												className='align-items-center uppercase text-sm  flex gap-x-3 items-center  justify-between    border-gray-300'
											>
												<span className=''>{evt.description}</span>
												<span>${evt.ownerAmount}</span>

											</div>
										))}
										{selectedDebts.map((evt, index) => (
											<div
												key={index}
												className='align-items-center uppercase text-sm  flex gap-x-3 items-center  justify-between    border-gray-300'
											>
												<span className=''>{evt.description}</span>
												<span>${evt.amount}</span>

											</div>
										))}


									</div>
									<div className="mt-auto">
										<div
											className='align-items-center font-bold uppercase text-sm mt-3 flex gap-x-3 items-center  justify-between    border-gray-300'
										>
											<span className=''>Total a pagar </span>
											<span>${eventTotal.current + expsTotal.current + debtsTotal.current}</span>
										</div>
									</div>
								</div>

							</Box>
						)
					}
				</div>
			</CreateModal>

			<CreateModal
				show={downloadPdf}
				closeModal={closePrintPdfModal}
				overlayClick={false}
				// className='shadow-none border-0 w-full sm:w-[640px] md:w-[768px] lg:w-[1024px] !p-3'
				titleText={`Recibo de ${currentPayment.current?.month} - ${currentPayment.current?.year}`}
			// overlayBackground={localStorage.theme === 'light' ? 'rgb(227 227 227)' : 'rgb(15 23 42)'}
			>
				<CloseOnClick action={closePrintPdfModal} />

				<Box className="!shadow-none rounded-lg !p-2 !border-none  border-gray-200 dark:!from-gray-700 dark:!to-gray-800 dark:!bg-gradient-to-tr mt-3">
					<div id='pdf-download' className="flex gap-x-2 ">

						{
							[1, 2].map((pdf, index) => (
								<div key={index} className="flex  justify-between flex-col border border-gray-200 dark:border-slate-600 p-1  h-[95%] w-[500px]">
									<div className="header-pdf flex justify-between items-center border border-gray-200 dark:border-slate-600  p-2">
										<div className="left w-[50%] flex items-center flex-col gap-y-2">
											<div className='logo-app flex items-center'>
												<img
													width={100}
													className='min-w-[100px] object-cover'
													src={logoApp}
													alt='LOGO CENTRO'
												/>
											</div>
											<div className="flex flex-col items-center">
												<span className="text-lg font-semibold uppercase">Centro</span>
												<span className="text-md font-semibold ">Administracion de  </span>
												<span className="text-sm font-semibold ">Consorcios y Propiedades</span>
											</div>

										</div>
										<div className="right w-[50%] ">
											<div className="flex flex-col items-center text-xs">
												<span>Alquileres - Ventas - Tasaciones</span>
												<span>San Martin 1514  Tel: 4483280</span>
												<span>2000 - Rosario - Santa Fe </span>
												<span>inmobilaria@centro.com.ar</span>
												<span>www.centro.com.ar</span>
												<div className="">
													<span className='flex gap-x-2'>
														<span>Rosario</span>
														<span>{formatDateDDMMYYYY(new Date().toISOString())}</span>
													</span>
												</div>
											</div>
										</div>
									</div>
									<div className="client-data border text-xs border-gray-200 dark:border-slate-600  my-2 p-2 flex ">
										<div className="flex flex-col gap-y-2 flex-1">
											<span>
												<span className="font-semibold">Propietario: </span>
												<span>{currentPayment.current?.Owner!.fullName}</span>
											</span>
											<span>
												<span className="font-semibold">Domicilio: </span>
												<span>{currentPayment.current?.Owner!.address}</span>
											</span>
										</div>
										<div className="w-30  flex gap-x-4">
											<div className="">

												{/* <div>C {currentPayment.current?.Contract.Property.folderNumber} </div> */}

												<div className="">
													<span className='flex gap-x-2'>
														<span>Recibo</span>
														<span className=''>#{padToNDigit(currentPayment.current?.id || 0, 4)}</span>
													</span>
												</div>
											</div>
											{/* <div className='flex flex-col font-semibold items-center'>
												<span>Vencimiento</span>
												<span>
													del contrato
												</span>
												<span>
													{formatDateDDMMYYYY(currentPayment.current?.Contract.endDate!)}
												</span>
											</div> */}
										</div>
									</div>

									<div className='payment-pdf mb-2   flex-1 gap-y-2 flex flex-col '>

										{currentPayment.current?.printData.map((con: any, index: any) => (
											<div key={index} className=" border border-gray-200 p-2">
												{
													con.map((evt: any, k: any) => (
														<div
															key={k}
															className='align-items-center uppercase text-xs  flex gap-x-3 items-center  justify-between dark:border-slate-600     border-gray-300'
														>
															<span className=''>{evt.description}</span>
															<span>${evt.amount ? evt.amount : evt.ownerAmount}</span>
														</div>
													))
												}

											</div>
										))}


									</div>
									<div className="mt-auto p-2  border border-gray-200 dark:border-slate-600 ">
										<div
											className='align-items-center font-semibold uppercase text-xs  flex gap-x-3 items-center  justify-between dark:border-slate-600     border-gray-300'
										>
											<span className=''>Total a pagar </span>
											<span className=''>$ {currentPayment.current?.total}</span>

										</div>
										<div className="sign-aclaration my-1">
											<div className="sign my-2">
												<span>Firma : </span>
											</div>
											<div className="">
												<span>Aclaración : </span>
											</div>
										</div>
									</div>
								</div>
							))
						}
					</div>
					<div className="flex gap-x-2">
						<button className='btn sec  !my-4' disabled={loadingPdf} onClick={closePrintPdfModal}> Cancelar </button>
						<button className='btn gradient  !my-4' disabled={loadingPdf} onClick={handleDownloadPdf}> {loadingPdf ? 'Descargando ... ' : 'Descargar recibo'} </button>
					</div>
				</Box>
			</CreateModal>
		</div>
	)
}

export default OwnerPayment

