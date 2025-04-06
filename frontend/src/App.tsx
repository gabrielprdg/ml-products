// App.tsx
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ProductDetails from './pages/ProductDetails';
import Home from './Home';
import './index.css';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
