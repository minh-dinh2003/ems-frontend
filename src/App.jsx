import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import EmployeeComponent from './components/EmployeeComponent';
import LoginComponent from './components/LoginComponent';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <HeaderComponent />
      <Routes>
        <Route path='/login' element={<LoginComponent />} />
        <Route path='/' element={<ProtectedRoute element={<ListEmployeeComponent />} />} />
        <Route path='/employees' element={<ProtectedRoute element={<ListEmployeeComponent />} />} />
        <Route path='/add-employee' element={<ProtectedRoute element={<EmployeeComponent />} />} />
        <Route path='/update' element={<ProtectedRoute element={<EmployeeComponent />} />} />
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;

