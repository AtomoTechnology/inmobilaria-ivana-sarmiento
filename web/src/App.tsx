import { NavLink, Outlet } from 'react-router-dom';
import LoggedUser from './components/LoggedUser';
import { AuthContext } from './context/authContext';
import { useContext, useState } from 'react'
import { InputSwitch } from 'primereact/inputswitch';

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
    to: 'payments',
    title: 'Cobros',
    subLink: []

  },
]

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
  // console.log(authState)
  return (
    <div className='App min-h-screen flex flex-col dark:bg-gray-900 '>
      <header className='header h-[80px] bg-white dark:bg-gray-900 shadow border-b border-gray-200 dark:border-slate-700'>
        <nav className='flex justify-between px-4 items-center h-full'>
          <div className='logo-app'>
            <img
              width={150}
              src='https://upload.wikimedia.org/wikipedia/en/thumb/8/86/Ares_Management_logo.svg/2560px-Ares_Management_logo.svg.png'
              alt='LOGO CENTRO'
            />
          </div>
          <ul className='flex items-center gap-x-2 text-white'>
            {menuItems.map((item, index) => (
              item.to !== null ? (
                <NavLink to={item.to}
                  key={index}
                  className={({ isActive, isPending }) => `relative text-brand2 dark:text-slate-500  dark:hover:text-brand hover:text-brand group p-1 ${isActive ? "underline !text-brand bg-gray-100 rounded-md " : isPending ? "pending" : ""}`}
                >
                  {item.title}
                  {
                    item.subLink?.length > 0 && (
                      <ul
                        className='absolute top-8 z-auto p-3 w-[200px] hidden transition-colors duration-1000 group-hover:flex bg-white border border-gray-100  flex-col gap-y-2 rounded-md shadow'

                      >
                        {item.subLink.map((sub: any, index) => (
                          <NavLink
                            key={index}
                            to={sub.to!}
                            className={({ isActive, isPending }) => `text-brand2 hover:text-brand ${isActive ? "underline !text-brand " : isPending ? "pending" : ""}`}
                          > {sub.title!} </NavLink>
                        ))}
                      </ul>
                    )
                  }
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

                        className='absolute top-8 p-3 w-[200px] hidden transition-colors duration-1000 group-hover:flex bg-white border border-gray-100  flex-col gap-y-2 rounded-md shadow'

                      >
                        {item.subLink.map((sub, index) => (
                          <NavLink
                            key={index}
                            to={sub.to}
                            className={({ isActive, isPending }) => `text-brand2 hover:text-brand ${isActive ? "underline !text-brand " : isPending ? "pending" : ""}`}
                          > {sub.title} </NavLink>
                        ))}
                      </ul>
                    )
                  }
                </li>
              )

            ))}
          </ul>
          <InputSwitch checked={darkTheme} onChange={handleToggleTheme} className='hidden sm:block' tooltip='changer de thème' tooltipOptions={{ position: 'bottom', mouseTrack: true, mouseTrackTop: 15 }} />

          <LoggedUser signOut={signOut} authState={authState} />
        </nav>
      </header>
      <main className='my-6'>
        <Outlet />
      </main>
      <footer className='mt-auto h-[150px] dark:bg-slate-900   p-6 bg-red-200'>
        <div className='container m-auto'>Footer</div>
      </footer>
    </div>
  );
};

export default App;
