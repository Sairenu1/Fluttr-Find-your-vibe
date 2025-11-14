import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Heart, MapPin, Filter, Plane, Dumbbell, Coffee, Palette, Book, Camera, Music } from 'lucide-react';
import toast from 'react-hot-toast';
import { GradientBackground } from '../Layouts/GradientBackground';

const DiscoverPage = () => {
  const [profiles] = useState([
    {
      id: 1,
      name: "Emma",
      age: 24,
      bio: "Adventure seeker 🌍 | Coffee lover ☕ | Yoga enthusiast 🧘‍♀️",
      location: "New York, 2 miles away",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      interests: [
        { name: "Travel", icon: <Plane size={14} /> },
        { name: "Yoga", icon: <Dumbbell size={14} /> },
        { name: "Coffee", icon: <Coffee size={14} /> }
      ],
      verified: true
    },
    {
      id: 2,
      name: "Sophia",
      age: 26,
      bio: "Artist 🎨 | Bookworm 📚 | Sunset chaser 🌅",
      location: "Brooklyn, 5 miles away",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      interests: [
        { name: "Art", icon: <Palette size={14} /> },
        { name: "Reading", icon: <Book size={14} /> },
        { name: "Photography", icon: <Camera size={14} /> }
      ],
      verified: true
    },
    {
      id: 3,
      name: "Olivia",
      age: 27,
      bio: "Fitness coach 💪 | Foodie 🍕 | Dog mom 🐕",
      location: "Manhattan, 3 miles away",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      interests: [
        { name: "Fitness", icon: <Dumbbell size={14} /> },
        { name: "Cooking", icon: <Coffee size={14} /> },
        { name: "Animals", icon: <Heart size={14} /> }
      ],
      verified: true
    },
    {
      id: 4,
      name: "Ava",
      age: 25,
      bio: "Musician 🎵 | Travel blogger ✈️ | Coffee addict ☕",
      location: "Queens, 8 miles away",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      interests: [
        { name: "Music", icon: <Music size={14} /> },
        { name: "Travel", icon: <Plane size={14} /> },
        { name: "Writing", icon: <Book size={14} /> }
      ],
      verified: false
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction) => {
    const currentProfile = profiles[currentIndex];
    
    if (direction === 'like') {
      toast.success(`You liked ${currentProfile.name}! 💕`, {
        icon: '❤️',
        duration: 2000,
      });
    } else if (direction === 'pass') {
      toast(`Passed on ${currentProfile.name}`, {
        icon: '👋',
        duration: 2000,
      });
    } else if (direction === 'super') {
      toast.success(`Super liked ${currentProfile.name}! ⭐`, {
        icon: '⭐',
        duration: 2000,
      });
    }

    setTimeout(() => {
      if (currentIndex < profiles.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
        toast.success('You have seen all profiles! Starting over... 🔄', {
          duration: 3000,
        });
      }
    }, 300);
  };

  const currentProfile = profiles[currentIndex];

  return (
    <div className="discover-page">
      <GradientBackground />
      
      <div className="discover-header">
        <h1 className="page-title">Discover</h1>
        <motion.button 
          className="icon-btn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            width: '44px',
            height: '44px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 0, 110, 0.2)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#ff006e'
          }}
        >
          <Filter size={20} />
        </motion.button>
      </div>

      <div className="swipe-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProfile.id}
            className="swipe-card"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="card-image">
              <img src={currentProfile.photo} alt={currentProfile.name} />
              <div className="card-overlay">
                <div className="card-name">
                  {currentProfile.name}, {currentProfile.age}
                  {currentProfile.verified && (
                    <div className="verified-badge">✓</div>
                  )}
                </div>
                <div className="card-location">
                  <MapPin size={14} />
                  {currentProfile.location}
                </div>
              </div>
            </div>
            
            <div className="card-info">
              <p className="card-bio">{currentProfile.bio}</p>
              <div className="card-interests">
                {currentProfile.interests.map((interest, idx) => (
                  <motion.div 
                    key={idx} 
                    className="interest-tag"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    {interest.icon}
                    {interest.name}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="swipe-actions">
        <motion.button
          className="action-btn pass-btn"
          onClick={() => handleSwipe('pass')}
          whileHover={{ scale: 1.1, rotate: -10 }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={28} />
        </motion.button>

        <motion.button
          className="action-btn super-btn"
          onClick={() => handleSwipe('super')}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          <Star size={26} />
        </motion.button>

        <motion.button
          className="action-btn like-btn"
          onClick={() => handleSwipe('like')}
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart size={28} />
        </motion.button>
      </div>
    </div>
  );
};

export default DiscoverPage;