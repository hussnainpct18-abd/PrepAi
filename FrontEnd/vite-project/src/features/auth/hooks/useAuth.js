import { useContext, useEffect } from "react";
import { AuthContext } from "../services/auth.context";
import { login, logout, register } from "../api/auth.api";
import { getMe } from "../api/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);

  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const data = await login({ username, email, password });
      if (data && data.user) {
        setUser(data.user);
        return data.user;
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const data = await register({ username, email, password });
      if (data && data.user) {
        setUser(data.user);
        return data.user;
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGetMe = async () => {
    setLoading(true);
    try {
      const data = await getMe();
      if (data && data.user) {
        setUser(data.user);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    handleLogin,
    handleRegister,
    handleLogout,
    handleGetMe,
  };
};
