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
	console.log(data?.data)
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
			{/* <PDFViewer> */}
			<Expired
				data={data?.data || []}
				days={days}
			/>
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
