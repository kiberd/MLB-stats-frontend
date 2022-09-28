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
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => {
          const { key, ...restHeaderGroupProps } =
            headerGroup.getHeaderGroupProps();
          return (
            <tr key={key} {...restHeaderGroupProps}>
              {headerGroup.headers.map((column) => {
                const { key, ...restColumn } = column.getHeaderProps();
                return (
                  <th
                    key={key}
                    {...restColumn}
                    className="p-2 border border-black min-w-[80px] desktop:min-w-[60px]"
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
              {row.cells.map((cell) => {
                const value = cell.value;
                const { key, ...restCellProps } = cell.getCellProps();
                return (
                  <td
                    key={key}
                    {...restCellProps}
                    className="px-4 py-2 text-center text-gray-600 border border-black"
                  >
                    {/* {cell.render("Cell")} */}
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
          const { key, ...restFooterGroupProps } = footerGroup.getFooterGroupProps();

          return (
            // <tr key={key} {...footerGroup.getFooterGroupProps()}>
            <tr key={key} {...restFooterGroupProps}>
              {footerGroup.headers.map((column) => {
                const { key, ...restColumn } = column.getFooterProps();
                return (
                  <td key={key} {...column.getFooterProps} className="px-2 py-2 font-bold text-center text-gray-600 border border-black">{column.render("Footer")}</td>
                )
              }
              )}
            </tr>
          )

        }

        )}
      </tfoot>
    </table>
  );
};

export default StatTable;
