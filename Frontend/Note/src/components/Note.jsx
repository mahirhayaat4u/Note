import React from 'react';

function Note({ note, onEdit, onDelete }) {
    const formattedDate = new Date(note.timestamp).toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short'
    });

    return (
        // <div className="bg-white rounded-xl p-6 shadow-md flex flex-col justify-between break-words hover:-translate-y-1 hover:shadow-xl transition-transform duration-300">
        //     <div>
        //         <h3 className="text-2xl font-semibold mb-2 text-[#6c63ff]">{note.title}</h3>
        //         <p className="text-gray-700 mb-4 whitespace-pre-wrap">{note.content}</p>
        //     </div>
        //     <div className="flex justify-between items-center border-t border-gray-100 pt-4 mt-4">
        //         <span className="text-xs text-gray-400">{formattedDate}</span>
        //         <div className="flex gap-2">
        //             <button onClick={onEdit} className="text-gray-400 hover:text-green-500 text-xl transition-colors">✏️</button>
        //             <button onClick={onDelete} className="text-gray-400 hover:text-[#f44336] text-xl transition-colors">🗑️</button>
        //         </div>
        //     </div>
        // </div>
        <div
  className="bg-gradient-to-br from-[#1e293b]/90 to-[#0f172a]/90 
             backdrop-blur-xl rounded-2xl p-6 shadow-lg 
             flex flex-col justify-between break-words
             hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-800/40 
             transition-all duration-300"
>
  <div>
    {/* Title */}
    <h3 className="text-2xl font-semibold mb-2 text-indigo-400 drop-shadow-sm">
      {note.title}
    </h3>

    {/* Content */}
    <p className="text-gray-300 mb-4 whitespace-pre-wrap leading-relaxed">
      {note.content}
    </p>
  </div>

  {/* Footer */}
  <div className="flex justify-between items-center border-t border-gray-700 pt-4 mt-4">
    <span className="text-xs text-gray-500">{formattedDate}</span>
    <div className="flex gap-3">
      <button
        onClick={onEdit}
        className="text-gray-400 hover:text-green-400 text-xl transition-colors"
      >
        ✏️
      </button>
      <button
        onClick={onDelete}
        className="text-gray-400 hover:text-red-500 text-xl transition-colors"
      >
        🗑️
      </button>
    </div>
  </div>
</div>

    );
}

export default Note;