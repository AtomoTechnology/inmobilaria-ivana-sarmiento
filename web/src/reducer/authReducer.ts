import { AuthState } from '../context/authContext';

type types =
  | { type: 'signIn'; payload: any }
  | { type: 'finishChecking' }
  | { type: 'setfavouriteIcon'; payload: {} }
  | { type: 'signOut' };

export const authReducer = (state: AuthState, action: types): AuthState => {
  switch (action.type) {
    case 'signIn':
      return {
        ...state,
        token: action?.payload?.token,
        user: action.payload?.user,
        checking: false,
      };
    case 'signOut':
      return {
        ...state,
        token: null,
        user: null,
        checking: false,
      };
    case 'finishChecking':
      return {
        ...state,
        checking: false,
      };
    default:
      return state;
  }
};
