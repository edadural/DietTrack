import { useState } from "react";

const AddMeasurementModal = ({ show, onClose, onSave }) => {
  const [measurement, setMeasurement] = useState({
    olcum_tarihi: new Date().toISOString().slice(0, 10),
    agirlik: 0,
    yagsiz: 0,
    sivi: 0,
    yag: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeasurement((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(measurement);
    setMeasurement({
      olcum_tarihi: new Date().toISOString().slice(0, 10),
      agirlik: 0,
      yagsiz: 0,
      sivi: 0,
      yag: 0,
    });
  };

  if (!show) return null;

  return (
    <div className="modal-container fixed inset-0 z-50 flex items-center md:justify-center bg-gray-800 bg-opacity-50">
      <div className="modal-content md:w-1/4 rounded-md bg-white p-4">
        <h2 className="mb-4 text-xl font-bold text-center">Ölçüm Ekle</h2>
        <div className="mb-2">
          <label className="block">Ölçüm Tarihi:</label>
          <input
            type="date"
            name="olcum_tarihi"
            value={measurement.olcum_tarihi}
            onChange={handleChange}
            className="rounded border p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block">Ağırlık:</label>
          <input
            type="number"
            name="agirlik"
            value={measurement.agirlik}
            onChange={handleChange}
            className="rounded border p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block">Yağsız:</label>
          <input
            type="number"
            name="yagsiz"
            value={measurement.yagsiz}
            onChange={handleChange}
            className="rounded border p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block">Sıvı:</label>
          <input
            type="number"
            name="sivi"
            value={measurement.sivi}
            onChange={handleChange}
            className="rounded border p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block">Yağ:</label>
          <input
            type="number"
            name="yag"
            value={measurement.yag}
            onChange={handleChange}
            className="rounded border p-2 w-full"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 rounded bg-gray-500 px-4 py-2 text-white"
          >
            İptal
          </button>
          <button
            onClick={handleSubmit}
            className="rounded bg-blue-500 px-4 py-2 text-white"
          >
            Kaydet
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMeasurementModal;
