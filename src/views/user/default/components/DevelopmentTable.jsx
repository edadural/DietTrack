import React, { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import Card from "components/card";

const DevelopmentTable = ({ tableData }) => {
  const columns = useMemo(
    () => [
      { Header: "Ağırlık", accessor: "agirlik" },
      { Header: "Yağ", accessor: "yag" },
      { Header: "Yağsız", accessor: "yagsiz" },
      { Header: "Sıvı", accessor: "sivi" },
    ],
    []
  );

  const data = useMemo(() => tableData.slice(-3).reverse(), [tableData]);

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
          {data.length > 0 ? (
            <tbody {...getTableBodyProps()}>
              {page.map((row, rowIndex) => {
                prepareRow(row);
                const { key, ...rowProps } = row.getRowProps();
                return (
                  <tr className="border" key={key} {...rowProps}>
                    {row.cells.map((cell, cellIndex) => {
                      const { key, ...cellProps } = cell.getCellProps();
                      return (
                        <td
                          key={key}
                          {...cellProps}
                          className="border pb-3 pt-[14px] text-[14px]"
                        >
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {cell.value}
                          </p>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td
                  className="border py-3 text-center"
                  colSpan={columns.length}
                >
                  Veri yok
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </Card>
  );
};

export default DevelopmentTable;
