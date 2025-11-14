import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GradientBackground } from '../Layouts/GradientBackground';
import NavigationBar from '../Layouts/NavigationBar';
import { MessageCircle } from 'lucide-react';


const MatchesPage = () => {
  const [matches] = useState([
    {
      id: 1,
      name: "Emma",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      lastMessage: "Hey! How's your day going?",
      time: "2m ago",
      unread: 2,
      online: true
    },
    {
      id: 2,
      name: "Sophia",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      lastMessage: "That sounds amazing!",
      time: "1h ago",
      unread: 0,
      online: false
    },
    {
      id: 3,
      name: "Olivia",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
      lastMessage: "Can't wait to meet you!",
      time: "3h ago",
      unread: 1,
      online: true
    },
    {
      id: 4,
      name: "Ava",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
      lastMessage: "See you tomorrow!",
      time: "5h ago",
      unread: 0,
      online: false
    }
  ]);

  const navigate = useNavigate();

  return (
    <div className="matches-page">
      <GradientBackground />
      <NavigationBar />
      
      <motion.h1 
        className="page-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ paddingTop: '80px' }}
      >
        Your Matches
      </motion.h1>
      
      <div className="matches-list">
        {matches.map((match, index) => (
          <motion.div
            key={match.id}
            className="match-card"
            onClick={() => navigate(`/chat/${match.id}`)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ x: 5 }}
          >
            <div style={{ position: 'relative' }}>
              <img 
                src={match.photo} 
                alt={match.name}
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  border: '2px solid #ff006e',
                  objectFit: 'cover'
                }}
              />
              {match.online && <div className="online-indicator" />}
              {match.unread > 0 && (
                <div style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  background: 'linear-gradient(135deg, #ff006e, #ff4458)',
                  color: 'white',
                  minWidth: '20px',
                  height: '20px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: '600'
                }}>
                  {match.unread}
                </div>
              )}
            </div>
            
            <div style={{ flex: 1, marginLeft: '12px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
                {match.name}
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px' }}>
                {match.lastMessage}
              </p>
            </div>
            
            <span style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '12px' }}>
              {match.time}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MatchesPage;