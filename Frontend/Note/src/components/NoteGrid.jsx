import React from 'react';
import Note from './Note';

function NoteGrid({ notes, onEdit, onDelete }) {
    if (notes.length === 0) {
        return <p style={{ textAlign: 'center', color: '#888' }}>No notes found. Add one!</p>;
    }

    return (
         <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
            {notes.map(note => (
                <Note
                    key={note._id}
                    note={note}
                    onEdit={() => onEdit(note)}
                    onDelete={() => onDelete(note._id)}
                />
            ))}
        </div>
    //      <div
    //   className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6 p-2 sm:p-4"
    // >
    //   {notes.length > 0 ? (
    //     notes.map((note) => (
    //       <div
    //         key={note._id}
    //         className="opacity-0 animate-fadeIn"
    //       >
    //         <Note
    //           note={note}
    //           onEdit={() => onEdit(note)}
    //           onDelete={() => onDelete(note._id)}
    //         />
    //       </div>
    //     ))
    //   ) : (
    //     <div className="col-span-full flex flex-col items-center justify-center text-gray-400 py-12">
    //       <span className="text-5xl mb-4">📝</span>
    //       <p className="text-lg">No notes found. Start adding one!</p>
    //     </div>
    //   )}
    // </div>
        
    );
}

export default NoteGrid;