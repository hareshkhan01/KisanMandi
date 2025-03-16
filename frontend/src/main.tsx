import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Home from "./Pages/Home";
import { ThemeProvider } from "./components/theme-provider"
import Navbar from "./app/Navbar";
import Footer from "./app/Footer.js";
import Bidding from "./Pages/Bidding.js";
import Register from './app/register.js';
import CreateAuctionForm from "./app/create-auction-form.js";
import './index.css'

// Create a new QueryClient instance
const queryClient = new QueryClient();

// Create a Layout component that includes Navbar and Footer
const Layout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

// Modify router to use the Layout component
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "bidding",
        element: <Bidding />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "create-bid",
        element: <CreateAuctionForm />,
      },
    ],
  },
]);

// Ensure the root element exists in the HTML file and matches this ID
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Root element with id 'root' not found. Please check your HTML file.");
}

createRoot(rootElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);