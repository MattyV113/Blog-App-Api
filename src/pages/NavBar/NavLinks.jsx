import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

function NavLinks() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = React.useState(false);

  const handleCreatePost = () => {
    navigate('/create-post');
  };

  const handleProfile = () => {
    navigate(`/users/${currentUser?.id}`);
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative md:max-w-[650px]  my-6 mx-auto max-w-[270px]">
              {/*content*/}
              <div className="border-0 h-[300px] rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div>
                  <h3 className="m-auto mt-5 p-4 text-lg text-center">
                    Hey! Looks like you are not logged in. To access this page,
                    please login.
                  </h3>
                </div>
                <div className="flex gap-4 flex-row m-auto">
                  <button
                    className="hover:text-gray-500 duration-500 transition-all drop-shadow-xl  h-[40px] w-[70px] text-black hover:bg-red-500 p-2 rounded no-underline"
                    onClick={() => setShowModal(false)}
                  >
                    Return
                  </button>
                  <button
                    className="hover:text-gray-500 duration-500 transition-all drop-shadow-xl  h-[40px] w-[70px] text-black hover:bg-green-500 p-2 rounded no-underline"
                    onClick={() => setShowModal(false)}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : (
        <div className="md:static absolute md:min-h-fit bg-white min-h-[60vh] md:w-auto left-0 top-[-100%] w-full flex items-center px-5   ">
          <ul className="flex  md:flex-row text-xl md:text-[18px] flex-col md:items-center mt-[20px] list-none gap-8 md:gap-[4vw]">
            <li>
              <button className="hover:text-gray-500 duration-500 transition-all drop-shadow-xl  h-[40px] w-[70px] text-black hover:bg-match-orange p-2 rounded no-underline">
                Home
              </button>
            </li>
            <li>
              <button
                onClick={
                  currentUser ? handleCreatePost : () => setShowModal(true)
                }
                className="hover:text-gray-500 duration-500 transition-all drop-shadow-xl  hover:bg-match-orange p-2 h-[40px] w-[120px] rounded text-black no-underline"
              >
                Create Post
              </button>
            </li>
            <li>
              <button
                onClick={currentUser ? handleProfile : () => setShowModal(true)}
                className="hover:text-gray-500 duration-500 transition-all drop-shadow-xl  hover:bg-match-orange p-2 h-[40px] w-[100px] rounded text-black no-underline"
              >
                Profile
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default NavLinks;
