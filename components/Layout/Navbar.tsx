'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/LanguageContext';
import { useAuth } from '@/lib/AuthContext';
import { Language, Currency } from '@/lib/types';
import { 
  Globe, 
  Sparkles, 
  User, 
  Menu, 
  X, 
  LogOut, 
  ShieldAlert, 
  Bookmark, 
  Luggage,
  ChevronDown
} from 'lucide-react';

export default function Navbar() {
  const { lang, setLang, currency, setCurrency, t } = useLanguage();
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const navLinks = [
    { href: '/destinations', label: t('navDestinations') },
    { href: user ? '/plan' : '/login?redirect=/plan', label: 'Plan Journey' },
    { href: '/explore', label: t('navExplore') },
    { href: '/about', label: t('navAbout') },
  ];

  return (
    <header className="relative w-full z-50 bg-forest-950/95 border-b border-gold-500/25 py-3 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Circular Logo & Luxury Italic Wordmark */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* Circular Luxury Emblem Badge */}
            <div className="relative w-11 h-11 rounded-full p-1 bg-gradient-to-br from-forest-900 via-forest-950 to-forest-900 border-2 border-gold-400/80 shadow-[0_0_15px_rgba(198,163,106,0.35)] flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/logo-circle.png"
                alt="Avelora Luxury Emblem"
                width={36}
                height={36}
                className="w-full h-full object-contain drop-shadow"
                priority
              />
            </div>

            {/* Custom High-End Italic Typography */}
            <div className="flex flex-col">
              <span className="font-serif italic font-bold text-2xl sm:text-[26px] tracking-[0.16em] bg-gradient-to-r from-[#FFF5DC] via-[#DFBF85] to-[#B8860B] bg-clip-text text-transparent leading-none drop-shadow-sm">
                Avelora
              </span>
              <span className="text-[8px] font-sans font-bold tracking-[0.35em] text-gold-400/90 uppercase mt-0.5">
                HAUTE VOYAGE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Clean, Minimalist, Centered */}
          <nav className="hidden md:flex items-center space-x-1 bg-forest-900/80 px-4 py-1.5 rounded-full border border-gold-500/20 shadow-inner">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-1.5 text-xs uppercase tracking-wider font-semibold rounded-full transition-all duration-200 ${
                    isActive
                      ? 'text-forest-950 bg-gradient-to-r from-gold-300 to-gold-500 font-bold shadow-md'
                      : 'text-forest-100 hover:text-gold-300 hover:bg-forest-800/60'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls: Lang, Currency, User Profile & CTA */}
          <div className="hidden md:flex items-center space-x-2.5">
            
            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 text-xs text-gold-300 bg-forest-900 px-2.5 py-1.5 rounded-xl border border-gold-500/25 hover:border-gold-400 transition-colors"
                aria-label="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-gold-400" />
                <span className="uppercase font-bold text-[11px]">{lang}</span>
                <ChevronDown className="w-3 h-3 text-gold-400/80" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-forest-900 border border-gold-500/30 rounded-xl shadow-2xl py-1 z-50 animate-fade-in">
                  {[
                    { code: 'en', label: 'English' },
                    { code: 'ru', label: 'Русский' },
                    { code: 'uz', label: 'O‘zbekcha' },
                  ].map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code as Language);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs transition-colors flex items-center justify-between ${
                        lang === l.code ? 'text-gold-300 font-bold bg-forest-800' : 'text-forest-200 hover:text-white hover:bg-forest-800/50'
                      }`}
                    >
                      <span>{l.label}</span>
                      {lang === l.code && <span className="text-[10px] text-gold-400">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Currency Selector */}
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className="bg-forest-900 text-gold-300 text-xs font-bold px-2 py-1.5 rounded-xl border border-gold-500/25 hover:border-gold-400 focus:outline-none cursor-pointer"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="UZS">UZS (so‘m)</option>
            </select>

            {/* User Profile or Sign In */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 bg-forest-900 hover:bg-forest-800 border border-gold-500/30 px-3 py-1.5 rounded-xl transition-colors shadow-sm"
                >
                  <img
                    src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                    alt={user.fullName}
                    className="w-5 h-5 rounded-full object-cover border border-gold-400"
                  />
                  <span className="text-xs font-semibold text-gold-200 max-w-[80px] truncate">
                    {user.fullName.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3 h-3 text-gold-400/80" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-forest-900 border border-gold-500/30 rounded-2xl shadow-2xl py-2 z-50 animate-fade-in">
                    <div className="px-4 py-2 border-b border-forest-800">
                      <div className="text-xs font-bold text-gold-200 truncate">{user.fullName}</div>
                      <div className="text-[10px] text-forest-300 truncate">{user.email}</div>
                    </div>

                    <Link
                      href="/my-journeys"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs text-forest-100 hover:text-gold-300 hover:bg-forest-800"
                    >
                      <Luggage className="w-3.5 h-3.5 text-gold-400" />
                      <span>{t('navMyJourneys')}</span>
                    </Link>

                    <Link
                      href="/saved"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs text-forest-100 hover:text-gold-300 hover:bg-forest-800"
                    >
                      <Bookmark className="w-3.5 h-3.5 text-gold-400" />
                      <span>Saved Places</span>
                    </Link>

                    <Link
                      href="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs text-forest-100 hover:text-gold-300 hover:bg-forest-800"
                    >
                      <User className="w-3.5 h-3.5 text-gold-400" />
                      <span>Profile & Settings</span>
                    </Link>

                    {user.role === 'admin' && (
                      <Link
                        href="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs text-amber-300 hover:bg-forest-800"
                      >
                        <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                        <span>Curator Workspace</span>
                      </Link>
                    )}

                    <div className="border-t border-forest-800 mt-1 pt-1">
                      <button
                        onClick={() => {
                          signOut();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-300 hover:bg-forest-800 text-left"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>{t('navSignOut')}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="text-xs font-semibold text-gold-300 hover:text-white px-3 py-1.5 transition-colors"
              >
                {t('navSignIn')}
              </Link>
            )}

            {/* Premium CTA Button */}
            <Link
              href={user ? '/plan' : '/login?redirect=/plan'}
              className="gold-btn px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-md hover:scale-105 active:scale-95 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-forest-950" />
              <span>Plan Journey</span>
            </Link>

          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-gold-300 hover:bg-forest-900 border border-gold-500/20"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gold-500/20 bg-forest-950 px-4 pt-3 pb-6 space-y-4 shadow-2xl animate-fade-in">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-forest-100 hover:bg-forest-900 hover:text-gold-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-2 border-t border-forest-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as Language)}
                className="bg-forest-900 text-gold-300 text-xs font-bold px-2 py-1.5 rounded-lg border border-gold-500/20"
              >
                <option value="en">EN</option>
                <option value="ru">RU</option>
                <option value="uz">UZ</option>
              </select>

              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                className="bg-forest-900 text-gold-300 text-xs font-bold px-2 py-1.5 rounded-lg border border-gold-500/20"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="UZS">UZS</option>
              </select>
            </div>

            <Link
              href={user ? '/plan' : '/login?redirect=/plan'}
              onClick={() => setMobileMenuOpen(false)}
              className="gold-btn px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase inline-flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-forest-950" />
              <span>Plan Journey</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
