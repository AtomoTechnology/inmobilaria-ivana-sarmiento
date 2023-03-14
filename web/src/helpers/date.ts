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
