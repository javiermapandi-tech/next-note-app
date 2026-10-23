'use client';

import { useState, FormEvent } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanEmail = email.trim();

    // Check 1: Email must not be empty
    if (!cleanEmail) {
      setErrorMessage('Email cannot be empty.');
      return;
    }

    // Check 2: Email must equal "@gmail.com" or contain "@gmail.com"
    if (!cleanEmail.toLowerCase().endsWith('@gmail.com') && cleanEmail !== '@gmail.com') {
      setErrorMessage('Email must equal or end with "@gmail.com".');
      return;
    }

    // Check 3: Password must be MORE THAN 6 characters (at least 7 chars)
    if (password.length <= 6) {
      setErrorMessage('Password must be more than 6 characters.');
      return;
    }

    // ALL CHECKS PASSED -> Let the user in
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    setErrorMessage('');
  };

  // --- 2. LOGGED IN SCREEN (NOTES APP) ---
  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 md:p-12">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <header className="flex justify-between items-center border-b pb-6 mb-6">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">My Note Application</h1>
              <p className="text-sm text-gray-500">Welcome to your dashboard</p>
            </div>
            {/* Bonus 2: Logout button that returns to login screen */}
            <button
              onClick={handleLogout}
              className="px-5 py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 font-bold shadow-md shadow-red-500/20 transition-all cursor-pointer"
            >
              Logout
            </button>
          </header>
          <main className="p-8 bg-indigo-50/50 rounded-xl border border-dashed border-indigo-200 text-center">
            <p className="text-indigo-900 font-medium">🎉 You have successfully logged in!</p>
          </main>
        </div>
      </div>
    );
  }

  // --- 1. LOGIN SCREEN ---
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl mb-3 shadow-inner">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Note App Login</h2>
          <p className="text-sm text-gray-500 mt-1">Sign in to access your notes</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@gmail.com"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all cursor-pointer"
          >
            Login
          </button>

          {/* Bonus 1: Error message displayed bottom of login button */}
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-center mt-3">
              <p className="text-sm font-semibold text-red-600">
                {errorMessage}
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}