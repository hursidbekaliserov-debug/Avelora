'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { User, Lock, Mail, ArrowRight } from 'lucide-react';
import GoogleSignInModal from '@/components/Auth/GoogleSignInModal';

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get('redirect') || '/plan';
  const { signUp, signInWithGoogle } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [googleModalOpen, setGoogleModalOpen] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await signUp(email, name, password);
      setLoading(false);
      if (res.success) {
        if (email.trim().toLowerCase() === 'admin_xurshid@gmail.com') {
          router.push('/admin');
        } else {
          router.push(redirectTarget);
        }
      } else {
        setErrorMsg(res.error || 'Ro‘yxatdan o‘tishda xatolik yuz berdi.');
      }
    } catch (err: any) {
      setLoading(false);
      setErrorMsg(err.message || 'Xatolik yuz berdi.');
    }
  };

  const handleConfirmGoogleSignUp = async (confirmedName: string, confirmedEmail: string) => {
    setLoading(true);
    try {
      const res = await signInWithGoogle(confirmedName, confirmedEmail);
      setLoading(false);
      setGoogleModalOpen(false);
      if (res.success) {
        router.push(redirectTarget);
      }
    } catch (err: any) {
      setLoading(false);
      setErrorMsg('Google orqali ro‘yxatdan o‘tishda xatolik yuz berdi.');
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 flex items-center justify-center">
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-gold-500/30 max-w-md w-full shadow-2xl space-y-6">
        
        {/* Circular Logo and Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto relative mb-3 rounded-full p-1.5 bg-gradient-to-br from-forest-900 to-forest-950 border-2 border-gold-400 shadow-[0_0_20px_rgba(198,163,106,0.3)] flex items-center justify-center overflow-hidden">
            <Image
              src="/logo-circle.png"
              alt="Avelora Logo"
              width={52}
              height={52}
              className="object-contain"
            />
          </div>
          <h1 className="font-serif italic font-bold text-3xl text-white tracking-wide">
            Avelora
          </h1>
          <p className="text-xs text-forest-200 leading-relaxed font-light">
            O‘zbekiston va Ipak Yo‘li bo‘ylab sun’iy intellekt yordamida sayohat qiling.
          </p>
        </div>

        {/* Google OAuth Button */}
        <div>
          <button
            type="button"
            onClick={() => setGoogleModalOpen(true)}
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-neutral-100 text-neutral-800 font-semibold text-xs transition-all flex items-center justify-center gap-3 shadow-lg active:scale-[0.98]"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Google orqali ro‘yxatdan o‘tish</span>
          </button>
        </div>

        {/* Google Modal */}
        <GoogleSignInModal
          isOpen={googleModalOpen}
          onClose={() => setGoogleModalOpen(false)}
          onConfirm={handleConfirmGoogleSignUp}
          loading={loading}
        />

        {/* Divider */}
        <div className="flex items-center gap-3 my-2">
          <div className="flex-grow h-px bg-forest-800" />
          <span className="text-[10px] text-forest-300 uppercase tracking-widest font-semibold">yoki elektron pochta</span>
          <div className="flex-grow h-px bg-forest-800" />
        </div>

        {/* Register Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-950/70 border border-red-500/40 text-red-200 text-xs">
              {errorMsg}
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-gold-300 block mb-1">
              Ism va Familiya
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-forest-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jasur Rahimov"
                required
                className="w-full bg-forest-900 text-white pl-10 pr-4 py-3 rounded-xl border border-gold-500/20 text-xs focus:outline-none focus:border-gold-400"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gold-300 block mb-1">
              Elektron pochta
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-forest-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full bg-forest-900 text-white pl-10 pr-4 py-3 rounded-xl border border-gold-500/20 text-xs focus:outline-none focus:border-gold-400"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gold-300 block mb-1">
              Parol
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-forest-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={4}
                className="w-full bg-forest-900 text-white pl-10 pr-4 py-3 rounded-xl border border-gold-500/20 text-xs focus:outline-none focus:border-gold-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="gold-btn w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl"
          >
            <span>{loading ? 'Yaratilmoqda...' : 'Hisob Yaratish'}</span>
            <ArrowRight className="w-4 h-4 text-forest-950" />
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-forest-300">
          Hisobingiz bormi?{' '}
          <Link
            href={`/login?redirect=${encodeURIComponent(redirectTarget)}`}
            className="text-gold-300 font-bold hover:underline"
          >
            Kirish
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-36 pb-20 text-center text-gold-400">
          <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-forest-200">Yuklanmoqda...</p>
        </div>
      }
    >
      <RegisterContent />
    </Suspense>
  );
}
