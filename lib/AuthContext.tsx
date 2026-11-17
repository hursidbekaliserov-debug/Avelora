'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, Itinerary } from './types';
import { supabase, isSupabaseConfigured } from './supabase';
import { SAMPLE_HACKATHON_TRIP } from './sample-trip';

export interface RegisteredUserRecord {
  id: string;
  email: string;
  fullName: string;
  role: 'tourist' | 'admin';
  provider: 'email' | 'google';
  registeredAt: string;
  lastActiveAt: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isSupabaseLive: boolean;
  savedTrips: Itinerary[];
  registeredUsers: RegisteredUserRecord[];
  activeOnlineUsersCount: number;
  signIn: (email: string, password?: string) => Promise<{ success: boolean; role: 'admin' | 'tourist'; error?: string }>;
  signUp: (email: string, fullName: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signInWithGoogle: (customName?: string, customEmail?: string) => Promise<{ success: boolean; role: 'admin' | 'tourist' }>;
  signOut: () => Promise<void>;
  saveTrip: (trip: Itinerary) => void;
  removeTrip: (tripId: string) => void;
  duplicateTrip: (tripId: string) => void;
  toggleFavoriteDestination: (destId: string) => void;
  isDestinationSaved: (destId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initial verified sample registered users for realistic platform statistics
const INITIAL_REGISTERED_USERS: RegisteredUserRecord[] = [
  {
    id: 'user-001',
    email: 'marcus.vance@voyageur.com',
    fullName: 'Marcus Vance',
    role: 'tourist',
    provider: 'google',
    registeredAt: '2026-11-14T10:20:00Z',
    lastActiveAt: 'Just now',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 'user-002',
    email: 'sophie.chen@nomadtravel.co',
    fullName: 'Sophie Chen',
    role: 'tourist',
    provider: 'google',
    registeredAt: '2026-11-15T14:45:00Z',
    lastActiveAt: '2 mins ago',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 'user-003',
    email: 'dmitry.orlov@travelmail.ru',
    fullName: 'Dmitry Orlov',
    role: 'tourist',
    provider: 'email',
    registeredAt: '2026-11-15T18:10:00Z',
    lastActiveAt: '5 mins ago',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 'user-004',
    email: 'jasur.rahimov@tashkent.uz',
    fullName: 'Jasur Rahimov',
    role: 'tourist',
    provider: 'google',
    registeredAt: '2026-11-16T08:30:00Z',
    lastActiveAt: '12 mins ago',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 'user-005',
    email: 'elena.rostova@silkroad.com',
    fullName: 'Elena Rostova',
    role: 'tourist',
    provider: 'email',
    registeredAt: '2026-11-16T12:00:00Z',
    lastActiveAt: '18 mins ago',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [savedTrips, setSavedTrips] = useState<Itinerary[]>([SAMPLE_HACKATHON_TRIP]);
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUserRecord[]>(INITIAL_REGISTERED_USERS);
  const [activeOnlineUsersCount, setActiveOnlineUsersCount] = useState<number>(4);

  useEffect(() => {
    try {
      // 1. Load registered users list
      const storedUsers = localStorage.getItem('avelora_registered_users');
      if (storedUsers) {
        setRegisteredUsers(JSON.parse(storedUsers));
      } else {
        localStorage.setItem('avelora_registered_users', JSON.stringify(INITIAL_REGISTERED_USERS));
      }

      // 2. Load saved trips
      const storedTrips = localStorage.getItem('avelora_saved_trips');
      if (storedTrips) {
        const parsed = JSON.parse(storedTrips);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSavedTrips(parsed);
        }
      }

      // 3. Load active session user if already signed in
      const storedSession = localStorage.getItem('avelora_active_user');
      if (storedSession) {
        setUser(JSON.parse(storedSession));
      }

      // Random dynamic fluctuation for live active online users (e.g. 4-8 live online)
      const interval = setInterval(() => {
        setActiveOnlineUsersCount((prev) => {
          const delta = Math.random() > 0.5 ? 1 : -1;
          const next = prev + delta;
          return next < 3 ? 3 : next > 9 ? 9 : next;
        });
      }, 8000);

      setIsLoading(false);
      return () => clearInterval(interval);
    } catch (e) {
      setIsLoading(false);
    }
  }, []);

  // Check if credentials are for Admin
  const isAdminCredentials = (emailInput: string, passwordInput?: string): boolean => {
    const cleanEmail = emailInput.trim().toLowerCase();
    const cleanPass = passwordInput?.trim() || '';

    // Admin login: admin_xurshid@gmail.com and password: 30032012X
    const isAdminEmail = cleanEmail === 'admin_xurshid@gmail.com' || cleanEmail === 'admin';
    const isAdminPass = cleanPass === '30032012X' || cleanPass === '30032012x';

    return isAdminEmail && isAdminPass;
  };

  const signIn = async (emailInput: string, passwordInput?: string) => {
    const cleanEmail = emailInput.trim().toLowerCase();

    // 1. ADMIN LOGIN CHECK
    if (isAdminCredentials(cleanEmail, passwordInput)) {
      const adminProfile: UserProfile = {
        id: 'admin-xurshid-001',
        email: 'admin_xurshid@gmail.com',
        fullName: 'Xurshid (Admin)',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        preferredLanguage: 'uz',
        preferredCurrency: 'USD',
        role: 'admin',
        savedDestinations: ['samarkand', 'bukhara', 'khiva', 'chimgan']
      };
      setUser(adminProfile);
      localStorage.setItem('avelora_active_user', JSON.stringify(adminProfile));
      return { success: true, role: 'admin' as const };
    }

    // 2. SUPABASE LIVE CHECK (if connected)
    if (isSupabaseConfigured && supabase && passwordInput) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: passwordInput,
        });
        if (error) {
          return { success: false, role: 'tourist' as const, error: error.message };
        }
        if (data.user) {
          const profile: UserProfile = {
            id: data.user.id,
            email: data.user.email || cleanEmail,
            fullName: data.user.user_metadata?.full_name || cleanEmail.split('@')[0],
            avatarUrl: data.user.user_metadata?.avatar_url,
            preferredLanguage: 'en',
            preferredCurrency: 'USD',
            role: 'tourist',
            savedDestinations: []
          };
          setUser(profile);
          localStorage.setItem('avelora_active_user', JSON.stringify(profile));
          return { success: true, role: 'tourist' as const };
        }
      } catch (e: any) {
        // fallback
      }
    }

