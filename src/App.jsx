import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/Login/Signup';
import Login from './pages/Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import WritePost from './pages/WritePost';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ForgotPassword from './pages/ResetPassword/ForgotPassword';

import SinglePost from './pages/SinglePost';
import UserProfile from './UserProfile/UserProfile';
import EditProfile from './UserProfile/EditUserProfile';
import UsersPosts from './UserProfile/UsersPosts';
import ResetPassword from './pages/ResetPassword/ResetPassword';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },

  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/reset-password/:id',
    element: <ResetPassword />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <SignUp />,
  },
  {
    path: '/create-post',
    element: <WritePost />,
  },
  {
    path: `/post/:id`,
    element: <SinglePost />,
  },

  {
    path: `/users/:id`,
    element: <UserProfile />,
  },
  {
    path: `/users/editprofile/:id`,
    element: <EditProfile />,
  },
  {
    path: `/posts/user/:id/`,
    element: <UsersPosts />,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
