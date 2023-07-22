import './styles/App.css';
import {
  Route, Routes, useLocation, useNavigate,
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
import { useDispatch, useSelector } from 'react-redux';
import { getCars } from 'redux/cars/carsSlice';
import { useEffect } from 'react';
import Delete from 'components/Delete';
import WelcomePage from 'components/WelcomePage';
import { handleSession } from 'redux/session/sessionSlice';
import Default from 'components/Default';

const App = () => {
  const { isLoggedIn } = useSelector((store) => store.session);
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isSignUpPage = location.pathname === '/signup';
  const isRootPage = location.pathname === '/';
  const isDefault = location.pathname === '*';
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoginPage && !isSignUpPage && !isRootPage) {
      dispatch(getCars('CARS'));
    }
    if (isLoggedIn) {
      dispatch(handleSession());
    }
  }, [dispatch, isLoginPage, isSignUpPage, isRootPage, isLoggedIn, navigate]);
  const showNavigationPanel = !isLoginPage && !isSignUpPage && !isRootPage && !isDefault;

  return (
    <>
      {showNavigationPanel && <NavigationPanel />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="detail/:id" element={<DetailsContainer />} />
            <Route path="/my-reservations" element={<MyReservations />} />
            <Route path="/make-reservations" element={<ReservationForm />} />
            <Route path="add-car" element={<CarFrom />} />
            <Route path="/delete" element={<Delete />} />
          </>
        ) : (
          <>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </>
        )}
        <Route path="*" element={<Default />} />
      </Routes>
    </>
  );
};

export default App;
