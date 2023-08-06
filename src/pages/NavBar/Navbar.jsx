import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import NavLogo from '/Users/mattyv113/Desktop/Blog-App/src/assets/3600_8_07.jpg';
import { RxHamburgerMenu } from 'react-icons/rx';
import { AiOutlineClose } from 'react-icons/ai';
import NavLinks from './NavLinks';
import BurgerBar from './BurgerBar';

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = async (e) => {
    await logout();
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className=" border-b border-black">
      <nav className="h-[150px] w-[92%] flex items-center justify-between mx-auto">
        <div className="flex gap-[10px] flex-row">
          <Link className="hover:text-gray-500" to="/">
            {' '}
            <img className="hidden sm:block w-[80px]" src={NavLogo} alt="" />
          </Link>
          <h3 className="text-black mt-[33px] ">TechNext</h3>
        </div>
        <NavLinks />
        <div className="flex items-center gap-4">
          {currentUser ? (
            <button
              className="bg-match-orange  drop-shadow-xl no-underline mt-3 text-black font-[Poppins] hidden sm:block  py-2 px-6 rounded md:ml-8 hover:bg-orange-500
            duration-500"
              onClick={handleLogout}
            >
              {' '}
              Logout{' '}
            </button>
          ) : (
            <button
              className="bg-match-orange  drop-shadow-xl no-underline mt-3 text-black font-[Poppins] hidden sm:block  py-2 px-6 rounded md:ml-8 hover:bg-orange-500
            duration-500"
              onClick={handleLogin}
            >
              Log In
            </button>
          )}
          <BurgerBar />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
