import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Flag, Ban, AlertTriangle, MessageSquare, Image, User, Send } from 'lucide-react';
import toast from 'react-hot-toast';

const ReportModal = ({ isOpen, onClose, userName, userId, onBlock }) => {
    const [step, setStep] = useState('options'); // options, report, blocked
    const [selectedReason, setSelectedReason] = useState('');
    const [details, setDetails] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const reportReasons = [
        { id: 'fake', icon: User, label: 'Fake Profile', description: 'This profile seems fake or is impersonating someone' },
        { id: 'inappropriate', icon: Image, label: 'Inappropriate Photos', description: 'Contains nudity or inappropriate content' },
        { id: 'harassment', icon: MessageSquare, label: 'Harassment', description: 'This person is being abusive or harassing' },
        { id: 'scam', icon: AlertTriangle, label: 'Scam or Spam', description: 'Attempting to scam or send spam messages' },
        { id: 'underage', icon: Flag, label: 'Underage User', description: 'This person appears to be under 18' },
        { id: 'other', icon: Flag, label: 'Other', description: 'Another reason not listed above' }
    ];

    const handleReport = () => {
        if (!selectedReason) {
            toast.error('Please select a reason');
            return;
        }
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            toast.success('Report submitted. Thank you for keeping Sparkmate safe! 🛡️');
            onClose();
            resetModal();
        }, 1500);
    };

    const handleBlock = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep('blocked');
            if (onBlock) onBlock(userId);
            setTimeout(() => {
                onClose();
                resetModal();
                toast.success(`${userName} has been blocked`);
            }, 1500);
        }, 1000);
    };

    const resetModal = () => {
        setStep('options');
        setSelectedReason('');
        setDetails('');
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-gray-900 w-full max-w-md rounded-3xl border border-gray-800 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {step === 'options' && (
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-white">What would you like to do?</h2>
                            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={() => setStep('report')}
                                className="w-full flex items-center gap-4 p-4 bg-gray-800/50 hover:bg-gray-800 rounded-2xl border border-gray-700 transition-all group"
                            >
                                <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center group-hover:bg-red-500/30 transition-colors">
                                    <Flag size={22} className="text-red-400" />
                                </div>
                                <div className="text-left">
                                    <p className="text-white font-semibold">Report {userName}</p>
                                    <p className="text-gray-400 text-sm">Report inappropriate behavior</p>
                                </div>
                            </button>

                            <button
                                onClick={handleBlock}
                                disabled={loading}
                                className="w-full flex items-center gap-4 p-4 bg-gray-800/50 hover:bg-gray-800 rounded-2xl border border-gray-700 transition-all group disabled:opacity-50"
                            >
                                <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center group-hover:bg-orange-500/30 transition-colors">
                                    <Ban size={22} className="text-orange-400" />
                                </div>
                                <div className="text-left">
                                    <p className="text-white font-semibold">Block {userName}</p>
                                    <p className="text-gray-400 text-sm">They won't be able to see you</p>
                                </div>
                            </button>
                        </div>

                        <p className="text-gray-500 text-xs text-center mt-4">
                            {userName} won't know you reported or blocked them
                        </p>
                    </div>
                )}

                {step === 'report' && (
                    <div className="p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <button onClick={() => setStep('options')} className="text-gray-400 hover:text-white">
                                <X size={24} />
                            </button>
                            <h2 className="text-xl font-bold text-white">Report {userName}</h2>
                        </div>

                        <p className="text-gray-400 text-sm mb-4">Why are you reporting this person?</p>

                        <div className="space-y-2 mb-4">
                            {reportReasons.map((reason) => {
                                const Icon = reason.icon;
                                return (
                                    <button
                                        key={reason.id}
                                        onClick={() => setSelectedReason(reason.id)}
                                        className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${selectedReason === reason.id
                                                ? 'bg-pink-500/20 border-pink-500'
                                                : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                                            }`}
                                    >
                                        <Icon size={18} className={selectedReason === reason.id ? 'text-pink-400' : 'text-gray-400'} />
                                        <span className={`text-sm ${selectedReason === reason.id ? 'text-white' : 'text-gray-300'}`}>
                                            {reason.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {selectedReason === 'other' && (
                            <textarea
                                value={details}
                                onChange={(e) => setDetails(e.target.value)}
                                placeholder="Please provide more details..."
                                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 resize-none h-24 mb-4"
                            />
                        )}

                        <button
                            onClick={handleReport}
                            disabled={loading || !selectedReason}
                            className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <Send size={18} />
                                    Submit Report
                                </>
                            )}
                        </button>
                    </div>
                )}

                {step === 'blocked' && (
                    <div className="p-8 text-center">
                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Ban size={32} className="text-green-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{userName} Blocked</h3>
                        <p className="text-gray-400 text-sm">They can no longer see your profile or contact you.</p>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default ReportModal;
