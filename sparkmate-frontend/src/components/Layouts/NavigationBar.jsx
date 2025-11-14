import { Heart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const NavigationBar = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Heart size={24} fill="#ff006e" />
        SparkMate
      </div>
    </nav>
  );
};

export default NavigationBar;
