import React, { useState } from 'react'
import { Dropdown } from 'primereact/dropdown'
import Box from '../../components/Box'
import Loading from '../../components/Loading'
import RequestError from '../../components/RequestError'
import { useContracts } from '../../hooks/useContracts'
import { Page, Text, View, Document, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer'
import Expired from '../../components/contract/Expired'

const ExpiredContracts = () => {
	const [days, setDays] = useState(60)
	const { data, isError, error, isLoading, refetch, isFetching } = useContracts(`/expired-contracts/${days}`)
	if (isLoading) return <Loading />
	if (isError) return <RequestError error={error} />
	return (
		<div className='container m-auto  flexsm:mx-0  flex-col justify-center sm:justify-center'>
			<div className='expired-contracts flex items-end gap-x-4'>
				<fieldset className='w-fit mb-0 '>
					<label htmlFor='days'>Cantidad de días</label>
					<Dropdown
						value={days}
						onChange={(e: any) => setDays(e.value)}
						options={[30, 60, 90, 120]}
						placeholder='Cantidad días'
						className='h-[42px]  items-center !border-gray-200 dark:!border-gray-700 shadow dark:bg-slate-900 dark:!text-slate-400 '
					/>
				</fieldset>
				<button
					className='btn !bg-transparent border border-brand2 hover:!bg-gray-100  '
					onClick={() => refetch()}
				>
					Buscar
				</button>
			</div>
			<div className=' mx-auto  dark:text-slate-400'>
				<h2 className='my-4 text-2xl font-semibold leading-tight'>
					<span>
						Contratos a Vencer <br /> <span className='text-sm'> en los próximos {days} días </span>
					</span>
				</h2>
				<Box className='!p-0 !m-0'>
					<div className='overflow-x-auto'>
						<table className='w-full p-6 text-sm text-left whitespace-nowrap'>
							<thead className=' rounded-lg  overflow-hidden'>
								<tr className='bg-gray-200 dark:bg-gray-700'>
									<th className='p-3'>Vence el</th>
									<th className='p-3'>Resta</th>
									<th className='p-3'>Contrato</th>
									<th className='p-3'>Propiedad</th>
									<th className='p-3'>Propietario</th>
									<th className='p-3'>Inquilino</th>
									<th className='p-3'>Monto Alq.</th>
									<th className='p-3'>Alq. Neto</th>
									<th className='p-3'>Observaciones</th>
								</tr>
							</thead>
							<tbody className=''>
								{data?.data.map((c: any) => (
									<tr key={c.id}>
										<td className='px-3 py-2'>{c.endDate}</td>
										<td className='px-3 py-2'>{9}</td>
										<td className='px-3 py-2'>{c.id}</td>
										<td className='px-3 py-2'>
											{c.Property.street} {c.Property.number} {c.Property.dept} - {c.Property.floor}
										</td>
										<td className='px-3 py-2'> {c.Property.Owner?.fullName}</td>
										<td className='px-3 py-2'> {c.Client.fullName}</td>
										<td className='px-3 py-2'>{c.amount}</td>
										<td className='px-3 py-2'>{c.amount}</td>
										<td
											className='px-3 py-2'
											title={c.description}
										>
											{c.description.slice(0, 20) || '--'} {c.description.length > 20 ? '...' : ''}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</Box>
			</div>
			{isFetching && (
				<Loading
					h={60}
					w={60}
				/>
			)}
			<button className='btn gradient  !my-4'>Descargar Planilla</button>
			{/* <PDFDownloadLink
				document={
					<Expired
						data={data?.data || []}
						days={days}
					/>
				}
				fileName={`contratos-a-vencer-dentro-de-${days}-dias`}
			>
				fdfhsdf
			</PDFDownloadLink> */}
			{/* </PDFViewer> */}
		</div>
	)
}

export default ExpiredContracts
