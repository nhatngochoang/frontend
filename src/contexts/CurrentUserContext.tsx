import * as React from 'react';

export type UserType = {
   email: string;
   password: string;
};

export type UserContextType = {
   currentUser?: UserType | null;
   setCurrentUser: (user: UserType | null) => void;
   checkLogin: () => boolean;
   authLoading: boolean;
   setAuthLoading: (isLoading: boolean) => void;
   handleLogout: () => void;
};

export const CurrentUserContext = React.createContext<UserContextType>(null as any);

type ProviderProps = {
   children: React.ReactNode;
};

const CurrentUserProvider = ({ children }: ProviderProps) => {
   const [currentUser, setCurrentUser] = React.useState<UserType | null>();
   const [authLoading, setAuthLoading] = React.useState(false);

   const checkLogin = () => {
      return !!currentUser;
   };

   const handleLogout = () => {
      localStorage.removeItem('login_token');
      setCurrentUser(null);
   };

   return (
      <CurrentUserContext.Provider
         value={{
            currentUser,
            setCurrentUser,
            checkLogin,
            authLoading,
            setAuthLoading,
            handleLogout,
         }}
      >
         {children}
      </CurrentUserContext.Provider>
   );
};

export default CurrentUserProvider;
