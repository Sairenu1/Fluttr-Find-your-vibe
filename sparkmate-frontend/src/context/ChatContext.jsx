import React, { createContext, useContext, useState, useEffect } from 'react';

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
    // Initial Mock Data
    const initialMatches = [
        {
            id: 1,
            name: "Emma",
            photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
            messages: [
                { id: 1, text: "Hey! How's your day going?", sender: "them", time: "10:30 AM" }
            ],
            online: true
        },
        {
            id: 2,
            name: "Sophia",
            photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
            messages: [
                { id: 1, text: "That sounds amazing!", sender: "them", time: "Yesterday" }
            ],
            online: false
        },
        {
            id: 3,
            name: "Olivia",
            photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
            messages: [
                { id: 1, text: "Can't wait to meet you!", sender: "them", time: "Yesterday" }
            ],
            online: true
        }
    ];

    const [matches, setMatches] = useState(() => {
        const saved = localStorage.getItem('sparkmate_matches');
        return saved ? JSON.parse(saved) : initialMatches;
    });

    useEffect(() => {
        localStorage.setItem('sparkmate_matches', JSON.stringify(matches));
    }, [matches]);

    const sendMessage = (matchId, text) => {
        setMatches(prevMatches => prevMatches.map(match => {
            if (match.id === parseInt(matchId)) {
                const newMessage = {
                    id: Date.now(),
                    text,
                    sender: "me",
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                return {
                    ...match,
                    messages: [...match.messages, newMessage]
                };
            }
            return match;
        }));
    };

    const getMatch = (matchId) => {
        return matches.find(m => m.id === parseInt(matchId));
    };

    return (
        <ChatContext.Provider value={{ matches, sendMessage, getMatch }}>
            {children}
        </ChatContext.Provider>
    );
};
