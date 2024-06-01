import React from "react";

const AddNoteModal = ({
  show,
  onClose,
  onSave,
  newNote,
  setNewNote,
  users,
}) => {
  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="w-1/3 rounded-lg bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">Yeni Not Ekle</h2>
        <div className="mb-4">
          <label className="mb-2 block">Danışan</label>
          <select
            name="user"
            value={newNote.user}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-2"
          >
            <option value="">Seçiniz</option>
            {users.map((user, index) => (
              <option key={index} value={`${user.ad} ${user.soyad}`}>
                {user.ad} {user.soyad}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="mb-2 block">Not</label>
          <textarea
            name="note"
            value={newNote.note}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 block">Tarih</label>
          <input
            type="text"
            name="tarih"
            value={new Date().toLocaleDateString()}
            disabled
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="rounded-md bg-gray-300 px-4 py-2 hover:bg-gray-400"
          >
            İptal
          </button>
          <button
            onClick={onSave}
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
          >
            Ekle
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNoteModal;
