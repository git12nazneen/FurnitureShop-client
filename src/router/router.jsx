import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Error from "../error/Error";
import Home from "../pages/homePage/Home";
import Register from '../authentication/Register';
import Login from '../authentication/Login';
import Dashboard from '../dashboard/Dashboard';
import Allorder from '../dashboard/Allorder';
import ProductPage from '../dashboard/ProductPage';
import SalesAmount from '../dashboard/SalesAmount';
import Profile from '../dashboard/Profile';
import { FcPrivacy } from 'react-icons/fc';
import PrivateRoute from '../provider/PrivateRoute';
import AllUsers from '../dashboard/AllUsers';
import AddFrom from '../dashboard/AddFrom';
import DetailsCard from '../components/DetailsCard';
import Card from '../components/commonCard/Card';
import Payment from '../components/Payment';
import CheckOutForm from '../components/CheckOutForm ';
import UpdateProduct from '../dashboard/UpdateProduct';
import Product from '../pages/Products/Product';


const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement:<Error></Error>,
      children:[
        {
            path:'/',
            element:<Home/>,
        }
        ,{
          path:'/login',
          element:<Login/>,
        },{
          path:'/register',
          element:<Register/>
        },
        {
          path:'/products/:id',
          element:<DetailsCard/>   
        },
        {
          path:'/products/:id',
          element:<Card/>,
          loader:({params})=>fetch(`https://server-zeta-nine-87.vercel.app/products/${params.id}`)
        },
        {
          path:'/product',
          element:<Product/>
        }
      ]
    },
    {
      path:'dashboard',
      element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children:[
        {
          path:'allOrder',
          element:<Allorder/>
        },
        {
          path:'addFrom',
          element:<AddFrom/>
        },

        {
          path:'productPage',
          element:<ProductPage/>
        },
        {
          path:'salesAmount',
          element:<SalesAmount/>
        },
        {
          path:'profile',
          element:<Profile/>
        },
        {
          path:'allUsers',
          element:<AllUsers/>
        },
        {
          path:'payment',
          element:<Payment/>
        },
        {
          path:'checkoutform',
          element:<CheckOutForm/>
        }
        ,{
          path:'updateProduct/:id',
          element:<UpdateProduct/>,
          loader:({params})=>fetch(`https://server-zeta-nine-87.vercel.app/products/${params.id}`)
        }
        ,
      ]
    }
  ]);

  export default router;