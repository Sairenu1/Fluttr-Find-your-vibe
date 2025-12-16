import React from 'react';
import { motion } from 'framer-motion';
import { Camera, FileText, Heart, MapPin, Shield, Check } from 'lucide-react';

const ProfileCompletion = ({ profileData = {} }) => {
    // Calculate completion based on profile fields
    const completionItems = [
        { id: 'photos', label: 'Add photos', icon: Camera, completed: (profileData.photos?.length || 0) >= 2 },
        { id: 'bio', label: 'Write a bio', icon: FileText, completed: !!profileData.bio && profileData.bio.length > 20 },
        { id: 'interests', label: 'Add interests', icon: Heart, completed: (profileData.interests?.length || 0) >= 3 },
        { id: 'location', label: 'Add location', icon: MapPin, completed: !!profileData.location },
        { id: 'verified', label: 'Verify profile', icon: Shield, completed: !!profileData.verified }
    ];

    // For demo, let's have some completed
    const demoItems = [
        { id: 'photos', label: 'Add photos', icon: Camera, completed: true },
        { id: 'bio', label: 'Write a bio', icon: FileText, completed: true },
        { id: 'interests', label: 'Add interests', icon: Heart, completed: true },
        { id: 'location', label: 'Add location', icon: MapPin, completed: false },
        { id: 'verified', label: 'Verify profile', icon: Shield, completed: false }
    ];

    const items = Object.keys(profileData).length > 0 ? completionItems : demoItems;
    const completedCount = items.filter(item => item.completed).length;
    const percentage = Math.round((completedCount / items.length) * 100);

    // Circle properties
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="bg-gray-800/50 rounded-2xl p-4 border border-gray-700/50">
            <div className="flex items-center gap-4">
                {/* Circular Progress */}
                <div className="relative w-24 h-24 flex-shrink-0">
                    <svg className="w-24 h-24 transform -rotate-90">
                        {/* Background circle */}
                        <circle
                            cx="48"
                            cy="48"
                            r={radius}
                            stroke="currentColor"
                            strokeWidth="6"
                            fill="none"
                            className="text-gray-700"
                        />
                        {/* Progress circle */}
                        <motion.circle
                            cx="48"
                            cy="48"
                            r={radius}
                            stroke="url(#gradient)"
                            strokeWidth="6"
                            fill="none"
                            strokeLinecap="round"
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            style={{
                                strokeDasharray: circumference
                            }}
                        />
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#ec4899" />
                                <stop offset="100%" stopColor="#f43f5e" />
                            </linearGradient>
                        </defs>
                    </svg>
                    {/* Percentage text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">{percentage}%</span>
                    </div>
                </div>

                {/* Completion Items */}
                <div className="flex-1">
                    <h4 className="text-white font-semibold mb-2">Profile Completion</h4>
                    <div className="space-y-1.5">
                        {items.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div key={item.id} className="flex items-center gap-2">
                                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${item.completed
                                            ? 'bg-green-500'
                                            : 'bg-gray-700 border border-gray-600'
                                        }`}>
                                        {item.completed && <Check size={10} className="text-white" strokeWidth={3} />}
                                    </div>
                                    <span className={`text-xs ${item.completed ? 'text-gray-400 line-through' : 'text-gray-300'}`}>
                                        {item.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {percentage < 100 && (
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-4 bg-gradient-to-r from-pink-600 to-rose-600 text-white text-sm font-semibold py-2.5 rounded-xl"
                >
                    Complete Profile
                </motion.button>
            )}
        </div>
    );
};

export default ProfileCompletion;
