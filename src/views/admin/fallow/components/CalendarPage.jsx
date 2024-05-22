import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Modal from 'react-modal';
import '../variables/modal.css';

Modal.setAppElement('#root');

const CalendarPage = () => {
    const [events, setEvents] = useState([
        { title: 'Etkinlik 1', date: '2024-05-22T10:00:00' },
        { title: 'Etkinlik 2', start: '2024-05-23T14:00:00', end: '2024-05-25T18:00:00' },
    ]);

    const [newEvent, setNewEvent] = useState({ title: '', dateTime: '' });
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent({ ...newEvent, [name]: value });
    };

    const handleAddEvent = (e) => {
        e.preventDefault();
        setEvents([...events, { title: newEvent.title, date: newEvent.dateTime }]);
        setNewEvent({ title: '', dateTime: '' });
        closeModal();
    };

    return (
        <div style={{ maxWidth: '900px', margin: 'auto' }}>
            <button onClick={openModal} style={{ marginTop: '20px' }}>Etkinlik Ekle</button>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={events}
            />
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Etkinlik Ekle Modal"
                className="ReactModal__Content"
                overlayClassName="ReactModal__Overlay"
            >
                <h2>Etkinlik Ekle</h2>
                <form onSubmit={handleAddEvent}>
                    <div>
                        <label>
                            Etkinlik Adı:
                            <input
                                type="text"
                                name="title"
                                value={newEvent.title}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Tarih ve Saat:
                            <input
                                type="datetime-local"
                                name="dateTime"
                                value={newEvent.dateTime}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                    </div>
                    <button type="submit">Etkinlik Ekle</button>
                    <button type="button" onClick={closeModal}>İptal</button>
                </form>
            </Modal>
        </div>
    );
};

export default CalendarPage;

