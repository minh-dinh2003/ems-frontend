// api.js or a similar file
import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8080/api/employees';

// Function to handle logout
export const logout = () => {
  // Remove the token from localStorage
  localStorage.removeItem('authToken');

  // Optionally, you might want to perform additional actions like redirecting the user
  window.location.href = '/login'; // Redirect to login page
};

// Example of adding token to requests
const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    Authorization: token ? `Bearer ${token}` : '',
  };
};

// Rest of the API functions
export const listEmployees = () => axios.get(REST_API_BASE_URL, { headers: getAuthHeaders() });

export const createEmployee = (employee) => axios.post(REST_API_BASE_URL, employee, { headers: getAuthHeaders() });

export const getEmployee = (employeeId) => axios.get(`${REST_API_BASE_URL}/${employeeId}`, { headers: getAuthHeaders() });

export const updateEmployee = (employee) => axios.put(`${REST_API_BASE_URL}/update`, employee, { headers: getAuthHeaders() });

export const deleteEmployee = (employeeId) => axios.delete(`${REST_API_BASE_URL}/${employeeId}`, { headers: getAuthHeaders() });

