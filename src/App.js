import './styles/App.css';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from 'components/home/Home';
import NavigationPanel from 'components/NavigationPanel';
import MyReservations from 'components/MyReservations';
import Login from 'components/session/Login';
import SignUp from 'components/session/SignUp';
import ReservationForm from 'components/ReservationForm';
import CarFrom from 'components/forms/CarFrom';
import DetailsContainer from 'components/DetailsContainer';
import { useDispatch } from 'react-redux';
import { getCars } from 'redux/cars/carsSlice';
import { useEffect } from 'react';
import WelcomePage from 'components/WelcomePage';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCars('CARS'));
  }, [dispatch]);
  return (
    <>
      <NavigationPanel />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="detail/:id" element={<DetailsContainer />} />
        <Route path="/reservations" element={<MyReservations />} />
        <Route path="/make-reservations" element={<ReservationForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<WelcomePage />} />
        <Route path="add-car" element={<CarFrom />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
};

export default App;
