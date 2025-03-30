import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Kiểm tra và khôi phục session
  useEffect(() => {
    const initAuth = async () => {
      try {
        console.log('AuthProvider - Initializing auth...');
        const currentUser = authService.getCurrentUser();
        console.log('AuthProvider - Current user from storage:', currentUser);

        if (currentUser) {
          console.log('AuthProvider - Restoring session for user:', currentUser);
          setUser(currentUser);
        } else {
          console.log('AuthProvider - No user found in storage');
        }
      } catch (error) {
        console.error('AuthProvider - Error initializing auth:', error);
        authService.logout();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (username, password) => {
    try {
      console.log('AuthProvider - Attempting login for user:', username);
      const response = await authService.login(username, password);
      console.log('AuthProvider - Login response:', response);

      if (!response.token || !response.user) {
        throw new Error('Invalid login response');
      }

      console.log('AuthProvider - Login successful, setting user:', response.user);
      setUser(response.user);
      return response;
    } catch (error) {
      console.error('AuthProvider - Login error:', error);
      authService.logout();
      throw error;
    }
  };

  const register = async (username, password, email) => {
    try {
      console.log('AuthProvider - Attempting registration for user:', username);
      const response = await authService.register(username, password, email);
      console.log('AuthProvider - Registration response:', response);

      if (!response.token || !response.user) {
        throw new Error('Invalid registration response');
      }

      console.log('AuthProvider - Registration successful, setting user:', response.user);
      setUser(response.user);
      return response;
    } catch (error) {
      console.error('AuthProvider - Register error:', error);
      authService.logout();
      throw error;
    }
  };

  const logout = () => {
    console.log('AuthProvider - Logging out user:', user?.userId);
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
