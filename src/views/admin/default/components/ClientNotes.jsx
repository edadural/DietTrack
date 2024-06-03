import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClientNoteItem from "./ClientNoteItem";
import AddNoteModal from "./AddNoteModal";

const ClientNotes = ({ notlar, users, newNote, setNewNote, Ekle }) => {
  const [notes, setNotes] = useState([]);

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

  const lastThreeNotes = notes.slice(Math.max(notes.length - 3, 0));

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

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

  return (
    <div className="container mx-auto">
      <div className="rounded-3xl bg-white p-6 shadow-md dark:!bg-navy-700 dark:text-white">
        <div className="mb-3 flex justify-between">
          <h1 className="text-xl font-bold md:text-2xl">Danışan Notları</h1>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowModal(true)}
              className="rounded-md bg-blue-600 px-2 text-sm text-white hover:bg-blue-500 md:px-4 md:py-2 md:text-base"
            >
              Not Ekle
            </button>
            <button
              onClick={() => navigate("/admin/all-notes")}
              className="rounded-md bg-gray-500 px-2 text-sm text-white hover:bg-gray-600 md:px-4 md:py-2 md:text-base"
            >
              Tüm Notlar
            </button>
          </div>
        </div>
        <div className="relative">
          <ul className="relative z-10 m-0 list-none p-0">
            {lastThreeNotes.map((note, index) => (
              <ClientNoteItem key={index} {...note} />
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

export default ClientNotes;
