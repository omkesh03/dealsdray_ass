import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import Dashboard from './component/Dashboard';
import EmployeeList from './component/EmployeeList';
import CreateEmployee from './component/CreateEmployee';
import EditEmployee from './component/EditEmployee';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/employee-list" element={<EmployeeList />} />
                <Route path='/create-employee' element={<CreateEmployee></CreateEmployee>}></Route>
                <Route path='/update/:id' element={<EditEmployee></EditEmployee>}></Route>
            </Routes>
        </Router>
    );
}

export default App;
