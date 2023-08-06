import React from 'react';
import NavLogo from '/src/assets/3600_8_07.jpg';
import { SiTailwindcss } from 'react-icons/si';
import { GrReactjs, GrNode } from 'react-icons/gr';

function Footer() {
  return (
    <>
      <div className="flex   h-[70px] p-2 w-screen align-center justify-center mt-[70px] ">
        <p className="flex-2 align-bottom mr-4  text-xl">Made using </p>
        <div className="flex flex-row gap-[15px] ">
          <GrReactjs className=" mt-2 align-bottom" />
          <SiTailwindcss className="mt-2 align-bottom" />
          <GrNode className=" mt-2 align-bottom" />
        </div>
      </div>
      <div className="flex">
        <p className="m-auto pb-4">by: Matt Vines</p>
      </div>
    </>
  );
}

export default Footer;
