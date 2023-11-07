## Information

- Complete Project: https://react-vite-comfy-store.netlify.app
- API DOCS: https://documenter.getpostman.com/view/18152321/2s9Xy5KpTi

## Setup Tailwind

[Tailwind Docs](https://tailwindcss.com/docs/guides/vite)

- add tailwind

```sh
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

tailwind.config.cjs

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

- Add the Tailwind directives to your CSS

index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Tailwind directives are instructions that decide how Tailwind CSS creates the styles for your website. They control the global styles, component styles, and utility classes.

App.jsx

```js
const App = () => {
  return <h1 className="text-7xl font-bold underline">Tailwind project</h1>;
};
export default App;
```

## Setup DaisyUI

- [DaisyUI](https://daisyui.com/)

- add and configure daisyui to our project
- add TailwindCSS Typography plugin

```sh
npm i  -D daisyui@latest @tailwindcss/typography
```

tailwind.config.js

```js
{
 plugins: [require('@tailwindcss/typography'), require('daisyui')],
}
```

## Install Extra Libraries

```sh
npm i axios@1.4.0 dayjs@1.11.9 @reduxjs/toolkit@1.9.5 @tanstack/react-query@4.32.6 @tanstack/react-query-devtools@4.32.6 react-icons@4.10.1 react-redux@8.1.2 react-router-dom@6.14.2 react-toastify@9.1.3

```

## Custom Class

index.css

```css
@layer components {
  .align-element {
    @apply mx-auto max-w-6xl px-8;
  }
}
```

```js
<section className="align-element py-20">
  <Outlet />
</section>
```

## Toggle Component

- Add daisyui swap component

```js
import { useState } from "react";

const [theme, setTheme] = useState(false);

const handleTheme = () => {
  setTheme(!theme);
};
<div className="navbar-end">
  <label className="swap swap-rotate ">
    {/* this hidden checkbox controls the state */}
    <input type="checkbox" onChange={handleTheme} />

    {/* sun icon */}
    <BsSunFill className="swap-on h-4 w-4" />

    {/* moon icon */}
    <BsMoonFill className="swap-off h-4 w-4" />
  </label>
</div>;
```

## Set Themes

tailwind.config.cjs

```js
{
...
  daisyui: {
    themes: ['winter', 'dracula'],
  },
}
```

```html
<html lang="en" data-theme="winter"></html>
```

## Change Theme

- change theme with toggle component

### Navbar.jsx

- Logic:

  - Create a state variable `theme` using the `useState` hook and initialize it with the result of `getThemeFromLocalStorage()`.
  - Define a function `handleTheme` that toggles between the `'winter'` and `'dracula'` themes based on the current theme.
  - Use the `useEffect` hook to apply the selected theme to the `document.documentElement.setAttribute('data-theme', theme)` and store the theme value in `localStorage`.
  - ... (rest of the component implementation)

```js
import { useEffect, useState } from 'react';

const themes = {
  winter: 'winter',
  dracula: 'dracula',
};

const getThemeFromLocalStorage = () => {
  return localStorage.getItem('theme') || themes.winter;
};

const Navbar = () => {
  const [theme, setTheme] = useState(getThemeFromLocalStorage());

  const handleTheme = () => {
    const { winter, dracula } = themes;
    const newTheme = theme === winter ? dracula : winter;
    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  ...
};
```

## Axios Custom Instance

- [API DOCS](https://documenter.getpostman.com/view/18152321/2s9Xy5KpTi)

```js
import axios from "axios";

const productionUrl = "https://strapi-store-server.onrender.com/api";

export const customFetch = axios.create({
  baseURL: productionUrl,
});
```

## Format Price

- utils/index.js

```js
export const formatPrice = (price) => {
  const dollarsAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format((price / 100).toFixed(2));
  return dollarsAmount;
};
```

## Set amount options dynamically

index.jsx

```js
export const generateAmountOptions = (number) => {
  return Array.from({ length: number }, (_, index) => {
    const amount = index + 1;

    return (
      <option key={amount} value={amount}>
        {amount}
      </option>
    );
  });
};
```

Array.from({ length: number }, (_, index) => { ... }): This part uses the Array.from method to create an array of a specific length, determined by the number parameter. The second argument of the Array.from method is a callback function that will be invoked for each element in the array. The underscore (_) is a placeholder for the current element (which we don't need in this case), and index is the index of the current element.

const amount = index + 1;: Inside the callback function, this line calculates the amount value based on the index. Since the index starts from 0 but you want amount to start from 1, you add 1 to the index.

## Explain how "params" work in loader

Products.jsx

```js
export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  const response = await customFetch(url, { params });

  const products = response.data.data;
  const meta = response.data.meta;

  return { products, meta, params };
};
```

```js
const params = Object.fromEntries([
  ...new URL(request.url).searchParams.entries(),
]);
```

It takes a URL string from the request.url property.
It creates a URL object from that URL string.
It extracts the query parameters using the searchParams property.
It converts the query parameters into an iterable of key-value pairs using the entries() method.
It spreads these key-value pairs into an array.
It uses Object.fromEntries() to create a new object where the key-value pairs become properties of the object.

## Setup RTK and react-toastify

features/cart/cartSlice.js

```js
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: defaultState,
  reducers: {
    addItem: (state, action) => {
      console.log(action.payload);
    },
    clearCart: (state) => {},

    removeItem: (state, action) => {},
    editItem: (state, action) => {},
  },
});

export const { addItem, removeItem, editItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
```

store.js

```js
import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./features/cart/cartSlice";
export const store = configureStore({
  reducer: {
    cartState: cartReducer,
  },
});
```

main.jsx

```js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "react-toastify/dist/ReactToastify.css";
// order
import "./index.css";

import { ToastContainer } from "react-toastify";
import { store } from "./store";
import { Provider } from "react-redux";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
    <ToastContainer position="top-center" />
  </Provider>
);
```

## Setup React Query

App.jsx

```js
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        loader: landingLoader(queryClient),
        errorElement: <ErrorElement />,
      },
      {
        path: "products",
        element: <Products />,
        loader: productsLoader(queryClient),
        errorElement: <ErrorElement />,
      },
      {
        path: "products/:id",
        element: <SingleProduct />,
        loader: singleProductLoader(queryClient),
        errorElement: <ErrorElement />,
      },
      {
        path: "checkout",
        element: <Checkout />,
        loader: checkoutLoader(store),
        action: checkoutAction(store, queryClient),
      },
      {
        path: "orders",
        element: <Orders />,
        loader: ordersLoader(store, queryClient),
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
```
