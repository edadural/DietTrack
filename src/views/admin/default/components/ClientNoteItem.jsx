import React from "react";

const getInitials = (name) => {
  if (!name) return "";
  const nameParts = name.split(" ");
  return nameParts
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
};

const ClientNoteItem = ({ user, tarih, note }) => (
  <li className="relative mb-2 p-2 hover:bg-gray-100 dark:hover:bg-navy-900 ">
    <div className="absolute left-2 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 font-bold text-white dark:text-navy-900">
      {getInitials(user?.name)}
    </div>
    <div className="relative ml-10 rounded-xl bg-white p-4 shadow dark:!bg-navy-800 dark:text-white">
      <div className="flex items-start justify-between">
        <div className="mr-5">
          <h4 className="text-sm font-semibold text-gray-800 dark:text-white">
            {tarih}
          </h4>
        </div>
      </div>
      <div className="mt-2 rounded-xl bg-gray-100 p-4 shadow-inner dark:!bg-navy-700 dark:text-white">
        <h3 className="text-lg font-semibold text-indigo-700 dark:text-white">
          {user.name}
        </h3>
        <p className="mt-1 text-sm text-gray-500">{note}</p>
      </div>
    </div>
  </li>
);

export default ClientNoteItem;
