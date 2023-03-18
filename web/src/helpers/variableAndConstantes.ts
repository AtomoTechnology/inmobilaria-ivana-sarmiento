export const PrimaryColor = '#f16fa1'
export const SecondaryColor = '#8b55f5'
export const DelayAlertToHide = 7000
export const monthsInSpanish = [
	'Enero',
	'Febrero',
	'Marzo',
	'Abril',
	'Mayo',
	'Junio',
	'Julio',
	'Agosto',
	'Septiembre',
	'Octubre',
	'Noviembre',
	'Diciembre',
]

export const selectedYears = () => {
	console.log('in')
	const year = new Date().getFullYear()
	return [year - 3, year - 2, year - 1, year, year + 1, year + 2, year + 3, year + 4]
}
