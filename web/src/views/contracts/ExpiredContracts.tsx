import { useState } from 'react'
import { Dropdown } from 'primereact/dropdown'
import Box from '../../components/Box'
import Loading from '../../components/Loading'
import RequestError from '../../components/RequestError'
import { useContracts } from '../../hooks/useContracts'
import { addDate, diferenceBetweentwoDatesInYears, diffenceBetweenDates, formatDateDDMMYYYY } from '../../helpers/date'
// @ts-expect-error
import html2pdf from 'html2pdf.js'
import BoxContainerPage from '../../components/BoxContainerPage'
import { IHistorialPrice } from '../../interfaces/Icontracts'

const ExpiredContracts = () => {
	const [days, setDays] = useState(60)
	const [loadingPdf, setLoadingPdf] = useState(false)
	const { data, isError, error, isLoading, refetch, isFetching } = useContracts(`/expired-contracts/${days}`)

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
	const getExpiredDate = (date: string) => addDate(date, diferenceBetweentwoDatesInYears(date, new Date().toISOString().slice(0, 10)), 'years')
	const getDiffBetweenDate = (date: string) => diffenceBetweenDates(date, new Date().toISOString().slice(0, 10))
	if (isLoading) return <Loading />
	if (isError) return <RequestError error={error} />
	return (
		<BoxContainerPage className=''>

			<Box className='expired-contracts !p-0 !m-0 !border-0 !shadow-none !bg-transparent flex items-end gap-x-4'>
				<fieldset className='w-full sm:w-40 mb-0 '>
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

			<div className=' mx-auto !overflow-x-auto dark:text-slate-400  ' id='pdf-download'>
				<h2 className='my-4 text-2xl font-semibold leading-tight'>
					<span>
						Contratos a Vencer <br /> <span className='text-sm'> en los próximos {days} días </span>
					</span>
				</h2>
				<Box className='!p-0 !m-0 '>
					<div className='' >
						<div className='w-full  !overflow-x-auto text-xs text-left whitespace-nowrap'>
							<div className=' rounded-t-lg   overflow-hidden'>
								<div className='flex px-1  py-3  font-semibold border-b dark:border-slate-500'>
									<div className='w-[80px]'>
										<span className='p-3 pl-0'>Vence el</span>
									</div>
									<div className='w-[40px] '>
										<span className='p-3 pl-0'>Resta</span>
									</div>
									<div className='w-[40px] '>
										<span className='p-3 pl-0'>Cpta</span>
									</div>
									<div className='w-[150px] '>
										<span className='p-3 pl-0'>Propiedad</span>
									</div>
									<div className='w-[150px] '>
										<span className='p-3 pl-0'>Propietario</span>
									</div>
									<div className='w-[150px] '>
										<span className='p-3 pl-0'>Inquilino</span>
									</div>
									<div className='w-[80px] '>
										<span className='p-3 pl-0'>Monto Alq.</span>
									</div>
									<div className='w-[80px]'>
										<span className='p-3 pl-0'>Alq. Neto</span>
									</div>
									<div className='w-[40px] '>
										<span className='p-3 pl-0 '>Año</span>
									</div>
									<div className='w-[220px] '>
										<span className='p-3 pl-0'>Observaciones</span>
									</div>
								</div>
							</div>
							<div className=''>
								{data?.data.sort((a, b) => getExpiredDate(a.startDate).getTime() - getExpiredDate(b.startDate).getTime()).map((c: any) => (
									<div key={c.id} className='flex px-1 border-b dark:border-slate-700'>
										<p className='w-[80px]  my-1  truncate p-2 px-0'>
											{/* {formatDateDDMMYYYY(c.endDate)} |
											{formatDateDDMMYYYY(c.startDate)} | */}
											{formatDateDDMMYYYY(getExpiredDate(c.startDate).toISOString().slice(0, 10))}
										</p>
										<p className='w-[40px]  my-1  truncate p-2 px-0'>
											{
												getDiffBetweenDate(c.startDate) <= 365 ?

													(365 - getDiffBetweenDate(c.startDate)) :
													(
														(getDiffBetweenDate(c.startDate) > 365 && getDiffBetweenDate(c.startDate) <= 730) ?
															((730 - getDiffBetweenDate(c.startDate))) :
															(1095 - getDiffBetweenDate(c.startDate))
													)
											}
										</p>
										<p className='w-[40px]  my-1  truncate p-2 px-0'>{c.Property.folderNumber}</p>
										<p className='w-[150px]  my-1   truncate p-2 px-0  '>{c.Property.street} {c.Property.number} {c.Property.dept} - {c.Property.floor}</p>
										<p className='w-[150px]  my-1  truncate p-2 px-0'>{c.Property.Owner?.fullName}</p>
										<p className='w-[150px]  my-1  truncate p-2 px-0'> {c.Client.fullName}</p>
										<p className='w-[80px]  my-1  truncate p-2 px-0'>${c.PriceHistorials.sort((a: IHistorialPrice, b: IHistorialPrice) => a.id - b.id)[c.PriceHistorials.length - 1].amount}</p>
										<p className='w-[80px]  my-1  truncate p-2 px-0'>${c.PriceHistorials.sort((a: IHistorialPrice, b: IHistorialPrice) => a.id - b.id)[c.PriceHistorials.length - 1].amount - (c.PriceHistorials.sort((a: IHistorialPrice, b: IHistorialPrice) => a.id - b.id)[c.PriceHistorials?.length - 1].amount * (c.Property.Owner.commision / 100))}</p>
										<p className='w-[40px]  my-1  truncate p-2 px-0'>
											<span className={`${diferenceBetweentwoDatesInYears(c.startDate, new Date().toISOString().slice(0, 10)) === 3 && 'text-yellow-500 font-bold'}`}>
												{diferenceBetweentwoDatesInYears(c.startDate, new Date().toISOString().slice(0, 10))}
											</span>
										</p>
										<p className='w-[220px] truncate my-1  p-2 px-0' title={c.description}>{c.description}</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</Box>
			</div >
			{isFetching && (<Loading h={60} w={60} />)}
			<button className='btn gradient  !my-4 !w-fit'
				disabled={loadingPdf || data?.data.length == 0}
				onClick={downloadPdf}>
				{loadingPdf ? 'Descargando ... ' : `Descargar Planilla (${data?.data.length})`}
			</button>
		</BoxContainerPage >
	)
}

export default ExpiredContracts



