import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Modal from "react-modal";

Modal.setAppElement("#root");

const CalendarPage = ({
  users,
  setUser,
  randevu,
  events,
  setEvents,
  Ekle,
  Guncelle,
  Sil,
}) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isCreateModal, setIsCreateModal] = useState(false);
  const calendarRef = useRef(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [newEvent, setNewEvent] = useState({
    user: "",
    title: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    if (randevu) {
      const formattedEvents = randevu.map((event) => ({
        id: event.id,
        title: event.baslik,
        start: event.basl_tarih,
        end: event.bitis_tarih,
        extendedProps: {
          user: event.user,
          user_id: event.user_id,
        },
      }));
      setEvents(formattedEvents);
    }
  }, [randevu]);

  const openCreateModal = () => {
    setIsCreateModal(true);
    setModalIsOpen(true);
  };

  const openEventDetailsModal = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
    setIsCreateModal(false);
    setModalIsOpen(true);
  };

  const handleEventClick = (clickInfo) => {
    openEventDetailsModal(clickInfo);
  };

  const handleViewChange = (view) => {
    if (calendarRef.current) {
      calendarRef.current.getApi().changeView(view);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    const { user, title, date, startTime, endTime } = newEvent;
    const newId = events.length + 1;
    const newEventObject = {
      id: newId,
      title: `${title}`,
      start: `${date}T${startTime}`,
      end: `${date}T${endTime}`,
    };
    // setEvents([...events, newEventObject]);
    setNewEvent({
      user: "",
      title: "",
      date: "",
      startTime: "",
      endTime: "",
    });

    const formdata = {
      baslik: newEventObject.title,
      basl_tarih: newEventObject.start,
      bitis_tarih: newEventObject.end,
    };

    Ekle(formdata);

    closeModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleDeleteEvent = () => {
    Sil(parseInt(selectedEvent.id));
    closeModal();
  };

  const changeUserSelect = (event) => {
    setSelectedClient(event.target.value);
    const selectedUser = users.find(
      (u) => u.user_id === parseInt(event.target.value)
    );
    setUser(selectedUser);
  };

  const handleEventChange = (changeInfo) => {
    const updatedEvent = events.map((event) =>
      event.id === changeInfo.event.id
        ? {
            ...event,
            start: changeInfo.event.start,
            end: changeInfo.event.end,
            baslik: changeInfo.event.title,
          }
        : event
    );
    setEvents(updatedEvent);

    const formdata = {
      randevu_id: changeInfo.event.id,
      baslik: changeInfo.event.title,
      basl_tarih: changeInfo.event.start,
      bitis_tarih: changeInfo.event.end,
    };

    Guncelle(formdata);
  };

  return (
    <div style={{ maxWidth: "900px", margin: "auto" }}>
      <div className="mb-4 flex justify-between">
        <button
          onClick={openCreateModal}
          className="rounded-lg bg-navy-600 p-2 text-xl font-bold text-white transition duration-200 hover:cursor-pointer hover:bg-navy-400 dark:bg-navy-600 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10"
        >
          Randevu Ekle
        </button>
        <div>
          <button
            onClick={() => handleViewChange("dayGridMonth")}
            className="mr-2 rounded-md bg-gray-800 px-4 py-2 text-white hover:bg-gray-700 focus:outline-none focus:ring-blue-500"
          >
            Ay
          </button>
          <button
            onClick={() => handleViewChange("timeGridWeek")}
            className="mr-2 rounded-md bg-gray-800 px-4 py-2 text-white hover:bg-gray-700 focus:outline-none focus:ring-blue-500"
          >
            Hafta
          </button>
          <button
            onClick={() => handleViewChange("timeGridDay")}
            className="rounded-md bg-gray-800 px-4 py-2 text-white hover:bg-gray-700 focus:outline-none focus:ring-blue-500"
          >
            Gün
          </button>
        </div>
      </div>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        editable={true}
        droppable={true}
        eventClick={handleEventClick}
        eventChange={handleEventChange}
        height="auto"
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel={isCreateModal ? "Randevu Ekle" : "Randevu Detayları"}
        className="ReactModal__Content relative mx-auto w-2/3 overflow-hidden rounded-lg bg-white p-6 shadow-lg md:w-1/3"
        overlayClassName="ReactModal__Overlay flex items-center justify-center fixed inset-0 z-10 bg-black bg-opacity-50"
      >
        {isCreateModal ? (
          <div>
            <h2 className="mb-4 text-center text-xl font-bold">Randevu Ekle</h2>
            <form onSubmit={handleAddEvent}>
              <div className="mb-4">
                <label
                  className="mb-2 block font-bold text-gray-700"
                  htmlFor="user"
                >
                  Danışman:
                </label>
                <select
                  id="clientSelect"
                  placeholder="Danışan Seç"
                  onChange={changeUserSelect}
                  className="w-full rounded-md border border-gray-300 p-2"
                  value={selectedClient || ""}
                >
                  <option value="" disabled>
                    Danışan Seç
                  </option>
                  {users.map((user) => (
                    <option key={user.user_id} value={user.user_id}>
                      {user.ad} {user.soyad}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="mb-2 block font-bold text-gray-700"
                  htmlFor="title"
                >
                  Randevu Adı:
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newEvent.title}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-md border px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  className="mb-2 block font-bold text-gray-700"
                  htmlFor="date"
                >
                  Tarih:
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={newEvent.date}
                  onChange={handleInputChange}
                  required
                  className="focus focus focus w-full rounded-md border px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label
                  className="mb-2 block font-bold text-gray-700"
                  htmlFor="startTime"
                >
                  Başlangıç Saati:
                </label>
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  value={newEvent.startTime}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-md border px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  className="mb-2 block font-bold text-gray-700"
                  htmlFor="endTime"
                >
                  Bitiş Saati:
                </label>
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  value={newEvent.endTime}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-md border px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  type="submit"
                  className="rounded-md bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-blue-500"
                >
                  Ekle
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-md bg-gray-500 px-6 py-2 text-white hover:bg-gray-600 focus:outline-none focus:ring-gray-500"
                >
                  İptal
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <h2 className="mb-4 text-center text-xl font-bold">
              Randevu Detayları
            </h2>
            {selectedEvent && (
              <div>
                {selectedEvent.extendedProps && (
                  <p className="mb-2">
                    <strong>Danışan:</strong>{" "}
                    {
                      users.find(
                        (user) =>
                          user.user_id === selectedEvent.extendedProps.user_id
                      ).ad
                    }{" "}
                    {
                      users.find(
                        (user) =>
                          user.user_id === selectedEvent.extendedProps.user_id
                      ).soyad
                    }
                  </p>
                )}
                <p className="mb-2">
                  <strong>Başlık:</strong> {selectedEvent.title}
                </p>
                <p className="mb-2">
                  <strong>Tarih:</strong>{" "}
                  {selectedEvent.start
                    ? selectedEvent.start.toDateString()
                    : selectedEvent.date}
                </p>
                {selectedEvent.start && (
                  <p className="mb-2">
                    <strong>Başlangıç Saati:</strong>{" "}
                    {selectedEvent.start.toLocaleTimeString()}
                  </p>
                )}
                {selectedEvent.end && (
                  <p className="mb-2">
                    <strong>Bitiş Saati:</strong>{" "}
                    {selectedEvent.end.toLocaleTimeString()}
                  </p>
                )}
              </div>
            )}
            <div className="mt-4 flex justify-between">
              <button
                onClick={handleDeleteEvent}
                className="rounded-md bg-red-500 px-6 py-2 text-white hover:bg-red-600 focus:outline-none focus:ring-red-500"
              >
                Sil
              </button>
              <button
                onClick={closeModal}
                className="rounded-md bg-gray-500 px-6 py-2 text-white hover:bg-gray-600 focus:outline-none focus:ring-gray-500"
              >
                Kapat
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CalendarPage;
