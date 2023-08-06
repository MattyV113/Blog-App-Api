import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from './Footer/Footer';
import Navbar from './NavBar/Navbar';
import { Link, useLocation } from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  const state = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      await axios
        .get('/api/posts')
        .then((res) => {
          const data = res.data;
          setPosts(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchPosts();
  }, []);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent;
  };

  return (
    <>
      <Navbar />
      <div className=" flex-col flex mr-auto">
        <div className="h-[72vh] flex flex-col leading-loose align-center text-center bg-gradient-to-r from-red-200 via-red-300 to-yellow-200">
          <h1 className="pt-[70px] h-[550px]  pr-[0px] text-5xl md:text-6xl lg:text-8xl text-navdark">
            Welcome to TechNext.
          </h1>
          <h1 className="pt-[10px] h-[550px]  pr-[0px] text-5xl md:text-6xl lg:text-8xl text-navdark">
            Write Stuff.
          </h1>
          <h1 className="pt-[10px] h-[550px]  pr-[0px] text-5xl md:text-6xl lg:text-8xl text-navdark">
            Read Stuff.
          </h1>
          <h1 className="pt-[10px] h-[550px]  pr-[0px] text-5xl md:text-6xl lg:text-8xl text-navdark">
            Enjoy.
          </h1>
        </div>
        <div className="flex flex-col text-center mt-[70px]">
          {error ? (
            <h1>{error}</h1>
          ) : (
            <h3 className="text-5xl">Latest Posts</h3>
          )}
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
      </div>
      <Footer />
    </>
  );
}

export default Home;
