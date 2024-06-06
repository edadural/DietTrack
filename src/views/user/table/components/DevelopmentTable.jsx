import React, { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import Card from "components/card";

const DevelopmentTable = ({ columnsData, tableData }) => {
  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 3 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    tableInstance;

  return (
    <Card extra="w-full h-full p-4">
      <div className="relative flex items-center justify-between">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Genel Bilgiler
        </div>
      </div>

      <div className="h-full overflow-x-scroll xl:overflow-x-hidden">
        <table
          {...getTableProps()}
          className="mt-8 h-max w-full border text-center"
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
                    className="border border-gray-200 bg-gray-50 p-3 text-center dark:!border-navy-700"
                    key={index}
                  >
                    <div className="text-xs font-bold tracking-wide text-gray-600">
                      {column.render("Header")}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return <TableRow key={index} row={row} />;
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

const TableRow = ({ row }) => {
  return (
    <tr className="border" {...row.getRowProps()}>
      {row.cells.map((cell, index) => (
        <TableCell key={index} cell={cell} />
      ))}
    </tr>
  );
};

const TableCell = ({ cell }) => {
  const renderContent = () => {
    return (
      <p className="text-sm font-bold text-navy-700 dark:text-white">
        {cell.value}
      </p>
    );
  };

  return (
    <td {...cell.getCellProps()} className="border pb-3 pt-[14px] text-[14px]">
      {renderContent()}
    </td>
  );
};

export default DevelopmentTable;
