import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import Navbar from '../pages/NavBar/Navbar';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function UserProfile() {
  const { currentUser, setCurrentUser, logout } = useContext(AuthContext);
  const { id } = useParams();
  const [profilePicture, setProfilePicture] = useState('');

  const handleLogout = async (e) => {
    await logout();
    navigate('/login');
  };

  useEffect(() => {
    const fetchImage = async () => {
      await axios.get(`/api/users/${id}`).then((res) => {
        let data = res.data;
        setProfilePicture(data.imageUrl);
      });
    };
    fetchImage();
  }, [currentUser.id]);

  currentUser.imageUrl = profilePicture;

  return (
    <>
      <Navbar />
      <div class="max-w-md m-auto border-2 border-gray-400 bg-white shadow-lg w-[50%] rounded-lg overflow-hidden my-4">
        <div class="py-4 flex flex-col justify-center px-6">
          <h1 class="text-2xl m-auto font-semibold text-gray-800">
            {currentUser.username}
          </h1>
          <p class="py-2 text-lg m-0 text-gray-700">{currentUser.desc}</p>
          <div class="flex flex-col justify-center mt-4 text-gray-700">
            <img
              className="max-h-[100px] mb-4 rounded-full w-fit  m-auto"
              src={`${currentUser.imageUrl}`}
              alt="user image"
            />
            <h1 class="m-auto text-sm">{currentUser.email}</h1>
          </div>
          <div className="flex mt-4 justify-center">
            <Link
              to={`/posts/user/${currentUser.id} `}
              className="p-2 hover:bg-match-orange rounded transition  m-2 no-underline text-black"
            >
              Your Posts
            </Link>
          </div>
          <button
            onClick={handleLogout}
            className="bg-match-orange  mt-4 p-2 w-[150px]  max-w-[150px] m-auto hover:bg-orange-400 rounded "
          >
            Log Out
          </button>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
