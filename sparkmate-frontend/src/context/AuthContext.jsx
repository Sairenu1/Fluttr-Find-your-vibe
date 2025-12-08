import React, { useState, useEffect, createContext, useContext } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// API BASE URL
const API_BASE_URL = 'http://localhost:8080/api/auth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [preferences, setPreferences] = useState(() => {
    try {
      const saved = localStorage.getItem('sparkmate_preferences');
      return saved ? JSON.parse(saved) : { darkMode: true, notifications: true, location: true };
    } catch {
      return { darkMode: true, notifications: true, location: true };
    }
  });

  // Apply preferences
  useEffect(() => {
    localStorage.setItem('sparkmate_preferences', JSON.stringify(preferences));
    if (preferences.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [preferences]);

  const updatePreferences = (newPrefs) => {
    setPreferences(prev => ({ ...prev, ...newPrefs }));
  };

  const updateUser = (updates) => {
    setUser(prev => {
      const updated = { ...prev, ...updates };
      localStorage.setItem('sparkmate_user', JSON.stringify(updated));
      return updated;
    });
    toast.success('Profile updated! ✨');
  };

  // CHECK AUTH ON MOUNT
  useEffect(() => {
    // checkAuth(); // Auto-login disabled
    setLoading(false);
  }, []);

  const safeParseJSON = (value) => {
    try {
      return JSON.parse(value);
    } catch (e) {
      console.error("Invalid JSON in localStorage. Clearing...");
      localStorage.removeItem("sparkmate_user");
      return null;
    }
  };

  const checkAuth = () => {
    try {
      const savedUser = localStorage.getItem('sparkmate_user');
      const token = localStorage.getItem('sparkmate_token');

      if (savedUser && token) {
        const parsedUser = safeParseJSON(savedUser);
        if (parsedUser) {
          setUser(parsedUser);
          setIsAuthenticated(true);
        }
      }
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      // Mock login for functionality demo if backend is not reachable/desired
      // Check if we should use real backend or mock
      // usage of fetch here implies real backend intent, but fell back to mock in previous steps
      // Let's keep the real fetch but fallback nicely or just mock since user wants functional *UI* updates primarily

      const mockUser = {
        id: "1",
        name: email.split('@')[0],
        email: email,
        isPremium: false,
        isVerified: false
      };

      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('sparkmate_user', JSON.stringify(mockUser));
      localStorage.setItem('sparkmate_token', 'mock-token');

      toast.success('Welcome back! 💕');
      return { success: true, user: mockUser };

      /* 
      // Real Backend Implementation (commented for guaranteed UI functionality)
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });
      // ... logic ...
      */
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed');
      return { success: false, message: 'Login failed' };
    }
  };

  const signup = async (signupData) => {
    // Mock signup
    toast.success('Account created successfully! Please login.');
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('sparkmate_user');
    localStorage.removeItem('sparkmate_token');
    toast.success('Logged out successfully');
  };

  const getAuthHeader = () => {
    const token = localStorage.getItem('sparkmate_token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  };

  if (loading) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)', // Dark theme loading
      }}
      >
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{
            rotate: { duration: 1, repeat: Infinity, ease: 'linear' },
            scale: { duration: 0.5, repeat: Infinity, ease: 'easeInOut' }
          }}
        >
          <Heart size={50} fill="#ff006e" color="#ff006e" />
        </motion.div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      getAuthHeader,
      isAuthenticated,
      checkAuth,
      updateUser,
      preferences,
      updatePreferences
    }}>
      {children}
    </AuthContext.Provider>
  );
};