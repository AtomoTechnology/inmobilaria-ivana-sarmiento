import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';



import http from './../../api/axios';
import { useForm } from '../../hooks/useForm';
import { AuthContext } from '../../context/authContext';
import Loading from '../../components/Loading';
import Box from '../../components/Box';

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>();
  const [loginError, setLoginError] = useState(null);
  const [loginErrorGoogle, setLoginErrorGoogle] = useState<null | string>(null);

  const navigate = useNavigate();
  const { signIn } = useContext(AuthContext);
  const { values, handleInputChange, email, password, reset } = useForm({ email: '', password: '' });

  const verifyForm = () => {
    let ok = true;
    let error: any = {};
    if (!email.trim().length) {
      ok = false;
      error.email = true;
    }
    if (!password) {
      ok = false;
      error.password = true;
    }
    setErrors(error);
    return ok;
  };

  const handleSubmitLogin = async (e: any) => {
    e.preventDefault();
    if (verifyForm()) {
      setLoading(true);
      try {
        const r = await http.post('/users/signin', values);
        localStorage.setItem(import.meta.env.VITE_HASH_USER_LOCAL_HOST, JSON.stringify(r.data));
        signIn(r.data);
        reset();
        setLoading(false);
        navigate('/');
      } catch (error: any) {
        if (error.response) {
          setLoginError(error.response.data.message);
          setTimeout(() => {
            setLoginError(null);
          }, 5000);
          setLoading(false);
        }
      }
    }
  };


  return (
    <div className='flex h-screen w-screen dark:bg-gray-900 items-center justify-center overflow-hidden'>
      <Box className=' w-full max-w-[320px] mx-3 sm:mx-0 sm:w-80 overflow-hidden bg-red-400'>
        <form
          onSubmit={handleSubmitLogin}
          className='flex items-center justify-between flex-col '
        >
          <h3 className='title-form self-start mb-4 !text-xl sm:!text-3xl'>Inicia sesión</h3>
          {loginError && (
            <fieldset className='error-login-database '>
              <span className='text-red-50 rounded-xl bg-red-400 p-2 '>Error</span>
            </fieldset>
          )}

          {loginErrorGoogle && (
            <fieldset className='error-login-database '>
              <span className='text-red-50 rounded-xl bg-red-400 p-2 '>{loginErrorGoogle}</span>
            </fieldset>
          )}

          <fieldset>
            <label> Email</label>
            <input
              value={email}
              onChange={(e) => handleInputChange(e.target.value, 'email')}
              type='email'
              name='email'
              className='dark:!bg-gray-900 dark:text-slate-400'
              placeholder='example@gmail.com'
              required
            />
            {errors?.email && <span className='text-red-500   p-1'>email error</span>}
          </fieldset>

          <fieldset>
            <label>Contraseña</label>
            <input
              value={password}
              onChange={(e) => handleInputChange(e.target.value, 'password')}
              type='password'
              placeholder='Ut./8cG%9-u^&hj'
              className='dark:!bg-gray-900 dark:text-slate-400'
              required
              name='password'
            />
            {errors?.password && <span className='text-red-500   p-1'>error password</span>}
          </fieldset>
          <fieldset>
            <button
              disabled={loading}
              className='btn gradient '
              type='submit'
            >
              {!loading ? ('Inicia sesión') : (<Loading />)}
            </button>
          </fieldset>

          <div className='register-section text-sx my-2'>
            <span className='text-sm'>
              <NavLink
                to='/forget-password'
                className='text-pink-700 dark:text-slate-500 ml-1 hover:underline  p-1'
              >
                ¿Olvidaste tu contraseña ?
              </NavLink>
            </span>
          </div>
        </form>
      </Box>
    </div>
  );
};

export default SignIn;
