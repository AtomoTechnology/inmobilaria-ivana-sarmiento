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
import { useVisits } from '../../hooks/useVisits'
import { IVisit } from '../../interfaces/IvisitsResponse'
import FieldsetGroup from '../../components/FieldsetGroup'
import { Dropdown } from 'primereact/dropdown'
import { useProperties } from '../../hooks/useProperties'
import { Button } from 'primereact/button'
import { formatDate, formatDateForInput } from '../../helpers/date'

const Visits = () => {
	const { showAlert, hideAlert } = useContext(AuthContext)
	const [showCreateModal, setShowCreateModal] = useState(false)
	const [show, setShow] = useState(false)
	const { date, phone, description, fullName, PropertyId, values, handleInputChange, reset, updateAll } = useForm({
		date: '',
		phone: '',
		description: '',
		fullName: '',
		PropertyId: 0 || {},
	})
	const [errors, setErrors] = useState<any>()
	const [editMode, setEditMode] = useState(false)
	const [to, setTo] = useState<any>()

	const currentVisit = useRef<IVisit | null>()

	const { data, isError, isLoading, error, isFetching, refetch } = useVisits()
	const propertyQuery = useProperties()

	const edit = (data: IVisit) => {
		data.PropertyId = data.Property!
		updateAll({ ...data, date: formatDateForInput(data.date) })
		setShowCreateModal(true)
		setEditMode(true)
		currentVisit.current = data
	}

	const ConfirmDestroy = (data: IVisit) => {
		setShow(!show)
		currentVisit.current = data
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
			const res = await http.delete('/visits/' + id)
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
		if (!date.trim().length) {
			ok = false
			error.date = true
		}
		if (!phone.trim().length) {
			ok = false
			error.phone = true
		}

		if (!fullName.trim().length) {
			ok = false
			error.fullName = true
		}
		if (!PropertyId) {
			ok = false
			error.PropertyId = true
		}
		setErrors(error)
		return ok
	}

	const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (verifyForm()) {
			if (editMode) {
				try {
					const res = await http.put(`/visits/${currentVisit.current?.id}`, {
						...values,
						// @ts-expect-error
						PropertyId: values.PropertyId.id,
					})
					if (res.data.ok) {
						data?.data &&
							(data.data = data?.data.map((z) => {
								if (z.id === currentVisit.current?.id) {
									// @ts-expect-error
									z = { ...values, Property: values.PropertyId, createdAt: '', updatedAt: '', deletedAt: null, id: 0 } // eslint-disable-line no-use-before-define
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
					const res = await http.post('/visits', { ...values, PropertyId: values.PropertyId.id }) // eslint-disable-line no-use-before-define
					if (res.data.ok) {
						data?.data.unshift({ ...res.data.data, Property: values.PropertyId })
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
		<div className='container m-auto  flexsm:mx-0  flex-col justify-center sm:justify-center'>
			<div className='flex gap-x-4 mb-6 mx-4  items-center justify-between sm:justify-start'>
				<h3 className='font-bold  text-slate-700 dark:text-slate-500 text-lg sm:text-4xl'>Visitas</h3>
				<button
					onClick={() => {
						setEditMode(false)
						currentVisit.current = null
						setShowCreateModal(true)
					}}
					className='btn !w-10 !h-10 !p-0 gradient !rounded-full'
				>
					<MdAdd size={50} />
				</button>
			</div>
			{data.data.length > 0 ? (
				<>
					<Box className='!p-0 !overflow-hidden !border-none !mx-4   sm:w-fit mb-4 '>
						<DataTable
							size='small'
							emptyMessage='Aún no hay visita'
							className='!overflow-hidden   !border-none'
							value={data?.data}
							dataKey='id'
							paginator
							rows={10}
							responsiveLayout='scroll'
							paginatorLeft={paginatorLeft}
							paginatorTemplate='FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink'
							currentPageReportTemplate='{first} al {last} de {totalRecords}'
						>
							<Column
								header='Dirección'
								body={(data) => (
									<span>
										{data.Property?.street} {data.Property?.number} {data.Property?.floor}-{data.Property?.dept}
									</span>
								)}
								headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
								className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
								sortable
							/>
							<Column
								field='fullName'
								header='Nombre'
								headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
								className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
								sortable
							/>
							<Column
								field='date'
								header='fecha'
								body={(data) => <span>{formatDate(data.date)}</span>}
								headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
								className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
								sortable
							/>
							<Column
								field='phone'
								header='Celular'
								headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
								className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
							/>
							<Column
								field='description'
								header='Nota'
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
				<div className='text-slate-400 mx-3 text-center'>Aún no hay visita.</div>
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
				destroy={() => destroy(currentVisit.current?.id!)}
				text={`${currentVisit.current?.fullName}`}
			/>

			<CreateModal
				show={showCreateModal}
				closeModal={closeCreateModal}
				overlayClick={false}
				className=''
				titleText={`${editMode ? 'Editar' : 'Agendar'}   visita`}
			>
				<form
					action=''
					onSubmit={handleSave}
				>
					<fieldset className=''>
						<label htmlFor='PropertyId'>
							Propiedad{' '}
							{currentVisit.current && (
								<span className='text-blue-600 text-sm ml-2'>
									Actual : {currentVisit.current?.Property.street} {'  '}
									{currentVisit.current?.Property.number} {'  '}
									{currentVisit.current?.Property?.dept}-{currentVisit.current?.Property?.floor}
								</span>
							)}
						</label>
						<Dropdown
							value={PropertyId}
							onChange={(e) => handleInputChange(e.value, 'PropertyId')}
							options={propertyQuery.data?.data}
							optionLabel='street'
							showClear
							filterPlaceholder='Busca propiedad'
							// optionValue='id'
							placeholder='elije una propiedad'
							filter
							valueTemplate={(data, props) => {
								if (!data) return props.placeholder
								return (
									<span>
										{data.street} {data.number} {data.floor}-{data.dept}
									</span>
								)
							}}
							itemTemplate={(data) => {
								return (
									<span>
										{data.street} {data.number} {data.floor}-{data.dept}
									</span>
								)
							}}
							className='h-[42px] items-center !border-gray-200 shadow'
						/>
						{/*  @ts-expect-error  */}
						{PropertyId?.Owner! && (
							<span>
								{/*  @ts-expect-error  */}
								{PropertyId.Owner?.fullName} - {PropertyId.Owner?.phone}{' '}
							</span>
						)}
						{errors?.PropertyId && <FormError text='La propiedad es obligatoria.' />}
					</fieldset>
					<FieldsetGroup>
						<fieldset className=''>
							<label htmlFor='fullName'>Nombre Completo</label>
							<CustomInput
								placeholder='Juan jose'
								initialValue={fullName}
								onChange={(value) => handleInputChange(value, 'fullName')}
							/>
							{errors?.fullName && <FormError text='El nombre es obligatorio.' />}
						</fieldset>
						<fieldset className=''>
							<label htmlFor='phone'>Télefono</label>
							<CustomInput
								placeholder='0101001010101'
								initialValue={phone}
								onChange={(value) => handleInputChange(value, 'phone')}
							/>
							{errors?.phone && <FormError text='El télefono es obligatorio.' />}
						</fieldset>
					</FieldsetGroup>
					<FieldsetGroup>
						<fieldset className=''>
							<label htmlFor='description'>Nota</label>
							<CustomInput
								placeholder='Puede llegar tarde el inquilino'
								initialValue={description}
								onChange={(value) => handleInputChange(value, 'description')}
							/>
						</fieldset>
						<fieldset className=''>
							<label htmlFor='date'>Fecha</label>
							<CustomInput
								placeholder='Juan jose'
								type='datetime-local'
								initialValue={date}
								onChange={(value) => handleInputChange(value, 'date')}
							/>
							{errors?.date && <FormError text='La fecha es obligatoria.' />}
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

export default Visits
