import { createContext, useState } from 'react'

interface AuthContextProps {
  token: string|null;
  setToken: Function
}

interface AuthProps {
  children: React.ReactNode
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvider = ({ children }: AuthProps) => {
  const [token, setToken] = useState(null);

  const value = {
    token,
    setToken
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
