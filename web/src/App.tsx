import { Link, NavLink, Outlet } from 'react-router-dom'
import LoggedUser from './components/LoggedUser'
import { AuthContext } from './context/authContext'
import { useContext, useState } from 'react'
import CheckIcon from './components/icons/CheckIcon'
import CloseIcon from './components/icons/CloseIcon'
import logoApp from './assets/images/logo.png'
import DownAngle from './components/icons/DownAngle'
import { menuItems } from './helpers/general'
import { BsSun, BsFillMoonFill } from 'react-icons/bs'
import { DobleChevronAngle } from './components/icons/DobleChevronAngle'


export const ShowModal = ({ title, message, color = 'green' }: { title: string; message: string; color?: string }) => {
	let gradient = 'bg-gradient-error'
	switch (color) {
		case 'red':
			gradient = 'bg-gradient-error'
			break
		case 'green':
			gradient = 'bg-gradient-success'
			break
		case 'blue':
			gradient = 'bg-gradient-info'
			break

		default:
			gradient = 'bg-gradient-info'
			break
	}
	return (
		<div
			style={{ zIndex: 1010 }}
			className={`alert-app ${gradient} sign-success  fixed w-full sm:w-[400px] bottom-0 right-0 sm:bottom-10  sm:right-6 flex items-center gap-x-4 dark:text-white from-white   shadow-xl p-4 rounded-none sm:rounded-lg transition-all duration-300 ease-in-out `}
		>
			<CheckIcon color={color} />
			<div className='sign-description'>
				{/* <h4 className='text-lg text-slate-600 font-bold  '>{title}</h4> */}
				<span className='text-sm text-gray-500 relative '>{message}</span>
			</div>
			<button
				className='absolute top-1 right-1'
				onClick={() => {
					document.querySelector('.alert-app')?.classList.add('hidden')
				}}
			>
				<CloseIcon
					color='#4a5f7a'
					size={25}
				/>
			</button>
		</div>
	)
}

