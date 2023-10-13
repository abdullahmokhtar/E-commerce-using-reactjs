import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Cart from "./Components/Cart/Cart";
import Brands from "./Components/Brands/Brands";
import Categories from "./Components/Categories/Categories";
import Products from "./Components/Products/Products";
import NotFound from "./Components/NotFound/NotFound";
import AuthContextProvider from "./context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import AuthRoute from "./Components/ProtectedRoute/AuthRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "react-query";
import Address from "./Components/Address/Address";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { path: "", element: <Navigate to="home" /> },
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: (
          <AuthRoute>
            <Login />
          </AuthRoute>
        ),
      },
      {
        path: "register",
        element: (
          <AuthRoute>
            <Register />
          </AuthRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "address/:cartId",
        element: (
          <ProtectedRoute>
            <Address />
          </ProtectedRoute>
        ),
      },
      {
        path: "ProductDetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
