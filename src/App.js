import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Pages/Login.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer /> 

    </div>



  );
}

export default App;
