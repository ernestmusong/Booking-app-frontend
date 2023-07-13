import { Route, Routes } from 'react-router-dom';
import Layout from 'components/Layout';
import Home from 'components/Home';
import Footer from 'components/Footer';

const App = () => (
  <>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
    <Footer />
  </>
);
export default App;
