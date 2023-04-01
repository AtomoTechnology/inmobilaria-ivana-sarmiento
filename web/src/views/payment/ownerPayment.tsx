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
import { Idebt, IdebtsResponse } from '../../interfaces/IDebtsResponse'
import { IClienyPayment } from '../../interfaces/IclientPayments'
import { IConfigResponse } from '../../interfaces/Iconfig'
import { diffenceBetweenDates, formatDate, formatDateDDMMYYYY, padTo2Digits, padToNDigit } from '../../helpers/date'
import { Button } from 'primereact/button'
import { BsPrinter, BsSkipBackward } from 'react-icons/bs'
import { TfiBackLeft } from 'react-icons/tfi'
import { useProperties } from '../../hooks/useProperties'
import { useOwners } from '../../hooks/useOwners'
import { useOwnerPayments } from '../../hooks/userOwnerPayment'
import logoApp from '../../assets/images/logo.png'
// @ts-expect-error
import html2pdf from 'html2pdf.js'
const OwnerPayment = () => {
	const { showAlert, hideAlert } = useContext(AuthContext)
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
	const [to, setTo] = useState<any>()
	const [selectedEventualities, setSelectedEventualities] = useState<IEventuality[]>([])
	const [selectedExpensesClient, setSelectedExpensesClient] = useState<IClientExpItem[]>([])
	const [selectedDebts, setSelectedDebts] = useState<Idebt[]>([])

	const eventTotal = useRef(0)
	const expsTotal = useRef(0)
	const currentPayment = useRef<IClienyPayment | null>()
	const [expenseDetails, setExpenseDetails] = useState<IClientExpItem[]>([])
	const [eventualityDetails, setEventualityDetails] = useState<IEventuality[][]>([])
	const [debts, setDebts] = useState<Idebt[]>([])
	const [paymentItems, setPaymentItems] = useState<any>({})
	const [loadingPdf, setLoadingPdf] = useState(false)
	const [downloadPdf, setDownloadPdf] = useState(false)
	const [printData, setPrintData] = useState<any[]>([])

	const [contractRows, setContractRows] = useState<any[]>([])

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
			const res = await http.delete('/payment-owners/' + id)
			if (res.data.ok) {
				data?.data && (data.data! = data?.data.filter((z) => z.id !== id)) // TODO: fix this refecth new items
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
		if (!OwnerId) {
			ok = false
			error.OwnerId = true
		}
		if (!month) {
			ok = false
			error.month = true
		}
		if (!year) {
			ok = false
			error.year = true
		}
		if (!PaymentTypeId) {
			ok = false
			error.PaymentTypeId = true
		}
		setErrors(error)
		return ok
	}

	const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		values.total = eventTotal.current + expsTotal.current
		// console.log({ ...values, expenseDetails: selectedExpensesClient, eventualityDetails: selectedEventualities })
		// return
		if (verifyForm()) {
			if (editMode) {
				// @ts-expect-error
				values.OwnerId = values.OwnerId!.id
				try {
					const res = await http.put(`/payment-owners/${currentPayment.current?.id}`, {
						...values,
						expenseDetails: selectedExpensesClient,
						eventualityDetails: selectedEventualities,
					})
					if (res.data.ok) {
						// data?.data &&
						// 	(data.data = data?.data.map((z) => {
						// 		if (z.id === currentPayment.current?.id) {
						// 			// z.name = values.name
						// 		}
						// 		return z
						// 	}))
						ownerPaymentQuery.refetch()
						reset()
						// setShowCreateModal(false)
						closeCreateModal()

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
				values.OwnerId = values.OwnerId!.id
				try {
					const res = await http.post('/payment-owners', {
						...values,
						expenseDetails: selectedExpensesClient,
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
				}
			}
		}
	}

	const closeCreateModal = () => {
		reset()
		setSelectedEventualities([])
		setSelectedExpensesClient([])
		setEventualityDetails([])
		setExpenseDetails([])
		setDebts([])
		eventTotal.current = 0
		expsTotal.current = 0
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
		let o: any = {}
		if (e.checked) _selectedExps.push(e.value)
		else _selectedExps = _selectedExps.filter((evt) => evt.id !== e.value.id)

		expsTotal.current = _selectedExps.reduce((acc: any, cur: any) => acc + cur.amount, 0)
		_selectedExps.forEach((exp) => {
			console.log('existe ::: ', o.hasOwnProperty(exp.ContractId))
			if (o.hasOwnProperty(exp.ContractId)) {
				console.log('o completo ::: ', o)
				console.log('contratcid : ', exp.ContractId, ' prev. valor ::: ', o[exp.ContractId])
				o[exp.ContractId] = o[exp.ContractId].concat(exp)
			} else {

				o[exp.ContractId] = [exp]
			}
		})
		console.log(o)
		setPaymentItems(o)
		setSelectedExpensesClient(_selectedExps)

	}
	const onEventualityChange = (e: CheckboxChangeEvent) => {
		let _selectedEvents = [...selectedEventualities]
		let o: any = {}
		if (e.checked) _selectedEvents.push(e.value)
		else _selectedEvents = _selectedEvents.filter((evt) => evt.id !== e.value.id)

		_selectedEvents.forEach((evt) => {
			console.log(paymentItems.hasOwnProperty(evt.ContractId))
			if (paymentItems.hasOwnProperty(evt.ContractId)) {
				console.log('FIRST ::: ', paymentItems[evt.ContractId])
				console.log('SECONDE ::: ', _selectedEvents.filter((ev) => ev.ContractId === evt.ContractId))
				paymentItems[evt.ContractId] = [...paymentItems[evt.ContractId].filter((ev: any) => ev.ContractId === evt.ContractId)]
			} else {
				paymentItems[evt.ContractId] = [evt]
			}
		})
		eventTotal.current = _selectedEvents.reduce((acc: any, cur: any) => acc + cur.ownerAmount, 0)
		// setPaymentItems((prev: any) => ({ ...prev, ...o }))
		// console.log(_selectedEvents)
		setSelectedEventualities(_selectedEvents)
	}

	const handleChangeOwner = async (e: DropdownChangeEvent) => {
		// alert('ffdg')
		console.log(e.value)
		setLoadingExpenses(true)
		reset()
		setSelectedEventualities([])
		setSelectedExpensesClient([])
		setEventualityDetails([])

		setContractRows([])
		eventTotal.current = 0
		expsTotal.current = 0
		// get alll contract owner first
		updateAll({
			...values,
			OwnerId: e.value,
		})

		try {

			const ownerContracts = await http.get(`contracts/owner/${e.value.id}/all`)
			// console.log(ownerContracts.data.data)
			ownerContracts.data.data.map(async (contract: any) => {


				const docsExpss = http.get<IClientExpensesResponseSimple>(`/owner-expenses?amount=0:gt&ContractId=${contract.id}&include=true`)
				const docsEventss = http.get<IEventualitiesResponse>(`/eventualities?ownerPaid=0&ContractId=${contract.id}&include=true`)
				const docsDebtss = http.get<IdebtsResponse>(`/debt-owners?paid=0&ContractId=${contract.id}`)
				// const dps = http.get<IConfigResponse>(`/config?key=dailypunitive`)

				const [docsExps, docsEvents, docsDebts] = await Promise.all([docsExpss, docsEventss, docsDebtss])
				setContractRows(prev => [...prev, {

					expenseDetails: [{
						amount: contract.PriceHistorials[contract.PriceHistorials?.length - 1]?.amount - (contract.PriceHistorials[contract.PriceHistorials?.length - 1]?.amount * e.value.commision / 100),
						description: 'ALQUILER ' + contract?.Property?.street + ' ' + contract?.Property?.number + ' ' + contract?.Property?.floor + '-' + contract?.Property?.dept,
						id: new Date().getTime(),
						ContractId: contract.id,
						createdAt: new Date().toISOString(),
						updatedAt: new Date().toISOString(),
					}, ...docsExps.data.data],
					eventualityDetails: docsEvents.data.data,
					debts: docsDebts.data.data,
					contract: contract,
				}]);
				// rows.push({
				// 	expenseDetails: docsExps.data.data,
				// 	eventualityDetails: docsEvents.data.data,
				// 	debts: docsDebts.data.data,
				// 	contract: contract,
				// })

				// setEventualityDetails(prev => [...prev, docsEvents.data.data])
				// setExpenseDetails(docsExps.data.data)
				// setDebts(docsDebts.data.data)
				// docsDebts.data.data.map((d) => {
				// 	if (d.rent) {
				// 		let qtyDay = diffenceBetweenDates(d.year + '-' + padTo2Digits(d.month) + '-10', new Date().toString())
				// 		console.log('alq : ', e.value.PriceHistorials[e.value.PriceHistorials.length - 1]?.amount, qtyDay, d.year + '-' + padTo2Digits(d.month) + '-10', new Date().toISOString())
				// 		setDebts((debts) => [...debts,
				// 		{
				// 			...d,
				// 			description: 'RECARGO ' + d.description,
				// 			amount: Number((qtyDay * e.value.PriceHistorials[e.value.PriceHistorials.length - 1]?.amount * (Number(dp.data.data[0].value) / 100)).toFixed(2)),
				// 			createdAt: (new Date().getTime().toString()),
				// 			rent: false,
				// 			id: new Date().getTime(),
				// 			recharge: true
				// 		}
				// 		])

				// 		console.log(d)
				// 	}
				// })
				// updateAll({
				// 	...values,
				// 	rentingAmount: e.value.PriceHistorials[e.value.PriceHistorials?.length - 1]?.amount,
				// 	ContractId: e.value,
				// })
				// let day = new Date().getDate()
				// if (day > 10) {
				// 	let qte = day - 10
				// 	console.log(qte * e.value.PriceHistorials[e.value.PriceHistorials.length - 1]?.amount * (Number(dp.data.data[0].value) / 100))
				// 	updateAll({
				// 		...values,
				// 		recharge: Number(
				// 			(qte * e.value.PriceHistorials[e.value.PriceHistorials.length - 1]?.amount * (Number(dp.data.data[0].value) / 100)).toFixed(2)
				// 		),
				// 		qteDays: qte,
				// 		rentingAmount: e.value.PriceHistorials[e.value.PriceHistorials.length - 1]?.amount,
				// 		ContractId: e.value,
				// 		dailyPunitive: e.value.PriceHistorials[e.value.PriceHistorials.length - 1]?.amount * (Number(dp.data.data[0].value) / 100),
				// 	})
				// } else {
				// 	updateAll({
				// 		...values,
				// 		rentingAmount: e.value.PriceHistorials[e.value.PriceHistorials.length - 1]?.amount,
				// 		ContractId: e.value,
				// 	})
				// }
			})
		} catch (error) { }
		finally {
			console.log('ROWSSSS ::: ', contractRows)
			setLoadingExpenses(false)
		}
	}
	const paginatorLeft = (
		<Button
			onClick={() => ownerPaymentQuery.refetch()}
			type='button'
			icon='pi pi-refresh'
			text
		/>
	)
	const printPdf = async (data: IClienyPayment) => {
		// console.log(data)
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

		// console.log(pd.va)
		// console.log(Object.values(pd))
		setPrintData(Object.values(pd))
		console.log(currentPayment.current)
		currentPayment.current!.printData = Object.values(pd)
		console.log(currentPayment.current)
		// data.expenseDetails
		// return
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
			// image: { type: 'jpeg', quality: 0.98 },
			html2canvas: { scale: 2 },
			jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
		};
		try {

			await html2pdf().from(element).set(opt).save();
		} catch (error) {
			console.log(error)
		} finally {
			setLoadingPdf(false)
		}
	}
	// @ts-ignore

	console.log('PAYMENT ITEMS ::: ', paymentItems)
	if (ownerPaymentQuery.isLoading) return <Loading />
	if (ownerPaymentQuery.isError) return <RequestError error={ownerPaymentQuery.error} />
	// console.log(values)
	return (
		<div className='container m-auto  flexsm:mx-0  flex-col justify-center sm:justify-center'>
			<div className='flex gap-x-4 mb-6 mx-4  items-center justify-between sm:justify-start'>
				<h3 className='font-bold  text-slate-700 dark:text-slate-500 text-lg sm:text-4xl'>Pago a propietario</h3>
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
			{ownerPaymentQuery?.data?.data.length > 0 ? (
				<>
					<Box className='!p-0 !overflow-hidden !border-none !mx-4    mb-4 '>
						<DataTable
							size='small'
							emptyMessage='Aún no hay cobro'
							className='!overflow-hidden   !border-none'
							value={ownerPaymentQuery?.data?.data}
							dataKey='id'
							responsiveLayout='scroll'
							paginator
							rows={10}
							paginatorTemplate='FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink'
							currentPageReportTemplate='{first} al {last} de {totalRecords}'
							paginatorLeft={paginatorLeft}
						>
							<Column
								field='Owner.fullName'
								body={(data) => (
									<span>
										{data.Owner.fullName} {data.Owner.cuit}
									</span>
								)}
								header='Propietario'
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
								field='createdAt'
								body={(data) => <span>{formatDate(data.createdAt)}</span>}
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
				<div className='text-slate-400 mx-3 text-center'>Aún no hay Cobro.</div>
			)}

			{ownerPaymentQuery.isFetching && (<Loading h={40} w={40} />)}

			<DeleteModal
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
				overlayBackground={localStorage.theme === 'light' ? 'rgb(227 227 227)' : 'rgb(15 23 42)'}
			>
				<div className='flex justify-between f-full gap-x-6 mt-3'>
					<form
						action=''
						onSubmit={handleSave}
						// bg-gray-100 p-2 rounded-md shadow-xl
						className=' w-[600px] '
					>
						<CloseOnClick action={closeCreateModal} />
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

						{!loadingExpenses ? (

							<div className='flex flex-col gap-y-4'>
								{
									contractRows.map((contract, l) => (
										<div key={l} className="bg-gray-100 dark:bg-slate-900 p-2">
											<h2 className='font-semibold text-lg mb-3'>
												{contract.contract.Property.street} {contract.contract.Property.number} {contract.contract.Property.floor}-{contract.contract.Property.dept} | {contract.contract.Client.fullName}
											</h2>
											{contract.expenseDetails?.length > 0 && (
												<div className=''>
													<h1 className='title-form mb-2'>Gastos inquilino</h1>
													<div className='eventualities-section flex flex-wrap items-center gap-y-2 gap-x-3'>
														{contract.expenseDetails.map((evt: any, index: any) => (
															<div
																key={evt.id.toString() + evt.createdAt}
																className='align-items-center flex items-center flex-auto   border border-gray-300 dark:border-slate-700 p-2'
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

											{contract.eventualityDetails?.length > 0 && (
												<div className='my-4'>
													<h1 className='title-form mb-2'>Eventualidades</h1>
													<div className="eventualities-section  flex flex-wrap   items-center gap-y-2  gap-x-3">
														{contract.eventualityDetails.map((evt: any, index: any) => (
															<div
																key={evt.updatedAt + evt.description}
																className='align-items-center flex items-center flex-auto   border border-gray-300 dark:border-slate-700 p-2'
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
																key={evt.updatedAt + evt.id}
																className={`align-items-center flex items-center  flex-wrap border border-gray-300 dark:border-slate-700 p-1 ${diffenceBetweenDates(evt.year + '-' + padTo2Digits(evt.month) + '-10', new Date().toString()) > 70 ? ' !border-red-500' : ''}`}
															>
																<Checkbox
																	inputId={evt.updatedAt + evt.id}
																	value={evt}
																	name='expenseClients'
																	onChange={onExpensesClienteChange}
																	checked={selectedExpensesClient.some((item: any) => item.id === evt.id)}
																/>
																<label
																	htmlFor={evt.updatedAt + evt.id}
																	className='ml-2 '
																>
																	<span className=''>
																		{evt.description} $ {evt.amount}
																	</span>
																	{/* <span className='flex  gap-x-1'>
														{evt.expenseDetails.map((ev) => (
															<span className='border border-gray-400 px-1  w-fit'>
																{ev.description} - ${ev.amount}
															</span>
														))}
													</span> */}
																	{/* <span className='border bg-blue-800 text-white px-1  w-fit'>
														Total a pagar : ${evt.total}
													</span> */}
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
									{errors?.month && <FormError text='El mes de pago es obligatorio.' />}
								</fieldset>
								<fieldset>
									<label htmlFor='year'>Año de pago</label>
									<Dropdown
										placeholder='Elija un año'
										value={year || ''}
										options={selectedYears}
										onChange={(event: DropdownChangeEvent) => handleInputChange(event.value, 'year')}
										className='h-[42px] items-center !border-gray-200 shadow'
									/>
									{errors?.year && <FormError text='El año de pago es obligatorio.' />}
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
										onChange={() => { }}
									/>
								</fieldset>
								<fieldset className=''>
									<label htmlFor=''>Total impuestos</label>
									<input
										placeholder='1234.90'
										type='number'
										disabled={true}
										value={expsTotal.current}
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
										value={eventTotal.current + expsTotal.current}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e.target.value, 'total')}
									/>
								</fieldset>
							</FieldsetGroup>
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

					{
						OwnerId && (
							<Box className="shadow-md rounded-lg border border-gray-200 dark:!from-gray-700 dark:!to-gray-800 dark:!bg-gradient-to-tr p-2">
								<h3 className='font-bold mb-2 text-lg '>Lista de conceptos a pagar</h3>
								<div className="flex justify-between flex-col  h-[95%]">

									<div className='payment-pdf  pt-4 flex-1 gap-y-1 flex flex-col px-1'>

										{selectedExpensesClient.map((evt, index) => (
											<div
												key={index}
												className='align-items-center uppercase text-sm  flex gap-x-3 items-center  justify-between    border-gray-300'
											>
												<span className=''>{evt.description + ' ' + month + '  ' + year.toString()}</span>
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
											className='align-items-center font-bold uppercase text-sm  flex gap-x-3 items-center  justify-between    border-gray-300'
										>
											<span className=''>Total a pagar </span>
											<span>${eventTotal.current + expsTotal.current}</span>
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
				overlayBackground={localStorage.theme === 'light' ? 'rgb(227 227 227)' : 'rgb(15 23 42)'}
			>
				<CloseOnClick action={closePrintPdfModal} />

				<Box className="!shadow-none rounded-lg !p-2 !border-none  border-gray-200 dark:!from-gray-700 dark:!to-gray-800 dark:!bg-gradient-to-tr mt-3">
					<div id='pdf-download' className="flex gap-x-2 ">
						{
							[1, 2].map((pdf, index) => (
								<div key={index} className="flex justify-between flex-col border border-gray-200 dark:border-slate-600 p-1  h-[95%] w-[500px]">
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
											<div className=" border border-gray-200 p-2">
												{
													con.map((evt: any, k: any) => (
														<div
															key={k}
															className='align-items-center uppercase text-sm  flex gap-x-3 items-center  justify-between dark:border-slate-600     border-gray-300'
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
											className='align-items-center font-semibold uppercase text-sm  flex gap-x-3 items-center  justify-between dark:border-slate-600     border-gray-300'
										>
											<span className=''>Total a pagar </span>
											<span className=''>${currentPayment.current?.total}</span>

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

// ? TODO:: print pdf - https://www.npmjs.com/package/react-to-print - revert payment functionality
