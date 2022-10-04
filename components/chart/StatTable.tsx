import React from "react";
import { useTable } from "react-table";

interface StatTableProps {
  columns: any;
  data: any;
}

const StatTable: React.FC<StatTableProps> = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <table {...getTableProps()} className="">
      <thead className="">
        {headerGroups.map((headerGroup) => {
          const { key, ...restHeaderGroupProps } =
            headerGroup.getHeaderGroupProps();
          return (
            <tr
              key={key}
              {...restHeaderGroupProps}
              className="sticky top-0 left-0 z-10 bg-slate-300"
            >
              {headerGroup.headers.map((column, index) => {
                const { key, ...restColumn } = column.getHeaderProps();
                return (
                  <th
                    key={key}
                    {...restColumn}
                    className={`p-2 min-w-[80px] desktop:min-w-[60px] ${
                      index === 0
                        ? "font-bold sticky left-0 top-0 bg-slate-400 border-r border-b border-black"
                        : " border-r border-black"
                    }`}
                  >
                    {column.render("Header")}
                  </th>
                );
              })}
            </tr>
          );
        })}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          const { key, ...restRowProps } = row.getRowProps();
          return (
            <tr key={key} {...restRowProps}>
              {row.cells.map((cell, index) => {
                const value = cell.value;
                const { key, ...restCellProps } = cell.getCellProps();
                return (
                  <td
                    key={key}
                    {...restCellProps}
                    className={`px-4 py-2 text-center text-gray-600 ${
                      index === 0
                        ? "font-bold sticky left-0 bg-slate-200 border-r border-b border-black"
                        : "border border-black"
                    }`}
                  >
                    {value ? value : "-"}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>

      <tfoot>
        {footerGroups.map((footerGroup) => {
          const { key, ...restFooterGroupProps } =
            footerGroup.getFooterGroupProps();

          return (
            // <tr key={key} {...footerGroup.getFooterGroupProps()}>
            <tr key={key} {...restFooterGroupProps}>
              {footerGroup.headers.map((column, index) => {
                const { key, ...restColumn } = column.getFooterProps();
                return (
                  <td
                    key={key}
                    {...column.getFooterProps}
                    className={`px-2 py-2 font-bold text-center text-gray-600 ${
                      index === 0
                        ? "font-bold sticky left-0 bg-slate-200 border-r border-t border-b border-black"
                        : "border border-black"
                    }`}
                  >
                    {column.render("Footer")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tfoot>
    </table>
  );
};

export default StatTable;
