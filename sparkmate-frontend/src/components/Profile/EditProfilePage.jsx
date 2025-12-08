import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Mail, Camera } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { GradientBackground } from "../Layouts/GradientBackground";

const EditProfilePage = () => {
    const navigate = useNavigate();
    const { user, updateUser } = useAuth();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        bio: user?.bio || ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser(formData);
        navigate('/profile');
    };

    return (
        <div className="min-h-screen relative overflow-hidden text-white p-4">
            <GradientBackground />

            <div className="flex items-center gap-4 mb-8 pt-6 z-10 relative">
                <button onClick={() => navigate('/profile')} className="p-2 bg-white/10 rounded-full">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-2xl font-bold">Edit Profile</h1>
            </div>

            <div className="relative z-10 flex flex-col items-center mb-8">
                <div className="relative">
                    <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover border-4 border-pink-500/50"
                    />
                    <button className="absolute bottom-0 right-0 p-2 bg-pink-500 rounded-full shadow-lg">
                        <Camera size={20} />
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="relative z-10 space-y-6 max-w-md mx-auto">
                <div className="space-y-2">
                    <label className="text-sm text-gray-400 ml-1">Full Name</label>
                    <div className="flex items-center bg-white/5 rounded-xl border border-white/10 p-4">
                        <User className="text-gray-500 mr-3" size={20} />
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="bg-transparent w-full outline-none"
                            placeholder="Your Name"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm text-gray-400 ml-1">Email</label>
                    <div className="flex items-center bg-white/5 rounded-xl border border-white/10 p-4">
                        <Mail className="text-gray-500 mr-3" size={20} />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="bg-transparent w-full outline-none"
                            placeholder="Your Email"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm text-gray-400 ml-1">Bio</label>
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        className="w-full bg-white/5 rounded-xl border border-white/10 p-4 outline-none min-h-[100px]"
                        placeholder="Tell us about yourself..."
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl font-bold shadow-lg hover:shadow-pink-500/30 transition-all mt-8"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditProfilePage;
