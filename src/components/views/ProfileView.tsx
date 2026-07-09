import React, { useEffect, useState } from 'react';
import { User, LogOut, Loader2, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ElectricBorder from '../ElectricBorder';
import { usePlayer } from '../../context/PlayerContext';

export const ProfileView: React.FC = () => {
  const { user, logout, error } = useAuth();
  const { isProfileModalOpen, setIsProfileModalOpen, currentTrack } = usePlayer();
  const [loading, setLoading] = useState(!user);
  const [profile, setProfile] = useState(user);

  useEffect(() => {
    if (user) {
      setProfile(user);
      setLoading(false);
    }
  }, [user]);

  // If backend is running, fetch fresh profile data
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('music_player_token');
      if (!token) return;

      try {
        const baseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
        let targetUrl = baseUrl ? `${baseUrl}/api/auth/me` : `http://localhost:5000/api/auth/me`;

        if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
          targetUrl = targetUrl.replace(/^http:/, 'https:');
          if (targetUrl.includes('vercel.app')) {
            targetUrl = targetUrl.replace(/:5000$/, '').replace(/:5000\/$/, '');
          }
        }

        if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1' && !baseUrl) {
          targetUrl = `${window.location.origin}/api/auth/me`;
        }

        const res = await fetch(targetUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const json = await res.json();
          if (json.success) {
            setProfile(json.user || json.data);
          } else if (json.user || json.email) {
            setProfile(json.user || json);
          }
        }
      } catch (err) {
        console.log('Profile fetch failed, using local data');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (!isProfileModalOpen) return null;

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md text-white">
        <Loader2 className="w-10 h-10 animate-spin mb-4 text-[#1db954]" />
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md p-4 text-white " onClick={() => setIsProfileModalOpen(false)}>
        <div className="absolute inset-0 " onClick={() => setIsProfileModalOpen(false)} />
        <div className="relative z-10 flex flex-col items-center bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/20 max-w-sm text-center ">
          <User className="w-16 h-16 mb-4 text-[#535353]" />
          <p className="text-xl font-bold">Profile not found</p>
          <p className="text-[#b3b3b3] mt-2">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-fade-in ">
      {/* Click outside to close */}
      <div className="absolute inset-0 cursor-default" onClick={() => setIsProfileModalOpen(false)} />
      
      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-sm " onClick={(e) => e.stopPropagation()}>
        <ElectricBorder
          color={currentTrack.color || '#9a1111ff'}
  
          className="w-full shadow-2xl"
        >
          <div className="flex flex-col items-center gap-6 p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/20 w-full text-center relative">
            {/* Close Button */}
            <button 
              onClick={() => setIsProfileModalOpen(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/15 active:scale-90"
              title="Close profile"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="relative group">
              <img 
                src={profile.profilePic || 'https://cdn.jsdelivr.net/gh/twitter/twemoji/assets/72x72/1f464.png'} 
                alt="Profile" 
                className="w-32 h-32 rounded-full border-4 border-[#292929] object-cover shadow-lg"
              />
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-3xl font-extrabold tracking-tight">{profile.name}</h2>
              <p className="text-[#b3b3b3] text-sm">{profile.email}</p>
            </div>
            <button 
              onClick={() => {
                logout();
                setIsProfileModalOpen(false);
              }}
              className="flex items-center justify-center gap-2 w-full mt-4 px-6 py-3 rounded-xl bg-red-600/10 text-red-500 border border-red-600/30 font-bold hover:bg-red-600/20 active:scale-95 transition-all duration-200"
            >
              <LogOut className="w-4 h-4" /> Log Out
            </button>
          </div>
        </ElectricBorder>

        {error && (
          <div className="p-4 mt-4 w-full rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};
