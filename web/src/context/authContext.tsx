import React from 'react';
import { createContext, useEffect, useReducer } from 'react';
import Loading from '../components/Loading';
// import { ResponseLogin } from '../interfaces/UserLogged';
import { authReducer } from '../reducer/authReducer';
import jwt_decode from "jwt-decode";

export interface Iuser { fullName: string; email: string; id: number, photo: string };
export interface Ialert { title: string, message: string, show: boolean, color?: string };
export interface AuthState {
  checking: Boolean;
  token: string | null;
  user: Iuser | null;
  alert: Ialert | null
}

export const initialState = {
  checking: true,
  token: '',
  user: null,
  alert: null

};
export interface AuthContextProps {
  authState: AuthState;
  signIn: (data: any) => void;
  signOut: () => void;
  hideAlert: () => void;
  showAlert: (data: Ialert) => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem(import.meta.env.VITE_HASH_USER_LOCAL_HOST) || null;
    if (token) {
      try {
        var decoded = jwt_decode(token);
        dispatch({
          type: 'signIn', payload: {
            token,
            user: decoded
          }
        });
      } catch (error) {
        signOut();
      }

    } else {
      dispatch({ type: 'signOut' });
    }
    return () => { };
  }, []);

  const signIn = (data: any) => {
    localStorage.setItem(import.meta.env.VITE_HASH_USER_LOCAL_HOST, data.token);
    try {
      var decoded = jwt_decode(data.token);
      dispatch({
        type: 'signIn', payload: {
          token: data.token,
          user: decoded
        }
      });
    } catch (error) {
      console.log(error)
    }

  };
  const signOut = () => {
    dispatch({ type: 'signOut' });
    localStorage.removeItem(import.meta.env.VITE_HASH_USER_LOCAL_HOST);
  };

  const showAlert = (data: Ialert) => {
    dispatch({ type: 'showAlert', payload: data })
  }
  const hideAlert = () => {
    dispatch({ type: 'hideAlert' })
  }
  console.log(state)
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
        showAlert,
        hideAlert
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
