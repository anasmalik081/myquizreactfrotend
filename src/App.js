import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Contact from './components/Pages/Contact';
import Home from './components/Pages/Home';
import Layout from "./components/Pages/Layout";
import LoginRegister from './components/Pages/LoginRegister';
import Dashboard from './components/Pages/Dashboard';
import PasswordReset from './components/Pages/Send_password_reset_email';
import ResetPassword from './components/Pages/Reset_Password';
import Quiz from './components/Pages/Quiz';
import ExamRegister from './components/Pages/ExamRegister';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} /> 
            <Route path="contact" element={<Contact />} /> 
            <Route path="loginregister" element={<LoginRegister />} />
            <Route path="passwordreset" element={<PasswordReset />} />
            <Route path="api/password-reset-confirm/:uid/:token/" element={<ResetPassword />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="register_exam" element={<ExamRegister />} />
          </Route>
          <Route path='/quiz' element={<Quiz />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
