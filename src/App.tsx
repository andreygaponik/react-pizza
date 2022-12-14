import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Cart from './pages/Cart';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import FullPizza from './pages/FullPizza';

function App() {

  return (
    <div className="wrapper">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
