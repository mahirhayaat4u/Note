import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import NoteGrid from './components/NoteGrid';
import NoteModal from './components/NoteModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import './App.css';

// The API endpoint for your notes backend
const API_URL = 'http://localhost:3000/api/notes';

function App() {
    // State management
    const [notes, setNotes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isNoteModalOpen, setNoteModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [currentNote, setCurrentNote] = useState(null); // Note being edited
    const [noteToDelete, setNoteToDelete] = useState(null); // ID of note to be deleted
    const [error, setError] = useState('');

    // Fetch notes from the API when the component mounts
    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Failed to fetch notes. Is the server running?');
            }
            const data = await response.json();
            setNotes(data);
            setError(''); // Clear previous errors
        } catch (err) {
            console.error("Error fetching notes:", err);
            setError(err.message);
        }
    };

    // Handlers for opening modals
    const handleAddNoteClick = () => {
        setCurrentNote(null); // Clear any previously edited note
        setNoteModalOpen(true);
    };

    const handleEditNoteClick = (note) => {
        setCurrentNote(note);
        setNoteModalOpen(true);
    };

    const handleDeleteRequest = (id) => {
        setNoteToDelete(id);
        setDeleteModalOpen(true);
    };

    // Handler for saving/updating a note
    const handleSaveNote = async (noteData) => {
        const { id, title, content } = noteData;
        const method = id ? 'PUT' : 'POST';
        const url = id ? `${API_URL}/${id}` : API_URL;

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, content }),
            });
            if (!response.ok) throw new Error('Failed to save note.');
            
            fetchNotes(); // Re-fetch notes to update the UI
            setNoteModalOpen(false);
        } catch (err) {
            console.error("Error saving note:", err);
            alert("Could not save the note.");
        }
    };
    
    // Handler for confirming note deletion
    const handleConfirmDelete = async () => {
        if (!noteToDelete) return;
        try {
            const response = await fetch(`${API_URL}/${noteToDelete}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Failed to delete note.');

            fetchNotes(); // Re-fetch notes
            setDeleteModalOpen(false);
            setNoteToDelete(null);
        } catch (err) {
            console.error("Error deleting note:", err);
            alert("Could not delete the note.");
        }
    };

    // Filter notes based on search query. useMemo prevents re-filtering on every render.
    const filteredNotes = useMemo(() =>
        notes.filter(note =>
            note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.content.toLowerCase().includes(searchQuery.toLowerCase())
        ), [notes, searchQuery]);

    return (
        
        //   <div className="bg-[#f0f2f5] min-h-screen font-sans text-gray-800">
        //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        //         <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        //         <main className="mt-8">
        //             {error ? (
        //                 <p className="text-center text-gray-500">{error}</p>
        //             ) : (
        //                 <NoteGrid
        //                     notes={filteredNotes}
        //                     onEdit={handleEditNoteClick}
        //                     onDelete={handleDeleteRequest}
        //                 />
        //             )}
        //         </main>

        //         {/* Floating Action Button for adding a new note */}
        //         <button
        //             title="Add new note"
        //             onClick={handleAddNoteClick}
        //             className="fixed bottom-8 right-8 w-14 h-14 bg-[#6c63ff] text-white rounded-full text-4xl flex items-center justify-center shadow-lg hover:bg-[#5a50e6] hover:scale-110 transition-transform duration-200"
        //         >
        //             +
        //         </button>

        //         <NoteModal
        //             isOpen={isNoteModalOpen}
        //             onClose={() => setNoteModalOpen(false)}
        //             onSave={handleSaveNote}
        //             noteToEdit={currentNote}
        //         />

        //         <DeleteConfirmModal
        //             isOpen={isDeleteModalOpen}
        //             onClose={() => setDeleteModalOpen(false)}
        //             onConfirm={handleConfirmDelete}
        //         />
        //     </div>
        // </div>
        <div className="min-h-screen font-sans text-gray-200 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
    {/* Header with search */}
    <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

    {/* Main Content */}
    <main className="mt-8">
      {error ? (
        <p className="text-center text-gray-400">{error}</p>
      ) : (
        <NoteGrid
          notes={filteredNotes}
          onEdit={handleEditNoteClick}
          onDelete={handleDeleteRequest}
        />
      )}
    </main>

    {/* Floating Action Button */}
    <button
      title="Add new note"
      onClick={handleAddNoteClick}
      className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 
                 w-14 h-14 sm:w-16 sm:h-16
                 bg-gradient-to-r from-indigo-500 to-purple-600
                 text-white rounded-full text-4xl
                 flex items-center justify-center
                 shadow-lg shadow-indigo-600/50
                 hover:scale-110 hover:shadow-xl hover:shadow-purple-700/60
                 transition-all duration-200"
    >
      +
    </button>

    {/* Modals */}
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
  </div>
</div>

    );
}

export default App;