import React, { useContext, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Footer from './Footer/Footer';
import Navbar from './NavBar/Navbar';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { AuthContext } from '../context/authContext';

function WritePost() {
  const state = useLocation().state;
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [file, setFile] = useState();

  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const postId = location.pathname.split('/')[2];

  /* const uploadFile = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post('/api/upload', formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  */

  const handleClick = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();

    formData.append('file', file);
    formData.append('title', title);
    formData.append('content', content);
    formData.append('authorId', currentUser.id);
    formData.append('userPosted', currentUser.username);
    console.log([...formData.entries()]);
    await axios
      .post('/api/posts', formData)
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        console.error(err);
      });
    setTitle('');
    setContent('');
    setFile();
  };

  return (
    <>
      <Navbar />
      <div className="flex  mt-[100px] h-screen bg-navlight  justify-center ">
        <div className="flex flex-col max-w-[700px] pt-[100px]">
          <div></div>
          <h1>Create Post</h1>
          <input
            type="text"
            value={title}
            className="border-2 rounded border-black mb-2 p-1"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="4"
            className="block p-2.5 md:w-[600px]  h-[400px] border-2 border-black rounded "
            placeholder="Write your post..."
          ></textarea>
          <div className="flex flex-col mt-[10px]">
            <label className="ml-2 mb-2" htmlFor="file">
              Upload Image
            </label>
            <input
              name="myFileName"
              className="ml-2"
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
            />
            <div className="mt-2">
              <button
                onClick={handleClick}
                className="p-2 m-2 bg-match-orange hover:transition hover:duration-300 duration-300 hover:ease-in-out hover:bg-orange-400 border-2 border-black rounded "
              >
                Publish Post
              </button>
            </div>
          </div>
        </div>
      </div>
      ;
      <Footer />
    </>
  );
}

export default WritePost;
