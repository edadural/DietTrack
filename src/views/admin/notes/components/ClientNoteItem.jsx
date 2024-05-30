import React from 'react';

const getInitials = (name) => {
    const nameParts = name.split(' ');
    return nameParts.map(part => part.charAt(0)).join('').toUpperCase();
};

const ClientNoteItem = ({ user, client, date, time, title, description }) => (
    <li className="relative mb-2 p-2 hover:bg-gray-100 dark:hover:bg-navy-900 ">
        <div className="absolute top-3 left-2 w-8 h-8 flex items-center justify-center bg-gray-300 rounded-full text-white font-bold">
            {getInitials(user.name)}
        </div>
        <div className="relative ml-10 bg-white dark:!bg-navy-800 dark:text-white p-4 rounded-xl shadow">
            <div className="flex items-start justify-between">
                <div className="mr-5">
                    <h4 className="text-sm font-semibold text-gray-800">{date}</h4>
                    <span className="text-xs text-gray-500">{time}</span>
                </div>
            </div>
            <div className="mt-2 bg-gray-100 dark:!bg-navy-700 dark:text-white p-4 rounded-xl shadow-inner">
                <h3 className="text-lg font-semibold text-indigo-700 dark:text-white">
                    {title} <span className="text-gray-700">({client.name})</span>
                </h3>
                <p className="text-sm text-gray-500 mt-1">{description}</p>
            </div>
        </div>
    </li>
);

export default ClientNoteItem;
