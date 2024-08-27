import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./Components/Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Products from "./Components/Products/Products";
import Cart from "./Components/Cart/Cart";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import LayOut from "./Components/LayOut/LayOut";
import NotFound from "./Components/NotFound/NotFound";
import UserContextProvider from "./Context/UserContext/UserContext";
import CartContextProvider from "./Context/CartContext/CartContext";
//import WishListProvider from "./Context/WishListContext/WishListContext";
import WishListContextProvider from "./Context/WishListContext/WishListContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import toast, { Toaster } from "react-hot-toast";
import CheckOut from "./Components/CheckOut/CheckOut";
import AllOrders from "./Components/AllOrders/AllOrders";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import VerifyCode from "./Components/verifyCode/verifyCode";
import WishList from "./Components/WishList/WishList";
const x = createBrowserRouter([
  {
    path: "",
    element: <LayOut />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "Products",
        element: (
          <ProtectedRoute>
            <Products />
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
      {
        path: "Cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      {
        path: "Categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "Brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout/:cartId",
        element: (
          <ProtectedRoute>
            <CheckOut />
          </ProtectedRoute>
        ),
      },
      { path: "Login", element: <Login /> },
      { path: "ForgetPassword", element: <ForgetPassword /> },
      { path: "VerifyCode", element: <VerifyCode /> },
      { path: "Register", element: <Register /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const myClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      retry: (counter, err) => {
        if (counter > 5) {
          return false;
        }
        return confirm("Again");
      },
    },
  },
});

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Toaster
        toastOptions={{
          success: {
            style: { backgroundColor: "green", color: "white" },
            position: "top-right",
          },
          error: {
            style: { backgroundColor: "red", color: "white" },
            position: "top-right",
          },
        }}
      />

      <QueryClientProvider client={myClient}>
        <UserContextProvider>
          <CartContextProvider>
            <WishListContextProvider>
              <RouterProvider router={x} />
            </WishListContextProvider>
          </CartContextProvider>
        </UserContextProvider>

        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;
