import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="authorization">
            <Route path="login" element={<LoginForm />} />
            <Route path="registration" element={<RegistrationForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
