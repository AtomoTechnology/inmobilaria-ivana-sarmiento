import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';


import http from './../../api/axios';
import { useForm } from '../../hooks/useForm';
import { AuthContext } from '../../context/authContext';
import Loading from '../../components/Loading';
import Box from '../../components/Box';
import CustomInput from '../../components/CustomInput';
import FormError from '../../components/FormError';

const SignIn = () => {

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>();
  const [loginError, setLoginError] = useState<string | null>(null);

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
    console.log(values);

    if (verifyForm()) {
      setLoading(true);
      try {
        const r = await http.post('/auth/signin', values);
        if (r.data.status === 200) {
          console.log(r.data)
          signIn(r.data);
          reset();
          setLoading(false);
          navigate('/');
        } else {
          setLoginError(r.data.message);
        }
      } catch (error: any) {
        if (error.response) {
          console.log(error.response.data)
          setLoginError(error.response.data.message);
          setTimeout(() => {
            setLoginError(null);
          }, 5000);
        }
      } finally {
        setLoading(false);
      }
    }
  };



  return (
    <div className='flex h-screen w-screen dark:bg-gray-900 items-center justify-center'>

      <Box className=' w-full max-w-[320px] mx-3 sm:mx-0 sm:w-80 '>

        <form onSubmit={handleSubmitLogin} className='flex items-center justify-between flex-col '>

          <h3 className='title-form self-start mb-4 !text-xl sm:!text-3xl'>Inicia sesión</h3>

          {loginError && (<FormError text={loginError} />)}

          <fieldset>
            <label> Email</label>
            <CustomInput type='email' placeholder='example@gmail.com' onChange={(val) => handleInputChange(val, 'email')} />
            {errors?.email && <FormError text='Email obligatorio y válido.' />}
          </fieldset>

          <fieldset>
            <label>Contraseña</label>
            <CustomInput type='password' placeholder='.lk8Tx9W/' onChange={(val) => handleInputChange(val, 'password')} />
            {errors?.password && <FormError text='Contraseña obligatoria .' />}
          </fieldset>

          <fieldset>
            <button disabled={loading} className='btn gradient' type='submit'>{!loading ? ('Inicia sesión') : 'Espere...'}</button>
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
