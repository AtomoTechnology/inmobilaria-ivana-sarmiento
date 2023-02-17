import React from 'react';
import { createContext, useEffect, useReducer } from 'react';
import Loading from '../components/Loading';
// import { ResponseLogin } from '../interfaces/UserLogged';
import { authReducer } from '../reducer/authReducer';

export interface AuthState {
  checking: Boolean;
  token: string | null;
  user?: { username: string; email: string; id: number, photo: string } | null
}

export const initialState = {
  checking: true,
  token: '',
  user: null,

};
export interface AuthContextProps {
  authState: AuthState;
  signIn: (data: any) => void;
  signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const user = localStorage.getItem(import.meta.env.VITE_HASH_USER_LOCAL_HOST)
      ? JSON.parse(localStorage.getItem(import.meta.env.VITE_HASH_USER_LOCAL_HOST)!)
      : null;
    console.log({ user })
    if (user) {
      signIn(user);
    } else {
      signOut();
    }
    return () => { };
  }, []);

  const signIn = (data: any) => {
    localStorage.setItem(import.meta.env.VITE_HASH_USER_LOCAL_HOST, JSON.stringify(data));
    dispatch({ type: 'signIn', payload: data });
  };
  const signOut = () => {
    dispatch({ type: 'signOut' });
    localStorage.removeItem(import.meta.env.VITE_HASH_USER_LOCAL_HOST);
  };
  if (state.checking) return (
    <div className="flex gap-y-3 flex-col items-center justify-center mt-8 sm:mt-12 ">
      <Loading />
      <h3>Bienvenido de vuelta </h3>
    </div>
  )

  return (
    <AuthContext.Provider
      value={{
        authState: state,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
