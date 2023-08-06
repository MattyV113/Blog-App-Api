import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/authContext';
import Navbar from '../pages/NavBar/Navbar';
import Footer from '../pages/Footer/Footer';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import moment from 'moment';

import { MdOutlineDeleteOutline, MdOutlineEditNote } from 'react-icons/md';

function UsersPosts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  const state = useLocation().state;

  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/posts/user/${currentUser.id}`);
        let data = res.data;
        setPosts(data);
      } catch (err) {
        setError(err);
      }
    };
    fetchData();
  }, [currentUser.id]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent;
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col text-center mt-[70px]">
        {error && <p className="text-xl text-red-500">{error}</p>}

        <h3 className="text-5xl">Your Posts</h3>
      </div>
      <div className="mt-[50px] flex flex-col w-100 p-8 align-center justify-center gap-[150px]">
        {posts.map((post) => {
          return (
            <div
              key={post.id}
              className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
            >
              <div className="md:flex">
                <div className="md:shrink-0">
                  <img
                    className="h-48 w-full object-cover md:h-full md:w-48"
                    src={`${post.imageUrl}`}
                    alt=""
                  />
                </div>
                <div className="p-8">
                  <div className="uppercase tracking-wide text-sm text-black font-semibold">
                    {post.title}
                  </div>
                  <p className="mt-2 line-clamp-3 text-slate-700">
                    {getText(post.content)}
                  </p>
                  <Link
                    className="inline-flex no-underline items-center decoration-none  px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    to={`/post/${post.id}`}
                    state={post}
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
}

export default UsersPosts;