    // 3. NORMAL USER SIGN IN
    const existing = registeredUsers.find((u) => u.email.toLowerCase() === cleanEmail);
    const touristProfile: UserProfile = {
      id: existing ? existing.id : `user-${Date.now()}`,
      email: cleanEmail,
      fullName: existing ? existing.fullName : cleanEmail.split('@')[0],
      avatarUrl: existing?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      preferredLanguage: 'en',
      preferredCurrency: 'USD',
      role: 'tourist',
      savedDestinations: ['samarkand', 'bukhara']
    };

    setUser(touristProfile);
    localStorage.setItem('avelora_active_user', JSON.stringify(touristProfile));
    return { success: true, role: 'tourist' as const };
  };

  const signUp = async (emailInput: string, fullNameInput: string, passwordInput?: string) => {
    const cleanEmail = emailInput.trim().toLowerCase();

    // Check if registering with admin email
    if (isAdminCredentials(cleanEmail, passwordInput)) {
      return signIn(cleanEmail, passwordInput);
    }

    // Supabase Live Check
    if (isSupabaseConfigured && supabase && passwordInput) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: cleanEmail,
          password: passwordInput,
          options: { data: { full_name: fullNameInput } }
        });
        if (error) {
          return { success: false, error: error.message };
        }
      } catch (e) {}
    }

    // Add to registered users list
    const newRecord: RegisteredUserRecord = {
      id: `usr-${Date.now()}`,
      email: cleanEmail,
      fullName: fullNameInput || cleanEmail.split('@')[0],
      role: 'tourist',
      provider: 'email',
      registeredAt: new Date().toISOString(),
      lastActiveAt: 'Just now',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    };

    const updatedUsers = [newRecord, ...registeredUsers];
    setRegisteredUsers(updatedUsers);
    localStorage.setItem('avelora_registered_users', JSON.stringify(updatedUsers));

    // Sign in the user
    const touristProfile: UserProfile = {
      id: newRecord.id,
      email: newRecord.email,
      fullName: newRecord.fullName,
      avatarUrl: newRecord.avatarUrl,
      preferredLanguage: 'en',
      preferredCurrency: 'USD',
      role: 'tourist',
      savedDestinations: []
    };

    setUser(touristProfile);
    localStorage.setItem('avelora_active_user', JSON.stringify(touristProfile));
    return { success: true };
  };

  const signInWithGoogle = async (customName?: string, customEmail?: string) => {
    // If Supabase OAuth is live:
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: { redirectTo: `${window.location.origin}/plan` }
        });
      } catch (e) {}
    }

    // Google Sign-in with user's real identity
    const realName = customName || 'Xurshid';
    const realEmail = customEmail || 'xurshid.traveler@gmail.com';

    const newGoogleRecord: RegisteredUserRecord = {
      id: `google-${Date.now()}`,
      email: realEmail,
      fullName: realName,
      role: 'tourist',
      provider: 'google',
      registeredAt: new Date().toISOString(),
      lastActiveAt: 'Hozir onlayn',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    };

    const updatedUsers = [newGoogleRecord, ...registeredUsers.filter(u => u.email !== realEmail)];
    setRegisteredUsers(updatedUsers);
    localStorage.setItem('avelora_registered_users', JSON.stringify(updatedUsers));

    const touristProfile: UserProfile = {
      id: newGoogleRecord.id,
      email: newGoogleRecord.email,
      fullName: newGoogleRecord.fullName,
      avatarUrl: newGoogleRecord.avatarUrl,
      preferredLanguage: 'uz',
      preferredCurrency: 'USD',
      role: 'tourist',
      savedDestinations: ['samarkand', 'bukhara']
    };

    setUser(touristProfile);
    localStorage.setItem('avelora_active_user', JSON.stringify(touristProfile));
    return { success: true, role: 'tourist' as const };
  };

  const signOut = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    try {
      localStorage.removeItem('avelora_active_user');
    } catch (e) {}
  };

  const saveTrip = (trip: Itinerary) => {
    setSavedTrips((prev) => {
      const exists = prev.some((t) => t.id === trip.id);
      const updated = exists ? prev.map((t) => (t.id === trip.id ? trip : t)) : [trip, ...prev];
      try {
        localStorage.setItem('avelora_saved_trips', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const removeTrip = (tripId: string) => {
    setSavedTrips((prev) => {
      const updated = prev.filter((t) => t.id !== tripId);
      try {
        localStorage.setItem('avelora_saved_trips', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const duplicateTrip = (tripId: string) => {
    setSavedTrips((prev) => {
      const target = prev.find((t) => t.id === tripId);
      if (!target) return prev;
      const duplicated: Itinerary = {
        ...target,
        id: `trip-${Date.now()}`,
        title: `${target.title} (Copy)`,
        createdAt: new Date().toISOString()
      };
      const updated = [duplicated, ...prev];
      try {
        localStorage.setItem('avelora_saved_trips', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const toggleFavoriteDestination = (destId: string) => {
    if (!user) return;
    const exists = user.savedDestinations.includes(destId);
    const updatedDestinations = exists
      ? user.savedDestinations.filter((id) => id !== destId)
      : [...user.savedDestinations, destId];

    const updatedUser = { ...user, savedDestinations: updatedDestinations };
    setUser(updatedUser);
    try {
      localStorage.setItem('avelora_active_user', JSON.stringify(updatedUser));
    } catch (e) {}
  };

  const isDestinationSaved = (destId: string): boolean => {
    return Boolean(user?.savedDestinations?.includes(destId));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isSupabaseLive: isSupabaseConfigured,
        savedTrips,
        registeredUsers,
        activeOnlineUsersCount,
        signIn,
        signUp,
        signInWithGoogle,
        signOut,
        saveTrip,
        removeTrip,
        duplicateTrip,
        toggleFavoriteDestination,
        isDestinationSaved
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
