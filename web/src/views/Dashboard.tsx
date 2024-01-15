import { Chart } from 'primereact/chart'
import { useEffect, useState } from 'react'
import http from '../api/axios'
import { Dropdown } from 'primereact/dropdown'
import { monthsInSpanish } from '../helpers/variableAndConstantes'
import Box from '../components/Box'
import { GetTotalByMonth, IStatisticsPayment } from '../interfaces/IpaymentType'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { formatPrice } from '../helpers/numbers'

const bgColors = [
  'rgba(255, 87, 51, 0.2)', // Orange
  'rgba(76, 175, 80, 0.2)', // Green
  'rgba(52, 152, 219, 0.2)', // Blue
  'rgba(255, 195, 0, 0.2)', // Yellow
  'rgba(155, 89, 182, 0.2)', // Purple
  'rgba(231, 76, 60, 0.2)', // Red
  'rgba(46, 204, 113, 0.2)', // Emerald
  'rgba(243, 156, 18, 0.2)', // Orange
  'rgba(26, 188, 156, 0.2)', // Turquoise
  'rgba(142, 68, 173, 0.2)', // Dark Purple
  'rgba(230, 126, 34, 0.2)', // Carrot Orange
  'rgba(52, 152, 219, 0.2)', // Sky Blue
]

const borderColors = [
  '#FF5733', // Orange
  '#4CAF50', // Green
  '#3498DB', // Blue
  '#FFC300', // Yellow
  '#9B59B6', // Purple
  '#E74C3C', // Red
  '#2ECC71', // Emerald
  '#F39C12', // Orange
  '#1ABC9C', // Turquoise
  '#8E44AD', // Dark Purple
  '#E67E22', // Carrot Orange
  '#3498DB', // Sky Blue
]

const cYear = new Date().getFullYear()

// generate 15 years before the current year
const years = Array.from(new Array(15), (val, index) => cYear - index)

