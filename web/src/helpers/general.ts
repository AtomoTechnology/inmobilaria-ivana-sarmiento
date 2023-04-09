export const getColorBox = (text: string): string => {
	let color: string = '';
	switch (text) {
		case 'CE':
			color = '#016dbe';
			break;
		case 'MJ':
			color = '#e340ff';
			break;
		case 'EE':
			color = '#afaaaa';
			break;
		case 'VR':
			color = '#74c714';
			break;
		case 'HC':
			color = '#ff9800';
			break;
		case 'RN':
			color = '#00a495';
			break;
		case 'GA':
			color = '#016dbe';
			break;

		default:
			color = '#016dbe';
			break;
	}

	return color;
};
export async function copyToClipboard(text: string) {
	try {
		await navigator.clipboard.writeText(text);
		console.log('Text copied to clipboard');
	} catch (err) {
		console.error('Failed to copy text: ', err);
	}
}

export const validateMail = (mail: string): boolean => {
	return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(mail);
};



export const menuItems = [
	{
		to: null,
		title: 'Informes',
		subLink: [
			{ to: 'eventualities', title: 'Eventualidades' },
			{ to: 'contract-debts-clients', title: 'Deudas x inqulinos' },
			{ to: 'contract-debts-owners', title: 'Deudas x  propietario' },
			{ to: 'contracts-expired', title: 'Vto de contratos' },
			{ to: 'contract-price-historial', title: 'Ajustes % contratos' },
			{ to: 'client-expenses', title: 'Impuestos inquilinos' },
			{ to: 'owner-expenses', title: 'Impuestos propietario' },
		],
	},

	{
		to: null,
		title: 'Consultas',
		subLink: [
			{ to: 'properties/Venta', title: 'Deptos en venta' },
			{ to: 'properties/Alquiler', title: 'Deptos en Alquiler' },
			{ to: 'visits', title: 'Visitas' },
			{ to: 'claims', title: 'Reclamos' },
		],
	},
	{
		to: null,
		title: 'Pagos',
		subLink: [
			{ to: 'client-payment', title: 'Cobro a inquilino' },
			{ to: 'owner-payment', title: 'Pago a propietario' },
			{ to: 'properties', title: 'Lista conceptos' },
			// { to: 'revert-payment', title: 'Revertir cobro' },
		],
	},


	{
		to: 'clients',
		title: 'Inquilinos',
		subLink: [],
	},
	{
		to: 'owners',
		title: 'Propietarios',
		subLink: [],
	},
	{
		to: 'contracts',
		title: 'Contratos',
		subLink: [],
	},
	{
		to: null,
		title: 'ABM',
		subLink: [
			{ to: 'zones', title: 'Zonas' },
			{ to: 'payment-methods', title: 'Tipo de pago' },
			{ to: 'property-types', title: 'Tipo de propiedades' },
			{ to: 'properties', title: 'Propiedades' },
			{ to: 'configurations', title: 'Infos general' },
		],
	},
]
