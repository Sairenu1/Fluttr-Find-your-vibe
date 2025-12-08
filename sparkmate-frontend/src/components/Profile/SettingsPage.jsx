import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Bell, Moon, MapPin, Globe, Users, Filter, Shield, Lock, ChevronRight } from 'lucide-react';
import { GradientBackground } from "../Layouts/GradientBackground";
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const SettingsPage = () => {
  const navigate = useNavigate();
  const { preferences = {}, updatePreferences } = useAuth();

  // Local state for immediate UI feedback, though typical context updates are fast enough
  // We can just use preferences directly if we want

  const handleToggle = (key) => {
    updatePreferences({ [key]: !preferences[key] });
    toast.success(`${key.charAt(0).toUpperCase() + key.slice(1)} ${!preferences[key] ? 'enabled' : 'disabled'}`);
  };

  const settingsSections = [
    {
      title: "Account",
      items: [
        { icon: <Bell size={18} />, label: "Email", value: "user@example.com" }, // Could pull from user object
        { icon: <Lock size={18} />, label: "Change Password", action: true },
        { icon: <Shield size={18} />, label: "Privacy Settings", action: true }
      ]
    },
    {
      title: "Preferences",
      items: [
        {
          icon: <Bell size={18} />,
          label: "Push Notifications",
          toggle: true,
          value: preferences.notifications,
          key: 'notifications'
        },
        {
          icon: <Moon size={18} />,
          label: "Dark Mode",
          toggle: true,
          value: preferences.darkMode,
          key: 'darkMode'
        },
        {
          icon: <MapPin size={18} />,
          label: "Location Services",
          toggle: true,
          value: preferences.location,
          key: 'location'
        }
      ]
    },
    {
      title: "Discovery",
      items: [
        { icon: <Globe size={18} />, label: "Distance Range", value: "50 miles" },
        { icon: <Users size={18} />, label: "Age Range", value: "18-35" },
        { icon: <Filter size={18} />, label: "Show Me", value: "Everyone" }
      ]
    }
  ];

  const handleItemClick = (item) => {
    if (item.action) {
      toast('This feature is coming soon!', {
        icon: '🚀',
      });
    }
  };

  return (
    <div className="settings-page">
      <GradientBackground />

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '30px',
        padding: '80px 20px 20px',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <motion.button
          onClick={() => navigate('/profile')}
          whileHover={{ x: -3 }}
          whileTap={{ scale: 0.9 }}
          style={{
            width: '40px',
            height: '40px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 0, 110, 0.2)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'white'
          }}
        >
          <ArrowLeft size={20} />
        </motion.button>
        <h1 className="page-title">Settings</h1>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 20px 100px' }}>
        {settingsSections.map((section, sectionIndex) => (
          <motion.div
            key={sectionIndex}
            className="settings-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
          >
            <h2 style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '20px',
              color: '#ff006e'
            }}>
              {section.title}
            </h2>

            {section.items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                onClick={() => !item.toggle && handleItemClick(item)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 0',
                  borderBottom: itemIndex < section.items.length - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
                  cursor: item.action ? 'pointer' : 'default'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ color: '#ff006e' }}>{item.icon}</div>
                  <span style={{ fontSize: '14px' }}>{item.label}</span>
                </div>

                {item.toggle ? (
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggle(item.key);
                    }}
                    style={{
                      width: '48px',
                      height: '26px',
                      background: item.value ? 'linear-gradient(135deg, #ff006e, #ff4458)' : 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '13px',
                      border: 'none',
                      position: 'relative',
                      cursor: 'pointer',
                    }}
                  >
                    <motion.div
                      animate={{ x: item.value ? 24 : 2 }}
                      style={{
                        position: 'absolute',
                        top: '2px',
                        width: '22px',
                        height: '22px',
                        background: 'white',
                        borderRadius: '50%'
                      }}
                    />
                  </motion.button>
                ) : item.action ? (
                  <ChevronRight size={18} style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                ) : (
                  <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)' }}>
                    {item.value}
                  </span>
                )}
              </div>
            ))}
          </motion.div>
        ))}

        {/* Logout Button in Settings as well? Or just keep in Profile */}
      </div>
    </div>
  );
};

export default SettingsPage;