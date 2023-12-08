import React from 'react'
import { useTable } from 'react-table'

function TableEmployees({columns, data}) {

    const{
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
      } = useTable({columns, data});
  
    return(
        <table {...getTableProps()} className='bg-white border w-[800px]'>
            <thead>
                {headerGroups.map(headerGroup =>
                    <tr {...headerGroup.getHeaderGroupProps()} >
                        {headerGroup.headers.map(column =>(
                            <th {...column.getHeaderProps()} className='p-2 border bg-redcolor'>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>)}
            </thead>  
            <tbody {...getTableBodyProps()} >
                {rows.map(row =>{
                    prepareRow(row);
                    return(
                        <tr {...row.getRowProps()} >
                            {row.cells.map(cell =>{
                                return(
                                    <td {...cell.getCellProps()} className='p-2 text-center border'>
                                        {cell.render('Cell')}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody> 
        </table>
    )
}

export default TableEmployees