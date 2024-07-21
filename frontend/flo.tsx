import React, {useState} from 'react';
import { useStorageState } from './useStorageState';
import { Login } from './services/login.service'
import { set } from 'react-datepicker/dist/date_utils';



const AuthContext = React.createContext<{
    signIn: (data: {correo:string,password:string}) =>  Promise<string | null>;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
}>({
    signIn: () => Promise.resolve(null),
    signOut: () => null,
    session: null,
    isLoading: false,
});

export function useSession() {
    const value = React.useContext(AuthContext);
    if (process.env.NODE_ENV !== 'production') {
      if (!value) {
        throw new Error('useSession must be wrapped in a <SessionProvider />');
      }
    }
  
    return value;
}
/*
async function Login(data: {correo: string, password: string}) {
    try {
        const res = await axios.post(API_URL, data );
        return res.data.data;
    } catch (error) {
        //alert('Error al iniciar sesión, vulva a intentarlo');
        console.log(error);
        return null;
    }
}*/

export function SessionProvider(props: React.PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState('session');
    
  
    return (
      <AuthContext.Provider
        value={{
          signIn: async (data) => {
            const res = await Login(data);
            if(res == null) {
              setSession(null);
              return null;
            }else{
              setSession(`${res.accessToken}`);
              return session;
            }
          },
          signOut: () => {
            setSession(null);
          },
          session,
          isLoading,
        }}>
        {props.children}
      </AuthContext.Provider>
    );
  }
