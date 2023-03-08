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
import { DelayAlertToHide } from '../../helpers/variableAndConstantes'
import FieldsetGroup from '../../components/FieldsetGroup'
import { Dropdown } from 'primereact/dropdown'
import { useContracts } from '../../hooks/useContracts'
import { usePaymentTypes } from '../../hooks/usePaymentTypes'
import { Checkbox, CheckboxChangeEvent } from 'primereact/checkbox'

const Payments = () => {
	const { showAlert, hideAlert } = useContext(AuthContext)
	const [showCreateModal, setShowCreateModal] = useState(false)
	const [show, setShow] = useState(false)
	const {
		ContractId,
		PaymentTypeId,
		admExpenses,
		water,
		TGI,
		compensation,
		bankingExpenses,
		recharge,
		total,
		totalPro,
		insurance,
		values,
		handleInputChange,
		reset,

		extraExpenses,
	} = useForm({
		extraExpenses: 0,
		ContractId: null,
		PaymentTypeId: null,
		admExpenses: 0,
		water: 0,
		TGI: 0,
		compensation: 0,
		bankingExpenses: 0,
		recharge: 0,
		total: 0,
		totalPro: 0,
		insurance: 0,
	})
	const [errors, setErrors] = useState<any>()
	const [editMode, setEditMode] = useState(false)
	const [to, setTo] = useState<any>()
	const [selectedEventualities, setSelectedEventualities] = useState<any>([])
	const eventTotal = useRef(0)
	const currentZone = useRef<Izone | null>()

	const { data, isError, isLoading, error, isFetching } = useZones()
	const contractQuery = useContracts()
	const paymentTypeQuery = usePaymentTypes()

	const edit = (data: Izone) => {
		// handleInputChange(data.name, 'name')
		setShowCreateModal(true)
		setEditMode(true)
		currentZone.current = data
	}

	const ConfirmDestroy = (data: Izone) => {
		setShow(!show)
		currentZone.current = data
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
			const res = await http.delete('/zones/' + id)
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
		if (verifyForm()) {
			if (editMode) {
				try {
					const res = await http.put(`/zones/${currentZone.current?.id}`, values)
					if (res.data.ok) {
						data?.data &&
							(data.data = data?.data.map((z) => {
								if (z.id === currentZone.current?.id) {
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
				try {
					const res = await http.post('/zones', values)
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

	const evv = [
		{
			id: 1,
			amount: 1234,
			description: 'Reparación de algo',
		},
		{
			id: 2,
			amount: 1679,
			description: 'Compra y venta de caño',
		},
	]
	const onCategoryChange = (e: CheckboxChangeEvent) => {
		let _selectedCategories = [...selectedEventualities]

		if (e.checked) _selectedCategories.push(e.value)
		else _selectedCategories = _selectedCategories.filter((evt) => evt.id !== e.value.id)
		eventTotal.current = _selectedCategories.reduce((acc: any, cur: any) => acc + cur.amount, 0)
		setSelectedEventualities(_selectedCategories)
	}
	if (isLoading) return <Loading />
	if (isError) return <RequestError error={error} />

	return (
		<div className='container m-auto  flexsm:mx-0  flex-col justify-center sm:justify-center'>
			<div className='flex gap-x-4 mb-6 mx-4  items-center justify-between sm:justify-start'>
				<h3 className='font-bold  text-slate-700 dark:text-slate-500 text-lg sm:text-4xl'>Cobros</h3>
				<button
					onClick={() => {
						setEditMode(false)
						currentZone.current = null
						setShowCreateModal(true)
					}}
					className='btn !w-10 !h-10 !p-0 gradient !rounded-full'
				>
					<MdAdd size={50} />
				</button>
			</div>
			{data.data.length > 0 ? (
				<>
					<Box className='!p-0 !overflow-hidden !border-none !mx-4   sm:w-[500px] mb-4 '>
						<DataTable
							size='small'
							emptyMessage='Aún no hay zona'
							className='!overflow-hidden   !border-none'
							value={[]}
							dataKey='id'
							responsiveLayout='scroll'
						>
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
				<div className='text-slate-400 mx-3 text-center'>Aún no hay zona.</div>
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
				destroy={() => destroy(currentZone.current?.id!)}
				text={`${currentZone.current?.name}`}
			/>

			<CreateModal
				show={showCreateModal}
				closeModal={closeCreateModal}
				overlayClick={false}
				className='max-w-[700px] w-fit sm:w-[650px]'
				titleText={'Cobros'}
			>
				<form
					action=''
					onSubmit={handleSave}
				>
					<FieldsetGroup>
						<fieldset className=''>
							<label htmlFor='ZoneId'>Contrato</label>
							<Dropdown
								value={ContractId}
								onChange={(e) => handleInputChange(e.value, 'ContractId')}
								options={contractQuery.data?.data}
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
								optionValue='id'
								placeholder='elije contrato'
								filter
								className='h-[42px] items-center !border-gray-200 shadow '
							/>
							{errors?.ContractId && <FormError text='El contrato es obligatorio.' />}
						</fieldset>
					</FieldsetGroup>
					<div className='eventualities-section flex items-center gap-x-4'>
						{evv.map((evt, index) => (
							<div
								key={index}
								className='align-items-center flex items-center   border border-gray-300 p-2'
							>
								<Checkbox
									inputId={index.toString()}
									name='eventuality'
									value={evt}
									onChange={onCategoryChange}
									checked={selectedEventualities.some((item: any) => item.id === evt.id)}
								/>
								<label
									htmlFor={index.toString()}
									className='ml-2'
								>
									{evt.amount} - {evt.description}
								</label>
							</div>
						))}
					</div>
					<FieldsetGroup>
						<fieldset className=''>
							<label htmlFor='insurance'>Seguro</label>
							<CustomInput
								placeholder='1234.90'
								type='number'
								initialValue={insurance || ''}
								onChange={(value) => handleInputChange(value, 'insurance')}
							/>
							{/* {errors?.water && <FormError text='EL formato de pago es obligatorio.' />} */}
						</fieldset>

						<fieldset className=''>
							<label htmlFor='admExpenses'>Gastos Adm</label>
							<CustomInput
								placeholder='1234.90'
								type='number'
								initialValue={admExpenses || ''}
								onChange={(value) => handleInputChange(value, 'admExpenses')}
							/>
							{errors?.admExpenses && <FormError text='EL formato de pago es obligatorio.' />}
						</fieldset>
					</FieldsetGroup>
					<FieldsetGroup>
						<fieldset className=''>
							<label htmlFor='water'>Aguas</label>
							<CustomInput
								placeholder='1234.90'
								type='number'
								initialValue={water || ''}
								onChange={(value) => handleInputChange(value, 'water')}
							/>
							{/* {errors?.water && <FormError text='EL formato de pago es obligatorio.' />} */}
						</fieldset>
						<fieldset className=''>
							<label htmlFor='TGI'>TGI</label>
							<CustomInput
								placeholder='1234.90'
								type='number'
								initialValue={TGI || ''}
								onChange={(value) => handleInputChange(value, 'TGI')}
							/>
							{/* {errors?.TGI && <FormError text='EL formato de pago es obligatorio.' />} */}
						</fieldset>
					</FieldsetGroup>
					<FieldsetGroup>
						<fieldset className=''>
							<label htmlFor='compensation'>Compensación</label>
							<CustomInput
								placeholder='1234.90'
								type='number'
								initialValue={compensation || ''}
								onChange={(value) => handleInputChange(value, 'compensation')}
							/>
							{/* {errors?.compensation && <FormError text='EL formato de pago es obligatorio.' />} */}
						</fieldset>
						<fieldset className=''>
							<label htmlFor='recharge'>Recargo</label>
							<CustomInput
								placeholder='1234.90'
								type='number'
								initialValue={recharge || ''}
								onChange={(value) => handleInputChange(value, 'recharge')}
							/>
							{/* {errors?.TGI && <FormError text='EL formato de pago es obligatorio.' />} */}
						</fieldset>
					</FieldsetGroup>
					<FieldsetGroup>
						<fieldset className=''>
							<label htmlFor='bankingExpenses'>Gastos bancario</label>
							<CustomInput
								placeholder='1234.90'
								type='number'
								initialValue={bankingExpenses || ''}
								onChange={(value) => handleInputChange(value, 'bankingExpenses')}
							/>
							{/* {errors?.bankingExpenses && <FormError text='EL formato de pago es obligatorio.' />} */}
						</fieldset>
						<fieldset className=''>
							<label htmlFor='total'>Total</label>
							<CustomInput
								placeholder='1234.90'
								type='number'
								initialValue={total || ''}
								onChange={(value) => handleInputChange(value, 'total')}
							/>
							{/* {errors?.TGI && <FormError text='EL formato de pago es obligatorio.' />} */}
						</fieldset>
					</FieldsetGroup>
					<FieldsetGroup>
						<fieldset className=''>
							<label htmlFor=''>Eventualidades</label>
							<input
								placeholder='1234.90'
								type='number'
								disabled={true}
								value={eventTotal.current}
								// initialValue={ selectedEventualidades. }
								onChange={(value) => handleInputChange(value, 'total')}
							/>
							{/* {errors?.TGI && <FormError text='EL formato de pago es obligatorio.' />} */}
						</fieldset>
						<fieldset className=''>
							<label htmlFor='extraExpenses'>Expensas extra</label>
							<CustomInput
								placeholder='1234.90'
								type='number'
								initialValue={extraExpenses || ''}
								onChange={(value) => handleInputChange(value, 'extraExpenses')}
							/>
							{/* {errors?.TGI && <FormError text='EL formato de pago es obligatorio.' />} */}
						</fieldset>
					</FieldsetGroup>
					<FieldsetGroup>
						<fieldset className=''>
							<label htmlFor='totalPro'>Total Propietario</label>
							<CustomInput
								placeholder='1234.90'
								type='number'
								initialValue={totalPro || ''}
								onChange={(value) => handleInputChange(value, 'totalPro')}
							/>
							{/* {errors?.TGI && <FormError text='EL formato de pago es obligatorio.' />} */}
						</fieldset>

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
							{errors?.PaymentTypeId && <FormError text='EL formato de pago es obligatorio.' />}
						</fieldset>
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
			</CreateModal>
		</div>
	)
}

export default Payments
