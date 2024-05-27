import React from 'react';

const AddNoteModal = ({ show, onClose, onSave, newNote, handleInputChange, clients }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 overflow-y-auto h-full w-full pt-10">
            <div className="relative top-20 mx-auto p-5 border w-1/3 shadow-lg rounded-md bg-white">
                <h2 className="text-2xl mb-4">Yeni Not Ekle</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Danışan</label>
                    <select
                        name="client"
                        value={newNote.client.name}
                        onChange={(e) => handleInputChange(e, 'client')}
                        className="w-full border p-2 mt-2 rounded"
                    >
                        <option value="">Seç</option>
                        {clients.map(client => (
                            <option key={client.id} value={client.name}>
                                {client.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Başlık</label>
                    <input
                        type="text"
                        name="title"
                        value={newNote.title}
                        onChange={(e) => handleInputChange(e)}
                        className="w-full border p-2 mt-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Açıklama</label>
                    <textarea
                        name="description"
                        value={newNote.description}
                        onChange={(e) => handleInputChange(e)}
                        className="w-full border p-2 mt-2 rounded"
                    ></textarea>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 mr-2"
                    >
                        İptal
                    </button>
                    <button
                        onClick={onSave}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Kaydet
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddNoteModal;
