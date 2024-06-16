import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type AuthContextProps = {
  isAuthenticated: boolean;
  login: (newToken: string, newUserData: { [key: string]: any }) => void;
  logout: () => void;
  token: string | null;
  userData: { [key: string]: any } | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider = ({ children }: { children: any }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<{ [key: string]: any } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (parsedData.token) {
        setToken(parsedData.token);
        setUserData(parsedData.userData);
        setIsAuthenticated(true);
      }
    }
    setLoading(false);
  }, []);

  const login = (newToken: string, newUserData: { [key: string]: any }) => {
    localStorage.setItem(
      "userData",
      JSON.stringify({ token: newToken, userData: newUserData })
    );

    setToken(newToken);
    setUserData(newUserData);
    setIsAuthenticated(true);

    const { role } = newUserData;

    if (role === "admin") {
      return navigate("/admin-dashboard");
    }
    return navigate("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("userData");
    setToken(null);
    setUserData(null);
    setIsAuthenticated(false);

    return navigate("/sign-in");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        token,
        userData,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
