import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Star, Heart, MessageCircle, User } from 'lucide-react';

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: '/discover', icon: <Sparkles size={22} />, label: 'Discover' },
    { path: '/standouts', icon: <Star size={22} />, label: 'Standouts' },
    { path: '/likes', icon: <Heart size={22} />, label: 'Likes You', badge: 4 },
    { path: '/matches', icon: <MessageCircle size={22} />, label: 'Matches', badge: 3 },
    { path: '/profile', icon: <User size={22} />, label: 'Profile' }
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
        >
          <div style={{ position: 'relative' }}>
            {item.icon}
            {item.badge && (
              <div
                style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  background: 'linear-gradient(135deg, #ff006e, #ff4458)',
                  color: 'white',
                  minWidth: '18px',
                  height: '18px',
                  borderRadius: '9px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  fontWeight: '600'
                }}
              >
                {item.badge}
              </div>
            )}
          </div>
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default BottomNav;
