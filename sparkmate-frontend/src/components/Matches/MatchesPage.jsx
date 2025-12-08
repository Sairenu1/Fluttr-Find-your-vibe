import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GradientBackground } from '../Layouts/GradientBackground';
import NavigationBar from '../Layouts/NavigationBar';
import { useChat } from '../../context/ChatContext';

const MatchesPage = () => {
  const { matches } = useChat();
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
        {matches.map((match, index) => {
          const lastMsg = match.messages && match.messages.length > 0
            ? match.messages[match.messages.length - 1]
            : null;

          return (
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
                {/* Unread badge could go here if we tracked unread counts per match */}
              </div>

              <div style={{ flex: 1, marginLeft: '12px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
                  {match.name}
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>
                  {lastMsg ? (lastMsg.sender === 'me' ? `You: ${lastMsg.text}` : lastMsg.text) : 'Start chatting!'}
                </p>
              </div>

              <span style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '12px' }}>
                {lastMsg ? lastMsg.time : ''}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default MatchesPage;