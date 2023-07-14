import './styles/App.css';
import { Route, Routes } from 'react-router-dom';
import Home from 'components/Home';
import Footer from 'components/Footer';
import NavigationPanel from 'components/NavigationPanel';
import MyReservations from 'components/MyReservations';

const App = () => (
  <>
    <NavigationPanel />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="reservations" element={<MyReservations />} />
    </Routes>
    <Footer />
  </>
);
export default App;
