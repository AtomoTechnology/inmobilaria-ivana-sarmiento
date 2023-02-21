import { NavLink, Outlet } from 'react-router-dom';
import LoggedUser from './components/LoggedUser';
import { AuthContext } from './context/authContext';
import { useContext, useState } from 'react'
import { InputSwitch } from 'primereact/inputswitch';
import CheckIcon from './components/icons/CheckIcon';
import CloseIcon from './components/icons/CloseIcon';
import logoApp from './assets/images/logo.png'
const menuItems = [
  {
    to: null,
    title: 'ABM',
    subLink: [
      { to: 'zones', title: 'Zonas' },
      { to: 'payment-methods', title: 'Tipo de pago' },
      { to: 'property-types', title: 'Tipo de propiedades' },
    ],
  },
  {
    to: 'contracts',
    title: 'Contratos',
    subLink: []
  },
  {
    to: 'clients',
    title: 'Inquilinos',
    subLink: []
  },
  {
    to: 'payments',
    title: 'Cobros',
    subLink: []

  },
];

export const ShowModal = ({ title, message, color = 'green' }: { title: string, message: string, color?: string }) => {

  let gradient = 'bg-gradient-error';
  switch (color) {
    case 'red':
      gradient = 'bg-gradient-error'
      break;
    case 'green':
      gradient = 'bg-gradient-success'
      break;
    case 'blue':
      gradient = 'bg-gradient-info'
      break;

    default:
      gradient = 'bg-gradient-info'
      break;
  }
  return (
    <div style={{ zIndex: 1010 }} className={`alert-app ${gradient} sign-success  fixed w-[400px] bottom-10 right-6 flex items-center gap-x-4 dark:text-white from-white   shadow-xl p-4 rounded-md border border-gray-100 `}>
      <CheckIcon color={color} />
      <div className="sign-description">
        <h4 className='text-lg text-slate-600 font-bold  '>{title}</h4>
        <span className='text-sm text-gray-500 relative -top-1'>{message}</span>
      </div>
      <button
        className='absolute top-2 right-3'
        onClick={() => {
          document.querySelector('.alert-app')?.classList.add('hidden');
        }}> <CloseIcon color='gray' size={30} /> </button>
    </div>
  )
}

const App = () => {

  const { authState, signOut } = useContext(AuthContext)
  const [darkTheme, setDarkTheme] = useState(localStorage.theme === 'dark');

  const handleToggleTheme = (e: any) => {
    if (localStorage.theme === 'dark') {
      localStorage.theme = 'light'
      document.documentElement.classList.remove('dark')
      setDarkTheme(false)
    } else {
      localStorage.theme = 'dark'
      setDarkTheme(true)
      document.documentElement.classList.add('dark')
    }
  }

  return (
    <div className='App min-h-screen flex flex-col  dark:bg-gray-900 '>

      <header className='header h-[80px] bg-white dark:bg-gray-900 shadow border-b border-gray-200 dark:border-slate-700'>
        <nav className='flex justify-between px-4 items-center h-full'>
          <div className='logo-app'>
            <img
              width={100}
              className='min-w-[100px] object-cover'
              src={logoApp}
              alt='LOGO CENTRO'
            />
          </div>
          <ul className='hidden sm:flex items-center gap-x-2 text-white'>
            {menuItems.map((item, index) => (
              item.to !== null ? (
                <NavLink to={item.to}
                  key={index}
                  className={({ isActive, isPending }) => `relative text-brand2 dark:text-slate-500  dark:hover:text-brand hover:text-brand group p-1 ${isActive ? "underline !text-brand bg-gray-100 rounded-md dark:bg-slate-700  " : isPending ? "pending" : ""}`}
                >
                  {item.title}
                </NavLink>
              ) : (
                <li
                  key={index}
                  className={`relative dark:text-slate-500  dark:hover:text-brand  text-brand2 hover:text-brand group p-1`}
                >
                  {item.title}
                  {
                    item.subLink.length > 0 && (
                      <ul
                        style={{ zIndex: 900000 }}

                        className='absolute top-8 p-3 w-[200px] hidden transition-colors duration-1000 group-hover:flex bg-white border dark:bg-slate-800 dark:border-slate-700  border-gray-100  flex-col gap-y-2 rounded-md shadow '

                      >
                        {item.subLink.map((sub, index) => (
                          <NavLink
                            key={index}
                            to={sub.to}
                            className={({ isActive, isPending }) => `text-brand2 dark:text-slate-600 hover:!text-brand ${isActive ? "underline !text-brand " : isPending ? "pending" : ""}`}
                          > {sub.title} </NavLink>
                        ))}
                      </ul>
                    )
                  }
                </li>
              )

            ))}
          </ul>
          <InputSwitch checked={darkTheme} size={140} onChange={handleToggleTheme} className='!hidden sm:!block' />
          <LoggedUser signOut={signOut} authState={authState} />
        </nav>
      </header>

      <main className='my-6'>
        <Outlet />
      </main>

      <footer className='mt-auto bg-gray-100 h-[150px] dark:bg-[#061122]  p-6 '>
        <div className='container m-auto'>Footer</div>
      </footer>

      {authState.alert?.show && (<ShowModal title={authState.alert?.title!} message={authState.alert?.message!} color={authState.alert?.color} />)}

    </div>
  );
};

export default App;
