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
import { useClaims } from '../../hooks/useClaims'
import { IClaim } from '../../interfaces/Iclaims'
import CustmTextArea from '../../components/CustomTextArea'
import { Dropdown } from 'primereact/dropdown'
import { useProperties } from '../../hooks/useProperties'
import { Button } from 'primereact/button'
import AddComment from '../../components/icons/AddComment'
import { formatDate } from '../../helpers/date'
import CloseOnClick from '../../components/CloseOnClick'

const Claims = () => {
	const { showAlert, hideAlert } = useContext(AuthContext)
	const [showCreateModal, setShowCreateModal] = useState(false)
	const [showAddCommentModal, setShowAddCommentModal] = useState(false)
	const [showCommentsModal, setShowCommentsModal] = useState(false)
	const [show, setShow] = useState(false)
	const { description, PropertyId, state, details, values, handleInputChange, reset, updateAll } = useForm({
		description: '',
		state: '',
		details: [],
		PropertyId: 0,
	})
	const { comment, values: Cvalues, handleInputChange: ChandleInputChange, reset: Creset } = useForm({ comment: '' })
	const [errors, setErrors] = useState<any>()
	const [editMode, setEditMode] = useState(false)
	const [to, setTo] = useState<any>()

	const currentClaim = useRef<IClaim | null>()

	const { data, isError, isLoading, error, refetch, isFetching } = useClaims()
	const propertyQuery = useProperties()

	const edit = (data: IClaim) => {
		// @ts-expect-error
		updateAll({ ...data, details: data.details })
		setShowCreateModal(true)
		setEditMode(true)
		currentClaim.current = data
	}

	const ConfirmDestroy = (data: IClaim) => {
		setShow(!show)
		currentClaim.current = data
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
			const res = await http.delete('/claims/' + id)
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
		if (!PropertyId) {
			ok = false
			error.PropertyId = true
		}
		setErrors(error)
		return ok
	}
	const verifyFormAddComment = () => {
		let ok = true
		let error: any = {}
		if (!comment.trim().length) {
			ok = false
			error.comment = true
		}
		setErrors(error)
		return ok
	}

	const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (verifyForm()) {
			if (editMode) {
				try {
					const res = await http.put(`/claims/${currentClaim.current?.id}`, {
						...values,
						// @ts-expect-error
						PropertyId: values.PropertyId.id,
					})
					if (res.data.ok) {
						data?.data &&
							(data.data = data?.data.map((z) => {
								if (z.id === currentClaim.current?.id) {
									// @ts-expect-error
									z = { ...values }
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
					const res = await http.post('/claims', {
						...values,
						// @ts-expect-error
						PropertyId: values.PropertyId.id,
					})
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
	const closeAddCommentModal = () => {
		Creset()
		setShowAddCommentModal(false)
		setErrors({})
	}
	const handleAddComment = (data: IClaim) => {
		console.log(data)
		currentClaim.current = data
		setShowAddCommentModal(true)
	}
	const showComments = (data: IClaim) => {
		currentClaim.current = data
		setShowCommentsModal(true)
	}
	const handleAddCommentForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (verifyFormAddComment()) {
			try {
				const res = await http.put('/claims/' + currentClaim.current?.id, { details: [...currentClaim.current?.details!, { comment, date: new Date() }] })
				if (res.data.ok) {
					data?.data &&
						(data.data = data?.data.map((z) => {
							if (z.id === currentClaim.current?.id) {
								// @ts-expect-error
								z.details = [...currentClaim.current?.details!, { comment, date: new Date() }]
							}
							return z
						}))
					closeAddCommentModal()
					showAndHideModal('Agregado', res.data.message)
				} else {
					showAndHideModal('Error', res.data.message || 'Algo malo ocurrío.', 'red')
				}
			} catch (error: any) {
				if (error.response) showAndHideModal('Error', error.response.data?.message || 'Algo malo ocurrío.', 'red')
			}
		}
	}
	const deleteClaimComment = async (date: string) => {
		try {
			let dtls = currentClaim.current?.details.filter(c => c.date !== date)
			const res = await http.put('/claims/' + currentClaim.current?.id, { details: dtls })
			if (res.data.ok) {
				data?.data &&
					(data.data = data?.data.map((z) => {
						if (z.id === currentClaim.current?.id) {
							// @ts-expect-error
							z.details = dtls
						}
						return z
					}))
				// closeAddCommentModal()
				showAndHideModal('Borrado', res.data.message)
			} else {
				showAndHideModal('Error', res.data.message || 'Algo malo ocurrío.', 'red')
			}
		} catch (error: any) {
			if (error.response) showAndHideModal('Error', error.response.data?.message || 'Algo malo ocurrío.', 'red')
		}
	}


	const actionBodyTemplate = (rowData: IClaim) => {
		return (
			<div className='flex gap-x-3 items-center justify-end'>
				{rowData.state === 'Abierto' && <AddComment action={() => handleAddComment(rowData)} />}
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
				<h3 className='font-bold  text-slate-700 dark:text-slate-500 text-lg sm:text-4xl'>Reclamos</h3>
				<button
					onClick={() => {
						setEditMode(false)
						currentClaim.current = null
						setShowCreateModal(true)
					}}
					className='btn !w-10 !h-10 !p-0 gradient !rounded-full'
				>
					<MdAdd size={50} />
				</button>
			</div>
			{data.data.length > 0 ? (
				<>
					<Box className='!p-0 !overflow-hidden !border-none !mx-4    mb-4 '>
						<DataTable
							size='small'
							emptyMessage='Aún no hay reclamo'
							className='!overflow-hidden   !border-none'
							value={data?.data}
							paginator
							rows={10}
							paginatorTemplate='FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink'
							currentPageReportTemplate='{first} al {last} de {totalRecords}'
							paginatorLeft={paginatorLeft}
							dataKey='id'
							responsiveLayout='scroll'
						>
							<Column
								field='Property.street'
								sortable
								body={(data) => (
									<span>
										{data.Property?.street} {data.Property?.number} {data.Property?.floor}-{data.Property?.dept}
									</span>
								)}
								header='Propiedad'
								headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
								className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
							/>
							<Column
								field='description'
								header='Descripción'
								body={(data) => (
									<span title={data.description}>
										{data.description.slice(0, 60)} {data.description.length > 60 ? '...' : ''}
									</span>
								)}
								headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
								className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
							/>
							<Column
								field='state'
								header='Estado'
								sortable
								body={(data) => (
									<span className={`font-bold ${data.state === 'Abierto' ? 'text-green-500' : 'text-red-400'}`}>
										{data.state}{' '}
									</span>
								)}
								headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
								className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
							/>
							<Column
								field='details.length'
								header='Comentarios'
								sortable
								body={(data) => (<button disabled={data.details.length === 0} onClick={() => showComments(data)} className=' border-brand border rounded-full shadow px-2  py-1 text-brand'> Ver ({data.details.length}) </button>)}
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
				<div className='text-slate-400 mx-3 text-center'>Aún no hay reclamo.</div>
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
				destroy={() => destroy(currentClaim.current?.id!)}
				text={`${currentClaim.current?.description}`}
			/>

			<CreateModal
				show={showCreateModal}
				closeModal={closeCreateModal}
				overlayClick={false}
				className='max-w-[700px] w-fit sm:w-[600px]'
				titleText={`${editMode ? 'Editar' : 'Iniciar'}  reclamo`}
			>
				<form
					action=''
					onSubmit={handleSave}
				>
					<fieldset>
						<label htmlFor='PropertyId'>Propiedad</label>
						<Dropdown
							value={editMode ? propertyQuery.data?.data.find((p) => p.id === PropertyId) : PropertyId}
							onChange={(e) => handleInputChange(e.value, 'PropertyId')}
							options={propertyQuery.data?.data}
							optionLabel='street'
							showClear
							disabled={editMode ? true : false}
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
						{errors?.PropertyId && <FormError text='La propiedad es obligatoria.' />}
					</fieldset>
					<fieldset className=''>
						<label htmlFor='description'>Descripción</label>
						<CustmTextArea
							placeholder='Escribe una descripción...'
							initialValue={description}
							onChange={(value) => handleInputChange(value, 'description')}
						/>
						{errors?.description && <FormError text='La descripción es obligatoria.' />}
					</fieldset>
					{editMode && (
						<fieldset className=''>
							<Dropdown
								value={state}
								onChange={(e) => handleInputChange(e.value, 'state')}
								options={['Abierto', 'Cerrado']}
								filterPlaceholder='Busca estado'
								placeholder='elije una estado'
								className='h-[42px] items-center !border-gray-200 shadow'
							/>
							{errors?.state && <FormError text='El estado es obligatorio.' />}
						</fieldset>
					)}

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
			<CreateModal
				show={showAddCommentModal}
				closeModal={closeAddCommentModal}
				overlayClick={false}
				className='max-w-[700px] w-fit sm:w-[600px]'
				titleText={`${editMode ? 'Editar' : 'Agregar'}  comentario`}
			>
				<form
					action=''
					onSubmit={handleAddCommentForm}
				>
					<fieldset>
						<label htmlFor='PropertyId'>Reclamo : #{currentClaim.current?.id}</label>
						<span className='border border-gray-300 p-2'> {currentClaim.current?.description} </span>
					</fieldset>
					<fieldset className=''>
						<label htmlFor='comment'>Comentario</label>
						<CustmTextArea
							placeholder='Escribe un comentario...'
							initialValue={comment}
							className="min-h-[150px]"
							onChange={(value) => ChandleInputChange(value, 'comment')}
						/>
						{errors?.comment && <FormError text='El comentario es obligatoria.' />}
					</fieldset>

					<section className='action flex items-center gap-x-3 mt-8'>
						<button
							className='btn sec !py-1'
							onClick={closeAddCommentModal}
							type='button'
						>
							Cerrar
						</button>
						<button
							className='btn gradient  !py-1'
							type='submit'
						>
							Agregar
						</button>
					</section>
				</form>
			</CreateModal>

			<CreateModal
				show={showCommentsModal}
				closeModal={() => setShowCommentsModal(false)}
				overlayClick={false}
				className='max-w-[700px] w-fit sm:w-[600px]'
				titleText='Comentarios'
			>
				<CloseOnClick action={() => setShowCommentsModal(false)} />
				<div className="">
					<fieldset className='border border-gray-300 p-2 text-sm'>
						<label htmlFor='PropertyId'>Reclamo : #{currentClaim.current?.id}</label>
						<span className=''> {currentClaim.current?.description} </span>
					</fieldset>
					{
						currentClaim.current?.details?.length === 0 ? <span className='text-center text-gray-400'>No hay comentarios</span> : (
							<div className="comments flex flex-col gap-y-2  max-h-[420px] overflow-y-auto">
								{
									currentClaim.current?.details?.map((comment) => (
										<div className="comment bg-gray-200 p-2 pb-5 relative group hover:bg-gray-100 cursor-pointer" key={comment.date}>
											<span>{comment.comment}</span>
											<span className='absolute bottom-[2px] right-1 text-xs'> {formatDate(comment.date)} </span>
											<span className='absolute top-[2px] right-1 text-xs hidden bg-red-100 p-2 rounded-full shadow-lg group-hover:flex'> <DeleteIcon action={() => deleteClaimComment(comment.date)} /> </span>
										</div>
									))
								}
							</div>
						)
					}

				</div>
			</CreateModal>

		</div>
	)
}

export default Claims
