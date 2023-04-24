import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedUserImage } from '../store/userSlice';
import Auth from '../hooks/auth';

function Header() {
  const loggedUser = useSelector((state) => state.user)
  const imagepath = useSelector((state) => state.user.initialimage)
  const theme = useSelector((state) => state.user.userTheme)
  const dispatch = useDispatch();
  const router = useRouter();

  if (loggedUser){
    Auth()
  }

  const colorGradients = {
    blue: 'bg-gradient-to-r from-my-blue to-my-purple',
    orange: 'bg-gradient-to-r from-my-orange to-my-red',
    green: 'bg-gradient-to-r from-my-green to-my-yellow'
    // Add more color gradients as needed
  };

  useEffect(() => {
      // fetch the image using the dynamic path
      fetch(`/api/getImage?imagePath=${encodeURIComponent(imagepath)}`)
        .then(response => response.blob())
        .then(blob => URL.createObjectURL(blob))
        .then(url => {
          dispatch(setLoggedUserImage(url));
        })
        .catch(error => console.error(error));
  }, [imagepath]);

  function handleLogOut(){
    fetch('/logout', {
      method: 'POST'
    })
      .then(response => {
        if (response.ok) {
          console.log('Logged out successfully');
          router.push('/')
        } else {
          console.log('Logout failed');
        }
      })
      .catch(error => console.error(error));
  }

  // console.log(loggedUser)

  return (
    <div className="flex items-center justify-between bg-gray-900 text-white py-4 px-6" style={{ height: '80px' }}>
      <Link onClick={handleLogOut} href='/' className="flex items-center text-gray-300 hover:text-white focus:outline-none">
        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span id='home-button' className="ml-2">Log Out</span>
      </Link>
      <div className="flex items-center pr-6">
      <h1 className={`${colorGradients[theme]} text-4xl font-large text-transparent bg-clip-text`}>Net</h1>
      <h1 className={`${colorGradients[theme]} text-4xl font-large text-transparent bg-clip-text`}>Hive</h1>

</div>

      <div className="flex items-center w-12 h-12 cursor-pointer hover:opacity-75">
        {loggedUser?.user?.image ? (
          <Link href="/ProfilePage">
              <img
                id='profile-button'
                className="w-full h-full rounded-full object-cover"
                style={{objectFit: "cover"}}
                src={loggedUser.user.image}
                alt="Profile"
                width={50}
                height={50}
              />
          </Link>
        ) : (
          <Link href="/ProfilePage">
              <img
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
