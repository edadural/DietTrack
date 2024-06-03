import { appAxios } from "helper/appAxios";
import React, { useEffect, useState } from "react";

const AppointmentCard = ({ time, appointments }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-4 flex">
      <ul className="mb-0 mr-2 inline-grid w-10 p-0 align-baseline">
        <li className="mt-1 text-xs font-medium text-gray-500">
          {time.slice(0, 2)}:00
        </li>
      </ul>
      <ul className="relative mb-0 ml-1 w-full list-none p-0">
        <div className="absolute left-0 top-2 z-0 h-full w-0.5 bg-gray-200"></div>
        {appointments.map((appointment, index) => (
          <li
            key={index}
            className={`relative pb-5 pl-4 ${
              index === appointments.length - 1 ? "pb-0" : ""
            }`}
          >
            <div className="absolute left-0 top-2 z-10 h-1.5 w-1.5 rounded-full bg-brand-500"></div>
            <ul className="list-none p-0">
              {appointment.subAppointments ? (
                <li className="flex items-center rounded-lg border border-blue-100 p-2 shadow-md">
                  <i className="fas fa-circle mr-2 text-xs text-gray-800"></i>
                  {appointment.time}{" "}
                  <span className="ml-4 text-xs text-gray-500">
                    {appointment.userName}
                  </span>
                </li>
              ) : (
                <li
                  className={`flex items-center ${
                    appointment.completed
                      ? "text-gray-500 line-through"
                      : currentTime > appointment.basl_tarih
                      ? "text-gray-500 line-through"
                      : "text-gray-800 dark:text-white font-bold"
                  }`}
                >
                  <i className="fas fa-circle mr-2 text-xs"></i>
                  {appointment.time.slice(0, 5)}{" "}
                  <span className="ml-4 text-xs text-gray-500">
                    {appointment.userName}
                  </span>
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
  const [randevu, setRandevu] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    appAxios
      .post("user/user-get", {})
      .then(async (response) => {
        if (response.data.status) {
          setUsers(response.data.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });

    appAxios
      .post("randevu/randevu-get", {})
      .then(async (response) => {
        if (response.data.status) {
          const fetchedRandevu = response.data.data.map((item) => {
            const user = users.find((user) => user.user_id === item.user_id);
            return {
              ...item,
              basl_tarih: new Date(item.basl_tarih),
              bitis_tarih: new Date(item.bitis_tarih),
              userName: user ? user.ad + " " + user.soyad : "Bilinmeyen",
            };
          });
          setRandevu(fetchedRandevu);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [users]);

  const today = new Date().toDateString();

  const todayAppointments = randevu.filter(
    (appointment) => appointment.basl_tarih.toDateString() === today
  );

  const appointmentsData = todayAppointments.map((appointment) => ({
    time: appointment.basl_tarih.toLocaleTimeString(),
    appointments: [
      {
        time: appointment.basl_tarih.toLocaleTimeString().slice(0, 5),
        name: appointment.name,
        userName: appointment.userName,
        completed: appointment.completed,
        basl_tarih: appointment.basl_tarih,
      },
    ],
  }));

  return (
    <div className="rounded-3xl bg-white p-4 dark:bg-navy-900">
      <div className="">
        <div className="pb-4 text-xl font-bold text-navy-700 dark:text-white">
          Günlük Randevular
        </div>
      </div>
      <div className="">
        {appointmentsData.map((appointment, index) => (
          <AppointmentCard
            key={index}
            time={appointment.time}
            appointments={appointment.appointments}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentAppointments;