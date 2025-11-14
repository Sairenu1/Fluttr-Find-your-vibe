// src/services/socketService.js
import io from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:8080';

class SocketService {
  constructor() {
    this.socket = null;
  }

  connect(userId) {
    this.socket = io(SOCKET_URL, {
      auth: { userId },
      transports: ['websocket']
    });

    this.socket.on('connect', () => {
      console.log('✅ Socket connected');
    });

    this.socket.on('disconnect', () => {
      console.log('❌ Socket disconnected');
    });

    this.socket.on('new_message', (message) => {
      // Handle incoming message
      this.handleNewMessage(message);
    });

    this.socket.on('new_match', (match) => {
      // Show match animation
      this.handleNewMatch(match);
    });

    this.socket.on('user_typing', ({ userId }) => {
      // Show typing indicator
      this.handleUserTyping(userId);
    });
  }

  sendMessage(matchId, content) {
    this.socket.emit('send_message', { matchId, content });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export default new SocketService();