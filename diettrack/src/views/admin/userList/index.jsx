import React, { useEffect, useState } from "react";
import { columnsDataDevelopment } from "./variables/columnsData";
import DevelopmentTable from "./components/DevelopmentTable";
import { appAxios } from "helper/appAxios";
import { showLoad } from "helper/swal";
import { swalQuestion } from "helper/swal";

const Tables = () => {
  const [datas, setDatas] = useState([]);
  const [users, setUsers] = useState([]);

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
          const data = response.data.data;
          console.log("data",data);
          const newUser = {
            user_id: data.user_id,
            k_adi: data.username,
            ad: data.name,
            soyad: data.surname,
            e_posta: data.mail,
            telf: data.phone,
            heigth: data.heigth,
            giris_tarih: data.giris_tarih,
          };
          console.log(newUser);
          setDatas((el) => [...el, newUser]);
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
          const data = response.data.data;

          const updatedUser = {
            user_id: data.user_id,
            k_adi: data.username,
            ad: data.name,
            soyad: data.surname,
            e_posta: data.mail,
            telf: data.phone,
            heigth: data.heigth,
            giris_tarih: data.giris_tarih,
          };

          setDatas((prevDatas) =>
            prevDatas.map((user) =>
              user.user_id === updatedUser.user_id ? updatedUser : user
            )
          );
        }
      })
      .catch((err) => {});
  };
console.log(users);
  const Sil = (user_id) => {
    showLoad();
    swalQuestion(() => {
      appAxios
        .post("user/user-delete", { user_id })
        .then(async (response) => {
          if (response.data.status) {
            const aa = datas.filter((user) => user.user_id !== user_id);
            console.log(aa);
            setDatas(datas.filter((user) => user.user_id !== user_id));
          }
        })
        .catch((err) => {
          console.error("Kullanıcı silinemedi:", err);
        });
    });
  };

  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1">
        <DevelopmentTable
          columnsData={columnsDataDevelopment}
          tableData={datas}
          Ekle={Ekle}
          Guncelle={Guncelle}
          Sil={Sil}
        />
      </div>
    </div>
  );
};

export default Tables;
