import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, MoreVertical } from 'lucide-react';
import toast from 'react-hot-toast';
import '../styles/ChatPage.css';
import { useChat } from '../context/ChatContext';

const ChatPage = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const { getMatch, sendMessage } = useChat();
  const [match, setMatch] = useState(null);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const currentMatch = getMatch(matchId);
    if (!currentMatch) {
      toast.error('Match not found');
      navigate('/matches');
    } else {
      setMatch(currentMatch);
    }
  }, [matchId, getMatch, navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [match?.messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    sendMessage(matchId, message);
    setMessage('');
  };

  if (!match) return <div>Loading...</div>;

  return (
    <div className="chat-page">
      <div className="chat-container">
        <div className="chat-header">
          <button className="back-button" onClick={() => navigate('/matches')}>
            <ArrowLeft size={24} />
          </button>
          <div className="chat-user-info">
            <img src={match.photo} alt={match.name} />
            <div>
              <h3>{match.name}</h3>
              <span className="online-status">{match.online ? 'Active now' : 'Offline'}</span>
            </div>
          </div>
          <button className="more-button">
            <MoreVertical size={24} />
          </button>
        </div>

        <div className="messages-container">
          {match.messages && match.messages.map((msg) => (
            <motion.div
              key={msg.id}
              className={`message ${msg.sender}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="message-bubble">
                <p>{msg.text}</p>
                <span className="message-time">{msg.time}</span>
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form className="message-input-container" onSubmit={handleSend}>
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="message-input"
          />
          <motion.button
            type="submit"
            className="send-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Send size={20} />
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;