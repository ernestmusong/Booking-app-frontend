import './styles/App.css';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from 'components/home/Home';
import NavigationPanel from 'components/NavigationPanel';
import MyReservations from 'components/MyReservations';
import CarList from 'components/home/CarList';
import Login from 'components/session/Login';
import SignUp from 'components/session/SignUp';
import ReservationForm from 'components/ReservationForm';
import { useDispatch } from 'react-redux';
import { getCars } from 'redux/cars/carsSlice';
import { useEffect } from 'react';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCars('CARS'));
  }, [dispatch]);
  return (
    <>
      <NavigationPanel />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<CarList />} />
        <Route path="/reservations" element={<MyReservations />} />
        <Route path="/make-reservations" element={<ReservationForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
};
export default App;
