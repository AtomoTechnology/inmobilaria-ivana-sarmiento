import { Dropdown } from 'primereact/dropdown'
import React, { useState } from 'react'

const ExpiredContracts = () => {
	const [days, setDays] = useState(60)
	return (
		<div className='container m-auto  flexsm:mx-0  flex-col justify-center sm:justify-center'>
			<div className='expired-contracts '>
				<Dropdown
					value={days}
					onChange={(e: any) => setDays(e.value)}
					options={[30, 60, 90]}
					// optionLabel='fullName'
					// optionValue='id'
					// showClear
					placeholder='Cantidad diás'
					className='h-[42px]  items-center !border-gray-200 dark:!border-gray-700 shadow dark:bg-slate-900 dark:!text-slate-400 '
				/>
			</div>
			<div className='results'></div>
		</div>
	)
}

export default ExpiredContracts
