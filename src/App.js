import { useState} from 'react';
import Header from "./components/Layout/Header";
import Coffees from "./components/Coffees/Coffees";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import AuthProvider from "./store/AuthProvider";

function App() {
    const [cartIsShown, setCartIsShown] = useState(false);

    const shownCartHandler = () => {
        setCartIsShown(true);
    };

    const hideCartHandler = () => {
        setCartIsShown(false);
    };

    return (
        <AuthProvider>
            <CartProvider>
                {cartIsShown && <Cart onClose={hideCartHandler}/>}
                <Header onShowCart={shownCartHandler}/>
                <main>
                    <Coffees/>
                </main>
            </CartProvider>
        </AuthProvider>
  );
}
export default App;