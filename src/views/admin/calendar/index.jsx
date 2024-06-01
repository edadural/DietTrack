import { useEffect, useState } from "react";
import CalendarPage from "./components/CalendarPage";
import { appAxios } from "helper/appAxios";
import { showLoad } from "helper/swal";
import { swalQuestion } from "helper/swal";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [randevu, setRandevu] = useState(null);
  const [events, setEvents] = useState([]);

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
          setRandevu(response.data.data);
          console.log(response.data.data);
        }
      })
      .catch((err) => {});
  }, [users]);

  const Sil = (randevu_id) => {
    showLoad();
    swalQuestion(() => {
      appAxios
        .post("randevu/randevu-delete", { randevu_id })
        .then(async (response) => {
          if (response.data.status) {
            setEvents(events.filter((event) => event.id !== randevu_id));
          }
        })
        .catch((err) => {});
    });
  };

  const Ekle = (formData) => {
    showLoad();
    appAxios
      .post("randevu/randevu-add", {
        user_id: user.user_id,
        baslik: formData.baslik,
        basl_tarih: formData.basl_tarih,
        bitis_tarih: formData.bitis_tarih,
      })
      .then(async (response) => {
        if (response.data.status) {
          const data = response.data.data;
          const object = {
            id: data.id,
            title: data.baslik,
            start: data.basl_tarih,
            end: data.bitis_tarih,
            extendedProps: {
              user: user,
              user_id: user.user_id,
            },
          };
          setEvents([...events, object]);
        }
      })
      .catch((err) => {});
  };

  const Guncelle = (formData) => {
    showLoad();
    appAxios
      .post("randevu/randevu-update", {
        randevu_id: formData.randevu_id,
        baslik: formData.baslik,
        basl_tarih: formData.basl_tarih,
        bitis_tarih: formData.bitis_tarih,
      })
      .then(async (response) => {
        if (response.data.status) {
        }
      })
      .catch((err) => {});
  };

  return (
    <div>
      <div className="mt-5 grid grid-cols-1 gap-5 ">
        <div>
          <CalendarPage
            users={users}
            setUser={setUser}
            randevu={randevu}
            events={events}
            setEvents={setEvents}
            Ekle={Ekle}
            Guncelle={Guncelle}
            Sil={Sil}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
