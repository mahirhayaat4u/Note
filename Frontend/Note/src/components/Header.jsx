import React, { useState, useContext, useRef, useEffect } from 'react';
import { AuthContext } from '../context/auth-context';

function Header({ searchQuery, onSearchChange }) {
    const { logout } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // Close the dropdown if clicked outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    return (
        <header className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 md:p-6 bg-gradient-to-r from-[#1e293b]/95 to-[#0f172a]/95 backdrop-blur-xl rounded-2xl shadow-lg relative z-20">
            
            {/* Top row: Logo and mobile menu button */}
            <div className="w-full flex justify-between items-center">
                <h1 className="text-3xl font-bold text-indigo-400 flex items-center drop-shadow-sm">
                    <span className="mr-2 text-2xl">📝</span>
                    Quick Note
                </h1>
                
                {/* Mobile Menu Button (Hamburger) */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 rounded-md text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        aria-label="Open main menu"
                    >
                        <svg className="h-6 w-6 pointer-events-none" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Bottom row on mobile, part of flex row on desktop */}
            <div className="w-full md:w-auto flex-grow md:flex md:items-center md:gap-4">
                {/* Search Bar (Visible on all screen sizes) */}
                <div className="relative w-full md:max-w-md">
                    <input
                        type="text"
                        placeholder="🔍 Search notes..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full px-4 py-3 bg-[#0f172a]/80 text-gray-200 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-500 transition"
                    />
                </div>

                {/* Desktop Logout Button */}
                <button
                    onClick={logout}
                    className="hidden md:block px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500 shadow-md shadow-red-800/40 transition-all duration-200"
                >
                    Logout
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {isMenuOpen && (
                <div 
                    ref={menuRef} 
                    className="md:hidden absolute top-16 right-4 mt-2 w-48 rounded-xl shadow-lg bg-[#1e293b] ring-1 ring-black ring-opacity-5 z-10"
                >
                    <div className="p-2">
                        {/* Logout Button in Dropdown */}
                        <button
                            onClick={() => {
                                logout();
                                setIsMenuOpen(false); // Close menu on click
                            }}
                            className="w-full text-left px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;