import './styles/App.css';
import {
  Route, Routes, useLocation,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from 'components/home/Home';
import NavigationPanel from 'components/NavigationPanel';
import MyReservations from 'components/my-reservations/MyReservations';
import Login from 'components/session/Login';
import SignUp from 'components/session/SignUp';
import ReservationForm from 'components/ReservationForm';
import CarFrom from 'components/forms/CarFrom';
import DetailsContainer from 'components/DetailsContainer';
import { useDispatch } from 'react-redux';
import { getCars } from 'redux/cars/carsSlice';
import { useEffect } from 'react';
import Delete from 'components/Delete';
import WelcomePage from 'components/WelcomePage';

const App = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isSignUpPage = location.pathname === '/signup';
  const isRootPage = location.pathname === '/';
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isLoginPage && !isSignUpPage && !isRootPage) {
      dispatch(getCars('CARS'));
    }
  }, [dispatch, isLoginPage, isSignUpPage, isRootPage]);
  return (
    <>
      {!isLoginPage && !isSignUpPage && <NavigationPanel />}
      <Routes>
        <>
          <Route path="/home" element={<Home />} />
          <Route path="detail/:id" element={<DetailsContainer />} />
          <Route path="/my-reservations" element={<MyReservations />} />
          <Route path="/make-reservations" element={<ReservationForm />} />
          <Route path="add-car" element={<CarFrom />} />
          <Route path="/delete-car" element={<Delete />} />
        </>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
