import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Shuffle, Send, X } from 'lucide-react';

const IcebreakerPrompts = ({ isOpen, onClose, onSend, matchName }) => {
    const [selectedPrompt, setSelectedPrompt] = useState(null);
    const [customMessage, setCustomMessage] = useState('');

    if (!isOpen) return null;

    const prompts = [
        { id: 1, emoji: '☕', text: `Hey ${matchName}! If you could have coffee with anyone, dead or alive, who would it be?` },
        { id: 2, emoji: '🎬', text: `What's the last movie you watched that you couldn't stop thinking about?` },
        { id: 3, emoji: '✈️', text: `If you could teleport anywhere right now, where would you go?` },
        { id: 4, emoji: '🎵', text: `What song has been stuck in your head lately?` },
        { id: 5, emoji: '🍕', text: `Hot take: Pineapple on pizza - yes or no?` },
        { id: 6, emoji: '📚', text: `What's a book or show you've been meaning to get into?` },
        { id: 7, emoji: '🌟', text: `What's something you're really proud of but don't get to talk about often?` },
        { id: 8, emoji: '🎯', text: `If you had an extra hour every day, what would you do with it?` },
        { id: 9, emoji: '🏆', text: `What's your most controversial opinion?` },
        { id: 10, emoji: '🌮', text: `Best meal you've ever had - where was it?` }
    ];

    const [displayedPrompts, setDisplayedPrompts] = useState(prompts.slice(0, 4));

    const shufflePrompts = () => {
        const shuffled = [...prompts].sort(() => Math.random() - 0.5);
        setDisplayedPrompts(shuffled.slice(0, 4));
        setSelectedPrompt(null);
    };

    const handleSend = () => {
        const message = selectedPrompt ? displayedPrompts.find(p => p.id === selectedPrompt)?.text : customMessage;
        if (message && onSend) {
            onSend(message);
        }
        onClose();
        setSelectedPrompt(null);
        setCustomMessage('');
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-gray-900 w-full max-w-md rounded-3xl border border-gray-800 shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
                                <MessageSquare size={20} className="text-white" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-white">Break the ice!</h2>
                                <p className="text-gray-400 text-sm">Pick a conversation starter</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                            <X size={24} />
                        </button>
                    </div>

                    {/* Prompts */}
                    <div className="space-y-2 mb-4">
                        {displayedPrompts.map((prompt) => (
                            <button
                                key={prompt.id}
                                onClick={() => setSelectedPrompt(prompt.id)}
                                className={`w-full flex items-start gap-3 p-3 rounded-xl border transition-all text-left ${selectedPrompt === prompt.id
                                        ? 'bg-pink-500/20 border-pink-500'
                                        : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                                    }`}
                            >
                                <span className="text-xl">{prompt.emoji}</span>
                                <span className={`text-sm ${selectedPrompt === prompt.id ? 'text-white' : 'text-gray-300'}`}>
                                    {prompt.text}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Shuffle Button */}
                    <button
                        onClick={shufflePrompts}
                        className="w-full flex items-center justify-center gap-2 py-2 text-gray-400 hover:text-white transition-colors mb-4"
                    >
                        <Shuffle size={16} />
                        <span className="text-sm">Show different prompts</span>
                    </button>

                    {/* Custom Message */}
                    <div className="mb-4">
                        <p className="text-gray-400 text-xs mb-2 uppercase tracking-wider">or write your own</p>
                        <textarea
                            value={customMessage}
                            onChange={(e) => {
                                setCustomMessage(e.target.value);
                                setSelectedPrompt(null);
                            }}
                            placeholder="Type your message..."
                            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 resize-none h-20"
                        />
                    </div>

                    {/* Send Button */}
                    <button
                        onClick={handleSend}
                        disabled={!selectedPrompt && !customMessage.trim()}
                        className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send size={18} />
                        Send Message
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default IcebreakerPrompts;
