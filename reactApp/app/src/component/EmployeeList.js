import React from 'react'
import { Link } from 'react-router-dom'
import EmployeeTable from './EmployeeTable'
import SearchEmployee from './SearchEmployee'
import Heading from './Heading'


function EmployeeList() {
  return (
    <div>
        <div>
        <Heading></Heading>
    </div>
        <div className='yellow-strip'>
        <Link to="/create-employee">Create Employee</Link>
        </div>
        <SearchEmployee></SearchEmployee>
        <EmployeeTable></EmployeeTable>
        
        
    </div>
  )
}

export default EmployeeList