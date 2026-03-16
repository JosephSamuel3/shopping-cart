import { CartProvider } from './context/CartContext';
import NavBar from "./components/Nav";
import Routes from './Routes';

function App() {
  return (
    <CartProvider>
      <NavBar />
      <Routes />
    </CartProvider>
  );
}

export default App;
