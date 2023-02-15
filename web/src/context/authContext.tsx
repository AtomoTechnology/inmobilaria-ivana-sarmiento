import React from 'react';
import { createContext, useEffect, useReducer } from 'react';
// import { ResponseLogin } from '../interfaces/UserLogged';
import { authReducer } from '../reducer/authReducer';

export interface AuthState {
  checking: Boolean;
}

export const initialState = {
  checking: true,
  token: '',
  data: {
    user: {
      photo: null,
      role: '',
      _id: '',
      name: '',
      email: '',
    },
  },
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

    if (user) {
      signIn(user);
    } else {
      signOut();
    }
    return () => { };
  }, []);

  const signIn = (data: any) => {
    dispatch({ type: 'signIn', payload: data });
    dispatch({ type: 'finishChecking' });
  };
  const signOut = () => {
    dispatch({ type: 'signOut', payload: {} });
    localStorage.removeItem(import.meta.env.VITE_HASH_USER_LOCAL_HOST);
    dispatch({ type: 'finishChecking' });
  };

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
