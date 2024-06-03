import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";
import Widget from "components/widget/Widget";
import ClientNotes from "./components/ClientNotes";
import MiniCalendar from "components/calendar/MiniCalendar";
import PieChartCard from "./components/PieChartCard";
import RecentAppointments from "components/recent/RecentAppointments";
import { useEffect, useState } from "react";
import { appAxios } from "helper/appAxios";
import { showLoad } from "helper/swal";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [randevu, setRandevu] = useState([]);
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
      .post("randevu/randevu-get", {})
      .then(async (response) => {
        if (response.data.status) {
          const fetchedRandevu = response.data.data.map((item) => ({
            ...item,
            basl_tarih: new Date(item.basl_tarih),
            bitis_tarih: new Date(item.bitis_tarih),
          }));
          setRandevu(fetchedRandevu);
        }
      })
      .catch((err) => {
        console.error(err);
      });
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

  const today = new Date();
  const dailyAppointments = randevu.filter(
    (appointment) =>
      appointment.basl_tarih.toDateString() === today.toDateString()
  ).length;

  return (
    <div>
      <div className="z-100 mt-3 grid gap-5 md:grid-cols-3">
        <div className="flex flex-col gap-3 ">
          <Widget
            icon={<IoDocuments className="h-6 w-6" />}
            title={"Danışan Sayısı"}
            subtitle={users.length}
          />
          <Widget
            icon={<MdBarChart className="h-6 w-6" />}
            title={"Günlük randevu sayısı"}
            subtitle={dailyAppointments}
          />
          <Widget
            icon={<MdDashboard className="h-6 w-6" />}
            title={"Toplam randevu sayısı"}
            subtitle={randevu.length}
          />
        </div>
        <MiniCalendar />
        <RecentAppointments />
      </div>

      <div className="mt-5 grid grid-cols-1">
        <div className="z-0">
          <ClientNotes
            notlar={notlar}
            users={users}
            newNote={newNote}
            setNewNote={setNewNote}
            Ekle={Ekle}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
