import React, { useState } from "react";
import Calendar from "react-calendar";
import Card from "components/card";
import "react-calendar/dist/Calendar.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import "assets/css/MiniCalendar.css";

const MiniCalendar = () => {
  const [value, onChange] = useState(new Date());
  const [events, setEvents] = useState([
    {
      date: new Date(2024, 4, 25), // Örnek bir tarih
      title: "Örnek Olay 1",
      description: "Bu olayın açıklaması burada yer alacak.",
    },
    {
      date: new Date(2024, 4, 28), // Örnek bir tarih
      title: "Örnek Olay 2",
      description: "Bu olayın açıklaması burada yer alacak.",
    },
    // Daha fazla olay ekleyebilirsiniz...
  ]);

  // Takvimdeki olayları işaretlemek için bir işlev
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const event = events.find((event) => {
        return event.date.getTime() === date.getTime();
      });
      if (event) {
        return <p style={{ fontSize: "12px", color: "red" }}>●</p>;
      }
    }
  };

  // Takvimdeki etkinlikleri göstermek için bir işlev
  const onClickDay = (value) => {
    const event = events.find((event) => {
      return event.date.getTime() === value.getTime();
    });
    if (event) {
      alert(`Tarih: ${value.toLocaleDateString()}\nEtkinlik: ${event.title}`);
    } else {
      alert(`Tarih: ${value.toLocaleDateString()}\nEtkinlik yok`);
    }
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
          tileContent={tileContent} // Yeni olayları işaretlemek için tileContent işlevini kullanın
          onClickDay={onClickDay} // Gün tıklandığında olayları göstermek için onClickDay işlevini kullanın
        />
      </Card>
    </div>
  );
};

export default MiniCalendar;
