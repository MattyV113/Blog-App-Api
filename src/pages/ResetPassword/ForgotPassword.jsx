import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '/src/index.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post('/api/users/forgot-password', {
        email,
      })
      .then(() => {
        setShowModal(true);
      })
      .catch((err) => console.log(err));
  };

  const [showModal, setShowModal] = React.useState(false);

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
                  <h3 className="text-3xl font-semibold">Email Sent!</h3>
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
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    Check your email for a link to change your password.
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : (
        <div>
          <div className="grid grid-col-1 m-auto h-[100vh] w-100">
            <form
              onSubmit={handleSubmit}
              className="p-6 border flex flex-col m-auto w-[450px] h-[350px]"
            >
              <h3 className="text-2xl font-bold text-center mb-4">
                Reset Password
              </h3>
              <label className="mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="border rounded w-70 p-2"
                placeholder="Enter Email to reset..."
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="mr-auto mt-4 flex flex-col">
                <Link
                  className="w-[150px] hover:text-blue-400 mb-4   text-blue-600"
                  to="/login"
                >
                  Return to Login
                </Link>
              </div>
              <button
                type="submit"
                className="mt-auto h-10 border hover:transition-colors w-70  align-center bg-green-500 hover:bg-green-200"
              >
                Reset
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ForgotPassword;
