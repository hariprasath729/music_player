import React, { useEffect, useState } from 'react';
import { User, Mail, LogOut, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ProfileView: React.FC = () => {
  const { user, logout, error } = useAuth();
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
        const res = await fetch(`http://${window.location.hostname}:5000/api/auth/me`, {
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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-white">
        <Loader2 className="w-10 h-10 animate-spin mb-4 text-[#1db954]" />
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-white">
        <User className="w-16 h-16 mb-4 text-[#535353]" />
        <p className="text-xl font-bold">Profile not found</p>
        <p className="text-[#b3b3b3] mt-2">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 px-4 py-8 max-w-2xl mx-auto text-white sm:px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Profile</h1>
        <button 
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/10 text-red-500 border border-red-600/30 font-bold hover:bg-red-600/20 transition"
        >
          <LogOut className="w-4 h-4" /> Log Out
        </button>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 rounded-2xl bg-[#181818] border border-[#292929]">
        <div className="relative group">
          <img 
            src={profile.profilePic || 'https://cdn.jsdelivr.net/gh/twitter/twemoji/assets/72x72/1f464.png'} 
            alt="Profile" 
            className="w-32 h-32 rounded-full border-4 border-[#292929] object-cover"
          />
        </div>
        <div className="flex flex-col text-center sm:text-left gap-2">
          <h2 className="text-3xl font-extrabold">{profile.name}</h2>
          <p className="text-[#b3b3b3]">{profile.email}</p>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="flex items-center gap-4 p-4 rounded-lg bg-[#181818] border border-[#292929]">
          <div className="p-2 rounded-full bg-[#1db954]/10">
            <User className="text-[#1db954] w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-[#727272] font-bold uppercase tracking-wide">Display Name</p>
            <p className="font-semibold">{profile.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 rounded-lg bg-[#181818] border border-[#292929]">
          <div className="p-2 rounded-full bg-[#1db954]/10">
            <Mail className="text-[#1db954] w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-[#727272] font-bold uppercase tracking-wide">Email</p>
            <p className="font-semibold">{profile.email}</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {error}
        </div>
      )}
    </div>
  );
};
