import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import ItemDetailContainer from './components/ItemDetailContainer';
import History from './pages/History';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Cart from './pages/Cart';
import CheckoutForm from './components/CheckoutForm';
import OrderConfirmation from './pages/OrderConfirmation';
import { AlertProvider } from './context/AlertContext';
import AlertToast from './components/AlertToast';
import './App.css';

function App() {
  return (
    <AlertProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/productos" element={<ProductsPage />} />
              <Route path="/category/:categoryId" element={<ProductsPage />} />
              <Route path="/item/:id" element={<ItemDetailContainer />} />
              <Route path="/history" element={<History />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<CheckoutForm />} />
              <Route path="/order-confirmation/:code" element={<OrderConfirmation />} />
            </Routes>
          </main>
          <Footer />
          <AlertToast />
        </div>
      </Router>
    </AlertProvider>
  );
}

export default App;
