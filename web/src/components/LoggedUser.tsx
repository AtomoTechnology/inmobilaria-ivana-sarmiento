import React from 'react';
import { AiOutlineDashboard, AiOutlineLogout, AiOutlineUserAdd } from 'react-icons/ai';
import { FaAngleDown } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { AuthState } from '../context/authContext';
import DefaultAvatar from './DefaultAvatar';

type Props = {
  authState: AuthState;
  signOut: () => void;
};

const LoggedUser = ({ authState, signOut }: Props) => {

  const { user } = authState;

  return (
    <>
      <div className='relative inline-block text-left'>
        <div
          onClick={() => {
            document.querySelector('.dropdown-user-logged-box')!.classList.toggle('hidden');
          }}
        >
          <button
            type='button'
            className='flex justify-center items-center w-full gap-[1px] border border-gray-200  px-2  py-1 text-sm font-medium text-slate-700 rounded-xl transition-all  focus:outline-none'
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
          className='dropdown-user-logged-box hidden ring-black ring-opacity-5 transition-fade rounded-md shadow p-1 origin-top-right absolute right-0 mt-2 w-56   bg-white ring-1  focus:outline-none'
          role='menu'
          aria-orientation='vertical'
          aria-labelledby='menu-button'
          tabIndex={-1}
        >
          <div className='py-1 flex flex-col  gap-1' role='none'
          >
            <NavLink
              to='/dashboard'
              className='hover:text-red-600 flex items-center gap-1 rounded-xl  hover:bg-gray-100 text-gray-700  px-2 py-2 '
              role='menuitem'
              tabIndex={-1}
              id='menu-item-1'
            >
              <AiOutlineDashboard />
              <span>Dashboard</span>
            </NavLink>
            <NavLink
              to='/profile'
              className='hover:text-red-600 flex items-center gap-1 rounded-xl  hover:bg-gray-100 text-gray-700  px-2 py-2 '
              role='menuitem'
              tabIndex={-1}
              id='menu-item-2'
            >
              <AiOutlineUserAdd />
              <span>Profile</span>
            </NavLink>
            <div className='border-b border-gray-200 rounded-full my-1 w-full'></div>
            <button
              onClick={signOut}
              type='button'
              className='text-red-700 hover:rounded-xl flex items-center gap-1 w-full text-left px-2 py-2 text-sm hover:text-pink-600'
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
  );
};

export default LoggedUser;
