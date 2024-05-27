import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClientNoteItem from './ClientNoteItem';
import AddNoteModal from './AddNoteModal';
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
import avatar5 from "assets/img/avatars/avatar5.png";

const ClientNotes = () => {
    const [notes, setNotes] = useState([
        {
            user: { name: 'Lesley Grauer', avatar: avatar2 },
            client: { name: 'Bernardo James' },
            date: 'Today',
            time: '4:50 PM',
            title: 'Bernardo James',
            description: 'Uploaded 3 new photos for World Safety Event',
        },
        {
            user: { name: 'Catherine Manseau', avatar: avatar3 },
            client: { name: 'Linda Carpenter' },
            date: 'Yesterday',
            time: '3:20 PM',
            title: 'Linda Carpenter',
            description: 'Doctors Meeting',
        },
        {
            user: { name: 'Bernardo Galaviz', avatar: avatar1 },
            client: { name: 'Markhay Smith' },
            date: '05 Sep 2022',
            time: '1:20 PM',
            title: 'Markhay Smith',
            description: 'Was completed the operation within deadline',
        },
        {
            user: { name: 'Mike Litorus', avatar: avatar5 },
            client: { name: 'Rio Williams' },
            date: '20 Oct 2022',
            time: '2:20 PM',
            title: 'Rio Williams',
            description: 'Posted a blog about Corona safety measurements',
        }
    ]);

    const [newNote, setNewNote] = useState({
        user: { name: 'Lesley Grauer', avatar: avatar2 }, // Default user
        client: { name: '' }, // Default client
        date: '',
        time: '',
        title: '',
        description: ''
    });

    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleAddNote = () => {
        setNotes([{
            ...newNote,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString()
        }, ...notes]);
        setNewNote({
            user: { name: 'Lesley Grauer', avatar: avatar2 },
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
        { id: 1, name: 'Lesley Grauer', avatar: avatar2 },
        { id: 2, name: 'Catherine Manseau', avatar: avatar3 },
        { id: 3, name: 'Bernardo Galaviz', avatar: avatar1 },
        { id: 4, name: 'Mike Litorus', avatar: avatar5 },
    ];

    return (
        <div className="container mx-auto">
            <div className="bg-white rounded-3xl shadow-md p-6">
                <div className="flex justify-between">
                    <h1 className="text-3xl font-bold">Danışan Notları</h1>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Not Ekle
                    </button>
                </div>
                <div className="flex justify-end mb-4">
                    <button
                        onClick={() => navigate('/admin/all-notes')}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                    >
                        Tüm Notları Göster
                    </button>
                </div>
                <div className="relative">
                    <ul className="list-none m-0 p-0 relative">
                        {notes.map((note, index) => (
                            <ClientNoteItem key={index} {...note} />
                        ))}
                    </ul>
                    <div className="absolute top-2 left-6 w-0.5 bg-indigo-100 h-full"></div>
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
