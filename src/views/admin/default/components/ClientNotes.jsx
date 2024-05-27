import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClientNoteItem from './ClientNoteItem';
import AddNoteModal from './AddNoteModal';

const ClientNotes = () => {
    const [notes, setNotes] = useState([
        {
            user: { name: 'Bernardo James' },
            client: { name: 'Bernardo James' },
            date: 'Today',
            time: '4:50 PM',
            title: 'Bernardo James',
            description: 'Uploaded 3 new photos for World Safety Event',
        },
        {
            user: { name: 'Linda Carpenter' },
            client: { name: 'Linda Carpenter' },
            date: 'Yesterday',
            time: '3:20 PM',
            title: 'Linda Carpenter',
            description: 'Doctors Meeting',
        },
        {
            user: { name: 'Markhay Smith' },
            client: { name: 'Markhay Smith' },
            date: '05 Sep 2022',
            time: '1:20 PM',
            title: 'Markhay Smith',
            description: 'Was completed the operation within deadline',
        },
        {
            user: { name: 'Rio Williams' },
            client: { name: 'Rio Williams' },
            date: '20 Oct 2022',
            time: '2:20 PM',
            title: 'Rio Williams',
            description: 'Posted a blog about Corona safety measurements',
        }
    ]);

    const [newNote, setNewNote] = useState({
        user: { name: 'Lesley Grauer' }, // Default user
        client: { name: '' }, // Default client
        date: '',
        time: '',
        title: '',
        description: ''
    });

    const lastThreeNotes = notes.slice(Math.max(notes.length - 3, 0));

    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleAddNote = () => {
        setNotes([{
            ...newNote,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString()
        }, ...notes]);
        setNewNote({
            user: { name: 'Lesley Grauer' },
            client: { name: '' },
            date: '',
            time: '',
            title: '',
            description: ''
        });
        setShowModal(false);
    };

    const handleInputChange = (e, field) => {
        const { name, value } = e.target;
        if (field === 'user') {
            const selectedUser = clients.find(client => client.name === value);
            setNewNote({ ...newNote, user: selectedUser });
        } else if (field === 'client') {
            const selectedClient = clients.find(client => client.name === value);
            setNewNote({ ...newNote, client: selectedClient });
        } else {
            setNewNote({ ...newNote, [name]: value });
        }
    };

    const clients = [
        { id: 1, name: 'Lesley Grauer' },
        { id: 2, name: 'Catherine Manseau' },
        { id: 3, name: 'Bernardo Galaviz' },
        { id: 4, name: 'Mike Litorus' },
    ];

    return (
        <div className="container mx-auto">
            <div className="bg-white rounded-3xl shadow-md p-6">
                <div className="flex justify-between mb-3">
                    <h1 className="text-3xl font-bold">Danışan Notları</h1>
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Not Ekle
                        </button>
                        <button
                            onClick={() => navigate('/admin/all-notes')}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                        >
                            Tüm Notlar
                        </button>
                    </div>
                </div>
                <div className="relative">
                    <ul className="list-none m-0 p-0 relative z-10">
                        {lastThreeNotes.map((note, index) => (
                            <ClientNoteItem key={index} {...note} />
                        ))}
                    </ul>
                    <div className="absolute top-3 left-6 w-0.5 bg-indigo-100 h-full -z-0"></div>
                </div>
            </div>
            <AddNoteModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onSave={handleAddNote}
                newNote={newNote}
                handleInputChange={handleInputChange}
                clients={clients}
            />
        </div>
    );
};

export default ClientNotes;
