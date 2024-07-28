import React, { useState } from 'react';
import '../App.css';
import Heading from './Heading';

function CreateEmployee() {
  const [formData, setFormData] = useState({
    f_Name: '',
    f_Email: '',
    f_Mobile: '',
    f_Designation: '', 
    f_gender: '', 
    f_Course: [],
    f_Image: null 
  });

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isMobileValid, setIsMobileValid] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'f_Email') {
      validateEmail(value);
    } else if (name === 'f_Mobile') {
      validateMobile(value);
    }
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    setIsEmailValid(emailPattern.test(email));
  };

  const validateMobile = (mobile) => {
    const mobilePattern = /^[0-9]{10}$/; 
    setIsMobileValid(mobilePattern.test(mobile));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevFormData) => {
      if (checked) {
        return { ...prevFormData, [name]: [...prevFormData[name], e.target.value] };
      } else {
        return { ...prevFormData, [name]: prevFormData[name].filter((course) => course !== e.target.value) };
      }
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, f_Image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) {
      return;
    }
    const formDataToSend = new FormData();
    for (let key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await fetch('http://localhost:3001/addEmployee', {
        method: 'POST',
        body: formDataToSend
      });
      if (response.ok) {
        alert('Employee added successfully!');
      } else {
        alert('Failed to add employee');
      }
    } catch (error) {
      console.error('Error adding employee:', error);
      alert('Error adding employee');
    }
  };

  const validateForm = () => {
    if (!formData.f_Name || !formData.f_Email || !formData.f_Mobile || !formData.f_Designation || !formData.f_gender || formData.f_Course.length === 0 || !formData.f_Image) {
      alert('Please fill in all required fields');
      return false;
    }
    const mobilePattern = /^[0-9]{10}$/; 
    if (!mobilePattern.test(formData.f_Mobile)) {
      alert('Please enter a valid 10-digit mobile number');
      return false;
    }
    if (!isEmailValid) {
      alert('Please enter a valid email address');
      return false;
    }
    return true;
  };

  return (
    <>
      <div>
        <Heading></Heading>
      </div>
      <div className='yellow-strip'>
        <p>Create New Employee</p>
      </div>
      <div className="employee-form-container">
        <h2>Add Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name: <span className="required">*</span></label>
            <input type="text" name="f_Name" value={formData.f_Name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Email: <span className="required">*</span></label>
            <input type="email" name="f_Email" value={formData.f_Email} onChange={handleChange} />
            {formData.f_Email && !isEmailValid && (
              <p className="error-message">Please enter a valid email address</p>
            )}
          </div>
          <div className="form-group">
            <label>Mobile: <span className="required">*</span></label>
            <input type="text" name="f_Mobile" value={formData.f_Mobile} onChange={handleChange} />
            {formData.f_Mobile && !isMobileValid && (
              <p className="error-message">Please enter a valid 10-digit mobile number</p>
            )}
          </div>
          <div className="form-group">
            <label>Designation: <span className="required">*</span></label>
            <select name="f_Designation" value={formData.f_Designation} onChange={handleChange}>
              <option value="">Select Designation</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </div>
          <div className="form-group">
            <label>Gender: <span className="required">*</span></label>
            <div>
              <label>
                <input type="radio" name="f_gender" value="male" onChange={handleChange} checked={formData.f_gender === 'male'} />
                Male
              </label>
              <label>
                <input type="radio" name="f_gender" value="female" onChange={handleChange} checked={formData.f_gender === 'female'} />
                Female
              </label>
            </div>
          </div>
          <div className="form-group">
            <label>Courses:</label>
            <div>
              <label>
                <input type="checkbox" name="f_Course" value="MCA" onChange={handleCheckboxChange} checked={formData.f_Course.includes('MCA')} />
                MCA
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" name="f_Course" value="BCA" onChange={handleCheckboxChange} checked={formData.f_Course.includes('BCA')} />
                BCA
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" name="f_Course" value="BSC" onChange={handleCheckboxChange} checked={formData.f_Course.includes('BSC')} />
                BSC
              </label>
            </div>
            
          </div>
          <div className="form-group">
            <label>Image: <span className="required">*</span></label>
            <input type="file" name="f_Image" accept='.jpg,.png' onChange={handleFileChange} />
          </div>
          <button type="submit">Add Employee</button>
        </form>
      </div>
    </>
  );
}

export default CreateEmployee;
