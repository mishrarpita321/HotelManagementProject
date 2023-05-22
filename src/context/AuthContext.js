// ** React Imports
import { createContext, useContext, useEffect, useMemo, useState } from "react";

// ** Next Import
import { useRouter } from "next/router";

// ** Axios
import axios from "axios";

// ** Config
import authConfig from "src/config/auth";

// ** Defaults
const defaultProvider = {
  // user: null,
  user: { name: 'Roshan' },
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  isInitialized: false,
  setIsInitialized: () => Boolean,

};
export const AuthContext = createContext(defaultProvider);

export const AuthProvider = ({ children }) => {
  const [refresh, setRefresh] = useState(0)

  // ** States
  const [user, setUser] = useState(defaultProvider.user);
  const [loading, setLoading] = useState(defaultProvider.loading);
  const [isInitialized, setIsInitialized] = useState(
    defaultProvider.isInitialized
  );

  // ** Hooks
  const router = useRouter();
  useEffect(() => {

    const initAuth = async () => {
      setIsInitialized(true);
      const storedToken =
        "Bearer " + window.localStorage.getItem(authConfig.storageTokenKeyName);

      if (storedToken) {
        setLoading(true);
        await axios
          .get(authConfig.meEndpoint, {
            headers: {
              Authorization: storedToken,
            },
          })
          .then(async (response) => {
            setLoading(false);
            setUser({ ...response.data.data.data });
          })
          .catch(() => {
            localStorage.removeItem("userData");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("accessToken");
            setUser(null);
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    };
    initAuth();
  }, [refresh]);




  const refreshAuth = () => {
    setRefresh(refresh + 1)
  }



  const values = {
    user,
    loading,
    setUser,
    setLoading,
    isInitialized,
    setIsInitialized,
    refreshAuth: refreshAuth,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuthProvider = () => {
  const {
    user,
    loading,
    setUser,
    setLoading,
    isInitialized,
    setIsInitialized,
    refreshAuth: refreshAuth,
  } = useContext(AuthContext)

  return useMemo(() => ({
    user,
    loading,
    setUser,
    setLoading,
    isInitialized,
    setIsInitialized,
    refreshAuth,
  }), [
    user,
    loading,
    setUser,
    setLoading,
    isInitialized,
    setIsInitialized,
    refreshAuth
  ])
}
