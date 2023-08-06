import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/authContext';
import Navbar from '../pages/NavBar/Navbar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditProfile() {
  const { currentUser, setCurrentUser, update, logout } =
    useContext(AuthContext);
  const { id } = useParams();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      await axios.get(`/api/users/${id}`).then((res) => {
        let data = res.data;
        currentUser.imageUrl = data.imageUrl;
      });
    };
    fetchImage();
  }, [currentUser.id]);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append('username', username);
    formData.append('email', email);

    formData.append('profilePicture', profilePicture);
    try {
      await update(formData, id);
      navigate(`/users/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-md m-auto border-2 border-gray-400 bg-white shadow-lg w-[50%] rounded-lg overflow-hidden my-4">
        <div className="py-4 flex flex-col justify-center px-6">
          <label className="m-auto" htmlFor="username">
            Username
          </label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            className="w-[150px] m-auto border font-semibold text-gray-800"
            value={username}
          />
          <label className="m-auto" htmlFor="email">
            Emaill
          </label>
          <input
            value={email}
            className="w-[150px] m-auto border font-semibold text-gray-800"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex flex-col justify-center mt-4 text-gray-700">
            <img
              className="max-h-[100px] mb-4 rounded-full w-fit  m-auto"
              src={`${currentUser.imageUrl}`}
              alt="user image"
            />
            <label className="ml-2 mb-2" htmlFor="file">
              Upload Profile Picture
            </label>
            <input
              name="profilePicture"
              className="mb-2"
              value={profilePicture}
              onChange={(event) => {
                setProfilePicture(event.target.files[0]);
              }}
              type="file"
            />
          </div>
          <div className="flex mt-4 justify-center">
            <Link
              to={`/users/${currentUser.id} `}
              className="p-2 border-2 rounded border-black bg-match-orange  m-2 no-underline text-black"
            >
              Return to Profile
            </Link>
            <button
              className="p-2 border-2 rounded border-black bg-match-orange  m-2 no-underline text-black"
              onClick={handleSubmit}
            >
              Make Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
