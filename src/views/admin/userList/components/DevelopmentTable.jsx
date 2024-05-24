import Card from "components/card";

import React, { useMemo, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import Progress from "components/progress";

const DevelopmentTable = (props) => {
  const { columnsData, tableData } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editConsultantIndex, setEditConsultantIndex] = useState(null);
  const [newConsultant, setNewConsultant] = useState({
    name: "",
    date: "",
    progress: 0,
  });

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 11;

  const openModal = (index = null) => {
    if (index !== null) {
      setIsEditMode(true);
      setEditConsultantIndex(index);
      setNewConsultant(tableData[index]);
    } else {
      setIsEditMode(false);
      setNewConsultant({
        name: "",
        date: "",
        progress: 0,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditConsultantIndex(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewConsultant({ ...newConsultant, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      // Danışanı düzenle
      // Örnek: dispatch(updateConsultant(editConsultantIndex, newConsultant));
    } else {
      // Yeni danışanı ekle
      // Örnek: dispatch(addConsultant(newConsultant));
    }
    closeModal();
  };

  const handleDelete = (id) => {
    // Danışanı silme işlemi
    // Örnek: dispatch(deleteConsultant(id));
    closeModal();
    alert("Silindi");
  };


  return (
    <Card extra={"w-full h-full p-4"}>
      <div className="relative flex items-center justify-between">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Danışan Listesi
        </div>
        <button
          className={`flex items-center text-xl hover:cursor-pointer bg-lightPrimary p-2 text-brand-500 hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10" 
          } linear justify-center rounded-lg font-bold transition duration-200`}
          onClick={() => openModal()}
        >
          Danışan Ekle
        </button>
      </div>

      <div className="h-full overflow-x-scroll xl:overflow-x-hidden">
        <table
          {...getTableProps()}
          className="mt-8 h-max w-full"
          variant="simple"
          color="gray-500"
          mb="24px"
        >
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="border-b border-gray-200 pb-[5px] text-start dark:!border-navy-700 "
                    key={index}
                  >
                    <div className="text-xs font-bold tracking-wide text-gray-600">
                      {column.render("Header")}
                    </div>
                  </th>
                ))}
                <th className="border-b border-gray-200 pb-[5px] text-start dark:!border-navy-700 ">
                  <div className="text-xs font-bold tracking-wide text-gray-600">Düzenle</div>
                </th>
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, rowIndex) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={rowIndex}>
                  {row.cells.map((cell, index) => {
                    let data = "";
                    if (cell.column.Header === "KULLANICI") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "EMAIL") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "PASSWORD") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "TELEFON NUMARASI") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "KAYIT TARİHİ") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "PROGRESS") {
                      data = (
                        <div className="flex items-center gap-3">
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {cell.value}%
                          </p>
                          <Progress width="w-[68px]" value={cell.value} />
                        </div>
                      );
                    }
                    return (
                      <td
                        {...cell.getCellProps()}
                        key={index}
                        className="pt-[14px] pb-3 text-[14px]"
                      >
                        {data}
                      </td>
                    );
                  })}
                  <td className="pt-[14px] pb-3 text-[14px]">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                      onClick={() => openModal(rowIndex)}
                    >
                      Düzenle
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded focus:outline-none"
                      type="button"
                      onClick={() => handleDelete(newConsultant.id)}
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Danışan Ekleme/Düzenleme Modalı */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{isEditMode ? "Danışan Düzenle" : "Danışan Ekle"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-1" htmlFor="name">
                  İsim:
                </label>
                <input
                  className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                  type="text"
                  id="name"
                  name="name"
                  value={newConsultant.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-1" htmlFor="date">
                  Tarih:
                </label>
                <input
                  className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                  type="date"
                  id="date"
                  name="date"
                  value={newConsultant.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-1" htmlFor="progress">
                  İlerleme:
                </label>
                <input
                  className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                  type="number"
                  id="progress"
                  name="progress"
                  value={newConsultant.progress}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none"
                  type="submit"
                >
                  {isEditMode ? "Güncelle" : "Ekle"}
                </button>
                <button
                  className="bg-gray-300 text-gray-700 px-4 py-2 ml-4 rounded focus:outline-none"
                  onClick={closeModal}
                >
                  İptal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </Card>
  );
};

export default DevelopmentTable;
