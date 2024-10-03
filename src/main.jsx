import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Register from './Page/Register.jsx';
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import Login from './Page/Login.jsx';
import Home from './Page/Home.jsx';
import Individual from './Page/IndividualRestauranr.jsx';
import Landing from './Page/Landing.jsx';
import SearchResults from './Page/SearchResults.jsx';
import NewIndividual from './Page/NewIndivdualpage.jsx';
import AddRestaurantForm from './Page/Addhotel.jsx';
const { VITE_CLERK_PUBLISHABLE_KEY } = import.meta.env;
const PUBLISHABLE_KEY = VITE_CLERK_PUBLISHABLE_KEY;
const router = createBrowserRouter([
  {
    path:"/register",
    element:<Register></Register>
  },
  {
    path:"/login",
    element:<Login></Login>
  },
  {
    path:"/",
    element:(
      <>
      <SignedIn>
        <Home></Home>
      </SignedIn>
      <SignedOut>
        <Landing></Landing>
      </SignedOut>
      </>
    )
  },
  {path:"/restaurant/:id",
    element:<Individual></Individual>
  },
  {
    path:"/search",
    element:<SearchResults></SearchResults>
  },
  {
    path:"/newrestaurant/:id",
    element:<NewIndividual></NewIndividual>
  },
  {
    path:"/add",
    element:(
      <>
      <SignedIn>
        <AddRestaurantForm></AddRestaurantForm>
      </SignedIn>
      <SignedOut>
        <Landing></Landing>
      </SignedOut>
      </>
    )
  },

 
  
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>,
)
