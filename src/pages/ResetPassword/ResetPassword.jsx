import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { resetSchema } from '../../Validations/UserValidation';

function ResetPassword() {
  const navigate = useNavigate();
  const { id } = useParams();
  const onSubmit = async (e) => {
    await axios
      .put(`/api/users/reset-password/${id}`, {
        password: values.password,
      })
      .then((res) => {
        setShowModal(true);
      })
      .catch((err) => setError(err));
  };

  const [showModal, setShowModal] = React.useState(false);
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
      password: '',
      confirmPassword: '',
    },

    validationSchema: resetSchema,
    onSubmit,
  });

  const [error, setError] = useState(null);

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Password Changed</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <Link
                    to="/login"
                    className="my-4 text-slate-500 text-lg leading-relaxed"
                  >
                    Return to login
                  </Link>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b"></div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : (
        <div className="w-full h-screen flex">
          <div className="grid rounded  m-auto h-[450px] max-w-[400px] md:w-[450px] shadow-lg shadow-gray-600 ">
            {error && (
              <p text-2xl text-red-600>
                {error}
              </p>
            )}
            <div className="p-4  flex flex-col justify-center">
              <form onSubmit={handleSubmit}>
                <h3 className="text-4xl font-bold text-center mb-4">
                  Reset Password
                </h3>
                <div className="flex flex-col">
                  <input
                    className={
                      errors.password && touched.password
                        ? 'border border-solid p-2 focus:outline-none focus:ring-0  focus:border-red-600'
                        : 'border p-2 mb-4'
                    }
                    type="text"
                    name="password"
                    placeholder="New Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}

                  <input
                    className={
                      errors.confirmPassword && touched.confirmPassword
                        ? 'border p-2  border-red-600'
                        : 'border p-2 mb-4'
                    }
                    type="text"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <p className="text-red-500 md:w-full w-[250px] text-[12px]">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="border-black w-full mb-[50px]  py-2 transition-all  bg-match-orange hover:bg-orange-500"
                >
                  Reset Password
                </button>
                {error && <p className="text-red-600 text-2xl">{error}</p>}
                <br />

                <Link
                  className="w-20  text-black hover:text-slate-300"
                  to="/login"
                >
                  Return to Login
                </Link>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ResetPassword;