const App = () => {
	const { authState, signOut, toggleTheme, message } = useContext(AuthContext)
	const [darkTheme, setDarkTheme] = useState(localStorage.theme === 'dark')

	const handleToggleTheme = () => {
		if (localStorage.theme === 'dark') {
			localStorage.theme = 'light'
			document.documentElement.classList.remove('dark')
			toggleTheme('light')
			setDarkTheme(false)
		} else {
			localStorage.theme = 'dark'
			toggleTheme('dark')
			setDarkTheme(true)
			document.documentElement.classList.add('dark')
		}
	}

	return (
		<div className='App min-h-screen flex flex-col  dark:bg-gray-900 '>
			<header className='header bg-white sticky z-20 top-0 dark:bg-gray-900 shadow border-b border-gray-200 dark:border-slate-700'>
				<nav className='flex justify-between px-4 items-center h-full'>
					<Link to='/' className='logo-app'>
						{/* <span className='title-form text-2xl sm:3xl'>TEST MODE!</span> */}
						<img
							width={100}
							className='min-w-[100px] object-cover'
							src={logoApp}
							alt='LOGO CENTRO'
						/>
					</Link>
					<ul className='hidden lg:flex items-center gap-x-2 text-white '>
						{menuItems.map((item, index) =>
							item.to !== null ? (
								<NavLink
									to={item.to}
									key={index}
									className={({ isActive, isPending }) =>
										`relative items-center  justify-center flex  h-[70px] text-brand2 dark:text-slate-400  dark:hover:text-brand hover:text-brand group p-1 ${isActive ? 'underline !text-brand rounded-md   ' : isPending ? 'pending' : ''
										}`
									}
								>
									{item.title}
								</NavLink>
							) : (
								<li
									key={index}
									className={`relative dark:text-slate-400  items-center  justify-center flex  h-[70px]  dark:hover:text-brand  text-brand2 hover:text-brand group p-1`}
								>
									{item.title}
									<DobleChevronAngle />

									<ul
										style={{ zIndex: 900000 }}
										className='absolute top-[70px]  p-3 w-[250px] hidden transition-colors duration-1000 group-hover:flex bg-white border dark:bg-slate-800 dark:border-slate-700  border-gray-100  flex-col gap-y-2 rounded-b-md shadow '
									>
										{item.subLink.map((sub, index) => (
											<NavLink
												key={index}
												to={sub.to}
												className={({ isActive, isPending }) =>
													`text-brand2 dark:text-slate-400 hover:!text-brand ${isActive ? 'underline !text-brand ' : isPending ? 'pending' : ''
													}`
												}
											>
												{' '}
												{sub.title}{' '}
											</NavLink>
										))}
									</ul>
								</li>)
						)}
					</ul>

					<LoggedUser
						darkTheme={darkTheme}
						handleToggleTheme={handleToggleTheme}
						signOut={signOut}
						authState={authState}
					/>
				</nav>
			</header>

			<main className='my-6  sm:grid  items-center justify-center'>
				<Outlet />
			</main>
			{/* from-brand2 to-brand */}
			<footer className='mt-auto bg-gray-100  bg-gradient-to-r from-slate-900 to-brand dark:from1-slate-600 dark:to1-slate-700  dark:bg-[#061122]  p-2 '>
				<div className='container m-auto'>
					<section className='py-6'>
						<div className='px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl'>
							<div className=''>
								<div className='flex flex-col gap-6 sm:gap-0 sm:flex-row  items-center justify-center sm:justify-between '>
									<img
										className='w-24'
										width={50}
										src={logoApp}
										alt='LOGO CENTRO'
									/>
									{/* <span className='dark:text-white text-slate-800 font-bold text-2xl sm:3xl'>TEST MODE!</span> */}
									<button
										className='btn-toggle-theme1 btn gradient !p-0 !rounded-full !w-[35px] !h-[35px] !mr-4'
										onClick={handleToggleTheme}
										title='Claro/Oscuro'
									>
										{darkTheme ? (<BsFillMoonFill color='white' size={25} />) : (<BsSun size={25} color='white' />)}
									</button>
									<p className='mt-5 text-base sm:text-lg text-white  sm:mt-0'>© Copyright 2021 Centro-Administracion</p>
								</div>

								{/* <div className='items-center mt-8 sm:mt-0 sm:flex sm:justify-end sm:space-x-8'> */}
								{/* <div className='w-full h-px mt-8 mb-5 sm:w-px sm:m-0 sm:h-6 bg-gray-50/20'></div> */}

								{/* <ul className='flex items-center justify-center space-x-8 xl:justify-end'>
										<li>
											<a
												href='#'
												title=''
												className='block text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80'
											>
												<svg
													className='w-6 h-6'
													xmlns='http://www.w3.org/2000/svg'
													viewBox='0 0 24 24'
													fill='currentColor'
												>
													<path d='M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z'></path>
												</svg>
											</a>
										</li>

										<li>
											<a
												href='#'
												title=''
												className='block text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80'
											>
												<svg
													className='w-6 h-6'
													xmlns='http://www.w3.org/2000/svg'
													viewBox='0 0 24 24'
													fill='currentColor'
												>
													<path d='M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z'></path>
												</svg>
											</a>
										</li>

										<li>
											<a
												href='#'
												title=''
												className='block text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80'
											>
												<svg
													className='w-6 h-6'
													xmlns='http://www.w3.org/2000/svg'
													viewBox='0 0 24 24'
													fill='currentColor'
												>
													<path d='M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z'></path>
													<circle
														cx='16.806'
														cy='7.207'
														r='1.078'
													></circle>
													<path d='M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z'></path>
												</svg>
											</a>
										</li>
									</ul> */}
								{/* </div> */}
							</div>
						</div>
					</section>
				</div>
			</footer>
			{authState.alert?.show && (
				<ShowModal
					title={authState.alert?.title!}
					message={authState.alert?.message!}
					color={authState.alert?.color}
				/>
			)}
		</div>
	)
}

export default App
