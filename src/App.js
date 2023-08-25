import './App.css';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header.jsx';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="authorization">
            <Route path="login" element={<LoginForm />} />
            <Route path="registration" element={<RegistrationForm />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
