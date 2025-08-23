import React from 'react';

function Header({ searchQuery, onSearchChange }) {
    return (
        //  <header className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 md:p-6 bg-white rounded-xl shadow-md">
        //     <h1 className="text-3xl font-bold text-[#6c63ff] flex items-center">
        //         <span className="mr-2 text-2xl">📝</span>
        //         Quick Jot
        //     </h1>
        //     <div className="relative w-full md:w-auto md:flex-grow md:max-w-md">
        //         <input
        //             type="text"
        //             placeholder="🔍 Search notes..."
        //             value={searchQuery}
        //             onChange={(e) => onSearchChange(e.target.value)}
        //             className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6c63ff] focus:border-transparent transition"
        //         />
        //     </div>
        // </header>
        <header className="flex flex-col md:flex-row justify-between items-center gap-4 
                   p-4 md:p-6 
                   bg-gradient-to-r from-[#1e293b]/95 to-[#0f172a]/95 
                   backdrop-blur-xl rounded-2xl shadow-lg">
  
  {/* Logo / Title */}
  <h1 className="text-3xl font-bold text-indigo-400 flex items-center drop-shadow-sm">
    <span className="mr-2 text-2xl">📝</span>
    Quick Note
  </h1>

  {/* Search Bar */}
  <div className="relative w-full md:w-auto md:flex-grow md:max-w-md">
    <input
      type="text"
      placeholder="🔍 Search notes..."
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
      className="w-full px-4 py-3 
                 bg-[#0f172a]/80 text-gray-200 
                 border border-gray-700 rounded-xl 
                 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
                 placeholder-gray-500
                 transition"
    />
  </div>
</header>

    );
}

export default Header;