import React, { useState } from 'react'
import { DataTable, DataTableExpandedRows } from 'primereact/datatable'
import { Column } from 'primereact/column'
import Box from '../../components/Box'
import Loading from '../../components/Loading'
import CustomInput from '../../components/CustomInput'
import RequestError from '../../components/RequestError'
import { FilterMatchMode } from 'primereact/api'
import { useContracts } from '../../hooks/useContracts'
import { Contract, } from '../../interfaces/Icontracts'
import { diferenceBetweentwoDatesInYears, formatDateDDMMYYYY } from '../../helpers/date'
import HeaderData from '../../components/HeaderData'
import RefreshData from '../../components/RefreshData'
import { RowsToShow } from '../../helpers/variableAndConstantes'
import { EmptyData } from '../../components/EmptyData'

const DebtsClients = () => {

	const [globalFilterValue, setGlobalFilterValue] = useState('')
	const [filters, setFilters] = useState({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
		'Client.fullName': { value: null, matchMode: FilterMatchMode.CONTAINS },
		'PropertyType.description': { value: null, matchMode: FilterMatchMode.CONTAINS },
	})
	const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows>()

	const { data, isError, isLoading, error, isFetching, refetch } = useContracts('/debts/client/all')

	const onGlobalFilterChange = (val: any) => {
		const value = val
		let _filters = { ...filters }
		_filters['global'].value = value
		setFilters(_filters)
		setGlobalFilterValue(value)
	}

	const allowExpansion = (rowData: Contract) => rowData?.DebtClients.length > 0 || false

	const rowExpansionTemplate = (data: Contract) => {
		return (
			<div className='p-3'>
				<h2 className='text-lg font-semibold'>Histórico de deudas</h2>
				<DataTable
					size='small'
					dataKey='id'
					className='!overflow-hidden   !border-none'
					responsiveLayout='scroll'
					value={data.DebtClients}>
					<Column
						field='amount'
						body={(data) => <span> ${data.amount} </span>}
						header='Monto'
						headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
						className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
						sortable
					></Column>
					<Column
						header='Periodo'
						field='month'
						body={(data) => <span>{data.month}/{data.year} </span>}
						headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
						className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
						sortable
					></Column>
					<Column
						headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
						className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
						field='createdAt'
						body={(data) => <span> {formatDateDDMMYYYY(data.createdAt.slice(0, 10))} </span>}
						header='Fecha creación'
						sortable
					></Column>
					<Column
						header='Descripción'
						field='description'
						headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
						className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
					></Column>
					<Column
						headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
						className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
						field='paid'
						sortable
						body={(data) => <span className={`p-1 rounded-full px-2  ${data.paid ? 'text-green-400' : 'text-red-400'}`}> {data.paid ? 'Pagado' : 'Sin pagar'} {data.paid && formatDateDDMMYYYY(data.paidDate.slice(0, 10))} </span>}
						header='Pago'
					></Column>
				</DataTable>
			</div>
		)
	}

	if (isLoading) return <Loading />
	if (isError) return <RequestError error={error} />

	return (
		<div className='container m-auto  flex sm:mx-0  flex-col justify-center sm:justify-center'>
			<HeaderData showBtn={false} action={() => { }} text='Deudas x inquilinos' />

			{
				data.data.length > 0 ? (
					<>
						<CustomInput
							onChange={(val) => onGlobalFilterChange(val)}
							className=' w-auto mx-2 sm:mx-0 sm:w-96'
							initialValue={globalFilterValue}
							placeholder='Buscar contrato'
							type='search'
						/>
						<Box className='!p-0 !overflow-hidden !border-none sm:mx-0    mb-4 '>
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
								// paginator
								// rows={RowsToShow}
								// paginatorTemplate='FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink'
								// currentPageReportTemplate='{first} al {last} de {totalRecords}'
								// paginatorLeft={<RefreshData action={refetch} />}
								dataKey='id'
								responsiveLayout='scroll'
							>

								<Column
									expander={allowExpansion}
									headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
									className={`dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 `}
									style={{ width: '0.5rem' }}
								/>
								<Column
									field='Property.street'
									body={(data) => (
										<span className={`${data.DebtClients.filter((d: any) => !d.paid).length > 0 ? 'text-red-400' : ''}`}>
											{data.Property.street} {data.Property.number} {data.Property.floor} {data.Property.dept}
										</span>
									)}
									header='Propiedad'
									headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
									className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
									sortable
								/>
								<Column
									field='Property.folderNumber'
									header='Carpeta'
									headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
									className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
									sortable
								/>
								<Column
									field='Client.fullName'
									body={(data) => (
										<span className={`${data.DebtClients.filter((d: any) => !d.paid).length > 0 ? 'text-red-400' : ''}`}>
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
									body={(data) => <span>{formatDateDDMMYYYY(data.startDate)}</span>}
									headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
									className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
									sortable
								/>
								<Column
									field='endDate'
									header='Fecha fin'
									body={(data) => <span>{formatDateDDMMYYYY(data.endDate)}</span>}
									headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
									className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
									sortable
								/>
								<Column
									field='state'
									header='Estado'
									sortable
									body={(data) => (<span className={`font-bold `}> {data.state}</span>)}
									headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
									className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
								/>
								<Column
									field='state'
									header='Año'
									body={(data: Contract) => (
										<span className={`${diferenceBetweentwoDatesInYears(data.startDate, new Date().toISOString().slice(0, 10)) === 3 && 'text-yellow-500 font-bold'}`}>
											{diferenceBetweentwoDatesInYears(data.startDate, new Date().toISOString().slice(0, 10))}
										</span>
									)}
									headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
									className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
								/>
								<Column
									field=''
									header='Monto Actual'
									body={(data) => (
										<span className={`font-bold`}>
											${data.PriceHistorials[data.PriceHistorials.length - 1]?.amount}
										</span>
									)}
									headerClassName='!border-none dark:!bg-gray-800 dark:!text-slate-400'
									className='dark:bg-slate-700 dark:text-slate-400 dark:!border-slate-600 '
								/>
							</DataTable>
						</Box>
					</>
				) : (
					<EmptyData text='Aún no hay deuda' />
				)
			}

			{isFetching && (<Loading h={40} w={40} />)}

		</div>
	)
}

export default DebtsClients

