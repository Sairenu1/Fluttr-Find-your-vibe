import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, Heart, Eye, TrendingUp, Edit3, Crown, Settings, HelpCircle, Shield, LogOut, ChevronRight } from 'lucide-react';
import { GradientBackground } from "../Layouts/GradientBackground";
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const stats = [
    { icon: <Heart size={20} />, value: 24, label: "Matches", color: "#ff006e" },
    { icon: <Eye size={20} />, value: 156, label: "Views", color: "#8338ec" },
    { icon: <TrendingUp size={20} />, value: 89, label: "Likes", color: "#3a86ff" }
  ];

  const actions = [
    {
      icon: <Edit3 size={18} />,
      title: "Edit Profile",
      subtitle: "Update your information",
      color: "#ff006e",
      onClick: () => navigate('/edit-profile')
    },
    {
      icon: <Crown size={18} />,
      title: "Go Premium",
      subtitle: user?.isPremium ? "Manage Subscription" : "Unlock exclusive features",
      color: "#ffd700",
      onClick: () => navigate('/premium')
    },
    {
      icon: <Settings size={18} />,
      title: "Settings",
      subtitle: "Preferences and privacy",
      color: "#8338ec",
      onClick: () => navigate('/settings')
    },
    {
      icon: <HelpCircle size={18} />,
      title: "Help & Support",
      subtitle: "Get help with the app",
      color: "#3a86ff",
      onClick: () => toast('Help center coming soon! 🤝')
    },
    {
      icon: <Shield size={18} />,
      title: "Safety Center",
      subtitle: "Learn about our safety features",
      color: "#4ade80",
      onClick: () => toast('Safety center coming soon! 🛡️')
    },
    {
      icon: <LogOut size={18} />,
      title: "Logout",
      subtitle: "Sign out of your account",
      color: "#ff4646",
      onClick: handleLogout
    }
  ];

  return (
    <div className="profile-page" style={{ padding: '80px 20px 100px', maxWidth: '500px', margin: '0 auto' }}>
      <GradientBackground />

      <motion.div
        className="profile-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: '40px' }}
      >
        <div className="profile-avatar-container" style={{ position: 'relative', display: 'inline-block', marginBottom: '20px' }}>
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
            alt="Profile"
            className="profile-avatar"
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: `4px solid ${user?.isPremium ? '#ffd700' : 'rgba(255, 0, 110, 0.3)'}`
            }}
          />
          <motion.button
            className="edit-avatar-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/edit-profile')}
            style={{
              position: 'absolute',
              bottom: '5px',
              right: '5px',
              width: '36px',
              height: '36px',
              background: 'linear-gradient(135deg, #ff006e, #ff4458)',
              border: 'none',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(255, 0, 110, 0.4)'
            }}
          >
            <Camera size={16} color="white" />
          </motion.button>
        </div>

        <h1 className="profile-name" style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>
          {user?.name || 'User'}
          {user?.isPremium && (
            <span style={{ marginLeft: '8px', fontSize: '24px' }} title="Premium Member">👑</span>
          )}
        </h1>
        <p className="profile-bio" style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>
          {user?.bio || "Digital creator • Adventure seeker • Coffee lover"}
        </p>
      </motion.div>

      <div className="profile-stats" style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '40px' }}>
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            style={{
              textAlign: 'center',
              padding: '20px',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              flex: 1,
              margin: '0 5px'
            }}
          >
            <div className="stat-icon-wrapper" style={{ marginBottom: '10px', color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-value" style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>
              {stat.value}
            </div>
            <div className="stat-label" style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)' }}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="profile-actions">
        {actions.map((action, index) => (
          <motion.button
            key={index}
            className="profile-btn"
            onClick={action.onClick}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: '100%',
              background: 'rgba(20, 20, 30, 0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 0, 110, 0.1)',
              borderRadius: '16px',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              color: 'white',
              marginBottom: '12px',
              transition: 'all 0.3s'
            }}
          >
            <div className="profile-btn-icon" style={{
              width: '40px',
              height: '40px',
              background: `linear-gradient(135deg, ${action.color}33, ${action.color}33)`,
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: action.color
            }}>
              {action.icon}
            </div>
            <div className="profile-btn-content" style={{ flex: 1, textAlign: 'left' }}>
              <div className="profile-btn-title" style={{ fontSize: '15px', fontWeight: '600', marginBottom: '2px' }}>
                {action.title}
              </div>
              <div className="profile-btn-subtitle" style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)' }}>
                {action.subtitle}
              </div>
            </div>
            <ChevronRight className="profile-btn-arrow" size={18} style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;