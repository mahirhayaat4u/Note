import React from 'react';

function NoteDetailModal({ isOpen, onClose, note, onEdit, onDelete }) { // Add onEdit and onDelete props
    if (!isOpen || !note) return null;

    const formattedDate = new Date(note.timestamp).toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short'
    });

    return (
        <div
            className="fixed inset-0 bg-black/60 flex justify-center items-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-gradient-to-br from-[#1e293b]/95 to-[#0f172a]/95 
                           backdrop-blur-xl rounded-2xl shadow-2xl p-6 sm:p-8 
                           w-[90%] max-w-lg transform transition-transform duration-300 scale-100"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Title */}
                <h2 className="text-2xl font-bold mb-4 text-indigo-400">
                    {note.title}
                </h2>

                {/* Content */}
                <p className="text-gray-300 mb-6 whitespace-pre-wrap leading-relaxed">
                    {note.content}
                </p>

                {/* Footer */}
                <div className="flex justify-between items-center border-t border-gray-700 pt-4 mt-4">
                    <span className="text-xs text-gray-500">{formattedDate}</span>
                    <div className="flex gap-3">
                        {/* Edit Button */}
                        <button
                            type="button"
                            onClick={() => onEdit(note)}
                            className="px-4 py-2 rounded-lg bg-green-600 text-white 
                                       hover:bg-green-500 transition-colors duration-200"
                        >
                            Edit
                        </button>
                        {/* Delete Button */}
                        <button
                            type="button"
                            onClick={() => onDelete(note._id)}
                            className="px-4 py-2 rounded-lg bg-red-600 text-white 
                                       hover:bg-red-500 transition-colors duration-200"
                        >
                            Delete
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg bg-gray-700 text-gray-200 
                                       hover:bg-gray-600 transition-colors duration-200"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NoteDetailModal;