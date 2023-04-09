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
import { useVisits } from '../../hooks/useVisits'
import { IVisit } from '../../interfaces/IvisitsResponse'
import FieldsetGroup from '../../components/FieldsetGroup'
import { Dropdown } from 'primereact/dropdown'
import { useProperties } from '../../hooks/useProperties'
import { formatDate, formatDateForInput } from '../../helpers/date'
import useShowAndHideModal from '../../hooks/useShowAndHideModal'
import RefreshData from '../../components/RefreshData'
import HeaderData from '../../components/HeaderData'
import { EmptyData } from '../../components/EmptyData'
import FormActionBtns from '../../components/FormActionBtns'
import { validateForm } from '../../helpers/form'
import { FilterMatchMode } from 'primereact/api'

const Visits = () => {
	const [showCreateModal, setShowCreateModal] = useState(false)
	const [show, setShow] = useState(false)
	const [savingOrUpdating, setSavingOrUpdating] = useState(false)
	const { date, phone, description, fullName, PropertyId, values, handleInputChange, reset, updateAll } = useForm({
		date: '',
		phone: '',
		description: '',
		fullName: '',
		PropertyId: 0,
	})
	const [globalFilterValue, setGlobalFilterValue] = useState('')
	const [errors, setErrors] = useState<any>()
	const [editMode, setEditMode] = useState(false)
	const currentVisit = useRef<IVisit | null>()

	const { showAndHideModal } = useShowAndHideModal()
	const { data, isError, isLoading, error, isFetching, refetch } = useVisits()
	const propertyQuery = useProperties()

	const [filters, setFilters] = useState({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
		fullName: { value: null, matchMode: FilterMatchMode.CONTAINS },
		phone: { value: null, matchMode: FilterMatchMode.CONTAINS },
		'Property.street': { value: null, matchMode: FilterMatchMode.CONTAINS },
	})

	const onGlobalFilterChange = (val: any) => {
		const value = val
		let _filters = { ...filters }
		_filters['global'].value = value
		setFilters(_filters)
		setGlobalFilterValue(value)
	}

	const edit = (data: IVisit) => {
		updateAll({ ...data, date: formatDateForInput(data.date), PropertyId: data.Property.id })
		setShowCreateModal(true)
		setEditMode(true)
		currentVisit.current = data
	}

	const ConfirmDestroy = (data: IVisit) => {
		setShow(!show)
		currentVisit.current = data
	}

	const destroy = async (id: number) => {
		try {
			setSavingOrUpdating(true)
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
		} finally {
			setSavingOrUpdating(false)
		}
	}

	const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const { error, ok } = validateForm({ ...values }, ['description'])
		setErrors(error)
		if (!ok) return false
		if (editMode) {
			try {
				setSavingOrUpdating(true)
				const res = await http.put(`/visits/${currentVisit.current?.id}`, {
					...values,
				})
				if (res.data.ok) {
					data?.data &&
						(data.data = data?.data.map((z: any) => {
							if (z.id === currentVisit.current?.id) {
								z = { ...values, Property: propertyQuery.data?.data.find((p) => p.id === PropertyId) } // eslint-disable-line no-use-before-define
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
			} finally {
				setSavingOrUpdating(false)
			}
		} else {
			try {
				setSavingOrUpdating(true)
				const res = await http.post('/visits', { ...values })
				if (res.data.ok) {
					console.log('new items : ', { ...res.data.data, values }, 'NEW VALUES ::: ', propertyQuery.data?.data.find((p) => p.id === PropertyId))
					data?.data.unshift({ ...res.data.data, Property: propertyQuery.data?.data.find((p) => p.id === PropertyId) })
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

	const actionBodyTemplate = (rowData: any) => {
		return (
			<div className='flex gap-x-3 items-center justify-center'>
				<EditIcon action={() => edit(rowData)} />
				<DeleteIcon action={() => ConfirmDestroy(rowData)} />
			</div>
		)
	}
	const openCreateOrEditModel = () => {
		setEditMode(false)
		currentVisit.current = null
		setShowCreateModal(true)
	}
	if (isLoading) return <Loading />
	if (isError) return <RequestError error={error} />

	return (
		<div className='container m-auto  flex sm:mx-0  flex-col justify-center sm:justify-center'>
			<HeaderData action={openCreateOrEditModel} text='Visitas' />
			{data.data.length > 0 ? (
				<>
					<CustomInput
						onChange={(val) => onGlobalFilterChange(val)}
						className=' w-auto mx-2 sm:mx-0 sm:w-96'
						initialValue={globalFilterValue}
						placeholder='Buscar vista por nombre, teléfono o dirección'
						type='search'
					/>
					<Box className='!p-0 !overflow-hidden !border-none sm:mx-0   mb-4'>
						<DataTable
							size='small'
							emptyMessage='Aún no hay visita'
							className='!overflow-hidden   !border-none'
							value={data?.data}
							filters={filters}
							globalFilterFields={['fullName', 'phone', 'Property.street']}
							dataKey='id'
							paginator
							rows={10}
							responsiveLayout='scroll'
							paginatorLeft={<RefreshData action={refetch} />}
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
								header='Fecha Inicio'
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
				<EmptyData text='Aún no hay visita ' />
			)}

			{isFetching && (<Loading h={40} w={40} />)}

			<DeleteModal
				show={show}
				savingOrUpdating={savingOrUpdating}
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
					onSubmit={handleSave}
				>

					<fieldset className=''>
						<label htmlFor='PropertyId'>Propiedad</label>
						<Dropdown
							value={PropertyId}
							onChange={(e) => handleInputChange(e.value, 'PropertyId')}
							options={propertyQuery.data?.data}
							optionLabel='street'
							showClear
							filterPlaceholder='Busca propiedad'
							optionValue='id'
							filterBy='street,number,dept,floor'
							placeholder='elije una propiedad'
							filter
							valueTemplate={(data, props) => {
								if (!data) return props.placeholder
								return (
									<span>
										{/* {data.PropertyType.description} */}
										{data.street} {data.number} {data.floor}-{data.dept}
									</span>
								)
							}}

							itemTemplate={(data) => (<span> {data.street} {data.number} {data.floor}-{data.dept} </span>)}
							className='h-[42px] items-center !border-gray-200 shadow'
						/>
						{PropertyId !== 0 && (
							<span className='text-blue-600 dark:text-blue-400 text-sm ' >
								Propietario :  {propertyQuery.data?.data.find((p) => p.id === PropertyId)?.Owner?.fullName}
							</span>
						)}
						{errors?.PropertyId && <FormError text='La propiedad es obligatoria.' />}
					</fieldset>
					<FieldsetGroup>
						<CustomInput
							placeholder='Juan jose'
							initialValue={fullName}
							onChange={(value) => handleInputChange(value, 'fullName')}
							maxLength={100}
							label='Nombre Completo'
							required
							hasError={errors?.fullName}
							errorText='El nombre es obligatorio.'
						/>
						<CustomInput
							placeholder='3410101010'
							initialValue={phone}
							onChange={(value) => handleInputChange(value, 'phone')}
							maxLength={20}
							label='Télefono'
							required
							hasError={errors?.phone}
							errorText='El télefono es obligatorio.'
						/>
					</FieldsetGroup>
					<FieldsetGroup>
						<CustomInput
							placeholder='Puede llegar tarde el inquilino'
							initialValue={description}
							onChange={(value) => handleInputChange(value, 'description')}
							label='Nota'
							optional
						/>
						<CustomInput
							placeholder='Fecha visita'
							type='datetime-local'
							initialValue={date}
							onChange={(value) => handleInputChange(value, 'date')}
							label='Fecha'
							required
							hasError={errors?.date}
							errorText='La fecha es obligatoria.'
						/>
					</FieldsetGroup>
					<FormActionBtns savingOrUpdating={savingOrUpdating} onClose={closeCreateModal} />
				</form>
			</CreateModal>
		</div>
	)
}

export default Visits
