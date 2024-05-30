import React, { useState } from 'react';
import ClientNoteItem from './ClientNoteItem';
import AddNoteModal from './AddNoteModal';

const AllNotes = () => {
    const [notes, setNotes] = useState([
        {
            id: 1,
            user: { name: 'Lesley Grauer' },
            client: { name: 'Bernardo James' },
            date: 'Today',
            time: '4:50 PM',
            title: 'Bernardo James',
            description: 'Uploaded 3 new photos for World Safety Event',
        },
        {
            id: 2,
            user: { name: 'Lesley Grauer' },
            client: { name: 'Bernardo James' },
            date: 'Today',
            time: '4:30 PM',
            title: 'Bernardo James',
            description: 'Uploaded 3 new photos for World Safety Event',
        },
        {
            id: 3,
            user: { name: 'Catherine Manseau' },
            client: { name: 'Linda Carpenter' },
            date: 'Yesterday',
            time: '3:20 PM',
            title: 'Linda Carpenter',
            description: 'Doctors Meeting',
        },
        {
            id: 4,
            user: { name: 'Bernardo Galaviz' },
            client: { name: 'Markhay Smith' },
            date: '05 Sep 2022',
            time: '1:20 PM',
            title: 'Markhay Smith',
            description: 'Was completed the operation within deadline',
        },
        {
            id: 5,
            user: { name: 'Mike Litorus' },
            client: { name: 'Rio Williams' },
            date: '20 Oct 2022',
            time: '2:20 PM',
            title: 'Rio Williams',
            description: 'Posted a blog about Corona safety measurements',
        }
    ]);

    const [selectedClient, setSelectedClient] = useState('Tümü');
    const [showModal, setShowModal] = useState(false);
    const [newNote, setNewNote] = useState({
        user: { name: 'Lesley Grauer' }, // Default user
        client: { name: '' },
        date: '',
        time: '',
        title: '',
        description: ''
    });

    const clients = [
        'Tümü',
        'Bernardo James',
        'Linda Carpenter',
        'Markhay Smith',
        'Rio Williams',
    ];

    const filteredNotes = selectedClient === 'Tümü' ? notes : notes.filter(note => note.client.name === selectedClient);

    const handleClientChange = (e) => {
        setSelectedClient(e.target.value);
    };

    const handleAddNote = () => {
        setNotes([
            { 
                id: notes.length + 1,
                ...newNote, 
                date: new Date().toLocaleDateString(), 
                time: new Date().toLocaleTimeString() 
            },
            ...notes,
        ]);
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
            setNewNote({ ...newNote, client: { name: value } });
        } else {
            setNewNote({ ...newNote, [name]: value });
        }
    };

    const handleDeleteNote = (id) => {
        const confirmDelete = window.confirm("Bu notu silmek istediğinizden emin misiniz?");
        if (confirmDelete) {
            setNotes(notes.filter(note => note.id !== id));
        }
    };

    return (
        <div className="container mx-auto p-4 ">
            <div className="bg-white dark:!bg-navy-700 dark:text-white rounded-3xl shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="md:text-2xl text-xl font-bold">Tüm Danışan Notları</h1>
                    <div className="flex space-x-4">
                        <select
                            value={selectedClient}
                            onChange={handleClientChange}
                            className="border border-gray-300 rounded-md md:p-2 md:text-base text-sm"
                        >
                            {clients.map(client => (
                                <option key={client} value={client}>{client}</option>
                            ))}
                        </select>
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-blue-600 text-white md:px-4 md:py-2 px-2 rounded-md hover:bg-blue-500 md:text-base text-sm"
                        >
                            Not Ekle
                        </button>
                    </div>
                </div>
                <div className="relative">
                    <ul className="list-none m-0 p-0 relative z-10">
                        {filteredNotes.map((note, index) => (
                            <div className='flex' key={index}>
                                <div className='w-full'>
                                    <ClientNoteItem {...note} />
                                </div>
                                <button
                                    onClick={() => handleDeleteNote(note.id)}
                                    className="text-red-500 hover:text-red-700 px-4 py-2 border rounded m-auto hover:bg-gray-200"
                                >
                                    Sil
                                </button>
                            </div>
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
                clients={clients.filter(client => client !== 'Tümü')}
            />
        </div>
    );
};

export default AllNotes;
