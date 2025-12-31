import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import ShoppingCart from './components/App.jsx'
import Home from './components/Home.jsx'
import Shop from './components/Shop.jsx'
import Profile from './components/Profile.jsx'
import Cart from './components/Cart.jsx'
import { Hamburger } from './components/Helper.jsx'

const router = createBrowserRouter([
	{
		path: '/',
		element: <ShoppingCart />,
		children: [
			{index: true, element: <Home />},
			{path: 'shop', element: <Shop />},
			{path: 'shop/profile/:id', element: <Profile />},								
			{path: 'cart', element: <Cart />},
		]
	},
	
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
