import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import Card from "components/card";
import Modal from "react-modal";
import "react-calendar/dist/Calendar.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import "assets/css/MiniCalendar.css";
import { appAxios } from "helper/appAxios";

const MiniCalendar = () => {
  const [value, onChange] = useState(new Date());
  const [users, setUsers] = useState([]);
  const [randevu, setRandevu] = useState([]);

  useEffect(() => {
    appAxios
      .post("user/user-get", {})
      .then(async (response) => {
        if (response.data.status) {
          setUsers(response.data.data);
          console.log("users", users);
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
  }, [users]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleDayClick = (value) => {
    const eventsOnSelectedDay = randevu.filter(
      (event) => event.basl_tarih.toDateString() === value.toDateString()
    );
    setSelectedDateEvents(eventsOnSelectedDay);
    if (eventsOnSelectedDay.length > 0) {
      openModal();
    }
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const eventsCount = randevu.filter(
        (event) => event.basl_tarih.toDateString() === date.toDateString()
      ).length;
      if (eventsCount > 0) {
        return (
          <div className="-ml-1.5 flex items-center justify-center">
            <div className="absolute flex h-6 w-6 items-center justify-center rounded-md border-2 border-red-500"></div>
          </div>
        );
      }
    }
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const eventsCount = randevu.filter(
        (event) => event.basl_tarih.toDateString() === date.toDateString()
      ).length;
      if (eventsCount > 0) {
        return "event-day";
      }
    }
    return null;
  };

  const getUserNameById = (userId) => {
    const user = users.find((user) => user.user_id === userId);
    return user ? user.ad + " " + user.soyad : "Kullanıcı bulunamadı";
  };

  return (
    <div>
      <Card extra="flex w-full h-full flex-col px-3 py-3">
        <Calendar
          onChange={onChange}
          value={value}
          prevLabel={<MdChevronLeft className="ml-1 h-6 w-6 " />}
          nextLabel={<MdChevronRight className="ml-1 h-6 w-6 " />}
          view={"month"}
          onClickDay={handleDayClick}
          tileContent={tileContent}
          tileClassName={tileClassName}
        />
      </Card>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Event Modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            width:
              window.innerWidth >= 768
                ? "30%"
                : window.innerWidth >= 640
                ? "80%"
                : "90%",
            height: "auto",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "10px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          },
        }}
      >
        {selectedDateEvents.length > 0 && (
          <div className="text-center">
            <h2 className="mb-2 text-xl font-bold text-gray-700">
              Randevu Hatırlatma
            </h2>
            <p className="mb-4 text-lg text-gray-600">
              {selectedDateEvents.length} randevu bulundu
            </p>
            <ul>
              {selectedDateEvents.map((event, index) => (
                <li key={index} className="text-gray-800">
                  {getUserNameById(event.user_id)} - {event.baslik} -{" "}
                  {event.basl_tarih.getHours().toString().padStart(2, "0")}:
                  {event.basl_tarih.getMinutes().toString().padStart(2, "0")}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-center">
          <button
            className="mt-4 rounded bg-gray-400 px-4 py-2 font-bold text-gray-800 hover:bg-gray-300 "
            onClick={closeModal}
          >
            Kapat
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default MiniCalendar;
