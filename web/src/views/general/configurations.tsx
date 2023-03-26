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
import { useConfig } from '../../hooks/useConfig'
import { IConfig } from '../../interfaces/Iconfig'
import { Button } from 'primereact/button'

const Configurations = () => {
    const { showAlert, hideAlert } = useContext(AuthContext)
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [show, setShow] = useState(false)
    const { key, value, values, handleInputChange, reset, updateAll } = useForm({ key: '', value: '' })
    const [errors, setErrors] = useState<any>()
    const [editMode, setEditMode] = useState(false)
    const [to, setTo] = useState<any>()

    const currentConfig = useRef<IConfig | null>()

    const { data, isError, isLoading, error, isFetching, refetch } = useConfig()

    const edit = (data: IConfig) => {
        updateAll(data)
        setShowCreateModal(true)
        setEditMode(true)
        currentConfig.current = data
    }

    const ConfirmDestroy = (data: IConfig) => {
        setShow(!show)
        currentConfig.current = data
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
            const res = await http.delete('/config/' + id)
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
        if (!key.trim().length) {
            ok = false
            error.key = true
        }
        if (!value.trim().length) {
            ok = false
            error.value = true
        }
        setErrors(error)
        return ok
    }

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (verifyForm()) {
            if (editMode) {
                try {
                    const res = await http.put(`/config/${currentConfig.current?.id}`, values)
                    if (res.data.ok) {
                        data?.data &&
                            (data.data = data?.data.map((z) => {
                                if (z.id === currentConfig.current?.id) {
                                    z.key = values.key
                                    z.value = values.value
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
                    const res = await http.post('/config', values)
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
                <h3 className='font-bold  text-slate-700 dark:text-slate-500 text-lg sm:text-4xl'>Info general</h3>
                <button
                    onClick={() => {
                        setEditMode(false)
                        currentConfig.current = null
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
                            emptyMessage='Aún no hay infos general'
                            className='!overflow-hidden   !border-none'
                            value={data?.data}
                            dataKey='id'
                            responsiveLayout='scroll'
                            paginator
                            rows={10}
                            paginatorTemplate='FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink'
                            currentPageReportTemplate='{first} al {last} de {totalRecords}'
                            paginatorLeft={paginatorLeft}
                        >
                            <Column
                                field='key'
                                header='Nombre'
                                headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
                                className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
                            />
                            <Column
                                field='value'
                                header='Valor'
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
                <div className='text-slate-400 mx-3 text-center'>Aún no hay infos general.</div>
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
                destroy={() => destroy(currentConfig.current?.id!)}
                text={`${currentConfig.current?.key}`}
            />

            <CreateModal
                show={showCreateModal}
                closeModal={closeCreateModal}
                overlayClick={false}
                className='max-w-[400px] w-[370px]'
                titleText={`${editMode ? 'Editar' : 'Crear'}  info general`}
            >
                <form
                    action=''
                    onSubmit={handleSave}
                >
                    <fieldset className=''>
                        <label htmlFor="key">Clave</label>
                        <CustomInput
                            placeholder='Email,teléfono,etc'
                            initialValue={key}
                            disabled={editMode}
                            onChange={(value) => handleInputChange(value, 'key')}
                        />
                        {errors?.key && <FormError text='La clave es obligatoria.' />}
                    </fieldset>
                    <fieldset className=''>
                        <label htmlFor="value">Valor</label>
                        <CustomInput
                            placeholder='example@gmail.com'
                            initialValue={value}
                            onChange={(value) => handleInputChange(value, 'value')}
                        />
                        {errors?.value && <FormError text='El valor es obligatorio.' />}
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

export default Configurations
