import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AlertProvider } from './context/AlertContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AlertToast from './components/AlertToast';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import Cart from './pages/Cart';
import History from './pages/History';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import ItemDetailContainer from './components/ItemDetailContainer';
import CheckoutForm from './components/CheckoutForm';
import OrderConfirmation from './pages/OrderConfirmation';
import OrderTracking from './pages/OrderTracking';
import './App.css';

function App() {
  return (
    <AlertProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/category/:categoryId" element={<ProductsPage />} />
                <Route path="/item/:id" element={<ItemDetailContainer />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<CheckoutForm />} />
                <Route path="/order-confirmation/:code" element={<OrderConfirmation />} />
                <Route path="/tracking" element={<OrderTracking />} />
                <Route path="/tracking/:code" element={<OrderTracking />} />
                <Route path="/history" element={<History />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
            <Footer />
            <AlertToast />
          </div>
        </Router>
      </CartProvider>
    </AlertProvider>
  );
}

export default App;
