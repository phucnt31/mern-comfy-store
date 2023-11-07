import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  About,
  Cart,
  Checkout,
  Error,
  HomeLayout,
  Landing,
  Login,
  Orders,
  Products,
  Register,
  SingleProduct,
} from "./pages";
import { ErrorElement } from "./components";
import { store } from "./store";

// loader
import { landingLoader } from "./pages/Landing";
import { singleProductLoader } from "./pages/SingleProduct";
import { productsLoader } from "./pages/Products";

// action
import { registerAction } from "./pages/Register";
import { loginAction } from "./pages/Login";
import { checkoutLoader } from "./pages/Checkout";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Landing />,
          errorElement: <ErrorElement />,
          loader: landingLoader,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/products",
          element: <Products />,
          errorElement: <ErrorElement />,
          loader: productsLoader,
        },
        {
          path: "/products/:id",
          element: <SingleProduct />,
          errorElement: <ErrorElement />,
          loader: singleProductLoader,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/checkout",
          element: <Checkout />,
          loader: checkoutLoader(store),
        },
        {
          path: "/orders",
          element: <Orders />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
      errorElement: <Error />,
      action: loginAction(store),
    },
    {
      path: "/register",
      element: <Register />,
      errorElement: <Error />,
      action: registerAction,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
