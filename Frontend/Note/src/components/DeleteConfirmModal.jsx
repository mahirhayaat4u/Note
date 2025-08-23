import React from 'react';

function DeleteConfirmModal({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null;
//    const btnBase = "px-6 py-3 rounded-lg font-medium cursor-pointer transition-all duration-200 hover:-translate-y-0.5";
    return (
    //    <div
    //         className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 transition-opacity duration-300"
    //         onClick={onClose}
    //     >
    //         <div
    //             className="bg-white rounded-xl shadow-lg p-8 w-[90%] max-w-md transform transition-transform duration-300 scale-100"
    //             onClick={(e) => e.stopPropagation()}
    //         >
    //             <h2 className="text-2xl font-bold mb-4 text-gray-800">Confirm Deletion</h2>
    //             <p className="text-gray-600 mb-8">Are you sure you want to delete this note? This action cannot be undone.</p>
    //             <div className="text-right space-x-3">
    //                 <button type="button" onClick={onClose} className={`${btnBase} bg-gray-200 text-gray-800 hover:bg-gray-300`}>
    //                     Cancel
    //                 </button>
    //                 <button type="button" onClick={onConfirm} className={`${btnBase} bg-[#f44336] text-white hover:bg-[#d32f2f]`}>
    //                     Delete
    //                 </button>
    //             </div>
    //         </div>
    //     </div>
    <div
  className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 transition-opacity duration-300"
  onClick={onClose}
>
  <div
    className="bg-gradient-to-br from-[#1e293b]/95 to-[#0f172a]/95 
               backdrop-blur-xl rounded-2xl shadow-2xl p-6 sm:p-8 
               w-[90%] max-w-md transform transition-transform duration-300 scale-100"
    onClick={(e) => e.stopPropagation()}
  >
    {/* Title */}
    <h2 className="text-2xl font-bold mb-4 text-gray-100">
      Confirm Deletion
    </h2>

    {/* Message */}
    <p className="text-gray-400 mb-8">
      Are you sure you want to delete this note? This action cannot be undone.
    </p>

    {/* Buttons */}
    <div className="text-right space-x-3">
      <button
        type="button"
        onClick={onClose}
        className="px-4 py-2 rounded-lg bg-gray-700 text-gray-200 
                   hover:bg-gray-600 transition-colors duration-200"
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={onConfirm}
        className="px-4 py-2 rounded-lg bg-red-600 text-white 
                   hover:bg-red-500 shadow-md shadow-red-800/40
                   transition-all duration-200"
      >
        Delete
      </button>
    </div>
  </div>
</div>

    );
}

export default DeleteConfirmModal;