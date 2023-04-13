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
import { useContracts } from '../../hooks/useContracts'
import { usePaymentTypes } from '../../hooks/usePaymentTypes'
import { Checkbox, CheckboxChangeEvent } from 'primereact/checkbox'
import { IClientExpensesResponseSimple, IClientExpItem } from '../../interfaces/clientExpenses'
import { IEventualitiesResponse, IEventuality } from '../../interfaces/Ieventualities'
import CloseOnClick from '../../components/CloseOnClick'
import { useClientPayments } from '../../hooks/useClientPayments'
import { Idebt, IdebtsResponse } from '../../interfaces/IDebtsResponse'
import { IClienyPayment } from '../../interfaces/IclientPayments'
import { IConfigResponse } from '../../interfaces/Iconfig'
import { diffenceBetweenDates, formatDateDDMMYYYY, padTo2Digits, padToNDigit } from '../../helpers/date'
import { BsPrinter } from 'react-icons/bs'
import { TfiBackLeft } from 'react-icons/tfi'
import { FiAlertTriangle } from 'react-icons/fi'
import logoApp from '../../assets/images/logo.png'
// @ts-expect-error
import html2pdf from 'html2pdf.js'
import useShowAndHideModal from '../../hooks/useShowAndHideModal'
import { validateForm } from '../../helpers/form'
import HeaderData from '../../components/HeaderData'
import RefreshData from '../../components/RefreshData'
import { EmptyData } from '../../components/EmptyData'
import { FilterMatchMode } from 'primereact/api'
import FormActionBtns from '../../components/FormActionBtns'
const ClientPayments = () => {

	const [showCreateModal, setShowCreateModal] = useState(false)
	const [downloadPdf, setDownloadPdf] = useState(false)
	const [show, setShow] = useState(false)
	const {
		ContractId,
		PaymentTypeId,
		recharge,
		rentingAmount,
		month,
		year,
		paidTotal,
		updateAll,
		total,
		values,
		qteDays,
		handleInputChange,
		reset,
		dailyPunitive,
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
		dailyPunitive: 0,
		paidTotal: 0,
	})
	const { showAndHideModal } = useShowAndHideModal()
	const [savingOrUpdating, setSavingOrUpdating] = useState(false)
	const [errors, setErrors] = useState<any>()
	const [editMode, setEditMode] = useState(false)
	const [selectedEventualities, setSelectedEventualities] = useState<IEventuality[]>([])
	const [selectedExpensesClient, setSelectedExpensesClient] = useState<IClientExpItem[]>([])
	const [selectedDebts, setSelectedDebts] = useState<Idebt[]>([])
	const [upToDate, setUpToDate] = useState(false)
	const [twoYearsWithoutPrice, setTwoYearsWithoutPrice] = useState(false)
	const [threeYearsWithoutPrice, setThreeYearsWithoutPrice] = useState(false)

	const eventTotal = useRef(0)
	const expsTotal = useRef(0)
	const debtsTotal = useRef(0)
	const currentPayment = useRef<IClienyPayment | null>()
	const [expenseDetails, setExpenseDetails] = useState<IClientExpItem[]>([])
	const [eventualityDetails, setEventualityDetails] = useState<IEventuality[]>([])
	const [debts, setDebts] = useState<Idebt[]>([])
	const [loadingPdf, setLoadingPdf] = useState(false)
	const [globalFilterValue, setGlobalFilterValue] = useState('')
	const [filters, setFilters] = useState({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
		month: { value: null, matchMode: FilterMatchMode.CONTAINS },
		year: { value: null, matchMode: FilterMatchMode.CONTAINS },
		'Contract.Property.street': { value: null, matchMode: FilterMatchMode.CONTAINS }
	})
	const clientPaymentQuery = useClientPayments()
	const { data, } = useContracts()
	const [loadingExpenses, setLoadingExpenses] = useState(false)
	const paymentTypeQuery = usePaymentTypes()


	const printPdf = async (data: IClienyPayment) => {
		currentPayment.current = data
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
			filename: `${currentPayment.current?.Contract.Client.fullName}_${currentPayment.current?.month}_${currentPayment.current?.year}_${formatDateDDMMYYYY(new Date().toISOString())}.pdf`,
			image: { type: 'png', quality: 0.98 },
			html2canvas: { scale: 2 },
			jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
		};
		try {
			await html2pdf().from(element).set(opt).save();
		} catch (error) {
			console.log(error)
		} finally {
			setLoadingPdf(false)
			closePrintPdfModal()
		}
	}

	const ConfirmDestroy = (data: IClienyPayment) => {
		setShow(!show)
		currentPayment.current = data
	}

	const destroy = async (id: number) => {
		try {
			setSavingOrUpdating(true)
			const res = await http.delete('/payment-clients/' + id)
			if (res.data.ok) {
				clientPaymentQuery.data?.data && (clientPaymentQuery.data.data! = clientPaymentQuery.data?.data.filter((z) => z.id !== id))
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
		values.total = eventTotal.current + expsTotal.current + debtsTotal.current + recharge
		const { error, ok } = validateForm({ ...values }, ['paidTotal', 'extraExpenses'])
		setErrors(error)
		if (!ok) return false

		// console.log({ ...values, expenseDetails: [...selectedExpensesClient, ...selectedDebts], eventualityDetails: selectedEventualities })
		// @ts-expect-error
		values.ContractId = values.ContractId!.id

		try {
			setSavingOrUpdating(true)
			const res = await http.post('/payment-clients', {
				...values,
				expenseDetails: [...selectedExpensesClient, ...selectedDebts],
				eventualityDetails: selectedEventualities,
			})
			if (res.data.ok) {
				clientPaymentQuery.refetch()
				reset()
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
		setUpToDate(false)
		setTwoYearsWithoutPrice(false)
		setThreeYearsWithoutPrice(false)
		reset()
		setSelectedEventualities([])
		setSelectedExpensesClient([])
		setEventualityDetails([])
		setExpenseDetails([])
		setDebts([])
		setSelectedDebts([])
		eventTotal.current = 0
		expsTotal.current = 0
		debtsTotal.current = 0
		setShowCreateModal(false)
		setErrors({})

	}

	const onGlobalFilterChange = (val: any) => {
		const value = val
		let _filters = { ...filters }
		_filters['global'].value = value
		setFilters(_filters)
		setGlobalFilterValue(value)
	}

	const actionBodyTemplate = (rowData: IClienyPayment) => {
		return (
			<div className='flex gap-x-3 items-center justify-center'>
				<BsPrinter title='Imprimir comprobante' size={22} onClick={() => printPdf(rowData)} />
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

	const onDebtsChanges = (e: CheckboxChangeEvent) => {
		let _selectedExps = [...selectedDebts]
		if (e.checked) _selectedExps.push(e.value)
		else _selectedExps = _selectedExps.filter((evt) => evt.id !== e.value.id)
		debtsTotal.current = _selectedExps.reduce((acc: any, cur: any) => acc + cur.amount, 0)
		setSelectedDebts(_selectedExps)
	}

	const onEventualityChange = (e: CheckboxChangeEvent) => {
		let _selectedEvents = [...selectedEventualities]
		if (e.checked) _selectedEvents.push(e.value)
		else _selectedEvents = _selectedEvents.filter((evt) => evt.id !== e.value.id)
		eventTotal.current = _selectedEvents.reduce((acc: any, cur: any) => acc + cur.clientAmount, 0)
		setSelectedEventualities(_selectedEvents)
	}

	const handleChangeContract = async (e: DropdownChangeEvent) => {

		setUpToDate(false)
		setTwoYearsWithoutPrice(false)
		setThreeYearsWithoutPrice(false)
		setSelectedEventualities([])
		setSelectedExpensesClient([])
		setEventualityDetails([])
		setExpenseDetails([])
		setDebts([])
		setSelectedDebts([])
		eventTotal.current = 0
		expsTotal.current = 0
		debtsTotal.current = 0

		if (e.value == undefined) {
			updateAll({ ...values, ContractId: null, })
			return
		}

		values.ContractId = e.value
		let daysFrom = diffenceBetweenDates(e.value.startDate, new Date().toISOString().slice(0, 10))
		if (daysFrom > 365 && daysFrom < 730) {
			if (e.value.PriceHistorials.length < 2) {
				setTwoYearsWithoutPrice(true)
				return
			}
		} else if (daysFrom > 730) {
			if (e.value.PriceHistorials.length < 3) {
				setThreeYearsWithoutPrice(true)
				return
			}
		}

		// validate if the contract has a payment for the current month
		try {
			setLoadingExpenses(true)
			const res = await http.get(`/payment-clients?Contractid=${e.value.id}&month=${month}&year=${year}&include=true`)
			if (res.data.results > 0) {
				setUpToDate(true)
				updateAll({
					...values,
					ContractId: e.value,
					rentingAmount: 0,
					total: 0,
					recharge: 0,
					qteDays: 0,
				})
				// return
			}
		} catch (error) {
			showAndHideModal('Error', 'Error al intentar validar si el contrato ya tiene cobro para el mes y ano actual', 'red')
		} finally { setLoadingExpenses(false) }

		try {
			setLoadingExpenses(true)
			const docsExpss = http.get<IClientExpensesResponseSimple>(`/client-expenses?amount=0:gt&ContractId=${e.value.id}&include=true`)
			const docsEventss = http.get<IEventualitiesResponse>(`/eventualities?clientPaid=0&ContractId=${e.value.id}&include=true`)
			const dps = http.get<IConfigResponse>(`/config?key=punitorio_diario`)
			const docsDebtss = http.get<IdebtsResponse>(`/debt-clients?paid=0&ContractId=${e.value.id}`)
			const [docsExps, docsEvents, dp, docsDebts] = await Promise.all([docsExpss, docsEventss, dps, docsDebtss])

			setEventualityDetails(docsEvents.data.data)
			setExpenseDetails([
				{
					ContractId: e.value.id,
					date: new Date().toISOString().slice(0, 10),
					updatedAt: new Date().toISOString(),
					deletedAt: null,
					description: 'ALQUILERES  ' + e.value.Property.street + ' ' + e.value?.Property?.number + ' ' + e.value?.Property?.floor + ' ' + e.value?.Property?.dept + ' ' + month + '/' + year,
					amount: e.value.PriceHistorials[e.value.PriceHistorials.length - 1]?.amount,
					createdAt: (new Date().getTime().toString()),
					// rent: true,
					id: Number(Math.floor(Math.random() * 10000).toFixed(0) + e.value.id.toFixed(0) + new Date().getTime().toFixed(0))
				},
				// {
				// 	ContractId: e.value.id,
				// 	date: new Date().toISOString().slice(0, 10),
				// 	updatedAt: new Date().toISOString(),
				// 	deletedAt: null,
				// 	description: 'PUNITORIOS  ' + ' ' + month + '/' + year,
				// 	amount: recharge,
				// 	createdAt: (new Date().getTime().toString()),
				// 	id: Number(Math.floor(Math.random() * 1000).toFixed(0) + e.value.id.toFixed(0) + new Date().getTime().toFixed(0))
				// },
				...docsExps.data.data.map((d) => ({ ...d, description: d.description + ' ' + month + '/' + year }))
			])

			setDebts(docsDebts.data.data)

			docsDebts.data.data.map((d) => {
				if (d.rent) {
					let qtyDay = diffenceBetweenDates(d.year + '-' + padTo2Digits(d.month) + '-05', new Date().toString())
					setDebts((debts) => [...debts,
					{
						...d,
						description: 'RECARGO ' + d.description,
						amount: Number((qtyDay * e.value.PriceHistorials[e.value.PriceHistorials.length - 1]?.amount * (Number(dp.data.data[0].value) / 100)).toFixed(2)),
						createdAt: (new Date().getTime().toString()),
						rent: false,
						id: Number(Math.floor(Math.random() * 10000).toFixed(0) + d.id.toFixed(0) + new Date().getTime().toFixed(0)),
						recharge: true
					}
					])
				}
			})
			let day = new Date().getDate()
			if (day > 5) {
				let qte = day - 5
				console.log(qte * e.value.PriceHistorials[e.value.PriceHistorials.length - 1]?.amount * (Number(dp.data.data[0].value) / 100))
				updateAll({
					...values,
					recharge: Number(
						(qte * e.value.PriceHistorials[e.value.PriceHistorials.length - 1]?.amount * (Number(dp.data.data[0].value) / 100)).toFixed(2)
					),
					qteDays: qte,
					rentingAmount: e.value.PriceHistorials[e.value.PriceHistorials.length - 1]?.amount,
					ContractId: e.value,
					dailyPunitive: e.value.PriceHistorials[e.value.PriceHistorials.length - 1]?.amount * (Number(dp.data.data[0].value) / 100),
				})
			} else {
				updateAll({
					...values,
					rentingAmount: e.value.PriceHistorials[e.value.PriceHistorials.length - 1]?.amount,
					ContractId: e.value,
				})
			}

		} catch (error) { }
		finally { setLoadingExpenses(false) }

	}

	const openCreateOrEditModel = () => {
		setEditMode(false)
		currentPayment.current = null
		setShowCreateModal(true)
	}

	if (clientPaymentQuery.isLoading) return <Loading />
	if (clientPaymentQuery.isError) return <RequestError error={clientPaymentQuery.error} />

	return (
		<div className='container m-auto  flexsm:mx-0  flex-col justify-center sm:justify-center'>
			<HeaderData action={openCreateOrEditModel} text='Cobro a Inquilino' />

			{clientPaymentQuery?.data?.data.length > 0 ? (
				<>
					<CustomInput
						onChange={(val) => onGlobalFilterChange(val)}
						className=' w-auto mx-2 sm:mx-0 sm:w-96'
						initialValue={globalFilterValue}
						placeholder='Buscar cobro'
						type='search'
					/>
					<Box className='!p-0 !overflow-hidden !border-none sm:mx-0    mb-4 '>
						<DataTable
							size='small'
							emptyMessage='Aún no hay cobro'
							className='!overflow-hidden   !border-none'
							value={clientPaymentQuery?.data?.data}
							dataKey='id'
							filters={filters}
							globalFilterFields={['month', 'year', 'Contract.Property.street']}
							responsiveLayout='scroll'
							paginator
							rows={10}
							paginatorTemplate='FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink'
							currentPageReportTemplate='{first} al {last} de {totalRecords}'
							paginatorLeft={<RefreshData action={clientPaymentQuery.refetch} />}
						>
							<Column
								field='Contract.Property.street'
								body={(data) => (
									<span>
										{data.Contract.Property.street} {data.Contract.Property.number} {data.Contract.Property.floor}{' '}
										{data.Contract.Property.dept}
									</span>
								)}
								header='Propiedad'
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
				<EmptyData text='Aún no hay Cobro' />
			)}

			{clientPaymentQuery.isFetching && (<Loading h={40} w={40} />)}

			<DeleteModal
				show={show}
				savingOrUpdating={savingOrUpdating}
				setShow={setShow}
				destroy={() => destroy(currentPayment.current?.id!)}
				text={`El cobro de ${currentPayment.current?.month} ${currentPayment.current?.Contract.Client.fullName} - ${currentPayment.current?.year}`}
			/>
			<CreateModal
				show={downloadPdf}
				closeModal={closePrintPdfModal}
				overlayClick={false}
				// className='shadow-none border-0 w-full sm:w-[640px] md:w-[768px] lg:w-[1024px] !p-3'
				titleText={`Recibo de ${currentPayment.current?.month} - ${currentPayment.current?.year}`}
				overlayBackground={localStorage.theme === 'light' ? 'rgb(227 227 227)' : 'rgb(15 23 42)'}
			>
				<CloseOnClick action={closePrintPdfModal} />

				<Box className="!shadow-none rounded-lg !p-2 !border-none  border-gray-200 dark:!from-gray-700 dark:!to-gray-800 dark:!bg-gradient-to-tr mt-3">
					<div id='pdf-download' className="flex gap-x-2 ">
						{
							[1, 2].map((pdf, index) => (
								<div key={index} className="flex justify-between flex-col border border-gray-200 dark:border-slate-600 p-1 text-xs  h-[95%] w-[500px]">
									<div className="header-pdf flex justify-between border border-gray-200 dark:border-slate-600  p-2">
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

												<span className="text-2xl font-semibold uppercase">Centro</span>
												<span className="text-md font-semibold ">Administracion de  </span>
												<span className="text-sm font-semibold ">Consorcios y Propiedades</span>
											</div>

										</div>
										<div className="right w-[50%] ">
											<div className="flex flex-col items-center text-sm">
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

									<div className="client-data border border-gray-200 dark:border-slate-600  my-2 p-2 flex ">
										<div className="flex flex-col gap-y-2 flex-1">
											<span>
												<span className="font-semibold">Inquilino: </span>
												<span>{currentPayment.current?.Contract.Client.fullName}</span>
											</span>
											<span>
												<span className="font-semibold">Domicilio: </span>
												<span>{currentPayment.current?.Contract.Client.address}</span>
											</span>
										</div>
										<div className="w-30  flex gap-x-4">
											<div className="">

												<div>C {currentPayment.current?.Contract.Property.folderNumber} </div>

												<div className="">
													<span className='flex gap-x-2'>
														<span>Recibo</span>
														<span className=''>#{padToNDigit(currentPayment.current?.id || 0, 4)}</span>
													</span>
												</div>
											</div>
											<div className='flex flex-col font-semibold items-center'>
												<span>Vencimiento</span>
												<span>
													del contrato
												</span>
												<span>
													{formatDateDDMMYYYY(currentPayment.current?.Contract.endDate!)}
												</span>
											</div>
										</div>
									</div>


									<div className='payment-pdf px-2  my-3 pt-4 flex-1 gap-y-1 flex flex-col '>
										{
											// currentPayment.current?.rentingAmount! > 0 && (
											// 	<div
											// 		className='align-items-center uppercase text-sm  flex gap-x-3 items-center dark:border-slate-600  justify-between    border-gray-300'
											// 	>
											// 		<span className=''>
											// 			{/*  @ts-ignore*/}
											// 			ALQUILER {currentPayment.current?.Contract?.Property?.street} {currentPayment.current?.Contract?.Property?.number}{' '}{currentPayment.current?.Contract?.Property?.floor}-{currentPayment.current?.Contract?.Property?.dept}  {currentPayment.current?.month}   {currentPayment.current?.year.toString()}</span>
											// 		<span>${currentPayment.current?.rentingAmount}</span>

											// 	</div>
											// )
										}


										{currentPayment.current?.expenseDetails.map((evt, index) => (
											<div
												key={index}
												className='align-items-center uppercase text-sm  flex gap-x-3 items-center  justify-between dark:border-slate-600     border-gray-300'
											>
												<span className=''>{evt.description}</span>
												<span>${evt.amount}</span>

											</div>
										))}
										{
											currentPayment.current?.recharge! > 0 && (
												<div
													className='align-items-center uppercase text-sm  flex gap-x-3 items-center  justify-between dark:border-slate-600    border-gray-300'
												>
													<span className=''>PUNITORIOS  {currentPayment.current?.month}   {currentPayment.current?.year.toString()}</span>
													<span>${currentPayment.current?.recharge}</span>
												</div>
											)
										}
										{currentPayment.current?.eventualityDetails.map((evt, index) => (
											<div
												key={index}
												className='align-items-center uppercase text-sm  flex gap-x-3 items-center  justify-between dark:border-slate-600     border-gray-300'
											>
												<span className=''>{evt.description}</span>
												<span>${evt.clientAmount}</span>

											</div>
										))}

									</div>
									<div className="mt-auto p-2  border border-gray-200 dark:border-slate-600 ">
										<div
											className='align-items-center font-semibold uppercase text-sm  flex gap-x-3 items-center  justify-between dark:border-slate-600     border-gray-300'
										>
											<span className=''>Total a cobrar </span>
											<span className=''>${currentPayment.current?.total}</span>

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

			<CreateModal
				show={showCreateModal}
				closeModal={closeCreateModal}
				overlayClick={false}
				// className='shadow-none border-0 w-full sm:w-[640px] md:w-[768px] lg:w-[1024px] !p-3'
				titleText={'Cobros'}
				overlayBackground={localStorage.theme === 'light' ? 'rgb(227 227 227)' : 'rgb(15 23 42)'}
			>
				<CloseOnClick action={closeCreateModal} />
				<div className='flex justify-between w-full flex-col md:flex-row gap-x-6 mt-3'>
					<form
						onSubmit={handleSave}
						// bg-gray-100 p-2 rounded-md shadow-xl
						className='w-full  sm:w-[600px] '
					>
						<FieldsetGroup>

							<fieldset>
								<label htmlFor='ContractId'>Contrato </label>
								<Dropdown
									value={ContractId}
									onChange={handleChangeContract}
									options={data?.data}
									optionLabel='street'
									showClear
									valueTemplate={(data, props) => !data ? props.placeholder : (<span> {data.Client.fullName} | {data.Property.street} {data.Property.number} {data.Property.floor}-{data.Property.dept} </span>)}
									itemTemplate={(data) => (<span> {data.Client.fullName} | {data.Property.street} {data.Property.number} {data.Property.floor}-{data.Property.dept} </span>)}
									filterBy='Client.fullName,Property.street,Property.number,Property.floor,Property.dept'
									// optionValue='id'
									placeholder='elije contrato'
									filter
									filterPlaceholder='Busca contrato'
									className='h-[42px] !w-full  items-center !border-gray-200 shadow '
								/>
								{errors?.ContractId && <FormError text='El contrato es obligatorio.' />}
							</fieldset>

						</FieldsetGroup>

						{
							(upToDate && ContractId) && (
								<div className="text-green-500 dark:text-green-400 text-center my-2">
									{/* @ts-ignore */}
									El contrato  {ContractId.Property.street!} {ContractId?.Property?.number} {ContractId?.Property?.floor}-{ContractId?.Property?.dept} ya pago el mes de {month} {year}
								</div>
							)
						}

						{
							twoYearsWithoutPrice && (
								<Box className="dark:!text-red-500 dark:!bg-red-100 text-center !p-2 !bg-red-200 mx-0 border-0 my-2 flex items-center gap-4 ">
									<FiAlertTriangle size={25} />
									El contrato no tiene precio cargado para el 2 año !
								</Box>
							)
						}
						{
							threeYearsWithoutPrice && (
								<Box className="dark:!text-red-500 dark:!bg-red-100 text-center !p-2 !bg-red-200 mx-0 border-0 my-2 flex items-center gap-4 ">
									<FiAlertTriangle size={25} />
									El contrato   no tiene precio cargado para el 3 año !
								</Box>
							)
						}

						{!loadingExpenses ? (
							<div className='mt-4'>
								{expenseDetails.length > 0 && (
									<div className=''>
										<h1 className='title-form mb-2'>Gastos inquilino</h1>
										<div className='eventualities-section flex flex-wrap items-center gap-y-2 gap-x-3'>
											{expenseDetails.map((evt, index) => (
												<div
													key={evt.id.toString() + evt.createdAt + index + evt.amount + evt.description}
													className='align-items-center flex items-center flex-wrap   border border-gray-300 dark:border-slate-500 p-2'
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
														${evt.amount} | {evt.description}
													</label>
												</div>
											))}
										</div>
									</div>
								)}

								{eventualityDetails.length > 0 && (
									<div className='my-4'>
										<h1 className='title-form mb-2'>Eventualidades</h1>
										<div className='eventualities-section flex flex-wrap  items-center gap-y-2 gap-x-3'>
											{eventualityDetails.map((evt, index) => (
												<div
													key={evt.updatedAt + evt.description + index + evt.id + evt.clientAmount}
													className='align-items-center flex items-center  flex-wrap   border border-gray-300 dark:border-slate-500 p-2'
												>
													<Checkbox
														inputId={evt.updatedAt + evt.description + index + evt.id + evt.clientAmount}
														value={evt}
														name='eventuality'
														onChange={onEventualityChange}
														checked={selectedEventualities.some((item: any) => item.id === evt.id)}
													/>
													<label
														htmlFor={evt.updatedAt + evt.description + index + evt.id + evt.clientAmount}
														className='ml-2'
													>
														${evt.clientAmount} | {evt.description}
													</label>
												</div>
											))}
										</div>
									</div>
								)}

								{debts.length > 0 && (
									<div className='my-4'>
										<h1 className='title-form mb-2'>Deudas anteriores</h1>
										<div className='eventualities-section flex flex-wrap  items-center gap-y-2 gap-x-3'>
											{debts.map((evt, index) => (
												<div
													key={evt.updatedAt + evt.id + evt.description + evt.amount + index}
													className={`align-items-center flex items-center  flex-wrap border border-gray-300 dark:border-slate-500 p-1 ${diffenceBetweenDates(evt.year + '-' + padTo2Digits(evt.month) + '-10', new Date().toString()) > 70 ? ' !border-red-500' : ''}`}
												>
													<Checkbox
														inputId={evt.updatedAt + evt.id + evt.description + evt.amount + index}
														value={evt}
														name='debtsClients'
														onChange={onDebtsChanges}
														checked={selectedDebts.some((item: any) => item.id === evt.id)}
													/>
													<label
														htmlFor={evt.updatedAt + evt.id + evt.description + evt.amount + index}
														className='ml-2 '
													>
														<span className=''>
															$ {evt.amount} |  {evt.description}
														</span>
													</label>
												</div>
											))}
										</div>
									</div>
								)}
							</div>
						) : (
							<Loading />
						)}
						<FieldsetGroup>
							<FieldsetGroup className='w-full sm:w-[50%] '>
								<CustomInput
									initialValue={month || ''}
									disabled={true}
									placeholder=''
									onChange={(v) => { }}
									label='Mes'
									required
									hasError={errors?.month}
									errorText='El mes de pago es obligatorio.'
								/>
								{/* <Dropdown
										value={month || ''}
										placeholder='Elija un mes'
										filterPlaceholder='Busca mes'
										options={monthsInSpanish}
										onChange={(event: DropdownChangeEvent) => handleInputChange(event.value, 'month')}
										filter
										className='h-[42px] items-center !border-gray-200 shadow'
									/> */}

								<CustomInput
									initialValue={year || ''}
									disabled={true}
									placeholder=''
									onChange={(v) => { }}
									label='Año'
									required
									hasError={errors?.year}
									errorText='El año de pago es obligatorio.'
								/>

							</FieldsetGroup>
							<FieldsetGroup className='w-full sm:w-[50%] '>
								<fieldset className=''>
									<label htmlFor='PaymentTypeId'>Forma de pago </label>
									<Dropdown
										value={PaymentTypeId}
										onChange={(e) => handleInputChange(e.value, 'PaymentTypeId')}
										options={paymentTypeQuery.data?.data}
										optionLabel='name'
										filterPlaceholder='Busca  forma de pago'
										optionValue='id'
										placeholder='elije forma de pago'
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
										onChange={(value) => { }}
									/>
								</fieldset>
								<fieldset className=''>
									<label htmlFor=''>Total Imp.</label>
									<input
										placeholder='1234.90'
										type='number'
										disabled={true}
										value={expsTotal.current + debtsTotal.current}
										onChange={(value) => { }}
									/>
								</fieldset>
							</FieldsetGroup>
							<FieldsetGroup className='w-full sm:w-[50%]'>
								<fieldset className=''>
									<label title='Cantidad de dias atrasados' htmlFor='total'>C.D.A</label>
									<input
										placeholder='1234.90'
										name='qteDays'
										className={`dark:!bg-gray-900 w-full sm:w-24 dark:text-slate-400 border !border-gray-300 dark:!border-slate-700 !shadow`}
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
									<label htmlFor='recharge'>Tot. recargo</label>
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
						</FieldsetGroup>
						<FieldsetGroup className=''>
							{/* <fieldset className=''>
								<label htmlFor='rentingAmount'>Valor alquiler</label>
								<input
									placeholder='1234.90'
									type='number'
									disabled={true}
									className={`dark:!bg-gray-900  dark:text-slate-400 border !border-gray-300 dark:!border-slate-700 !shadow`}
									value={rentingAmount ?? ''}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
										handleInputChange(Number(e.target.value), 'rentingAmount')
									}}
								/>
							</fieldset> */}
							<fieldset className=''>
								<label htmlFor='total'>Total a cobrar</label>
								<input
									placeholder='1234.90'
									disabled={true}
									name='total'
									type='number'
									value={eventTotal.current + expsTotal.current + debtsTotal.current + recharge}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e.target.value, 'total')}
								/>
							</fieldset>
							<CustomInput
								initialValue={paidTotal || ''}
								type='number'
								placeholder={(eventTotal.current + expsTotal.current + debtsTotal.current + recharge).toFixed()}
								onChange={(v) => { handleInputChange(Number(v), 'paidTotal') }}
								label='Total cobrado'
							/>
						</FieldsetGroup>
						<FormActionBtns savingOrUpdating={savingOrUpdating} onClose={closeCreateModal} />
					</form>

					{
						ContractId && (
							<Box className="shadow-md rounded-lg border mx-0  border-gray-200 dark:!from-gray-700 dark:!to-gray-800 dark:!bg-gradient-to-tr p-2">
								<h3 className='font-bold mb-2 text-lg '>Lista de conceptos a cobrar</h3>
								<div className="flex justify-between flex-col min-h-[300px] h-[95%]">

									<div className='payment-pdf  pt-4 flex-1 gap-y-1 flex flex-col px-1'>
										{
											// (upToDate && ContractId) && (
											// 	<div className="text-green-500 dark:text-green-400 text-center my-2">
											// 		{/* @ts-ignore */}
											// 		El contrato  {ContractId.Property.street!} {ContractId?.Property?.number} {ContractId?.Property?.floor}-{ContractId?.Property?.dept} ya pago el mes de {month} {year}
											// 	</div>
											// )
										}
										{
											// values.rentingAmount > 0 && (
											// 	<div
											// 		className='align-items-center uppercase text-sm  flex gap-x-3 items-center  justify-between    border-gray-300'
											// 	>
											// 		<span className=''>ALQUILER
											// 			{/* @ts-ignore */}
											// 			{ContractId?.Property?.street} {ContractId?.Property?.number}{' '}{ContractId?.Property?.floor}-{ContractId?.Property?.dept}  {month}   {year.toString()}</span>
											// 		<span>${rentingAmount}</span>

											// 	</div>
											// )
										}

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
												<span>${evt.clientAmount}</span>

											</div>
										))}
										{
											values.recharge > 0 && (
												<div
													className='align-items-center uppercase text-sm  flex gap-x-3 items-center  justify-between    border-gray-300'
												>
													<span className=''>PUNITORIOS  {month}   {year.toString()}</span>
													<span>${recharge}</span>

												</div>
											)
										}
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
											className='align-items-center uppercase text-sm  flex gap-x-3 items-center  justify-between  mt-3  border-gray-300'
										>
											<span className=''>Total a cobrar </span>
											<span>${eventTotal.current + expsTotal.current + debtsTotal.current + recharge}</span>

										</div>
									</div>
								</div>
							</Box>
						)
					}

				</div>
			</CreateModal>
		</div >
	)
}

export default ClientPayments

