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
        { id: 2, title: 'Wet', start: '2024-05-23T14:00:00', end: '2024-05-25T18:00:00' },
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
        console.log(selectedEvent);
        console.log(selectedEvent._def.publicId);
        console.log(events[0].id);
        const aa = events.filter(event => event.id !== selectedEvent._def.publicId)
        console.log(aa);
        // setEvents();
        console.log(events);
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
            <div className='flex justify-between'>
                <button onClick={openCreateModal} className='bg-blueSecondary text-white p-3 rounded-full '>
                    Randevu Ekle
                </button>
                <div>
                    <button onClick={() => handleViewChange('month')} className='bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600 focus:outline-none focus:ring-blue-500'>Ay</button>
                    <button onClick={() => handleViewChange('week')} className='bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600 focus:outline-none focus:ring-blue-500'>Hafta</button>
                    <button onClick={() => handleViewChange('day')} className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-blue-500'>Gün</button>
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
                contentLabel={isCreateModal ? "Randevu Ekle Modal" : "Randevu Detayları Modal"}
                className="ReactModal__Content bg-white shadow-lg rounded-lg overflow-hidden relative"
            >
                <div className="p-6">
                    {isCreateModal ? (
                        <div>
                            <h2 className="text-lg font-bold mb-4">Randevu Ekle</h2>
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
                                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-blue-500">
                                        Randevu Ekle
                                    </button>
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-gray-500"
                                    >İptal</button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div>
                            <h2 className="text-lg font-bold mb-4">Randevu Detayları</h2>
                            {selectedEvent && (
                                <div>
                                    <p><strong>İsim:</strong> {selectedEvent.title}</p>
                                    <p><strong>Tarih:</strong> {selectedEvent.start ? selectedEvent.start.toDateString() : selectedEvent.date}</p>
                                    {selectedEvent.start && (
                                        <p><strong>Saat:</strong> {selectedEvent.start.toLocaleTimeString()}</p>
                                    )}
                                </div>
                            )}
                            <button
                                onClick={handleDeleteEvent}
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-red-500 mt-4 mr-4"
                            >
                                Sil
                            </button>
                            <button
                                onClick={closeModal}
                                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-gray-500 mt-4"
                            >
                                Kapat
                            </button>
                        </div>
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default CalendarPage;

