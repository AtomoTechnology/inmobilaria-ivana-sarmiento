import React from 'react'
import { AiOutlineDashboard, AiOutlineLogout } from 'react-icons/ai'
import { FaAngleDown } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { AuthState } from '../context/authContext'
import DefaultAvatar from './DefaultAvatar'
import { BsSun, BsFillMoonFill } from 'react-icons/bs'

type Props = {
	authState: AuthState
	signOut: () => void
	handleToggleTheme: () => void
	darkTheme: boolean
}

const LoggedUser = ({ authState, signOut, handleToggleTheme, darkTheme }: Props) => {
	const { user } = authState

	return (
		<>
			<div className='relative flex items-center justify-center text-left'>
				<button
					className='btn-toggle-theme btn gradient !p-0 !rounded-full !w-[35px] !h-[35px] !mr-4'
					onClick={handleToggleTheme}
					title='Tema negro/Blanco'
				>
					{darkTheme ? (
						<BsFillMoonFill
							color='white'
							size={25}
						/>
					) : (
						<BsSun
							size={25}
							color='white'
						/>
					)}
				</button>
				<div
					onClick={() => {
						document.querySelector('.dropdown-user-logged-box')!.classList.toggle('hidden')
					}}
				>
					<button
						type='button'
						className='flex justify-center items-center w-full gap-[1px] border border-gray-200 dark:border-slate-700  px-2  py-1 text-sm font-medium text-slate-700 dark:text-slate-400 rounded-xl transition-all  focus:outline-none'
						id='menu-button'
						aria-expanded='true'
						aria-haspopup='true'
					>
						{user?.photo ? (
							<img
								src={user.photo}
								className='!w-9 !h-9 rounded-full overflow-hidden object-cover'
								alt={user?.fullName}
							/>
						) : (
							<DefaultAvatar />
						)}
						<span className='ml-1'>{user?.fullName?.split(' ')[0]}</span>
						<FaAngleDown size={20} />
					</button>
				</div>

				<div
					style={{ zIndex: 900000 }}
					className='dropdown-user-logged-box hidden ring-black ring-opacity-5 transition-fade rounded-md shadow p-1 origin-top-right absolute right-0 mt-2 w-56 top-[60px]   bg-white dark:bg-slate-800  ring-1  focus:outline-none'
					role='menu'
					aria-orientation='vertical'
					aria-labelledby='menu-button'
					tabIndex={-1}
				>
					<div
						className='py-1 flex flex-col  gap-1'
						role='none'
					>
						<NavLink
							to='/dashboard'
							className='hover:text-red-600 flex items-center gap-1 rounded-xl  hover:bg-gray-100  text-gray-700  px-2 py-2 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-brand'
							role='menuitem'
							tabIndex={-1}
							id='menu-item-1'
						>
							<AiOutlineDashboard />
							<span>Dashboard</span>
						</NavLink>

						<div className='border-b border-gray-200 dark:border-slate-700 rounded-full my-1 w-full'></div>
						<button
							onClick={signOut}
							type='button'
							className='text-red-700  hover:rounded-xl flex items-center gap-1 w-full text-left px-2 py-2 text-sm hover:text-pink-600 dark:text-red-500'
							role='menuitem'
							tabIndex={-1}
							id='menu-item-3'
						>
							<AiOutlineLogout />
							<span>Cerrar sesión</span>
						</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default LoggedUser
