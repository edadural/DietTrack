import React, { useEffect, useState } from "react";
import ClientNoteItem from "./ClientNoteItem";
import AddNoteModal from "./AddNoteModal";

const AllNotes = ({ notlar, users, newNote, setNewNote, Ekle, Sil }) => {
  const [notes, setNotes] = useState([]);
  const [selectedClient, setSelectedClient] = useState("Tümü");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const formattedNotes = notlar.map((n) => ({
      id: n.id,
      user_id: n.user_id,
      tarih: new Date(n.tarih).toLocaleDateString(),
      time: new Date(n.tarih).toLocaleTimeString(),
      note: n.note,
      user: { name: `${n.ad} ${n.soyad}` },
    }));
    setNotes(formattedNotes);
  }, [notlar]);

  const clients = [
    { name: "Tümü" },
    ...users.map((user) => ({ name: `${user.ad} ${user.soyad}` })),
  ];

  const filteredNotes =
    selectedClient === "Tümü"
      ? notes
      : notes.filter((note) => note.user.name === selectedClient);

  const handleClientChange = (e) => {
    setSelectedClient(e.target.value);
  };

  const handleAddNote = () => {
    const selectedUser = users.find(
      (user) => `${user.ad} ${user.soyad}` === newNote.user
    );

    if (!selectedUser) {
      alert("Lütfen geçerli bir kullanıcı seçin.");
      return;
    }

    const newId = Math.max(...notes.map((note) => note.user_id), 0) + 1;
    const currentDate = new Date();

    const noteToAdd = {
      id: newId,
      user_id: selectedUser.user_id,
      tarih: currentDate.toLocaleDateString(),
      time: currentDate.toLocaleTimeString(),
      note: newNote.note,
      user: { name: newNote.user },
    };

    setNotes([noteToAdd, ...notes]);

    setNewNote({
      user: "",
      note: "",
    });

    setShowModal(false);
    Ekle(noteToAdd);
  };

  const handleDeleteNote = (note_id) => {
    const confirmDelete = window.confirm(
      "Bu notu silmek istediğinizden emin misiniz?"
    );

    if (confirmDelete) {
        Sil(note_id);
        setNotes(notes.filter((note) => note.note_id !== note_id));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="rounded-3xl bg-white p-6 shadow-md dark:!bg-navy-700 dark:text-white">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-bold md:text-2xl">Tüm Danışan Notları</h1>
          <div className="flex space-x-4">
            <select
              value={selectedClient}
              onChange={handleClientChange}
              className="rounded-md border border-gray-300 text-sm md:p-2 md:text-base"
            >
              {clients.map((client, index) => (
                <option key={index} value={client.name}>
                  {client.name}
                </option>
              ))}
            </select>
            <button
              onClick={() => setShowModal(true)}
              className="rounded-md bg-blue-600 px-2 text-sm text-white hover:bg-blue-500 md:px-4 md:py-2 md:text-base"
            >
              Not Ekle
            </button>
          </div>
        </div>
        <div className="relative">
          <ul className="relative z-10 m-0 list-none p-0">
            {filteredNotes.map((note, index) => (
              <React.Fragment key={index}>
                <div className="flex">
                  <div className="w-full">
                    <ClientNoteItem {...note} />
                  </div>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="m-auto rounded border px-4 py-2 text-red-500 hover:bg-gray-200 hover:text-red-700"
                  >
                    Sil
                  </button>
                </div>
              </React.Fragment>
            ))}
          </ul>
          <div className="absolute left-6 top-3 -z-0 h-full w-0.5 bg-indigo-100"></div>
        </div>
      </div>
      <AddNoteModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleAddNote}
        newNote={newNote}
        setNewNote={setNewNote}
        users={users}
      />
    </div>
  );
};

export default AllNotes;
