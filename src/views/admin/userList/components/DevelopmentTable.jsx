import Card from "components/card";
import React, { useMemo, useState } from "react";
import { useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";
import { dateFormatter } from "helper/utils";

const DevelopmentTable = ({ columnsData, tableData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newConsultant, setNewConsultant] = useState({
    kullaniciAdi: "",
    ad: "",
    soyad: "",
    mail: "",
    telefon: "",
    tarih: new Date().toISOString().split('T')[0]
  });

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    { columns, data },
    useGlobalFilter, useSortBy, usePagination
  );

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow, initialState } = tableInstance;
  initialState.pageSize = 11;

  const openModal = (index = null) => {
    if (index !== null) {
      setIsEditMode(true);
      setNewConsultant(tableData[index]);
    } else {
      setIsEditMode(false);
      setNewConsultant({
        kullaniciAdi: "",
        ad: "",
        soyad: "",
        mail: "",
        telefon: "",
        tarih: new Date().toISOString().split('T')[0]
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewConsultant({ ...newConsultant, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      // Danışanı düzenle
      // Örnek: dispatch(updateConsultant(newConsultant));
    } else {
      // Yeni danışanı ekle
      // Örnek: dispatch(addConsultant(newConsultant));
    }
    closeModal();
  };

  const handleDelete = (id) => {
    closeModal();
    alert("Silindi");
  };

  const renderCell = (cell) => {
    const cellData = {
      "NO": <p className="text-sm font-bold text-navy-700 dark:text-white">{cell.value}</p>,
      "KULLANICI": <p className="text-sm font-bold text-navy-700 dark:text-white">{cell.value}</p>,
      "AD": <p className="text-sm font-bold text-navy-700 dark:text-white">{cell.value}</p>,
      "SOYAD": <p className="text-sm font-bold text-navy-700 dark:text-white">{cell.value}</p>,
      "EMAIL": <p className="text-sm font-bold text-navy-700 dark:text-white">{cell.value}</p>,
      "TELEFON": <p className="text-sm font-bold text-navy-700 dark:text-white">{cell.value}</p>,
      "KAYIT TARİHİ": <p className="text-sm font-bold text-navy-700 dark:text-white">{dateFormatter(cell.value)}</p>
    };
    return cellData[cell.column.Header] || null;
  };

  const formFields = [
    { key: 'kullaniciAdi', label: 'Kullanıcı Adı' },
    { key: 'ad', label: 'Ad' },
    { key: 'soyad', label: 'Soyad' },
    { key: 'mail', label: 'Mail' },
    { key: 'telefon', label: 'Telefon' },
    { key: 'tarih', label: 'Kayıt Tarihi', type: 'date' }
  ];

  return (
    <Card extra={"w-full h-full p-4"}>
      <div className="relative flex items-center justify-between">
        <div className="text-xl font-bold text-navy-700 dark:text-white">Danışan Listesi</div>
        <button
          className="md:text-xl hover:cursor-pointer bg-navy-600 p-2 text-white hover:bg-navy-400 dark:bg-navy-600 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10 rounded-lg font-bold transition duration-200"
          onClick={() => openModal()}
        >
          Danışan Ekle
        </button>
      </div>

      <div className="h-full overflow-x-scroll xl:overflow-x-hidden">
        <table {...getTableProps()} className="mt-8 h-max w-full" variant="simple" color="gray-500" mb="24px">
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())} className="border-b border-gray-200 pb-[5px] text-start dark:!border-navy-700 " key={index}>
                    <div className="text-xs font-bold tracking-wide text-gray-600">{column.render("Header")}</div>
                  </th>
                ))}
                <th className="border-b border-gray-200 pb-[5px] text-start dark:!border-navy-700 ">
                  <button
                    className="text-xs font-bold tracking-wide text-gray-600"
                    onClick={() => openModal()}
                  >
                    Düzenle
                  </button>
                </th>
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, rowIndex) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={rowIndex}>
                  {row.cells.map((cell, index) => (
                    <td {...cell.getCellProps()} key={index} className="pt-[14px] pb-3 text-[14px]">
                      {renderCell(cell)}
                    </td>
                  ))}
                  <td className="pt-[14px] pb-3 text-[14px]">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={() => openModal(rowIndex)}>Düzenle</button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded focus:outline-none" onClick={() => handleDelete(newConsultant.id)}>Sil</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{isEditMode ? "Danışanı Düzenle" : "Danışanı Ekle"}</h2>
            <form onSubmit={handleSubmit}>
              {formFields.map((field) => (
                <div className="mb-4" key={field.key}>
                  <label className="block text-sm font-bold mb-1" htmlFor={field.key}>
                    {field.label}:
                  </label>
                  <input
                    className="border border-gray-300 rounded px-4 py-2 w-full focus"
                    type={field.type || "text"}
                    id={field.key}
                    name={field.key}
                    value={newConsultant[field.key]}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}
              <div className="flex justify-end">
                <button className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none" type="submit">
                  {isEditMode ? "Güncelle" : "Ekle"}
                </button>
                <button className="bg-gray-300 text-gray-700 px-4 py-2 ml-4 rounded focus:outline-none" onClick={closeModal}>İptal</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Card>
  );
};

export default DevelopmentTable;
