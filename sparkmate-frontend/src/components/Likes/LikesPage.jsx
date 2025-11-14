import { motion } from 'framer-motion';
import { Crown } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { GradientBackground } from '../Layouts/GradientBackground';
import NavigationBar from '../Layouts/NavigationBar';   // ✅ FIXED

const LikesPage = () => {
  const { user } = useAuth();
  const likes = [
    { id: 1, name: "Sarah", photo: "https://images.unsplash.com/photo-1488716820095-cbe80883c496?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
    { id: 2, name: "Emily", photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
    { id: 3, name: "Grace", photo: "https://images.unsplash.com/photo-1495490140452-5a226aef25d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
    { id: 4, name: "Lily", photo: "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" }
  ];

  return (
    <div className="likes-page">
      <GradientBackground />
      <NavigationBar />
      
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <motion.h1 
          className="page-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Likes You
        </motion.h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.6)', marginTop: '10px' }}>
          See who likes you with SparkMate Premium
        </p>
      </div>
      
      <div className="likes-grid">
        {likes.map((like, index) => (
          <motion.div
            key={like.id}
            className="like-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <img src={like.photo} alt={like.name} />
            <div className="like-card-overlay">
              <h3>{like.name}</h3>
            </div>
            {!user?.isPremium && (
              <div className="blur-overlay">
                <div style={{ textAlign: 'center' }}>
                  <Crown size={40} color="#ffd700" />
                  <p style={{ marginTop: '10px', fontWeight: '600' }}>Go Premium to See</p>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
      
      {!user?.isPremium && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginTop: '40px' }}
        >
          <button
            style={{
              padding: '16px 40px',
              background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
              border: 'none',
              borderRadius: '30px',
              color: '#000',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(255, 215, 0, 0.4)'
            }}
            onClick={() => toast.success('Premium coming soon! 👑')}
          >
            Unlock All Likes
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default LikesPage;
