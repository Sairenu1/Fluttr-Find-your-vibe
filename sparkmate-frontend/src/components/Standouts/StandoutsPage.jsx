import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import toast from 'react-hot-toast';
import { GradientBackground } from '../Layouts/GradientBackground';
import NavigationBar from '../Layouts/NavigationBar';


const StandoutsPage = () => {
  const standouts = [
    {
      id: 1,
      name: "Alexandra",
      age: 26,
      photo: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isPremium: true
    },
    {
      id: 2,
      name: "Victoria",
      age: 24,
      photo: "https://images.unsplash.com/photo-1524638431109-93d95c968f03?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isPremium: true
    },
    {
      id: 3,
      name: "Natalie",
      age: 28,
      photo: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isPremium: true
    },
    {
      id: 4,
      name: "Jessica",
      age: 25,
      photo: "https://images.unsplash.com/photo-1496440737103-cd596325d314?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isPremium: true
    },
    {
      id: 5,
      name: "Nova",
      age: 23,
      location: "Staten Island, 15 miles away",
      photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500",
      superLikes: 10
    },
    {
      id: 6,
      name: "Aria",
      age: 28,
      location: "Manhattan, 2 miles away",
      photo: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=500",
      superLikes: 25
    }
  ];

  return (
    <div className="standouts-page">
      <GradientBackground />
      <NavigationBar />
      
      <motion.h1 
        className="page-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Today's Standouts
      </motion.h1>
      
      <div className="standouts-grid">
        {standouts.map((profile, index) => (
          <motion.div
            key={profile.id}
            className="standout-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="standout-badge">
              <Star size={14} />
              Standout
            </div>
            <img 
              src={profile.photo} 
              alt={profile.name}
              style={{ width: '100%', height: '350px', objectFit: 'cover' }}
            />
            <div style={{ padding: '20px' }}>
              <h3 style={{ fontSize: '22px', marginBottom: '8px' }}>
                {profile.name}, {profile.age}
              </h3>
              <button
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'linear-gradient(135deg, #ff006e, #ff4458)',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginTop: '10px'
                }}
                onClick={() => toast.success(`Liked ${profile.name}! ⭐`)}
              >
                Send Super Like
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StandoutsPage;