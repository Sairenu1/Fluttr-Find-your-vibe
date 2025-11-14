import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Edit2, Heart, MessageCircle, Eye } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const stats = [
    { icon: Heart, label: "Matches", value: "0" },
    { icon: MessageCircle, label: "Messages", value: "0" },
    { icon: Eye, label: "Profile Views", value: "0" }
  ];

  const handleSave = () => {
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <motion.div 
            className="profile-avatar-section"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="avatar-wrapper">
              <img 
                src="https://i.pravatar.cc/200?img=12" 
                alt="Profile" 
                className="profile-avatar"
              />
              <button className="avatar-edit">
                <Camera size={20} />
              </button>
            </div>
          </motion.div>

          <div className="profile-title">
            <h1>{user?.name || 'Your Name'}</h1>
            <p>Member since 2024</p>
          </div>

          <button 
            className="edit-profile-btn"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit2 size={18} />
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        <div className="stats-section">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <stat.icon size={24} className="stat-icon" />
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="profile-details">
          <div className="detail-section">
            <h2>About Me</h2>
            {isEditing ? (
              <textarea
                className="profile-textarea"
                placeholder="Tell us about yourself..."
                rows={4}
                defaultValue="Complete your profile to get better matches!"
              />
            ) : (
              <p>Complete your profile to get better matches!</p>
            )}
          </div>

          <div className="detail-section">
            <h2>Interests</h2>
            {isEditing ? (
              <div className="interests-edit">
                <input 
                  type="text" 
                  placeholder="Add interests (press Enter)" 
                  className="interest-input"
                />
              </div>
            ) : (
              <div className="interests-display">
                <span className="interest-badge">Travel</span>
                <span className="interest-badge">Coffee</span>
                <span className="interest-badge">Photography</span>
              </div>
            )}
          </div>

          {isEditing && (
            <motion.button
              className="save-btn"
              onClick={handleSave}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Save Changes
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;