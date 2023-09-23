import { createContext, useEffect, useState } from 'react'

interface AuthContextProps {
  token: string|null;
  makeLogin: Function,
  makeLogout: Function
}

interface AuthProps {
  children: React.ReactNode
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvider = ({ children }: AuthProps) => {
  const [token, setToken] = useState<string|null>(null);

  const makeLogin = (tkn: string) => {
    setToken(tkn);
    window.localStorage.setItem('access_token', tkn);
  }

  const makeLogout = () => {
    setToken(null);
    window.localStorage.removeItem('access_token');
  }

  useEffect(() => {
    const tkn = window.localStorage.getItem('access_token');
    if (tkn) {
      setToken(tkn);
    }
  }, []);

  const value = {
    token,
    makeLogin,
    makeLogout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
