import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Lock, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const PaymentModal = ({ isOpen, onClose, onSuccess, planPrice }) => {
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState('card'); // card, success
    const [cardData, setCardData] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: ''
    });

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        // Simple formatting logic
        if (name === 'number') {
            formattedValue = value.replace(/\D/g, '').substring(0, 16).replace(/(\d{4})/g, '$1 ').trim();
        } else if (name === 'expiry') {
            formattedValue = value.replace(/\D/g, '').substring(0, 4).replace(/(\d{2})(\d{1,2})/, '$1/$2');
        } else if (name === 'cvc') {
            formattedValue = value.replace(/\D/g, '').substring(0, 3);
        }

        setCardData({ ...cardData, [name]: formattedValue });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate Stripe API call
        setTimeout(() => {
            setLoading(false);
            setStep('success');
            toast.success('Payment successful!');
            setTimeout(() => {
                onSuccess();
                onClose();
                setStep('card'); // Reset
                setCardData({ number: '', expiry: '', cvc: '', name: '' });
            }, 2000);
        }, 2000);
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-gray-900 w-full max-w-md rounded-3xl border border-gray-800 shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {step === 'card' ? (
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <div className="bg-[#635BFF] p-2 rounded-lg">
                                    {/* Stripe Blurple Color */}
                                    <CreditCard size={20} className="text-white" />
                                </div>
                                <span className="font-bold text-white text-lg">Secure Payment</span>
                            </div>
                            <button onClick={onClose} className="text-gray-400 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="mb-6 bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                            <div className="flex justify-between text-sm text-gray-300 mb-1">
                                <span>Sparkmate Gold</span>
                                <span className="font-bold text-white">{planPrice}</span>
                            </div>
                            <div className="text-xs text-gray-500">Recurring monthly billing</div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">Card Number</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="number"
                                        value={cardData.number}
                                        onChange={handleInputChange}
                                        placeholder="0000 0000 0000 0000"
                                        className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#635BFF] transition-colors font-mono"
                                        required
                                    />
                                    <div className="absolute right-3 top-3 flex gap-2">
                                        <div className="w-8 h-5 bg-gray-600 rounded"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">Expiry</label>
                                    <input
                                        type="text"
                                        name="expiry"
                                        value={cardData.expiry}
                                        onChange={handleInputChange}
                                        placeholder="MM/YY"
                                        className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#635BFF] transition-colors font-mono"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">CVC</label>
                                    <input
                                        type="text"
                                        name="cvc"
                                        value={cardData.cvc}
                                        onChange={handleInputChange}
                                        placeholder="123"
                                        className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#635BFF] transition-colors font-mono"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">Cardholder Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={cardData.name}
                                    onChange={handleInputChange}
                                    placeholder="John Doe"
                                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#635BFF] transition-colors"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#635BFF] hover:bg-[#5851df] text-white font-bold py-4 rounded-xl mt-4 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 disabled:opacity-70"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <Lock size={18} />
                                        Pay {planPrice}
                                    </>
                                )}
                            </button>

                            <div className="flex justify-center items-center gap-2 mt-4 text-[#aab7c4] text-xs">
                                <Lock size={12} />
                                Payments processed securely via Stripe
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="p-8 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-green-500/30">
                            <Check size={32} className="text-white" strokeWidth={3} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Payment Successful!</h3>
                        <p className="text-gray-400 mb-6">Welcome to Sparkmate Gold.</p>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default PaymentModal;
