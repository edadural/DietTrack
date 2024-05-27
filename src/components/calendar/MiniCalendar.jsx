import React, { useState } from "react";
import Calendar from "react-calendar";
import Card from "components/card";
import Modal from "react-modal";
import "react-calendar/dist/Calendar.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import "assets/css/MiniCalendar.css";

const MiniCalendar = () => {
  const [value, onChange] = useState(new Date());
  const [events, setEvents] = useState([
    {
      date: new Date(2024, 4, 23),
      title: "Randevu Hatırlatma",
      description: "Haftalık beslenme kontrolu",
    },
    {
      date: new Date(2024, 4, 28),
      title: "Randevu Hatırlatma",
      description: "Haftalık beslenme kontrolu",
    },
    // Daha fazla olay ekleyebilirsiniz...
  ]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleDayClick = (value) => {
    const event = events.find((event) => event.date.getTime() === value.getTime());
    if (event) {
      setSelectedEvent(event);
      openModal();
    }
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const event = events.find((event) => event.date.getTime() === date.getTime());
      if (event) {
        return (
          <div className="flex items-center justify-center -ml-1.5">
            <div className="border-2 border-red-500 w-6 h-6 rounded-md absolute"></div>
          </div>
        );
      }
    }
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const event = events.find((event) => event.date.getTime() === date.getTime());
      if (event) {
        return "event-day";
      }
    }
    return null;
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
            width: "30%",
            height: "30%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "10px",
            padding: "20px",
          },
        }}
      >
        {selectedEvent && (
          <div className="text-center">
            <h2 className="text-gray-700 text-lg font-bold mb-2">{selectedEvent.title}</h2>
            <p className="text-gray-600 mb-4">{selectedEvent.description}</p>
            <p className="text-gray-800 font-bold">Randevu Günü: {selectedEvent.date.toLocaleDateString()}</p>
          </div>
        )}
        <div className="flex justify-center">
          <button className="bg-gray-400 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded mt-4 " onClick={closeModal}>Kapat</button>
        </div>
      </Modal>
    </div>
  );
};

export default MiniCalendar;
