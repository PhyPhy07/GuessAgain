// TableComponent.jsx
import React from 'react';
import { useTable } from 'react-table';

function TableComponent({ data, handleDelete, handleDecrement, handleIncrement }) { // Receive data and handleDelete as props
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Player",
        accessor: "Player",
      },
   {
  Header: "Score",
  accessor: "Score",
  Cell: ({ value, row }) => ( // Access the row object
    <div> 
     {value}

<button className="decrement-button" onClick={() => handleDecrement(row.original.Player)}>-</button>

<button className="increment-button" onClick={() => handleIncrement(row.original.Player)}>+</button>
    </div>
  ),
},
     {
  Header: "Modify",
  accessor: "Modify",
  Cell: ({ row }) => ( // Access the row object
    <button onClick={() => handleDelete(row.original.Player)}>Delete</button>
  ),
},
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <div className="table-container">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;