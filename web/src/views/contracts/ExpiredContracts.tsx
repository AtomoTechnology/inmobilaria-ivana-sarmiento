import React, { useState } from 'react'
import { Dropdown } from 'primereact/dropdown'
import Box from '../../components/Box'
import Loading from '../../components/Loading'
import RequestError from '../../components/RequestError'
import { useContracts } from '../../hooks/useContracts'
import { Page, Text, View, Document, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer'
import Expired from '../../components/contract/Expired'
import { diffenceBetweenDates, formatDateDDMMYYYY } from '../../helpers/date'
import { jsPDF } from "jspdf"
// @ts-expect-error
import html2pdf from 'html2pdf.js'

const ExpiredContracts = () => {
	const [days, setDays] = useState(60)
	const [loadingPdf, setLoadingPdf] = useState(false)
	const { data, isError, error, isLoading, refetch, isFetching } = useContracts(`/expired-contracts/${days}`)
	console.log(data?.data)

	const downloadPdf = async () => {
		setLoadingPdf(true)
		var element = document.getElementById('pdf-download');

		var opt = {
			margin: [.1, .1],
			filename: `CONTRATOS_A_VENCER_EN_${days}_DIAS_${formatDateDDMMYYYY(new Date().toISOString())}.pdf`,
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

		// html2pdf(document.getElementById('pdf-download')!, {
		// 	filename: 'my-pdf-document.pdf',

		// });

		// return
		// const doc = new jsPDF({
		// 	orientation: "landscape",
		// 	unit: "px",
		// 	format: 'a4',
		// 	// format: [4, 2]
		// });

		// doc.html(document.getElementById('pdf-download')!, {
		// 	callback: function (doc) {
		// 		doc.save();
		// 	},
		// 	x: 10,
		// 	y: 10
		// });

		// doc.setFontSize(25)
		// doc.text(`Contratos a vencer en `, 20, 20)
		// doc.setFontSize(18)
		// doc.text(`en los próximos ${days} días`, 20, 35)
		// let cleandata: {
		// 	'Vence el': string;
		// 	Resta: string;
		// 	Carpeta: string;
		// 	Propiedad: string;
		// 	Propietario: string;
		// 	Inquilino: string;
		// 	'Monto Alq.': string;
		// 	'Alq. Neto': string;
		// 	Observaciones: string;
		// }[] = data?.data.map((c: any) => ({
		// 	'Vence el': formatDateDDMMYYYY(c.endDate),
		// 	Resta: diffenceBetweenDates(new Date().toISOString(), c.endDate,).toString(),
		// 	Carpeta: c.Property.folderNumber,
		// 	Propiedad: `${c.Property.street} ${c.Property.number} ${c.Property.dept} - ${c.Property.floor}`,
		// 	Propietario: c.Property.Owner.fullName,
		// 	Inquilino: c.Client.fullName.trim(),
		// 	'Monto Alq.': c.PriceHistorials[c.PriceHistorials.length - 1].amount.toString(),
		// 	'Alq. Neto': (c.PriceHistorials[c.PriceHistorials.length - 1].amount - (c.PriceHistorials[c.PriceHistorials?.length - 1].amount * (c.Property.Owner.commision / 100))).toString(),
		// 	Observaciones: c.description,

		// }))
		// doc.table(20, 45, cleandata, ['Vence el', 'Resta', 'Carpeta', 'Propiedad', 'Propietario', 'Inquilino', 'Monto Alq.', 'Alq. Neto', 'Observaciones'], {
		// 	autoSize: true,
		// 	fontSize: 11,
		// 	headerBackgroundColor: '#f1f1f1',


		// })
		// doc.text(`Contratos a vencer en los próximos ${days} días`, 10, 10)
		// doc.text(`Vence el     Resta    Carpeta  Propiedad           Propietario          Inquilino         Monto Alq.	 Alq. Neto	     Observaciones            `, 10, 15)
		// data?.data.map((c, index) => {
		// 	doc.text(`${formatDateDDMMYYYY(c.endDate)}   ${diffenceBetweenDates(new Date().toISOString(), c.endDate,)} ${c.Client.fullName}  `, 10, 10 + ((index + 1) * 10));

		// })
		// doc.save(`CONTRATOS_A_VENCER_EN_${days}_DIAS_${formatDateDDMMYYYY(new Date().toISOString())}.pdf`);
	}

	if (isLoading) return <Loading />
	if (isError) return <RequestError error={error} />
	return (
		<div className='container m-auto  flexsm:mx-0  flex-col justify-center sm:justify-center'>

			<Box className='expired-contracts !p-0 !m-0 !border-0 !shadow-none !bg-transparent flex items-end gap-x-4'>
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
					className='btn !bg-transparent border border-brand2 dark:border-brand hover:!bg-gray-100 dark:text-slate-400 dark:hover:!bg-slate-700 dark:hover:!text-slate-300'
					onClick={() => refetch()}
				>
					Buscar
				</button>
			</Box>

			<div className=' mx-auto  dark:text-slate-400 ' id='pdf-download'>
				<h2 className='my-4 text-2xl font-semibold leading-tight'>
					<span>
						Contratos a Vencer <br /> <span className='text-sm'> en los próximos {days} días </span>
					</span>
				</h2>
				<Box className='!p-0 !m-0'>
					<div className='overflow-x-auto' >
						<table className='w-full p-6 text-sm text-left whitespace-nowrap'>
							<thead className=' rounded-t-lg  overflow-hidden'>
								<tr className='bg-gray-100 dark:bg-slate-700'>
									<th className='p-3'>Vence el</th>
									<th className='p-3'>Resta</th>
									<th className='p-3'>Carpeta</th>
									<th className='p-3'>Propiedad</th>
									<th className='p-3'>Propietario</th>
									<th className='p-3'>Inquilino</th>
									<th className='p-3'>Monto Alq.</th>
									<th className='p-3'>Alq. Neto</th>
									<th className='p-3'>Año</th>
									<th className='p-3'>Observaciones</th>
								</tr>
							</thead>
							<tbody className=''>
								{data?.data.map((c: any) => (
									<tr key={c.id} className=''>
										<td className='px-3 py-2'>{formatDateDDMMYYYY(c.endDate)}</td>
										<td className='px-3 py-2'>{diffenceBetweenDates(new Date().toISOString(), c.endDate,)}</td>
										<td className='px-3 py-2'>{c.Property.folderNumber}</td>
										<td className='px-3 py-2'>
											{c.Property.street} {c.Property.number} {c.Property.dept} - {c.Property.floor}
										</td>
										<td className='px-3 py-2'> {c.Property.Owner?.fullName}</td>
										<td className='px-3 py-2'> {c.Client.fullName}</td>
										<td className='px-3 py-2'>${c.PriceHistorials[c.PriceHistorials.length - 1].amount}</td>
										<td className='px-3 py-2'>${c.PriceHistorials[c.PriceHistorials.length - 1].amount - (c.PriceHistorials[c.PriceHistorials?.length - 1].amount * (c.Property.Owner.commision / 100))}</td>
										<td className='px-3 py-2'>{c.PriceHistorials[c.PriceHistorials.length - 1].year}</td>

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
			<button className='btn gradient  !my-4' disabled={loadingPdf} onClick={downloadPdf}> {loadingPdf ? 'Descargando ... ' : 'Descargar Planilla'} </button>
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
