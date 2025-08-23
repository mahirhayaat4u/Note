import React from 'react';
import Note from './Note';

function NoteGrid({ notes, onSelect, onEdit, onDelete }) { // Added onSelect prop
    if (notes.length === 0) {
        return <p style={{ textAlign: 'center', color: '#888' }}>No notes found. Add one!</p>;
    }

    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
            {notes.map(note => (
                <Note
                    key={note._id}
                    note={note}
                    onSelect={onSelect} // Pass the onSelect function to each Note
                />
            ))}
        </div>
    );
}

export default NoteGrid;