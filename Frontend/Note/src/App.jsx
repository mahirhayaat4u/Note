import React, { useState, useEffect, useMemo, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import NoteGrid from './components/NoteGrid';
import NoteModal from './components/NoteModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import NoteDetailModal from './components/NoteDetailModal'; // Import the new modal
import Login from './auth/Login';
import Signup from './auth/Signup';
// import { AuthProvider, AuthContext } from './context/auth-context';
import PrivateRoute from './routing/PrivateRoute';
import './App.css';
import axios from 'axios';
import { AuthContext } from './context/auth-context';
import { AuthProvider } from './context/AuthContext';

const API_URL = 'https://note-1-3lca.onrender.com/api/notes';
// const API_URL = 'http://localhost:3000/api/notes';

function App() {
    const authContext = useContext(AuthContext);

    if (authContext.loading) {
        return <div className="flex items-center justify-center min-h-screen text-white">Loading...</div>;
    }
    
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <Notes />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

const Notes = () => {
    // ... (keep existing states)
    const [notes, setNotes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isNoteModalOpen, setNoteModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [currentNote, setCurrentNote] = useState(null);
    const [noteToDelete, setNoteToDelete] = useState(null);
    const [error, setError] = useState('');
    const { token } = useContext(AuthContext);

    // New states for the detail modal
    const [selectedNote, setSelectedNote] = useState(null);
    const [isDetailModalOpen, setDetailModalOpen] = useState(false);

    useEffect(() => {
        if (token) {
            fetchNotes();
        }
    }, [token]);

    const fetchNotes = async () => {
        try {
            const response = await axios.get(API_URL);
            setNotes(response.data);
            setError('');
        } catch (err) {
            console.error("Error fetching notes:", err);
            setError(err.message);
        }
    };

    // --- Handlers for CRUD modals ---
    const handleAddNoteClick = () => {
        setCurrentNote(null);
        setNoteModalOpen(true);
    };

    const handleEditNoteClick = (note) => {
        setCurrentNote(note);
        setDetailModalOpen(false); // Close detail modal
        setNoteModalOpen(true);   // Open edit modal
    };

    const handleDeleteRequest = (id) => {
        setNoteToDelete(id);
        setDetailModalOpen(false); // Close detail modal
        setDeleteModalOpen(true); // Open confirm modal
    };
    
    // --- Handlers for the new detail modal ---
    const handleNoteSelect = (note) => {
        setSelectedNote(note);
        setDetailModalOpen(true);
    };

    const handleCloseDetailModal = () => {
        setDetailModalOpen(false);
        setSelectedNote(null);
    };


    const handleSaveNote = async (noteData) => {
        const { id, title, content } = noteData;
        const method = id ? 'put' : 'post';
        const url = id ? `${API_URL}/${id}` : API_URL;

        try {
            await axios[method](url, { title, content });
            fetchNotes();
            setNoteModalOpen(false);
        } catch (err) {
            console.error("Error saving note:", err);
            alert("Could not save the note.");
        }
    };

    const handleConfirmDelete = async () => {
        if (!noteToDelete) return;
        try {
            await axios.delete(`${API_URL}/${noteToDelete}`);
            fetchNotes();
            setDeleteModalOpen(false);
            setNoteToDelete(null);
        } catch (err) {
            console.error("Error deleting note:", err);
            alert("Could not delete the note.");
        }
    };

    const filteredNotes = useMemo(() =>
        notes.filter(note =>
            note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.content.toLowerCase().includes(searchQuery.toLowerCase())
        ), [notes, searchQuery]);
    
    return (
        <div className="min-h-screen font-sans text-gray-200 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
                <main className="mt-8">
                    {error ? (
                        <p className="text-center text-gray-400">{error}</p>
                    ) : (
                        <NoteGrid
                            notes={filteredNotes}
                            onSelect={handleNoteSelect} // Use handleNoteSelect
                            onEdit={handleEditNoteClick}
                            onDelete={handleDeleteRequest}
                        />
                    )}
                </main>
                <button
                    title="Add new note"
                    onClick={handleAddNoteClick}
                    className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full text-4xl flex items-center justify-center shadow-lg shadow-indigo-600/50 hover:scale-110 hover:shadow-xl hover:shadow-purple-700/60 transition-all duration-200"
                >
                    +
                </button>
                <NoteModal
                    isOpen={isNoteModalOpen}
                    onClose={() => setNoteModalOpen(false)}
                    onSave={handleSaveNote}
                    noteToEdit={currentNote}
                />
                <DeleteConfirmModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setDeleteModalOpen(false)}
                    onConfirm={handleConfirmDelete}
                />
                {/* Render the new detail modal */}
                <NoteDetailModal
                    isOpen={isDetailModalOpen}
                    onClose={handleCloseDetailModal}
                    note={selectedNote}
                    onEdit={handleEditNoteClick} 
                    onDelete={handleDeleteRequest}
                />
            </div>
        </div>
    );
}

const AppWrapper = () => (
    <AuthProvider>
        <App />
    </AuthProvider>
);

export default AppWrapper;