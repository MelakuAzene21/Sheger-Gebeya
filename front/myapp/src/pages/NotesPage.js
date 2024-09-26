import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const  NotesPage = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get('http://localhost:5000/api/notes',
                 { withCredentials: true });
                console.log('Fetched notes:', data); // Debugging: check the data received
                setNotes(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching notes:', error); // Debugging: check for errors
                setError('Failed to load notes');
                setLoading(false);
                navigate('/login'); // Redirect to login if there is an error
            }
        };

        fetchNotes();
    }, [navigate]);

    const deleteNote = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/notes/${id}`, { withCredentials: true });
            setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
        } catch (error) {
            console.error('Error deleting note:', error); // Debugging: check for errors
        }
    };

    const [editingNote, setEditingNote] = useState(null); // Note being edited
    const [title, setTitle] = useState(''); // Title of the note
    const [content, setContent] = useState(''); // Content of the note



    const startEditing = (note) => {
        setEditingNote(note._id);
        setTitle(note.title);
        setContent(note.content);
    };

    const updateNote = async (id) => {
        try {
            const updatedNote = { title, content };
            await axios.put(`http://localhost:5000/api/notes/${id}`, updatedNote, { withCredentials: true });
            setNotes((prevNotes) =>
                prevNotes.map((note) =>
                    note._id === id ? { ...note, title: updatedNote.title, content: updatedNote.content } : note
                )
            );
            setEditingNote(null); // Reset editing state
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };




    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    return (
        <div className="p-8">
            <h1 className="text-3xl mb-6">Your Notes</h1>
            {notes.length === 0 ? (
                <p>No notes available.</p>
            ) : (
                <ul>
                    {notes.map((note) => (
                        <li key={note._id} className="mb-4">
                            {editingNote === note._id ? (
                                <div>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="border mb-2 p-2"
                                    />
                                    <textarea
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        className="border mb-2 p-2"
                                    ></textarea>
                                    <button
                                        onClick={() => updateNote(note._id)}
                                        className="text-green-500"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setEditingNote(null)}
                                        className="text-red-500"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <h2 className="text-2xl">{note.title}</h2>
                                    <p>{note.content}</p>
                                    <button onClick={() => startEditing(note)} className="text-blue-500">Edit</button>
                                    <button onClick={() => deleteNote(note._id)} className="text-red-500">Delete</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
export default NotesPage