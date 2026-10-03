'use client';

import React, { useState, useEffect } from 'react';
import { NoteItem, Note } from '@/components/NoteItem';

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDuplicate, setIsDuplicate] = useState(false);

  useEffect(() => {
    const savedNotes = localStorage.getItem('nextjs_notes');
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (e) {
        console.error('Failed to parse saved notes', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('nextjs_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    if (!title.trim()) {
      setIsDuplicate(false);
      return;
    }

    const duplicateExists = notes.some(
      (note) =>
        note.title.trim().toLowerCase() === title.trim().toLowerCase() &&
        note.id !== editingId
    );

    setIsDuplicate(duplicateExists);
  }, [title, notes, editingId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert('Please enter both title and description.');
      return;
    }

    if (isDuplicate) {
      alert('A note with this title already exists!');
      return;
    }

    if (editingId) {
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === editingId
            ? { ...note, title: title.trim(), description: description.trim() }
            : note
        )
      );
      setEditingId(null);
    } else {
      const newNote: Note = {
        id: Date.now().toString(),
        title: title.trim(),
        description: description.trim(),
        createdAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setNotes((prevNotes) => [newNote, ...prevNotes]);
    }

    setTitle('');
    setDescription('');
  };

  const handleEdit = (note: Note) => {
    setEditingId(note.id);
    setTitle(note.title);
    setDescription(note.description);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle('');
    setDescription('');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this note?')) {
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      if (editingId === id) {
        handleCancelEdit();
      }
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <header className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            📝 Next.js Note App
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Create, view, edit, and delete notes easily.
          </p>
        </header>

        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              {editingId ? '✏️ Edit Note' : '➕ Add New Note'}
            </h2>
            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="text-xs font-medium text-gray-500 hover:text-gray-700 underline"
              >
                Cancel Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter note title..."
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all ${
                  isDuplicate
                    ? 'border-red-500 focus:ring-red-200'
                    : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                }`}
              />
              {isDuplicate && (
                <p className="text-xs text-red-500 mt-1 font-medium">
                  ⚠️ Warning: A note with this title already exists!
                </p>
              )}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter note description..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 focus:outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isDuplicate || !title.trim() || !description.trim()}
              className={`w-full py-2.5 px-4 rounded-lg text-white font-medium shadow transition-colors ${
                isDuplicate || !title.trim() || !description.trim()
                  ? 'bg-gray-300 cursor-not-allowed'
                  : editingId
                  ? 'bg-amber-600 hover:bg-amber-700'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {editingId ? 'Update Note' : 'Add Note'}
            </button>
          </form>
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              📋 Your Notes ({notes.length})
            </h2>
          </div>

          {notes.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
              <p className="text-gray-500 text-sm">No notes found. Add your first note above!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {notes.map((note) => (
                <NoteItem
                  key={note.id}
                  note={note}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}