import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, MoreVertical } from 'lucide-react';
import toast from 'react-hot-toast';
import '../styles/ChatPage.css';

const ChatPage = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey! How are you?", sender: "them", time: "10:30 AM" },
    { id: 2, text: "I'm great! How about you?", sender: "me", time: "10:32 AM" },
    { id: 3, text: "Doing well, thanks! 😊", sender: "them", time: "10:33 AM" }
  ]);

  const matchUser = {
    name: "Sarah Johnson",
    photo: "https://i.pravatar.cc/100?img=1"
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: "me",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  return (
    <div className="chat-page">
      <div className="chat-container">
        <div className="chat-header">
          <button className="back-button" onClick={() => navigate('/matches')}>
            <ArrowLeft size={24} />
          </button>
          <div className="chat-user-info">
            <img src={matchUser.photo} alt={matchUser.name} />
            <div>
              <h3>{matchUser.name}</h3>
              <span className="online-status">Active now</span>
            </div>
          </div>
          <button className="more-button">
            <MoreVertical size={24} />
          </button>
        </div>

        <div className="messages-container">
          {messages.map((msg) => (
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