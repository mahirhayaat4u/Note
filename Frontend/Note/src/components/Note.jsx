import React from 'react';

function Note({ note, onSelect }) { // Changed props: onSelect instead of onEdit/onDelete
    return (
        <div
            onClick={() => onSelect(note)} // Trigger onSelect when the note is clicked
            className="bg-gradient-to-br from-[#1e293b]/90 to-[#0f172a]/90 
                       backdrop-blur-xl rounded-2xl p-6 shadow-lg 
                       flex flex-col justify-between break-words
                       hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-800/40 
                       transition-all duration-300 cursor-pointer"
        >
            <div>
                {/* Title */}
                <h3 className="text-2xl font-semibold mb-2 text-indigo-400 drop-shadow-sm">
                    {note.title}
                </h3>
            </div>
        </div>
    );
}

export default Note;