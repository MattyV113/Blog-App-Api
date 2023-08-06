import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user') || null)
  );
  const cookies = new Cookies();

  const login = async (values) => {
    const res = await axios.post('/api/users/login', values);
    setCurrentUser(res.data);
  };

  const update = async (values, id) => {
    const res = await axios.put(`/api/users/editprofile/${id}`, values);
    let data = res.data;
    console.log(res.data);
    setCurrentUser({ ...currentUser }, res.data);
  };

  const logout = () => {
    try {
      setCurrentUser(null);
      localStorage.removeItem('user');
      cookies.remove('token');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, update, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
