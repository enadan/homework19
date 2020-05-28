import React, { useState } from 'react'
import styled from 'styled-components'
import { useTable, useSortBy, useFilters } from 'react-table'


const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

function Table({ columns, data }) {

  const [filterInput, setFilterInput] = useState("");

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useSortBy
  )

  const handleFilterChange = e => {
    const value = e.target.value || undefined;
    setFilter("name", value);
    setFilterInput(value);
  };
  

  // We don't want to render all 2000 rows for this example, so cap
  // it at 20 for this use case
  const firstPageRows = rows.slice(0, 20)

  return (
    <>
      <input
      value={filterInput}
      onChange={handleFilterChange}
      placeholder={"Search name"}
      />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map(
            (row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    )
                  })}
                </tr>
              )}
          )}
        </tbody>
      </table>
    </>
  )
}

function App() {
   
  const data = [
    {
      name: 'Bill Gates',
      email: 'billgates@microsoft.com',
      age: 70,
      status: 'Active'
    },
    {
      name: 'Steve Jobs',
      email: 'steve@apple.com',
      age: 60,
      status: 'Inactive'
    },
    {
      name: 'Peter Parker',
      email: 'peterparker@marvel.com',
      age: 23,
      status: 'Active'
    },
    {
      name: 'Ironman',
      email: 'ironman@marvel.com',
      age: 50,
      status: 'Inactive'
    },
    {
      name: 'Ant Man',
      email: 'antman@marvel.com',
      age: 42,
      status: 'Active'
    },
    {
      name: 'Dr Strange',
      email: 'Strange@marvel.com',
      age: 34,
      status: 'Inactive'
    },                     
  ]

  const columns = [
    {
      Header: 'Name',
      accessor: 'name'
    }, {
      Header: 'Email',
      accessor: 'email'
    }, {
      Header: 'Age',
      accessor: 'age'
    }, {
      Header: 'Status',
      accessor: 'status'
    }
  ]

  return (
    <Styles>
      <Table columns={columns} data={data} />
    </Styles>
  )
}

export default App