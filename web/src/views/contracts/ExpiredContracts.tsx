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
import { DobleChevronAngle } from '../../components/icons/DobleChevronAngle'

const ExpiredContracts = () => {
	const [days, setDays] = useState(60)
	const [loadingPdf, setLoadingPdf] = useState(false)
	const { data, isError, error, isLoading, refetch, isFetching } = useContracts(`/expired-contracts/${days}`)

	const downloadPdf = async () => {
		setLoadingPdf(true)
		var element = document.getElementById('pdf-download')

		var opt = {
			margin: [.1, .1],
			filename: `CONTRATOS_A_VENCER_EN_${days}_DIAS_${formatDateDDMMYYYY(new Date().toISOString())}.pdf`,
			// image: { type: 'jpeg', quality: 0.98 },
			html2canvas: { scale: 2 },
			jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
		}
		try {

			await html2pdf().from(element).set(opt).save()
		} catch (error) {
			console.log(error)
		} finally {
			setLoadingPdf(false)
		}
	}
	const getExpiredDate = (date: string) => addDate(addDate(date, -1, 'days').toISOString().slice(0, 10), diferenceBetweentwoDatesInYears(date, new Date().toISOString().slice(0, 10)), 'years')

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
						dropdownIcon={() => <span className='dark:text-slate-400'><DobleChevronAngle /></span>}
						options={[30, 60, 90, 120]}
						placeholder='Cantidad días'
						className='h-[42px]  items-center !bg-transparent !border-gray-400 dark:!border-gray-700  dark:!text-slate-400 '
					/>
				</fieldset>
				<button
					className='btn !bg-transparent border border-brand2 dark:border-brand hover:!bg-gray-100 dark:text-slate-400 dark:hover:!bg-slate-700 dark:hover:!text-slate-300'
					onClick={() => refetch()}
				>
					Buscar
				</button>
			</Box>

			<div className=' mx-auto !overflow-x-auto dark:text-slate-500  ' id='pdf-download'>
				<h2 className='my-4 text-2xl font-semibold leading-tight'>
					<span>
						Contratos a Vencer <br /> <span className='text-sm'> en los próximos {days} días </span>
					</span>
				</h2>
				<div className='!p-0 !m-0 '>
					<div className='' >
						<div className='w-full  !overflow-x-auto text-xs text-left whitespace-nowrap'>
							<div className=' rounded-t-lg   overflow-hidden'>
								<div className='flex px-1 gap-1    font-semibold border-b dark:border-slate-700 text-center'>
									<div className='w-[80px] bg-green-100l p-2 text-center border-r border-slate-400 dark:border-slate-700'>
										<span className='p-3 pl-0'>Vence el</span>
									</div>
									{/* <div className='w-[40px] bg-green-100 p-2 text-center border-r border-slate-400 dark:border-slate-700'>
										<span className='p-3 pl-0'>Resta</span>
									</div> */}
									<div className='w-[40px] bg-green-100l p-2 text-center border-r border-slate-400 dark:border-slate-700'>
										<span className='p-3 pl-0'>Cpta</span>
									</div>
									<div className='w-[150px]  bg-green-100l  p-2 text-center border-r border-slate-400 dark:border-slate-700'>
										<span className='p-3 pl-0'>Propiedad</span>
									</div>
									<div className='w-[150px]  bg-green-100l p-2 text-center border-r border-slate-400 dark:border-slate-700'>
										<span className='p-3 pl-0'>Propietario</span>
									</div>
									<div className='w-[150px]  bg-green-100l p-2 text-center border-r border-slate-400 dark:border-slate-700'>
										<span className='p-3 pl-0'>Inquilino</span>
									</div>
									<div className='w-[80px]  bg-green-100l p-2 text-center border-r border-slate-400 dark:border-slate-700'>
										<span className='p-3 pl-0'>Monto Alq.</span>
									</div>
									<div className='w-[80px] bg-green-100l p-2 text-center border-r border-slate-400 dark:border-slate-700'>
										<span className='p-3 pl-0'>Alq. Neto</span>
									</div>
									<div className='w-[40px]  bg-green-100l p-2 text-center border-r border-slate-400 dark:border-slate-700'>
										<span className='p-3 pl-0 '>Año</span>
									</div>
									<div className='w-[60px]  bg-green-100l p-2 text-center border-r border-slate-400 dark:border-slate-700'>
										<span className='p-3 pl-0 '>Ajuste</span>
									</div>
									<div className='w-[85px] bg-green-100l  p-2 text-center border-r border-slate-400 dark:border-slate-700'>
										<span className='p-3 pl-0 '>Ult. Cambio</span>
									</div>
									<div className='w-[50px] bg-green-100l p-2 text-center '>
										<span className='p-3 pl-0 '>Hace</span>
									</div>
									{/* <div className='w-[70px] '>
										<span className='p-3 pl-0'>Observaciones</span>
									</div> */}
								</div>
							</div>
							<div className=''>
								{data?.data.sort((a, b) => getExpiredDate(a.startDate).getTime() - getExpiredDate(b.startDate).getTime()).map((c: any) => {
									const ap: IHistorialPrice = c.PriceHistorials.sort((a: IHistorialPrice, b: IHistorialPrice) => a.id - b.id)[c.PriceHistorials.length - 1]

									return (
										<div key={c.id} className='flex px-1 gap-1 border-b border-slate-400 dark:border-slate-700 text-center'>
											<p className='w-[80px] bg-green-100l  truncate p-2 bg-red-100d px-0 border-r border-slate-400 dark:border-slate-700 text-center'>
												{formatDateDDMMYYYY(c.endDate)}
												{/* {formatDateDDMMYYYY(getExpiredDate(c.startDate).toISOString().slice(0, 10))} */}
											</p>
											{/* <p className='w-[40px] text-center truncate p-2 px-0 bg-green-100l  border-r border-slate-400 dark:border-slate-700'>
												{
													getDiffBetweenDate(c.startDate) <= 365 ?

														(365 - getDiffBetweenDate(c.startDate)) :
														(
															(getDiffBetweenDate(c.startDate) > 365 && getDiffBetweenDate(c.startDate) <= 730) ?
																((730 - getDiffBetweenDate(c.startDate))) :
																(1095 - getDiffBetweenDate(c.startDate))
														)
												}
											</p> */}
											<p className='w-[40px]  text-center bg-green-100l  border-r border-slate-400 dark:border-slate-700 truncate p-2 px-0 '>{c.Property.folderNumber}</p>
											<p className='w-[150px]  text-center bg-green-100l  border-r border-slate-400 dark:border-slate-700 truncate p-2 px-0  '>{c.Property.street} {c.Property.number} {c.Property.dept} - {c.Property.floor}</p>
											<p className='w-[150px] text-center bg-green-100l  border-r border-slate-400 dark:border-slate-700 truncate p-2 px-0'>{c.Property.Owner?.fullName}</p>
											<p className='w-[150px] bg-green-100l  border-r border-slate-400 dark:border-slate-700 truncate p-2 px-0'> {c.Client.fullName}</p>
											<p className='w-[80px]  bg-green-100l  border-r border-slate-400 dark:border-slate-700 truncate p-2 px-0'>${ap.amount}</p>
											<p className='w-[80px]  bg-green-100l  border-r border-slate-400 dark:border-slate-700 truncate p-2 px-0'>${ap.amount - (ap.amount * (c.Property?.Owner?.commision / 100))}</p>
											<p className='w-[40px]  bg-green-100l truncate border-r border-slate-400 dark:border-slate-700 p-2 px-0'>
												<span className={`${diferenceBetweentwoDatesInYears(c.startDate, new Date().toISOString().slice(0, 10)) === 3 && 'text-yellow-500 font-bold'}`}>
													{diferenceBetweentwoDatesInYears(c.startDate, new Date().toISOString().slice(0, 10))}
												</span>
											</p>
											<p className='w-[60px] truncate bg-green-100l border-r border-slate-400 dark:border-slate-700  p-2 px-0'>{c.adjustmentMonth}-({c.adjustmentMonth * 30}d)</p>
											<p className='w-[85px] truncate bg-green-100l border-r border-slate-400 dark:border-slate-700  p-2 px-0'>{formatDateDDMMYYYY(ap.createdAt)}</p>
											<p className='w-[50px] truncate bg-green-100l   p-2 px-0'>{getDiffBetweenDate(ap.createdAt)} dias</p>
										</div>
									)
								}

								)

								}
							</div>
						</div>
					</div>
				</div>
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



