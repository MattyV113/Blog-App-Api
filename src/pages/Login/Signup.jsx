import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { signupSchema } from '../../Validations/UserValidation';
import Astronout from '/src/assets/7000_3_01.jpg';
import { useFormik } from 'formik';

function Signup() {
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    const formData = new FormData();

    formData.append('username', values.username);
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('profilePicture', values.profilePicture);
    try {
      await axios.post('/api/users/signup', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response.data);
    }
  };

  const {
    values,
    errors,
    setFieldValue,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      profilePicture: '',
    },
    validationSchema: signupSchema,
    onSubmit,
  });

  const [error, setError] = useState(null);

  return (
    <div className="w-full h-screen  flex">
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded m-auto h-[670px] sm:h-[580px]  border-2 border-gray-300 shadow-lg shadow-gray-600 sm:max-w-[850px] ">
        <div className="p-4 flex flex-col">
          <form onSubmit={handleSubmit}>
            <h3 className="text-4xl font-bold text-center mb-4">
              Register Here!
            </h3>
            {error && <p className="text-red-600 text-2xl">{error}</p>}

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
                <p className="text-red-500 text-sm">{errors.username}</p>
              )}
              <div className="relative flex w-full flex-wrap items-stretch mb-3">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email
                      ? ' px-3 py-3 placeholder-slate-300 text-slate-600 relative   text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10   focus:border-red-600'
                      : 'px-3 py-3 placeholder-slate-300 text-slate-600 relative   text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10'
                  }
                />
                <span className="z-10 h-full leading-snug font-normal  text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                  <i className="fa-solid fa-envelope"></i>
                </span>
              </div>
              {errors.email && touched.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
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
                <p className="text-red-500 md:w-full w-[250px] text-[12px]">
                  {errors.password}
                </p>
              )}
              <div className="relative flex w-full flex-wrap items-stretch mb-3">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.confirmPassword && touched.confirmPassword
                      ? ' px-3 py-3 placeholder-slate-300 text-slate-600 relative   text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10   focus:border-red-600'
                      : 'px-3 py-3 placeholder-slate-300 text-slate-600 relative   text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10'
                  }
                />
                <span className="z-10 h-full leading-snug font-normal  text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                  <i className="fa-solid fa-lock"></i>
                </span>
              </div>

              {errors.confirmPassword && touched.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}
              <label className="ml-2 mb-2" htmlFor="file">
                Upload Profile Picture
              </label>
              <input
                name="profilePicture"
                className="mb-2"
                value={undefined}
                onChange={(event) => {
                  setFieldValue('profilePicture', event.target.files[0]);
                }}
                onBlur={handleBlur}
                type="file"
              />
            </div>
            <button
              type="submit"
              className="border-black w-full mb-2  py-2 transition-all  bg-match-register hover:bg-purple-500"
            >
              Register
            </button>
            <span className="">
              Already have an account?{' '}
              <Link
                className="w-20  text-black hover:text-slate-300"
                to="/login"
              >
                Login
              </Link>
            </span>
          </form>
        </div>
        <div className="w-full h-[576px] hidden md:block">
          <img className="h-full  rounded-r " src={Astronout} alt="/" />
        </div>
      </div>
    </div>
  );
}

export default Signup;
