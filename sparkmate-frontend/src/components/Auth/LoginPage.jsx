import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, Heart, Sparkles, Star } from 'lucide-react';

// Floating Elements Component
const FloatingElements = () => {
  const elements = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 8,
    duration: 4 + Math.random() * 6,
    size: 8 + Math.random() * 16,
    type: i % 3 === 0 ? 'heart' : i % 3 === 1 ? 'sparkle' : 'star'
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute animate-float-up"
          style={{
            left: el.left,
            animationDelay: `${el.delay}s`,
            animationDuration: `${el.duration}s`,
            bottom: '-50px'
          }}
        >
          {el.type === 'heart' && (
            <Heart
              size={el.size}
              fill="rgba(255, 0, 110, 0.4)"
              color="rgba(255, 0, 110, 0.6)"
            />
          )}
          {el.type === 'sparkle' && (
            <Sparkles
              size={el.size}
              fill="rgba(168, 85, 247, 0.4)"
              color="rgba(168, 85, 247, 0.6)"
            />
          )}
          {el.type === 'star' && (
            <Star
              size={el.size}
              fill="rgba(236, 72, 153, 0.4)"
              color="rgba(236, 72, 153, 0.6)"
            />
          )}
        </div>
      ))}
      <style>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) rotate(0deg) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
            transform: scale(1);
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg) scale(0.5);
            opacity: 0;
          }
        }
        .animate-float-up {
          animation: float-up linear infinite;
        }
      `}</style>
    </div>
  );
};

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/discover', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    setLoading(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        setTimeout(() => {
          navigate('/discover', { replace: true });
        }, 500);
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden" style={{ background: '#0a0a0a' }}>
      {/* Animated Dark Gradient Background */}
      <div className="absolute inset-0 bg-gradient-dark">
        <div className="absolute inset-0 bg-gradient-radial"></div>
      </div>

      <FloatingElements />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="glass-card-dark p-8 md:p-10 transform transition-all duration-500">
          {/* Logo with Glow */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-60 animate-pulse-glow"></div>
              <div className="relative bg-gradient-to-br from-pink-500 via-purple-600 to-pink-500 rounded-full p-6 shadow-2xl transform hover:scale-110 transition-all duration-300 animate-float">
                <Heart size={48} fill="white" color="white" className="drop-shadow-2xl" />
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-black mb-3 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-text">
              Fluttr
            </h1>
            <p className="text-gray-400 text-base flex items-center justify-center gap-2">
              <Sparkles size={16} className="text-purple-400" />
              Find your vibe ✨
              <Sparkles size={16} className="text-pink-400" />
            </p>
          </div>

          {/* Form */}
          <div className="space-y-5">
            {/* Email Input */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl blur-md opacity-0 group-hover:opacity-30 group-focus-within:opacity-40 transition-opacity duration-300"></div>
              <div className="relative flex items-center bg-white/5 rounded-2xl border-2 border-white/10 focus-within:border-pink-500/50 focus-within:bg-white/10 backdrop-blur-xl transition-all duration-300">
                <Mail className="absolute left-5 text-gray-500 group-focus-within:text-pink-400 transition-colors" size={20} />
                <input
                  type="email"
                  placeholder="your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                  required
                  disabled={loading}
                  className="w-full pl-14 pr-5 py-4 bg-transparent outline-none text-white placeholder-gray-500 disabled:opacity-50 font-medium"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-md opacity-0 group-hover:opacity-30 group-focus-within:opacity-40 transition-opacity duration-300"></div>
              <div className="relative flex items-center bg-white/5 rounded-2xl border-2 border-white/10 focus-within:border-purple-500/50 focus-within:bg-white/10 backdrop-blur-xl transition-all duration-300">
                <Lock className="absolute left-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={20} />
                <input
                  type="password"
                  placeholder="your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                  required
                  disabled={loading}
                  className="w-full pl-14 pr-5 py-4 bg-transparent outline-none text-white placeholder-gray-500 disabled:opacity-50 font-medium"
                />
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end mt-2">
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="text-sm text-gray-400 hover:text-pink-400 transition-colors duration-300 font-medium"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading || !email || !password}
              className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-white font-bold py-5 rounded-2xl shadow-2xl hover:shadow-pink-500/50 transform hover:scale-105 hover:-translate-y-1 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group mt-6 bg-[length:200%_100%] animate-gradient-shift"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 text-lg">
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    signing in...
                  </>
                ) : (
                  <>
                    <Heart size={18} fill="white" />
                    let's go
                    <Sparkles size={18} />
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_100%] animate-gradient-shift"></div>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-500/30 to-transparent"></div>
            <span className="px-4 text-gray-500 text-sm font-semibold">or</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center text-gray-400">
            new here?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="text-transparent bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text font-bold hover:from-pink-300 hover:to-purple-300 transition-all duration-300 hover:scale-105 inline-block"
            >
              create account ✨
            </button>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
            <Heart size={14} className="text-pink-500 animate-pulse" fill="currentColor" />
            find your vibe
            <Star size={14} className="text-purple-500 animate-pulse" fill="currentColor" />
          </p>
        </div>
      </div>

      <style>{`
        .bg-gradient-dark {
          background: linear-gradient(135deg, #0a0a0a 0%, #1a0520 25%, #0a0a0a 50%, #0f0520 75%, #0a0a0a 100%);
          background-size: 400% 400%;
          animation: gradient-shift-bg 20s ease infinite;
        }

        .bg-gradient-radial {
          background: 
            radial-gradient(circle at 20% 30%, rgba(255, 0, 110, 0.15) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.15) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 50%);
        }

        .glass-card-dark {
          background: rgba(15, 15, 25, 0.7);
          backdrop-filter: blur(40px) saturate(180%);
          border-radius: 32px;
          border: 2px solid rgba(255, 255, 255, 0.1);
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.5),
            0 0 80px rgba(255, 0, 110, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        @keyframes gradient-shift-bg {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .animate-gradient-shift {
          animation: gradient-shift 3s ease infinite;
        }

        @keyframes gradient-text {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .animate-gradient-text {
          background-size: 200% 200%;
          animation: gradient-text 4s ease infinite;
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }

        .animate-pulse-glow {
          animation: pulse-glow 3s ease infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;