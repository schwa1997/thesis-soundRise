import React from 'react';

interface NoteIndicatorProps {
  noteStrings: string[]; // Array of note names
  indicatedNote: string; // Currently indicated note
}

const NoteIndicator: React.FC<NoteIndicatorProps> = ({ noteStrings, indicatedNote }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden shadow-md">
    <thead className="bg-gray-50 dark:bg-slate-700">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Note</th>
      </tr>
    </thead>
    <tbody className="bg-white dark:bg-slate-700 divide-gray-200 grid grid-cols-4 ">
      {noteStrings.map((note, index) => (
        <tr key={note} className={note === indicatedNote ? 'bg-orange-500' : ''}>
          <td className="p-3 whitespace-nowrap">{note}</td>
        </tr>
      ))}
    </tbody>
  </table>
  );
};

export default NoteIndicator;
