import React, { useEffect, useState } from "react";
import { columnsDataDevelopment } from "./variables/columnsData";
import DevelopmentTable from "./components/DevelopmentTable";
import { appAxios } from "helper/appAxios";
import { showLoad } from "helper/swal";

const Tables = () => {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    appAxios
      .post("user/user-get", {})
      .then(async (response) => {
        if (response.data.status) {
          setDatas(response.data.data);
        }
      })
      .catch((err) => {});
  }, []);

  const Ekle = (formData) => {
    showLoad();
    appAxios
      .post("user/user-add", formData)
      .then(async (response) => {
        if (response.data.status) {
          // swalClose();
        }
      })
      .catch((err) => {});
  };

  const Guncelle = (formData) => {
    showLoad();
    appAxios
      .post("user/user-update", formData)
      .then(async (response) => {
        if (response.data.status) {
          console.log("güncelle");
        }
      })
      .catch((err) => {});
  };

  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1">
        <DevelopmentTable
          columnsData={columnsDataDevelopment}
          tableData={datas}
          Ekle={Ekle}
          Guncelle={Guncelle}
        />
      </div>
    </div>
  );
};

export default Tables;
