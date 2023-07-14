import './styles/App.css';
import { Route, Routes } from 'react-router-dom';
import Home from 'components/Home';
import NavigationPanel from 'components/NavigationPanel';
import MyReservations from 'components/MyReservations';
import Login from 'components/session/Login';
import SignUp from 'components/session/SignUp';

const App = () => (
  <>
    <NavigationPanel />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="reservations" element={<MyReservations />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
    </Routes>
  </>
);
export default App;
