export {}

export const formatDate = (date: string) => {
	let now = new Date(date)
	return (
		now.getUTCFullYear().toString() +
		'-' +
		(now.getUTCMonth() + 1).toString().padStart(2, '0') +
		'-' +
		now.getUTCDate().toString().padStart(2, '0') +
		' ' +
		(now.getUTCHours() - 3).toString().padStart(2, '0') +
		':' +
		now.getUTCMinutes().toString().padStart(2, '0')
	)
}
// console.log(data.date.slice(0, 10) + ' ' + data.date.slice(11, 16))

export function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}

export function formatDateDDMMYYYY(date :string) {
	let d = new Date(date)
  return [
    padTo2Digits(d.getUTCDate()),
    padTo2Digits(d.getUTCMonth() + 1),
    d.getUTCFullYear(),
  ].join('-');
}



export const diffenceBetweenDates = (date1: string, date2: string) => {
	let now = new Date(date1)
	let now2 = new Date(date2)
	let diff = now2.getTime() - now.getTime()
	let diffDays = Math.ceil(diff / (1000 * 3600 * 24))
	return diffDays
}