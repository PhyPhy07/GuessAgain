import React from 'react';
import { useTable } from 'react-table';

// Helper function to get the medal emoji
const getMedalEmoji = (rank) => {
  switch (rank) {
    case 1: return '🥇'; // Gold
    case 2: return '🥈'; // Silver
    case 3: return '🥉'; // Bronze
    default: return '';
  }
};

// Function to sort and add rankings with medals
const processDataWithMedals = (data) => {
  // Sort the data by Score in descending order
  const sortedData = [...data].sort((a, b) => b.Score - a.Score);

  // Add medals accounting for ties
  let lastScore = null;
  let lastRank = 0;
  let rank = 1;
  const dataWithMedals = sortedData.map((item, index) => {
    // Determine if a medal should be assigned
    if (item.Score === 0) {
      return {
        ...item,
        Medal: '', // No medal for score of 0
      };
    }

    if (item.Score !== lastScore) {
      lastRank = rank;
    }
    lastScore = item.Score;
    const medalRank = lastRank; // Use the rank from the lastScore

    // Increment rank for the next item
    rank += 1;

    return {
      ...item,
      Medal: getMedalEmoji(medalRank),
    };
  });

  return dataWithMedals;
};

function TableComponent({ data, handleDelete, handleDecrement, handleIncrement, isLoggedIn }) {
  // Process data to include medals
  const processedData = React.useMemo(() => processDataWithMedals(data), [data]);

  const columns = React.useMemo(
    () => [
     
      {
        Header: "Player",
        accessor: "Player",
      },
      {
        Header: "Score",
        accessor: "Score",
        Cell: ({ value, row }) => (
          <div>
            {value} {row.original.Medal}
            {isLoggedIn && (
              <>
                <button className="decrement-button" onClick={() => handleDecrement(row.original.Player)}>-</button>
                <button className="increment-button" onClick={() => handleIncrement(row.original.Player)}>+</button>
              </>
            )}
          </div>
        ),
      },
      ...(isLoggedIn ? [{
        Header: "Modify",
        accessor: "Modify",
        Cell: ({ row }) => (
          <button onClick={() => handleDelete(row.original.Player)}>Delete</button>
        ),
      }] : []),
    ],
    [isLoggedIn, handleDecrement, handleIncrement, handleDelete]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: processedData,
  });

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
}

export default TableComponent;
