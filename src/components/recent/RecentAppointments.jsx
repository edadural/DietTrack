import React from 'react';

const AppointmentCard = ({ time, appointments }) => {
    return (
        <div className="flex mb-4">
            <ul className="inline-grid mb-0 mr-2 align-baseline p-0 w-10">
                <li className="mt-1 text-gray-500 font-medium text-xs">{time}</li>
            </ul>
            <ul className="relative list-none mb-0 ml-1 p-0 w-full">
                <div className="absolute bg-gray-200 w-0.5 h-full left-0 top-2 z-0"></div>
                {appointments.map((appointment, index) => (
                    <li key={index} className={`relative pl-4 pb-5 ${index === appointments.length - 1 ? 'pb-0' : ''}`}>
                        <div className="absolute bg-brand-500 w-1.5 h-1.5 top-2 left-0 rounded-full z-10"></div>
                        <ul className="list-none p-0">
                            {appointment.subAppointments ? (
                                <li className="border border-blue-100 shadow-md rounded-lg p-2 flex items-center">
                                    <i className="fas fa-circle text-xs mr-2 text-gray-800"></i>{appointment.time} <span className="ml-4 text-gray-500 text-xs">{appointment.name}</span>
                                </li>
                            ) : (
                                <li className={`flex items-center ${appointment.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                                    <i className="fas fa-circle text-xs mr-2"></i>{appointment.time} <span className="ml-4 text-gray-500 text-xs">{appointment.name}</span>
                                </li>
                            )}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const RecentAppointments = () => {
    const appointmentsData = [
        {
            time: '08:00',
            appointments: [
                { time: '08:00', name: 'Benjamin Bruklin', completed: true },
                { time: '08:15', name: 'Andrea Lalema', completed: true },
                {
                    time: '08:30',
                    name: 'Andrea Lalema',
                    ongoing: true,
                    subAppointments: [
                        { title: 'Patient Marie kennedy', status: 'New', time: '8:30 - 9:00 (30min)' }
                    ]
                }
            ]
        },
        {
            time: '09:00',
            appointments: [
                { time: '09:00', name: 'Galaviz Lalema' },
                { time: '09:40', name: 'Jenny Smith' }
            ]
        },
        {
            time: '10:00',
            appointments: [
                { time: '10:00', name: 'Cristina Groves' },
                { time: '10:30', name: 'Benjamin Bruklin' }
            ]
        },
        {
            time: '13:00',
            appointments: [
                { time: '13:00', name: 'Cristina Groves' },
                { time: '13:30', name: 'Benjamin Bruklin' }
            ]
        },
        {
            time: '14:00',
            appointments: [
                { time: '14:00', name: 'Cristina Groves' },
                { time: '14:30', name: 'Benjamin Bruklin' }
            ]
        }
    ];

    return (
        <div className=" bg-white p-4 rounded-3xl">
            <div className="">
                <div className="text-xl font-bold text-navy-700 dark:text-white pb-4">
                    Son Randevular
                </div>
            </div>
            <div className="">
                {appointmentsData.map((appointment, index) => (
                    <AppointmentCard key={index} time={appointment.time} appointments={appointment.appointments} />
                ))}
            </div>
        </div>
    );
};

export default RecentAppointments;
