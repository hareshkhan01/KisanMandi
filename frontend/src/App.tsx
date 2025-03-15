import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./app/Navbar";
import Home from "./Pages/Home";
import Footer from "./app/Footer.js";
import { ThemeProvider } from "./components/theme-provider"
import Bidding from "./Pages/Bidding.js";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <BrowserRouter>
      <Navbar/>
      {/* <Home/> */}
      <Bidding/>
      <Footer/>
    </BrowserRouter>
    </ThemeProvider>
  );
}
