import Card from "components/card";
import React, { useMemo, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { dateFormatter } from "helper/utils";

const DevelopmentTable = ({ columnsData, tableData, Ekle, Guncelle, Sil }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newConsultant, setNewConsultant] = useState({
    user_id: "",
    k_adi: "",
    ad: "",
    soyad: "",
    e_posta: "",
    telf: "",
    heigth: "",
    giris_tarih: new Date().toISOString().split("T")[0],
  });

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    { columns, data },
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
      const currentUserId = tableData[index].user_id;
      const dateParts = tableData[index].giris_tarih.split("-");
      const formattedDate = `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`;
      setNewConsultant({
        ...tableData[index],
        giris_tarih: formattedDate,
      });
    } else {
      setIsEditMode(false);
      setNewConsultant({
        user_id: "",
        k_adi: "",
        ad: "",
        soyad: "",
        e_posta: "",
        telf: "",
        heigth: "",
        giris_tarih: new Date().toISOString().split("T")[0],
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
    const formData = {
      user_id: newConsultant.user_id,
      username: newConsultant.k_adi,
      name: newConsultant.ad,
      surname: newConsultant.soyad,
      mail: newConsultant.e_posta,
      password: "12345",
      phone: newConsultant.telf,
      heigth: newConsultant.heigth,
    };
    if (isEditMode) {
      console.log("güncellendi");
      console.log("newConsultant", newConsultant);
      Guncelle(formData);
    } else {
      console.log("eklendi");
      console.log("newConsultant", newConsultant);
      Ekle(formData);
    }
    closeModal();
  };

  const handleDelete = (user_id) => {
    Sil(user_id);
  };

  const renderCell = (cell) => {
    const cellData = {
      NO: (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {cell.value}
        </p>
      ),
      KULLANICI: (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {cell.value}
        </p>
      ),
      AD: (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {cell.value}
        </p>
      ),
      SOYAD: (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {cell.value}
        </p>
      ),
      EMAİL: (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {cell.value}
        </p>
      ),
      TELEFON: (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {cell.value}
        </p>
      ),
      "KAYIT TARİHİ": (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {dateFormatter(cell.value)}
        </p>
      ),
    };
    return cellData[cell.column.Header] || null;
  };

  const formFields = [
    { key: "k_adi", label: "Kullanıcı Adı" },
    { key: "ad", label: "Ad" },
    { key: "soyad", label: "Soyad" },
    { key: "e_posta", label: "E-Posta" },
    { key: "telf", label: "Telefon" },
    { key: "heigth", label: "Boy" },
  ];

  if (!isEditMode) {
    formFields.push({
      key: "giris_tarih",
      label: "Kayıt Tarihi",
      type: "date",
    });
  }

  return (
    <Card extra={"w-full h-full p-4"}>
      <div className="relative flex items-center justify-between">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Danışan Listesi
        </div>
        <button
          className="rounded-lg bg-navy-600 p-2 font-bold text-white transition duration-200 hover:cursor-pointer hover:bg-navy-400 dark:bg-navy-600 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10 md:text-xl"
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
                  <p className="text-center text-xs font-bold tracking-wide text-gray-600">
                    DÜZENLE
                  </p>
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
                    <td
                      {...cell.getCellProps()}
                      key={index}
                      className="pb-3 pt-[14px] text-[14px]"
                    >
                      {renderCell(cell)}
                    </td>
                  ))}
                  <td className="pb-3 pt-[14px] text-center text-[14px]">
                    <button
                      className="mr-2 rounded bg-blue-500 px-4 py-2 text-white"
                      onClick={() => openModal(rowIndex)}
                    >
                      Düzenle
                    </button>
                    <button
                      className="rounded bg-red-500 px-4 py-2 text-white focus:outline-none"
                      onClick={() => handleDelete(row.original.user_id)}
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold">
              {isEditMode ? "Danışanı Düzenle" : "Danışanı Ekle"}
            </h2>
            <form onSubmit={handleSubmit}>
              {formFields.map((field) => (
                <div className="mb-4" key={field.key}>
                  <label
                    className="mb-1 block text-sm font-bold"
                    htmlFor={field.key}
                  >
                    {field.label}:
                  </label>
                  <input
                    className="focus w-full rounded border border-gray-300 px-4 py-2"
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
                <button
                  className="rounded bg-blue-500 px-4 py-2 text-white focus:outline-none"
                  type="submit"
                >
                  {isEditMode ? "Güncelle" : "Ekle"}
                </button>
                <button
                  className="ml-4 rounded bg-gray-300 px-4 py-2 text-gray-700 focus:outline-none"
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
