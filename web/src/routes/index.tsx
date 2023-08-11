import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import SignIn from '../views/auth/SignIn'
import SignUp from '../views/auth/signUp'
import Clients from '../views/clients/allClients'
import Owners from '../views/clients/owners'
import ClientExpenses from '../views/contracts/ClientExpenses'
import ContractDetail from '../views/contracts/ContractDetail'
import Contracts from '../views/contracts/Contracts'
import DebtsClients from '../views/contracts/debtsClients'
import DebtsOwners from '../views/contracts/debtsOwners'
import Eventualities from '../views/contracts/eventualities'
import ExpiredContracts from '../views/contracts/ExpiredContracts'
import HistorialPrices from '../views/contracts/HistorialPrice'
import OwnerExpenses from '../views/contracts/OwnerExpenses'
import Claims from '../views/general/Claims'
import Configurations from '../views/general/configurations'
import PageNotFound from '../views/general/PageNotFound'
import Visits from '../views/general/visits'
import Home from '../views/Home'
import AllPaymentTypes from '../views/payment/allPaymentTypes'
import ClientPayments from '../views/payment/clientPayments'
import OwnerPayment from '../views/payment/ownerPayment'
import AllPropertyTypes from '../views/properties/allTypes'
import Properties from '../views/properties/properties'
import AllZones from '../views/zones/allZones'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import Guarantors from '../views/contracts/Guarantors'
import Budgets from '../views/general/budgets'
import ResetPassword from '../views/auth/ResetPassword'

export const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<PrivateRoute>
				<App />
			</PrivateRoute>
		),
		errorElement: <h1>error</h1>, // TODO: design this pages
		children: [
			{
				path: '/home',
				element: (
					<PrivateRoute>
						<Home />
					</PrivateRoute>
				),
			},
			{
				path: '/zones',
				element: (
					<PrivateRoute>
						<AllZones />
					</PrivateRoute>
				),
			},
			{
				path: '/payment-methods',
				element: (
					<PrivateRoute>
						<AllPaymentTypes />
					</PrivateRoute>
				),
			},
			{
				path: '/property-types',
				element: (
					<PrivateRoute>
						<AllPropertyTypes />
					</PrivateRoute>
				),
			},
			{
				path: '/clients',
				element: (
					<PrivateRoute>
						<Clients />
					</PrivateRoute>
				),
			},
			{
				path: '/owners',
				element: (
					<PrivateRoute>
						<Owners />
					</PrivateRoute>
				),
			},
			{
				path: '/guarantors',
				element: (
					<PrivateRoute>
						<Guarantors />
					</PrivateRoute>
				),
			},

			{
				path: '/properties',
				element: (
					<PrivateRoute>
						<Properties />
					</PrivateRoute>
				),
			},
			{
				path: '/properties/:isFor',
				element: (
					<PrivateRoute>
						<Properties />
					</PrivateRoute>
				),
			},
			{
				path: '/contracts',
				element: (
					<PrivateRoute>
						<Contracts />
					</PrivateRoute>
				),
			},
			{
				path: '/contracts-expired',
				element: (
					<PrivateRoute>
						<ExpiredContracts />
					</PrivateRoute>
				),
			},
			{
				path: '/contracts/:id/:uuid',
				element: (
					<PrivateRoute>
						<ContractDetail />
					</PrivateRoute>
				),
			},
			{
				path: '/client-expenses',
				element: (
					<PrivateRoute>
						<ClientExpenses />
					</PrivateRoute>
				),
			},
			{
				path: '/owner-expenses',
				element: (
					<PrivateRoute>
						<OwnerExpenses />
					</PrivateRoute>
				),
			},
			{
				path: '/contract-price-historial',
				element: (
					<PrivateRoute>
						<HistorialPrices />
					</PrivateRoute>
				),
			},
			{
				path: '/contract-debts-clients',
				element: (
					<PrivateRoute>
						<DebtsClients />
					</PrivateRoute>
				),
			},
			{
				path: '/contract-debts-owners',
				element: (
					<PrivateRoute>
						<DebtsOwners />
					</PrivateRoute>
				),
			},
			{
				path: '/client-payment',
				element: (
					<PrivateRoute>
						<ClientPayments />
					</PrivateRoute>
				),
			},
			{
				path: '/owner-payment',
				element: (
					<PrivateRoute>
						<OwnerPayment />
					</PrivateRoute>
				),
			},
			{
				path: '/signup',
				element: (
					<PrivateRoute>
						<SignUp />
					</PrivateRoute>
				),
			},
			{
				path: '/eventualities',
				element: (
					<PrivateRoute>
						<Eventualities />
					</PrivateRoute>
				),
			},
			{
				path: '/visits',
				element: (
					<PrivateRoute>
						<Visits />
					</PrivateRoute>
				),
			},
			{
				path: '/claims',
				element: (
					<PrivateRoute>
						<Claims />
					</PrivateRoute>
				),
			},
			{
				path: '/budgets',
				element: (
					<PrivateRoute>
						<Budgets />
					</PrivateRoute>
				),
			},
			{
				path: '/configurations',
				element: (
					<PrivateRoute>
						<Configurations />
					</PrivateRoute>
				),
			},
			{
				path: '/*',
				element: <PageNotFound />,
			},
		],
	},
	{
		path: '/sign-in',
		element: (
			<PublicRoute>
				<SignIn />
			</PublicRoute>
		),
	},
	{
		path: '/resetPassword/:token',
		element: (
			<PublicRoute>
				<ResetPassword />
			</PublicRoute>
		),
	},
])
