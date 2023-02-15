import { AuthState, initialState } from '../context/authContext';

type types =
  | { type: 'signIn'; payload: any }
  | { type: 'finishChecking' }
  | { type: 'setfavouriteIcon'; payload: {} }
  | { type: 'signOut'; payload: any };

export const authReducer = (state: AuthState, action: types): AuthState => {
  switch (action.type) {
    case 'signIn':
      return {
        ...state,
        token: action.payload.token,
        data: action.payload.data,
      };
    case 'signOut':
      return initialState;
    case 'finishChecking':
      return {
        ...state,
        checking: false,
      };
    default:
      return state;
  }
};
