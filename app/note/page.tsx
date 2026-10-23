'use client';

import { useRouter } from 'next/navigation';

export default function NotesPage() {
  const router = useRouter();

  // Clicking this sends the user back to the login page (http://localhost:3000)
  const handleLogout = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <header className="flex justify-between items-center border-b pb-6 mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">My Notes</h1>
            <p className="text-sm text-gray-500">Welcome to your dashboard</p>
          </div>
          {/* Logout Button */}
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