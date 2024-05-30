import React, { useEffect, useState } from 'react'
import {
  columnsDataDevelopment,
} from "./variables/columnsData";
import DevelopmentTable from "./components/DevelopmentTable";
import { appAxios } from 'helper/appAxios';

const Tables = () => {
  const [datas, setDatas] = useState([])

  useEffect(() => {
    appAxios
      .post("user/user-get", {})
      .then(async (response) => {
        if (response.data.status) {
          setDatas(response.data.data)
        }
      })
      .catch((err) => { });
  }, [])

  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1">
        <DevelopmentTable
          columnsData={columnsDataDevelopment}
          tableData={datas}
        />
      </div>

    </div>
  );
};

export default Tables;
