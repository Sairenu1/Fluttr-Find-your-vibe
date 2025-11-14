import React, { useState, useEffect, createContext, useContext } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // SAFE JSON PARSE FUNCTION
  const safeParseJSON = (value) => {
    try {
      return JSON.parse(value);
    } catch (e) {
      console.error("Invalid JSON in localStorage. Clearing...");
      localStorage.removeItem("sparkmate_user");
      return null;
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('sparkmate_user');

    if (savedUser) {
      const parsedUser = safeParseJSON(savedUser);
      if (parsedUser) {
        setUser(parsedUser);
      }
    }

    setLoading(false);
  }, []);

  // LOGIN FUNCTION
  const login = async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (email && password) {
      const userData = {
        id: 1,
        name: email.split('@')[0],
        email: email,
        isPremium: false
      };

      setUser(userData);
      localStorage.setItem('sparkmate_user', JSON.stringify(userData));

      return { success: true };
    }

    toast.error('Invalid credentials');
    return { success: false };
  };

  // SIGNUP FUNCTION
  const signup = async (name, email, password) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (name && email && password) {
      const userData = {
        id: 1,
        name: name,
        email: email,
        isPremium: false
      };

      setUser(userData);
      localStorage.setItem('sparkmate_user', JSON.stringify(userData));

      return { success: true };
    }

    toast.error('Please fill all fields');
    return { success: false };
  };

  // LOGOUT FUNCTION
  const logout = () => {
    setUser(null);
    localStorage.removeItem('sparkmate_user');
  };

  // LOADING SCREEN
  if (loading) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000',
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Heart size={50} fill="#ff006e" color="#ff006e" />
        </motion.div>
      </div>
    );
  }

  // CONTEXT PROVIDER
  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
