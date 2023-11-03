import { Chart } from 'primereact/chart'
import { useEffect, useState } from 'react'

const Dashboard = () => {
  const [chartData, setChartData] = useState({})
  const [chartOptions, setChartOptions] = useState({})

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement)
    const data = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--green-500')
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--yellow-400'),
            documentStyle.getPropertyValue('--green-400')
          ]
        }
      ]
    }
    const options = {
      cutout: '60%'
    }

    setChartData(data)
    setChartOptions(options)
  }, [])
  return (
    <div className='dashboard'>
      <h3 className='text-slate-400'>En desarrollo...</h3>
      {/* <Chart type="doughnut" data={chartData} options={chartOptions}  className="w-full md:w-30rem" /> */}
    </div>
  )
}

export default Dashboard