export const roundUp = (value: number) => Math.ceil(Number(value))

export const formatPrice = (price: number) => price.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 2, })
