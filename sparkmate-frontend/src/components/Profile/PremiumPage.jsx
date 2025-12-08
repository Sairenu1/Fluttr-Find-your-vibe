import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowLeft, Star, Zap, Heart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { GradientBackground } from "../Layouts/GradientBackground";
import PaymentModal from './PaymentModal';

const PremiumPage = () => {
    const navigate = useNavigate();
    const { updateUser } = useAuth();
    const [showPayment, setShowPayment] = useState(false);

    const features = [
        "Unlimited Likes",
        "See Who Likes You",
        "Priority Profile Placement",
        "5 Super Likes per day",
        "Rewind your last swipe"
    ];

    const handleSubscribe = () => {
        setShowPayment(true);
    };

    const onPaymentSuccess = () => {
        updateUser({ isPremium: true });
        navigate('/profile');
    };

    return (
        <div className="min-h-screen relative overflow-hidden text-white flex flex-col items-center p-4">
            <GradientBackground />

            <button
                onClick={() => navigate('/profile')}
                className="absolute top-6 left-6 z-20 p-2 bg-white/10 rounded-full backdrop-blur-md"
            >
                <ArrowLeft size={24} />
            </button>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-center mt-20 mb-8 z-10"
            >
                <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-300 bg-clip-text text-transparent mb-2">
                    Sparkmate Gold
                </h1>
                <p className="text-white/70">Unlock your full potential</p>
            </motion.div>

            <div className="w-full max-w-md space-y-4 z-10 mb-10">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm"
                    >
                        <div className="p-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full">
                            <Check size={16} className="text-white" />
                        </div>
                        <span className="font-medium">{feature}</span>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="w-full max-w-md z-10 mt-auto mb-8"
            >
                <div className="bg-gradient-to-b from-yellow-400/20 to-orange-500/20 p-6 rounded-3xl border border-yellow-400/30 backdrop-blur-md text-center">
                    <div className="text-3xl font-bold mb-1">$9.99<span className="text-base font-normal text-white/60">/mo</span></div>
                    <p className="text-sm text-white/50 mb-6">Recurring billing, cancel anytime.</p>

                    <button
                        onClick={handleSubscribe}
                        className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl font-bold text-black shadow-lg shadow-orange-500/30 hover:scale-105 transition-transform"
                    >
                        Upgrade Now
                    </button>
                </div>
            </motion.div>

            <PaymentModal
                isOpen={showPayment}
                onClose={() => setShowPayment(false)}
                onSuccess={onPaymentSuccess}
                planPrice="$9.99"
            />
        </div>
    );
};

export default PremiumPage;
