import axios from 'axios';
import React from 'react';
import { useTable } from 'react-table';


function TableManageLeave({ columns, data }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });
    
    const handleApprover = async(employeeID, startDate)=>{
        try{
            const response = await axios.put(`http://localhost:4000/manage_leave/approve_leave/${employeeID}/${startDate}`,{}, {withCredentials: true })
            console.log(response.data)
            if(response.data.message==='Approved successfully'){
                alert('Approved successfully')
            }
        }
        catch(error){
            console.log(error)
        }
    }

    const handleDecline = async(employeeID, startDate) =>{
        try{
            const response = await axios.put(`http://localhost:4000/manage_leave/decline_leave/${employeeID}/${startDate}`, {}, {withCredentials: true })
            console.log(response.data)
            if(response.data.message==='Declined successfully'){
                alert('Declined successfully')
            }
        }
        catch(error){
            console.log(error)
        }   
    }
    return (
        <table {...getTableProps()} className='bg-white border w-[800px]'>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()} className='p-2 border bg-redcolor'>
                                {column.render('Header')}
                            </th>
                        ))}
                        <th className='p-2 border bg-redcolor'>Approve</th>
                        <th className='p-2 border bg-redcolor'>Decline</th>
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => (
                                <td {...cell.getCellProps()} className='p-2 text-center border'>
                                    {cell.render('Cell')}
                                </td>
                            ))}
                            <td className='border '>
                                <button className='p-1 text-center rounded-full bg-green' onClick={()=> handleApprover(row.original.employeeID, row.original.startDate)}>Approve</button>
                            </td>
                            <td className='border '>
                                <button className='p-1 text-center rounded-full bg-redcolor' onClick={()=> handleDecline(row.original.employeeID, row.original.startDate)}>Decline</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default TableManageLeave
