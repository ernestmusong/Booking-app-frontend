import './styles/App.css';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from 'components/home/Home';
import NavigationPanel from 'components/NavigationPanel';
import MyReservations from 'components/MyReservations';
import CarList from 'components/home/CarList';
import Login from 'components/session/Login';
import SignUp from 'components/session/SignUp';
import CarFrom from 'components/forms/CarFrom';

const App = () => (
  <>
    <NavigationPanel />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="cars" element={<CarList />} />
      <Route path="reservations" element={<MyReservations />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="add-car" element={<CarFrom />} />
      <Route path="signup" element={<SignUp />} />
    </Routes>
  </>
);
export default App;
