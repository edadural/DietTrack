
import {
  columnsDataDevelopment,
} from "./variables/columnsData";
import tableDataDevelopment from "./variables/tableDataDevelopment.json";
import DevelopmentTable from "./components/DevelopmentTable";

const Tables = () => {
  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1">
        <DevelopmentTable
          columnsData={columnsDataDevelopment}
          tableData={tableDataDevelopment}
        />
      </div>

    </div>
  );
};

export default Tables;
