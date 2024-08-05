import axios from "axios";

const REST_API_BASE_URL = 'https://ems-backend-7cq3.onrender.com/api/employees';

export const listEmployees = () => axios.get(REST_API_BASE_URL)

export const createEmployee = (employee) => axios.post(REST_API_BASE_URL, employee)

export const getEmployee = (employeeId) => axios.get(REST_API_BASE_URL+'/'+employeeId)

export const updateEmployee = (employee) => axios.put(REST_API_BASE_URL+'/update', employee)

export const deleteEmployee = (employeeId) => axios.delete(REST_API_BASE_URL+'/'+employeeId)