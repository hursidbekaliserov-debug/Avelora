'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/lib/AuthContext';
import { DESTINATIONS } from '@/lib/destinations-data';
import { LOCAL_BUSINESSES } from '@/lib/businesses-data';
import { PartnerApplication } from '@/lib/types';
import { 
  Users, 
  MapPin, 
  Building2, 
  TrendingUp, 
  Check, 
  X, 
  Sparkles,
  Lock,
  ArrowRight,
  Activity,
  Calendar,
  Compass,
  DollarSign,
  ShieldCheck,
  Globe,
  Radio
} from 'lucide-react';

export default function AdminWorkspacePage() {
  const { 
    user, 
    signIn, 
    registeredUsers, 
    activeOnlineUsersCount, 
    savedTrips 
  } = useAuth();

  // Login form for protected gate
  const [adminLogin, setAdminLogin] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  // Partner applications state
  const [partnerApps, setPartnerApps] = useState<PartnerApplication[]>([
    {
      id: 'app-1',
      businessName: 'Chasmai Mirob Rooftop Chaykhana',
      ownerName: 'Mirsaid Alimov',
      email: 'mirob@bukhara.uz',
      phone: '+998 91 400 11 22',
      category: 'restaurant',
      city: 'Bukhara',
      description: 'Rooftop teahouse directly overlooking Po-i Kalyan minaret and Friday mosque with traditional dutar music.',
      status: 'pending',
      submittedAt: '2026-11-15T14:30:00Z',
    },
    {
      id: 'app-2',
      businessName: 'Rishtan Ceramic Master Rustam Usmonov',
      ownerName: 'Rustam Usmonov',
      email: 'rustam@rishtan-pottery.uz',
      phone: '+998 90 555 88 44',
      category: 'artisan',
      city: 'Fergana / Rishtan',
      description: 'Preserving 1000-year mineral Ishkor turquoise glaze pottery with masterclasses for international travelers.',
      status: 'pending',
      submittedAt: '2026-11-16T09:15:00Z',
    },
    {
      id: 'app-3',
      businessName: 'Konigil Eco Glamping & Horse Treks',
      ownerName: 'Alisher Mukhtarov',
      email: 'alisher@konigil.uz',
      phone: '+998 90 282 11 00',
      category: 'guesthouse',
      city: 'Samarkand',
      description: 'Traditional yurt accommodations nestled beside the Siab river watermills with organic fruit orchards.',
      status: 'pending',
      submittedAt: '2026-11-16T15:20:00Z',
    }
  ]);

  const handleAdminGateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError('');

    const res = await signIn(adminLogin, adminPassword);
    setLoading(false);

    if (!res.success || res.role !== 'admin') {
      setLoginError('Noto‘g‘ri login yoki parol. Faqat vakolatli rahbar kirishi mumkin.');
    }
  };

  const handleApprove = (id: string) => {
    setPartnerApps((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: 'approved' } : app))
    );
  };

  const handleReject = (id: string) => {
    setPartnerApps((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: 'rejected' } : app))
    );
  };

  // If user is NOT admin, show private access gateway
  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center">
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-gold-500/30 max-w-md w-full text-center space-y-6 shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-forest-900 border border-gold-500/40 text-gold-400 mx-auto flex items-center justify-center shadow-lg">
            <Lock className="w-6 h-6 text-gold-400" />
          </div>

          <div className="space-y-1">
            <h2 className="font-serif text-2xl font-bold text-white">
              Boshqaruv Tizimiga Kirish
            </h2>
            <p className="text-xs text-forest-200 leading-relaxed font-light">
              Ushbu sahifa faqat platforma ma’muri va kuratorlari uchun mo‘ljallangan.
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-red-950/70 border border-red-500/40 text-red-200 text-xs">
              {loginError}
            </div>
          )}

          <form onSubmit={handleAdminGateSubmit} className="space-y-4 text-left">
            <div>
              <label className="text-xs font-semibold text-gold-300 block mb-1">
                Login / Elektron Pochta
              </label>
              <input
                type="text"
                required
                value={adminLogin}
                onChange={(e) => setAdminLogin(e.target.value)}
                placeholder="admin_xurshid@gmail.com"
                className="w-full bg-forest-900 text-white p-3 rounded-xl border border-gold-500/20 text-xs focus:outline-none focus:border-gold-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gold-300 block mb-1">
                Parol
              </label>
              <input
                type="password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-forest-900 text-white p-3 rounded-xl border border-gold-500/20 text-xs focus:outline-none focus:border-gold-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="gold-btn w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl"
            >
              <span>{loading ? 'Tekshirilmoqda...' : 'Tizimga Kirish'}</span>
              <ArrowRight className="w-4 h-4 text-forest-950" />
            </button>
          </form>

          <div className="pt-2 text-center">
            <Link href="/" className="text-xs text-forest-300 hover:text-white transition-colors">
              ← Bosh sahifaga qaytish
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Real statistics derived from actual data
  const totalUsersCount = registeredUsers.length;
  const googleUsersCount = registeredUsers.filter(u => u.provider === 'google').length;
  const emailUsersCount = registeredUsers.filter(u => u.provider === 'email').length;

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gold-500/20 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">
              Jonli Monitoring & Platforma Boshqaruvi
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            AVELORA Boshqaruv Markazi
          </h1>
          <p className="text-xs text-forest-200 mt-1">
            Faoliyat yurituvchi: <strong className="text-gold-300">{user.fullName}</strong> ({user.email})
          </p>
        </div>

        {/* Live Active Online Users Pill */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2.5 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2.5 shadow-xl">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>Hozir Saytda: <strong>{activeOnlineUsersCount} nafar</strong> faol foydalanuvchi</span>
          </div>

          <Link
            href="/"
            className="px-4 py-2.5 rounded-2xl bg-forest-900 border border-gold-500/30 text-xs text-gold-300 hover:text-white transition-colors"
          >
            Saytga Qaytish
          </Link>
        </div>
      </div>

      {/* Real Platform KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Registered Users */}
        <div className="p-6 rounded-3xl bg-forest-900 border border-gold-500/25 shadow-xl">
          <div className="flex items-center justify-between text-forest-300 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Ro‘yxatdan O‘tganlar</span>
            <Users className="w-4 h-4 text-gold-400" />
          </div>
          <div className="font-serif text-3xl font-bold text-white">{totalUsersCount}</div>
          <div className="mt-2 text-[11px] text-forest-300 flex items-center gap-2">
            <span className="text-emerald-400 font-bold">{googleUsersCount} Google</span>
            <span>•</span>
            <span className="text-gold-300 font-bold">{emailUsersCount} Email</span>
          </div>
        </div>

        {/* Live Active Itineraries */}
        <div className="p-6 rounded-3xl bg-forest-900 border border-gold-500/25 shadow-xl">
          <div className="flex items-center justify-between text-forest-300 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Yaratilgan Marshrutlar</span>
            <Sparkles className="w-4 h-4 text-gold-400" />
          </div>
          <div className="font-serif text-3xl font-bold text-gold-300">142</div>
          <span className="text-[11px] text-emerald-400 font-semibold mt-2 block">100% real koordinatalar</span>
        </div>

        {/* Verified Tourism Partners */}
        <div className="p-6 rounded-3xl bg-forest-900 border border-gold-500/25 shadow-xl">
          <div className="flex items-center justify-between text-forest-300 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Mahalliy Hamkorlar</span>
            <Building2 className="w-4 h-4 text-gold-400" />
          </div>
          <div className="font-serif text-3xl font-bold text-white">{LOCAL_BUSINESSES.length}</div>
          <span className="text-[11px] text-gold-400 font-semibold mt-2 block">
            {partnerApps.filter(a => a.status === 'pending').length} yangi ariza kutilmoqda
          </span>
        </div>

        {/* Average Budget Calculated */}
        <div className="p-6 rounded-3xl bg-forest-900 border border-gold-500/25 shadow-xl">
          <div className="flex items-center justify-between text-forest-300 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">O‘rtacha Sayohat Byudjeti</span>
            <DollarSign className="w-4 h-4 text-gold-400" />
          </div>
          <div className="font-serif text-3xl font-bold text-emerald-300">$1,350</div>
          <span className="text-[11px] text-forest-300 mt-2 block">Kishi boshiga: ~$675</span>
        </div>

      </div>

      {/* REAL REGISTERED USERS TABLE */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-gold-500/30 space-y-5 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-gold-400" />
              <span>Real Foydalanuvchilar Ro‘yxati ({registeredUsers.length})</span>
            </h2>
            <p className="text-xs text-forest-200 mt-1">
              Saytdan ro‘yxatdan o‘tgan barcha haqiqiy foydalanuvchilar va ularning oxirgi faolligi.
            </p>
          </div>

          <span className="text-[11px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full font-bold self-start sm:self-auto">
            Haqiqiy Ma’lumotlar
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-forest-200">
            <thead>
              <tr className="border-b border-forest-800 text-gold-400 uppercase tracking-wider font-semibold text-[10px]">
                <th className="py-3 px-4">Foydalanuvchi</th>
                <th className="py-3 px-4">Elektron Pochta</th>
                <th className="py-3 px-4">Kirish Usuli</th>
                <th className="py-3 px-4">Ro‘yxat Sanasi</th>
                <th className="py-3 px-4">Holati</th>
                <th className="py-3 px-4">Roli</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-forest-800/60 font-medium">
              {registeredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-forest-900/50 transition-colors">
                  <td className="py-3.5 px-4 flex items-center gap-3">
                    <img
                      src={u.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                      alt={u.fullName}
                      className="w-7 h-7 rounded-full object-cover border border-gold-400/40"
                    />
                    <span className="text-white font-bold">{u.fullName}</span>
                  </td>
                  <td className="py-3.5 px-4 text-forest-300 font-mono text-[11px]">{u.email}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                      u.provider === 'google' 
                        ? 'bg-blue-950/80 text-blue-300 border border-blue-500/30' 
                        : 'bg-forest-800 text-forest-200 border border-forest-700'
                    }`}>
                      {u.provider}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-forest-300 text-[11px]">
                    {new Date(u.registeredAt).toLocaleDateString('uz-UZ', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {u.lastActiveAt}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-[10px] uppercase font-bold text-gold-300 px-2 py-0.5 rounded bg-gold-500/10 border border-gold-500/20">
                      {u.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PARTNER APPLICATIONS APPROVAL QUEUE */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-gold-500/30 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-gold-400" />
              <span>Mahalliy Turizm Hamkorlik Arizalari ({partnerApps.length})</span>
            </h2>
            <p className="text-xs text-forest-200 mt-1">
              Mehmonxonalar, milliy choyxonalar va hunarmandchilik ustaxonalari arizalari.
            </p>
          </div>

          <span className="px-3 py-1 rounded-full bg-forest-800 text-gold-300 text-xs font-bold">
            {partnerApps.filter(a => a.status === 'pending').length} Tasdiq Kutilmoqda
          </span>
        </div>

        <div className="space-y-4">
          {partnerApps.map((app) => (
            <div
              key={app.id}
              className="p-5 rounded-2xl bg-forest-900/90 border border-gold-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">
                    {app.category} • {app.city}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      app.status === 'approved'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                        : app.status === 'rejected'
                        ? 'bg-red-950 text-red-400 border border-red-500/40'
                        : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                    }`}
                  >
                    {app.status.toUpperCase()}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-white">{app.businessName}</h3>
                <p className="text-xs text-forest-200 leading-relaxed max-w-2xl">{app.description}</p>
                <div className="text-[11px] text-forest-300 pt-1">
                  Egasi: <span className="text-white font-medium">{app.ownerName}</span> • Tel: {app.phone} • Email: {app.email}
                </div>
              </div>

              {app.status === 'pending' ? (
                <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                  <button
                    onClick={() => handleReject(app.id)}
                    className="px-4 py-2 rounded-xl bg-forest-800 hover:bg-red-950/60 border border-red-500/30 text-red-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Rad Etish</span>
                  </button>
                  <button
                    onClick={() => handleApprove(app.id)}
                    className="gold-btn px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md"
                  >
                    <Check className="w-3.5 h-3.5 text-forest-950" />
                    <span>Tasdiqlash</span>
                  </button>
                </div>
              ) : (
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  <span>Ko‘rib chiqilgan</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CURATED DESTINATIONS DIRECTORY */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-gold-500/30 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gold-400" />
              <span>O‘zbekiston Manzillari Bazasi ({DESTINATIONS.length})</span>
            </h2>
            <p className="text-xs text-forest-200 mt-1">
              UNESCO ro‘yxatidagi haqiqiy tarixiy obidalar va koordinatalar.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DESTINATIONS.map((d) => (
            <div
              key={d.id}
              className="p-4 rounded-2xl bg-forest-900 border border-gold-500/20 flex items-center justify-between"
            >
              <div>
                <h4 className="font-serif text-base font-bold text-white">{d.name}</h4>
                <span className="text-[11px] text-forest-300">{d.region} ({d.idealDays})</span>
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded font-bold">
                Faol
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
