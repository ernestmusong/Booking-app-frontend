import './styles/App.css';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from 'components/home/Home';
import NavigationPanel from 'components/NavigationPanel';
import MyReservations from 'components/MyReservations';
import CarList from 'components/home/CarList';

const App = () => (
  <>
    <NavigationPanel />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="cars" element={<CarList />} />
      <Route path="reservations" element={<MyReservations />} />
    </Routes>
  </>
);
export default App;
