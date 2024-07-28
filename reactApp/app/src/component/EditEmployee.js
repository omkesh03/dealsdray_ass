import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Heading from './Heading';
import '../App.css';

const EditEmployee = () => {
  const { id } = useParams();
  const [employeeData, setEmployeeData] = useState(null);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isMobileValid, setIsMobileValid] = useState(true);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/getEmployee/${id}`);
        if (response.ok) {
          const data = await response.json();
          setEmployeeData(data);
        } else {
          console.error('Failed to fetch employee data');
        }
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployeeData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });

    
    if (name === 'f_Email') {
      validateEmail(value);
    }

    if (name === 'f_Mobile') {
      validateMobile(value);
    }
    
  };

  const validateEmail = (email) => {
    const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    setIsEmailValid(emailPattern.test(email));
  };

  const validateMobile = (mobile) => {
    const mobilePattern = /^[0-9]{10}$/;
    setIsMobileValid(mobilePattern.test(mobile));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEmailValid || !isMobileValid) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:3001/updateEmployee/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(employeeData)
      });
      if (response.ok) {
        alert('Employee data updated successfully');
        // Redirect to employee list or show success message
      } else {
        alert('Failed to update employee data');
      }
    } catch (error) {
      alert('Error updating employee data:', error);
    }
  };

  return (
    <>
      <div>
        <Heading></Heading>
      </div>
      <div className='yellow-strip'>
        <p>Edit Employee Details</p>
      </div>
      <div className='employee-form-container'>
        {employeeData && (
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label>ID:</label>
              <input type='text' value={employeeData.f_Id} disabled />
            </div>
            <div className='form-group'>
              <label>Name:</label>
              <input type='text' name='f_Name' value={employeeData.f_Name} onChange={handleChange} required />
            </div>
            <div className='form-group'>
              <label>Email:</label>
              <input type='email' name='f_Email' value={employeeData.f_Email} onChange={handleChange} required />
              {!isEmailValid && (
                <p className='error-message'>Please enter a valid email address</p>
              )}
            </div>
            <div className='form-group'>
              <label>Mobile:</label>
              <input type='text' name='f_Mobile' value={employeeData.f_Mobile} onChange={handleChange} required />
              {!isMobileValid && (
                <p className='error-message'>Please enter a valid 10-digit mobile number</p>
              )}
            </div>
            <div className='form-group'>
              <label>Designation:</label>
              <select name='f_Designation' value={employeeData.f_Designation} onChange={handleChange} required>
                <option value=''>Select Designation</option>
                <option value='HR'>HR</option>
                <option value='Manager'>Manager</option>
                <option value='Sales'>Sales</option>
              </select>
            </div>
            <div className='form-group'>
              <label>Gender:</label>
              <div>
                <label>
                  <input type='radio' name='f_gender' value='male' onChange={handleChange} checked={employeeData.f_gender === 'male'} required />
                  Male
                </label>
                <label>
                  <input type='radio' name='f_gender' value='female' onChange={handleChange} checked={employeeData.f_gender === 'female'} required />
                  Female
                </label>
              </div>
            </div>
            <div className='form-group'>
              <label>Courses:</label>
              <div>
                <label>
                  <input type='checkbox' name='f_Course' value='MCA' onChange={handleChange} checked={employeeData.f_Course.includes('MCA')} />
                  MCA
                </label>
              </div>
              <div>
                <label>
                  <input type='checkbox' name='f_Course' value='BCA' onChange={handleChange} checked={employeeData.f_Course.includes('BCA')} />
                  BCA
                </label>
              </div>
              <div>
                <label>
                  <input type='checkbox' name='f_Course' value='BSC' onChange={handleChange} checked={employeeData.f_Course.includes('BSC')} />
                  BSC
                </label>
              </div>
            </div>
            <div className='form-group'>
              <label>Image:</label>
              <input type='file' name='f_Image' onChange={handleChange} />
            </div>
            <button type='submit'>Update</button>
          </form>
        )}
      </div>
    </>
  );
};

export default EditEmployee;
