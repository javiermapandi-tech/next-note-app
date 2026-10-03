'use client';

import React from 'react';

export interface Note {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

interface NoteItemProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

export const NoteItem: React.FC<NoteItemProps> = ({ note, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800 break-words pr-2">
            {note.title}
          </h3>
          <span className="text-xs text-gray-400 whitespace-nowrap">
            {note.createdAt}
          </span>
        </div>
        <p className="text-gray-600 text-sm whitespace-pre-wrap leading-relaxed mb-4">
          {note.description}
        </p>
      </div>

      <div className="flex justify-end gap-2 pt-3 border-t border-gray-100 mt-auto">
        <button
          onClick={() => onEdit(note)}
          className="px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(note.id)}
          className="px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};