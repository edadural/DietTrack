import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from 'react-modal';
import '../variables/modal.css';

Modal.setAppElement('#root');

const CalendarPage = () => {
    const [events, setEvents] = useState([
        { id: 1, title: 'Asd', date: '2024-05-20T10:00:00' },
        { id: 2, title: 'Wet', start: '2024-05-23T14:00:00', end: '2024-05-23T18:00:00' },
    ]);

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isCreateModal, setIsCreateModal] = useState(false);
    const [newEvent, setNewEvent] = useState({ title: '', dateTime: '' });

    const openCreateModal = () => {
        setIsCreateModal(true);
        setModalIsOpen(true);
    };

    const openEventDetailsModal = (clickInfo) => {
        setSelectedEvent(clickInfo.event);
        setIsCreateModal(false);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleEventClick = (clickInfo) => {
        openEventDetailsModal(clickInfo);
    };

    const handleAddEvent = (e) => {
        e.preventDefault();
        setEvents([...events, { id: events.length + 1, title: newEvent.title, date: newEvent.dateTime }]);
        setNewEvent({ title: '', dateTime: '' });
        closeModal();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent({ ...newEvent, [name]: value });
    };

    const handleDeleteEvent = () => {
        setEvents(events.filter(event => event.id !== parseInt(selectedEvent.id)));
        closeModal();
    };

    const handleViewChange = (view) => {
        if (view === 'month') {
            calendarRef.current.getApi().changeView('dayGridMonth');
        } else if (view === 'week') {
            calendarRef.current.getApi().changeView('timeGridWeek');
        } else if (view === 'day') {
            calendarRef.current.getApi().changeView('timeGridDay');
        }
    };

    const calendarRef = React.createRef();

    return (
        <div style={{ maxWidth: '900px', margin: 'auto' }}>
            <div className='flex justify-between mb-4'>
                <button
                    onClick={openCreateModal}
                    className='flex items-center text-xl hover:cursor-pointer text-lightPrimary p-2 bg-brand-500 hover:bg-brand-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10 linear justify-center rounded-lg font-bold transition duration-200'
                >
                    Randevu Ekle
                </button>
                <div>
                    <button onClick={() => handleViewChange('month')} className='bg-gray-800 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-700 focus:outline-none focus:ring-blue-500'>Ay</button>
                    <button onClick={() => handleViewChange('week')} className='bg-gray-800 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-700 focus:outline-none focus:ring-blue-500'>Hafta</button>
                    <button onClick={() => handleViewChange('day')} className='bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-blue-500'>Gün</button>
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
                height="auto"
            />
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel={isCreateModal ? "Randevu Ekle" : "Randevu Detayları"}
                className="ReactModal__Content bg-white shadow-lg rounded-lg overflow-hidden relative p-6 w-1/3 mx-auto"
                overlayClassName="ReactModal__Overlay flex items-center justify-center fixed inset-0 bg-black bg-opacity-50"
            >
                {isCreateModal ? (
                    <div>
                        <h2 className="text-xl font-bold mb-4 text-center">Randevu Ekle</h2>
                        <form onSubmit={handleAddEvent}>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
                                    Randevu Adı:
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={newEvent.title}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="dateTime">
                                    Tarih ve Saat:
                                </label>
                                <input
                                    type="datetime-local"
                                    id="dateTime"
                                    name="dateTime"
                                    value={newEvent.dateTime}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className="flex justify-between mt-4">
                                <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-blue-500">
                                    Ekle
                                </button>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-gray-500"
                                >İptal</button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-xl font-bold mb-4 text-center">Randevu Detayları</h2>
                        {selectedEvent && (
                            <div>
                                <p className="mb-2"><strong>İsim:</strong> {selectedEvent.title}</p>
                                <p className="mb-2"><strong>Tarih:</strong> {selectedEvent.start ? selectedEvent.start.toDateString() : selectedEvent.date}</p>
                                {selectedEvent.start && (
                                    <p className="mb-2"><strong>Saat:</strong> {selectedEvent.start.toLocaleTimeString()}</p>
                                )}
                            </div>
                        )}
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={handleDeleteEvent}
                                className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-red-500"
                            >
                                Sil
                            </button>
                            <button
                                onClick={closeModal}
                                className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-gray-500"
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
