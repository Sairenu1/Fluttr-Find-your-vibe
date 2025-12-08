import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, Heart, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        // Mock API call
        setTimeout(() => {
            setLoading(false);
            toast.success('Reset link sent to your email! 📧');
            // Optional: navigate back to login after delay
            // setTimeout(() => navigate('/login'), 2000);
        }, 1500);
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden" style={{ background: '#0a0a0a' }}>
            {/* Animated Dark Gradient Background - Matching LoginPage */}
            <div className="absolute inset-0 bg-gradient-dark">
                <div className="absolute inset-0 bg-gradient-radial"></div>
            </div>

            {/* Card */}
            <div className="relative z-10 w-full max-w-md">
                <div className="glass-card-dark p-8 md:p-10 transform transition-all duration-500">

                    {/* Back Button */}
                    <button
                        onClick={() => navigate('/login')}
                        className="absolute top-6 left-6 text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={24} />
                    </button>

                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="relative bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-full p-4 shadow-lg border border-white/10">
                            <Mail size={32} className="text-pink-400" />
                        </div>
                    </div>

                    {/* Title */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Forgot Password?
                        </h1>
                        <p className="text-gray-400 text-sm">
                            Don't worry, it happens! Enter your email and we'll send you a reset link.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl blur-md opacity-0 group-hover:opacity-30 group-focus-within:opacity-40 transition-opacity duration-300"></div>
                            <div className="relative flex items-center bg-white/5 rounded-2xl border-2 border-white/10 focus-within:border-pink-500/50 focus-within:bg-white/10 backdrop-blur-xl transition-all duration-300">
                                <Mail className="absolute left-5 text-gray-500 group-focus-within:text-pink-400 transition-colors" size={20} />
                                <input
                                    type="email"
                                    placeholder="your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={loading}
                                    className="w-full pl-14 pr-5 py-4 bg-transparent outline-none text-white placeholder-gray-500 disabled:opacity-50 font-medium"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !email}
                            className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-white font-bold py-4 rounded-2xl shadow-2xl hover:shadow-pink-500/50 transform hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group mt-6 bg-[length:200%_100%] animate-gradient-shift"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Reset Link <Sparkles size={18} />
                                    </>
                                )}
                            </span>
                        </button>
                    </form>

                    {/* Bottom Link */}
                    <div className="mt-8 text-center bg-white/5 rounded-xl py-3 border border-white/5">
                        <span className="text-gray-400 text-sm">Remembered it? </span>
                        <button
                            onClick={() => navigate('/login')}
                            className="text-pink-400 font-semibold hover:text-purple-400 transition-colors inline-flex items-center gap-1"
                        >
                            Log in
                        </button>
                    </div>
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
      `}</style>
        </div>
    );
};

export default ForgotPasswordPage;
