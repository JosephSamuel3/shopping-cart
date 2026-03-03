import { useState } from 'react';
import NavBar from "./components/Nav";

function App() {
  // example cart state for demonstration
  const [cartItems, setCartItems] = useState([]);

  return (
    <>
      <NavBar cartItems={cartItems} />
      {/* rest of your routes/components would go here */}
    </>
  );
}

export default App;
