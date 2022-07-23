import { createContext, ReactNode, useReducer } from 'react';
import { authReducer, AuthState, AuthActionType } from '../reducers';

interface AuthContextProps {
   children: ReactNode;
}

interface AuthContextDefault {
   authInfo: AuthState;
   toggleAuth: (username: string) => void;
}

const authDefault: AuthState = {
   isAuthenticated: false,
   username: '',
};

export const AuthContext = createContext<AuthContextDefault>({
   authInfo: authDefault,
   toggleAuth: () => null,
});

const AuthContextProvider = ({ children }: AuthContextProps) => {
   const [authInfo, dispatch] = useReducer(authReducer, authDefault);

   const toggleAuth = (username: string) => {
      console.log(username);
      dispatch({ type: AuthActionType.TOGGLE_AUTH, payload: username });
   };

   return <AuthContext.Provider value={{ authInfo, toggleAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
