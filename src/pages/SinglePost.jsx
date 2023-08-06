import React, { useState, useEffect, useContext } from 'react';
import Footer from './Footer/Footer';
import Navbar from './NavBar/Navbar';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router';
import moment from 'moment';
import DOMPurify from 'dompurify';
import { MdOutlineDeleteOutline, MdOutlineEditNote } from 'react-icons/md';
import Cookies from 'universal-cookie';
import { AuthContext } from '../context/authContext';
import { Link } from 'react-router-dom';

function SinglePost() {
  const [post, setPost] = useState({});
  const [error, setError] = useState('');
  const { id } = useParams();

  const cookies = new Cookies();
  const token = cookies.get('token');

  const state = useLocation().state;
  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  const postId = location.pathname.split('/')[2];

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`/api/posts/${id}`)
        .then((res) => {
          let data = res.data;
          setPost(data);
        })
        .catch((err) => setError(err));
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    await axios
      .delete(`/api/posts/${id}`)
      .then(() => {
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Navbar />
      <div className="pt-[155px] flex-col gap-[100px]    flex">
        {error && <p className="text-xl text-red-500">{error}</p>}
        <div className="bg-stone-50 p-4  rounded w-75 m-auto">
          <div className=" flex  flex-col text-center mt-[50px]">
            <h1 className="md:text-4xl text-xl mb-[75px]">{post.title}</h1>
            <img
              className="max-h-[250px]  rounded max-w-fit  m-auto"
              src={`${post?.imageUrl}`}
              alt="post image"
            />
            <div className="m-auto gap-[20px] flex justify-between">
              <h3 className=" p-2">By: {post.userPosted}</h3>
              {currentUser?.id === post.authorId && (
                <>
                  <Link
                    className="mt-[20px]"
                    to={`/create-post/?edit=2`}
                    state={state}
                  >
                    <MdOutlineEditNote />
                  </Link>
                  <Link className="mt-[20px]" onClick={handleDelete}>
                    <MdOutlineDeleteOutline />
                  </Link>
                </>
              )}
            </div>
            <p className="mt-4">Posted {moment(post.createdAt).fromNow()}</p>
          </div>
          <div className=" m-auto w-fit leading-6  justify-center text-center border-black">
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.content),
              }}
              className="w-75 m-auto space-y-4  whitespace-pre-line  pb-2  mb-5 sm:text-2xl text-l"
            ></p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SinglePost;