const Dashboard = () => {
  const [getTotalByPaymentType, setGetTotalByPaymentType] = useState<any>({})
  const [getTotalByMonth, setGetTotalByMonth] = useState<any>({})
  const [getTotalByPaymentType2, setGetTotalByPaymentType2] = useState<any>({})
  const [getTotalByMonth2, setGetTotalByMonth2] = useState<any>({})
  const [year, setYear] = useState(2023)
  const [month, setMonth] = useState(monthsInSpanish[new Date().getMonth() + 4])

  const getData = async () => {
    const res1 = http.get<IStatisticsPayment>(`/payment-clients/statistics?year=${year}&month=${month}`)
    const res2 = http.get<IStatisticsPayment>(`/payment-owners/statistics?year=${year}&month=${month}`)
    const [res1Data, res2Data] = await Promise.all([res1, res2])
    console.log(res1Data.data)
    console.log(res2Data.data)

    // cobros por mes config
    setGetTotalByMonth({
      labels: res1Data.data.getTotalByMonth.map((item) => item.month),
      datasets: [
        {
          label: 'Cobros por mes',
          data: res1Data.data.getTotalByMonth.map((item) => item.total),
          backgroundColor: bgColors,
          borderColor: borderColors,
          borderWidth: 1,
        },
      ],
    })
    // totalByPyamentType
    setGetTotalByPaymentType({
      labels: res1Data.data.getTotalByPaymentType.map((item: any) => item.PaymentTypeName),
      datasets: [
        {
          data: res1Data.data.getTotalByPaymentType.map((item: any) => item.total),
          backgroundColor: bgColors.slice(0, res1Data.data.getTotalByPaymentType.length),
          hoverBackgroundColor: borderColors.slice(0, res1Data.data.getTotalByPaymentType.length),
          borderWidth: 1,
        },
      ],
    })

    // pagos por mes config
    setGetTotalByMonth2({
      labels: res2Data.data.getTotalByMonth.map((item) => item.month),
      datasets: [
        {
          label: 'Pagos por mes',
          data: res2Data.data.getTotalByMonth.map((item) => item.total),
          backgroundColor: bgColors,
          borderColor: borderColors,
          borderWidth: 1,
        },
      ],
    })
    // totalByPyamentType
    setGetTotalByPaymentType2({
      labels: res2Data.data.getTotalByPaymentType.map((item: any) => item.PaymentTypeName),
      datasets: [
        {
          data: res2Data.data.getTotalByPaymentType.map((item: any) => item.total),
          backgroundColor: bgColors.slice(0, res2Data.data.getTotalByPaymentType.length),
          hoverBackgroundColor: borderColors.slice(0, res2Data.data.getTotalByPaymentType.length),
          borderWidth: 1,
        },
      ],
    })
  }

  useEffect(() => {
    getData()
  }, [year, month])

  return (
    <div className='dashboard bg-red-300s w-full md:w-[700px] lg:w-[1000px]  max-w-4xl'>
      <Box className='mb-6 !p-0 sm:!p-0 mx-0 sm:mx-0 border-none bg-transparent dark:bg-transparent shadow-none'>
        <div className='header-statistics flex flex-col sm:flex-row gap-6'>
          <Dropdown
            value={month}
            onChange={(val) => setMonth(val.value)}
            showClear
            options={monthsInSpanish}
            placeholder='Seleccione un mes'
            className='h-[42px] sm:w-[200px]  items-center border-gray-200 shadow dark:bg-slate-800 dark:border-slate-700'
          />
          <Dropdown
            value={year}
            options={years}
            placeholder='Seleccione un año'
            className='h-[42px] sm:w-[200px]  items-center border-gray-200 shadow dark:bg-slate-800 dark:border-slate-700'
            onChange={(val) => setYear(val.value)}
          />
        </div>
      </Box>
      {(getTotalByPaymentType?.labels?.length > 0 || getTotalByMonth?.labels?.length > 0) && (
        <div className='border border-slate-300 dark:border-slate-700 p-6 rounded-xl w-full'>
          <div className='flex items-center justify-center'>
            <Link
              to={'/client-payment'}
              className='text-slate-400 flex items-center gap-1 justify-center  w-fit py-1 px-2 hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer duration-300 transition-colors rounded-full group'
            >
              <span>Cobros</span>
              <BiChevronRight className=' mt-1 group-hover:text-brand2' />
            </Link>
          </div>
          <div className='flex items-center flex-col md:flex-row gap-12 p-4 justify-center'>
            {getTotalByPaymentType?.labels?.length > 0 && (
              <Chart
                type='doughnut'
                data={getTotalByPaymentType}
                options={{ cutout: '60%' }}
                className='w-full sm:w-[250px]  bg-red-100s '
                height='1000'
              />
            )}
            {getTotalByMonth?.labels?.length > 0 && (
              <Chart
                type='bar'
                data={getTotalByMonth}
                options={{
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
                className='w-full flex-1  bg-slate-400s'
              />
            )}
          </div>
          <div className='flex items-center justify-center'>
            <h3 className='text-slate-400 flex items-center gap-1 justify-center  w-fit py-1 px-2  cursor-pointer duration-300 transition-colors rounded-full hover:text-brand'>
              <span>Total : $</span>
              <span>{formatPrice(getTotalByMonth?.datasets[0].data?.reduce((a: number, b: number) => a + b, 0))}</span>
            </h3>
          </div>
        </div>
      )}
      {(getTotalByPaymentType2?.labels?.length > 0 || getTotalByMonth2?.labels?.length > 0) && (
        <div className='border border-slate-300 dark:border-slate-700 p-6 rounded-xl my-6 '>
          <div className='flex items-center justify-center'>
            <Link
              to={'/owner-payment'}
              className='text-slate-400 flex items-center gap-1 justify-center  w-fit py-1 px-2 hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer duration-300 transition-colors rounded-full group'
            >
              <span>Pagos</span>
              <BiChevronRight className=' mt-1 group-hover:text-brand2' />
            </Link>
          </div>
          <div className='flex items-center flex-col md:flex-row gap-12 p-4 justify-center'>
            {getTotalByPaymentType2?.labels?.length > 0 && (
              <Chart
                type='doughnut'
                data={getTotalByPaymentType2}
                options={{ cutout: '60%' }}
                className='w-full sm:w-[300px]  bg-red-100s '
                height='1000'
              />
            )}
            {getTotalByMonth2?.labels?.length > 0 && (
              <Chart
                type='bar'
                data={getTotalByMonth2}
                options={{
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
                className='w-full  bg-slate-400s'
              />
            )}
          </div>
          <div className='flex items-center justify-center'>
            <h3 className='text-slate-400 flex items-center gap-1 justify-center  w-fit py-1 px-2  cursor-pointer duration-300 transition-colors rounded-full hover:text-brand'>
              <span>Total : $</span>
              <span>{formatPrice(getTotalByMonth2?.datasets[0].data?.reduce((a: number, b: number) => a + b, 0))}</span>
            </h3>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
