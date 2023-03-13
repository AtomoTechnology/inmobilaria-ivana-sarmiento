export {}

export const formatDate = (date: string) => {
	let now = new Date(date)
	return (
		now.getUTCFullYear().toString() +
		'/' +
		(now.getUTCMonth() + 1).toString() +
		'/' +
		now.getUTCDate() +
		' ' +
		(now.getUTCHours() - 3).toString() +
		':' +
		now.getUTCMinutes().toString().padStart(2, '0')
	)
}
