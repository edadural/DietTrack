import { useEffect, useState } from "react";
import AllNotes from "./components/AllNotes";
import { appAxios } from "helper/appAxios";
import { showLoad } from "helper/swal";
import { swalClose } from "helper/swal";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [notlar, setNotlar] = useState([]);
  const [newNote, setNewNote] = useState({
    user: "",
    note: "",
  });

  useEffect(() => {
    appAxios
      .post("user/user-get", {})
      .then(async (response) => {
        if (response.data.status) {
          setUsers(response.data.data);
        }
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    appAxios
      .post("note/note-get", {})
      .then(async (response) => {
        if (response.data.status) {
          setNotlar(response.data.data);
        }
      })
      .catch((err) => {});
  }, []);

  const Ekle = (noteToAdd) => {
    showLoad();
    appAxios
      .post("note/note-add", noteToAdd)
      .then(async (response) => {
        if (response.data.status) {
          // swalClose();
        }
      })
      .catch((err) => {});
  };

  const Sil = (note_id) => {
    showLoad();
    appAxios
      .post("note/note-delete", { note_id })
      .then(async (response) => {
        if (response.data.status) {
          console.log("Not başarıyla silindi");
          swalClose();
        }
      })
      .catch((err) => {
        console.error("Not silinemedi:", err);
      });
  };

  return (
    <div>
      <div className="mt-3 grid grid-cols-1">
        <AllNotes
          notlar={notlar}
          users={users}
          newNote={newNote}
          setNewNote={setNewNote}
          Ekle={Ekle}
          Sil={Sil}
        />
      </div>
    </div>
  );
};

export default Dashboard;
