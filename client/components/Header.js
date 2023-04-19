import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedUserImage } from '../store/userSlice';

function Header() {
  const loggedUser = useSelector((state) => state.user)
  const imagepath = useSelector((state) => state.user.initialimage)
  const dispatch = useDispatch();
  const router = useRouter();
  console.log(imagepath)
  console.lo

  useEffect(() => {
    if (loggedUser) {
      // fetch the image using the dynamic path
      fetch(`/api/getImage?imagePath=${encodeURIComponent(imagepath)}`)
        .then(response => response.blob())
        .then(blob => URL.createObjectURL(blob))
        .then(url => {
          dispatch(setLoggedUserImage(url));
        })
        .catch(error => console.error(error));
    }
  }, []);

  console.log(loggedUser)

  return (
    <div className="flex items-center justify-between bg-gray-900 text-white py-4 px-6" style={{ height: '80px' }}>
      <Link href='/' className="flex items-center text-gray-300 hover:text-white focus:outline-none">
        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span id='home-button' className="ml-2">Back to Home</span>
      </Link>
      <div className="flex items-center">
        <h1 className="text-4xl font-large bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Net</h1>
        <h1 className="text-4xl font-large bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text m1-2">Hive</h1>
      </div>
      <div className="flex items-center w-10 h-10 cursor-pointer hover:opacity-75">
        {loggedUser.user.image ? (
          <Link href="/ProfilePage">
              <img
                id='profile-button'
                className="w-full h-full rounded-full object-cover"
                style={{objectFit: "cover"}}
                src={loggedUser.user.image}
                alt="Profile"
                width={40}
                height={40}
              />
          </Link>
        ) : (
          <Link href="/ProfilePage">
              <Image
                id='profile-button'
                className="w-full h-full rounded-full object-cover"
                style={{objectFit: "cover"}}
                src="https://media.wired.com/photos/5f87340d114b38fa1f8339f9/master/w_1600%2Cc_limit/Ideas_Surprised_Pikachu_HD.jpg"
                alt="Default Profile"
                width={40}
                height={40}
              />
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
