import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import '@fortawesome/fontawesome-free/js/all.js';

import Astronout from '/Users/mattyv113/Desktop/Blog-App/src/assets/3800_2_03.jpg';
import { AuthContext } from '../../context/authContext';
import { loginSchema } from '../../Validations/UserValidation';

function Login() {
  const { login, currentUser, setCurrentUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const onSubmit = async (e) => {
    await axios
      .post('/api/users/login', values)
      .then((res) => {
        let data = res.data;
        setCurrentUser(data);
        navigate('/');
      })
      .catch((err) => setError(err.response));
  };
  const {
    values,
    errors,
    isSubmitting,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },

    validationSchema: loginSchema,
    onSubmit,
  });

  const [error, setError] = useState(null);

  return (
    <div className="w-full h-screen flex">
      <div className="grid grid-cols-1 rounded md:grid-cols-2 m-auto h-[500px] max-w-[700px] shadow-lg shadow-gray-600 ">
        {error && (
          <p text-2xl text-red-600>
            {error}
          </p>
        )}
        <div className="p-4  flex flex-col justify-center">
          <form onSubmit={handleSubmit}>
            <h3 className="text-4xl font-bold text-center mb-4">Login</h3>
            <div className="flex flex-col">
              <div className="relative flex w-full flex-wrap items-stretch mb-3">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.username && touched.username
                      ? ' px-3 py-3 placeholder-slate-300 text-slate-600 relative   text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10   focus:border-red-600'
                      : 'px-3 py-3 placeholder-slate-300 text-slate-600 relative   text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10'
                  }
                />
                <span className="z-10 h-full leading-snug font-normal  text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                  <i className="fas fa-user"></i>
                </span>
              </div>
              {errors.username && touched.username && (
                <p className="text-red-500 mt-2 text-sm">{errors.username}</p>
              )}

              <div className="relative flex w-full flex-wrap items-stretch mb-3">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password
                      ? ' px-3 py-3 placeholder-slate-300 text-slate-600 relative   text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10   focus:border-red-600'
                      : 'px-3 py-3 placeholder-slate-300 text-slate-600 relative   text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10'
                  }
                />
                <span className="z-10 h-full leading-snug font-normal  text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                  <i className="fa-solid fa-lock"></i>
                </span>
              </div>
              {errors.password && touched.password && (
                <p className="text-red-500 mt-2 text-sm">{errors.password}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="border-black w-full  py-2 transition-all  bg-match-orange hover:bg-orange-500"
            >
              Login
            </button>
            {error && <p className="text-red-600 text-2xl">{error}</p>}
            <br />
            <br />
            <span>
              Don't have an account?{' '}
              <Link
                className="w-20  text-black hover:text-slate-300"
                to="/register"
              >
                Sign Up
              </Link>
            </span>
            <br />
            <br />
            <Link
              className="w-20 mt-4  text-black hover:text-slate-300"
              to="/forgot-password"
            >
              Forgot Password?
            </Link>
          </form>
        </div>
        <div className="w-full h-[500px] hidden md:block">
          <img
            className="h-full rounded-r object-cover "
            src={Astronout}
            alt="/"
          />
        </div>
      </div>
    </div>
  );
}
export default Login;
