import React, { useState, useEffect } from 'react';

function NoteModal({ isOpen, onClose, onSave, noteToEdit }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // When noteToEdit changes, update the form fields
    useEffect(() => {
        if (noteToEdit) {
            setTitle(noteToEdit.title);
            setContent(noteToEdit.content);
        } else {
            setTitle('');
            setContent('');
        }
    }, [noteToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ id: noteToEdit?._id, title, content });
    };
    
    // Don't render the modal if it's not open
    if (!isOpen) return null;
  const btnBase = "px-6 py-3 rounded-lg font-medium cursor-pointer transition-all duration-200 hover:-translate-y-0.5";
    return (
        //   <div
        //     className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 transition-opacity duration-300"
        //     onClick={onClose}
        // >
        //     <div
        //         className="bg-white rounded-xl shadow-lg p-8 w-[90%] max-w-lg transform transition-transform duration-300 scale-100"
        //         onClick={(e) => e.stopPropagation()}
        //     >
        //         <h2 className="text-2xl font-bold mb-6 text-[#6c63ff]">{noteToEdit ? 'Edit Note' : 'Add a New Note'}</h2>
        //         <form onSubmit={handleSubmit}>
        //             <div className="mb-4">
        //                 <input
        //                     type="text" placeholder="Title" required value={title} onChange={(e) => setTitle(e.target.value)}
        //                     className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6c63ff]"
        //                 />
        //             </div>
        //             <div className="mb-6">
        //                 <textarea
        //                     placeholder="Take a note..." required value={content} onChange={(e) => setContent(e.target.value)}
        //                     className="w-full p-3 border border-gray-300 rounded-lg min-h-[150px] resize-y focus:outline-none focus:ring-2 focus:ring-[#6c63ff]"
        //                 ></textarea>
        //             </div>
        //             <div className="text-right space-x-3">
        //                 <button type="button" onClick={onClose} className={`${btnBase} bg-gray-200 text-gray-800 hover:bg-gray-300`}>
        //                     Cancel
        //                 </button>
        //                 <button type="submit" className={`${btnBase} bg-[#6c63ff] text-white hover:bg-[#5a50e6]`}>
        //                     Save
        //                 </button>
        //             </div>
        //         </form>
        //     </div>
        // </div>
        <div
  className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 transition-opacity duration-300"
  onClick={onClose}
>
  <div
    className="bg-gradient-to-br from-[#1e293b]/95 to-[#0f172a]/95 
               backdrop-blur-xl rounded-2xl shadow-2xl 
               p-6 sm:p-8 w-[90%] max-w-lg 
               transform transition-transform duration-300 scale-100"
    onClick={(e) => e.stopPropagation()}
  >
    {/* Title */}
    <h2 className="text-2xl font-bold mb-6 text-indigo-400">
      {noteToEdit ? "Edit Note" : "Add a New Note"}
    </h2>

    {/* Form */}
    <form onSubmit={handleSubmit}>
      {/* Title Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-lg bg-[#0f172a]/80 text-gray-200 
                     border border-gray-700 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500
                     placeholder-gray-500"
        />
      </div>

      {/* Content Area */}
      <div className="mb-6">
        <textarea
          placeholder="Take a note..."
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 rounded-lg min-h-[150px] resize-y 
                     bg-[#0f172a]/80 text-gray-200 
                     border border-gray-700 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500
                     placeholder-gray-500"
        ></textarea>
      </div>

      {/* Buttons */}
      <div className="text-right space-x-3">
        <button
          type="button"
          onClick={onClose}
          className={`${btnBase} bg-gray-700 text-gray-200 hover:bg-gray-600`}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`${btnBase} bg-indigo-600 text-white hover:bg-indigo-500 shadow-md shadow-indigo-800/40`}
        >
          Save
        </button>
      </div>
    </form>
  </div>
</div>

    );
}

export default NoteModal;