import React from 'react';
import { useRouter } from 'next/router';

function Header() {
  const router = useRouter();

  function handleClick(e){
    console.log(e.target.id)
    if (e.target.id == 'home-button'){
        router.push('/');
    }
    else if (e.target.id == 'profile-button'){
        router.push('/ProfilePage')
    }
  }

  return (
    <div className="flex items-center justify-between bg-gray-900 text-white py-4 px-6" style={{ height: '80px' }}>
      <button onClick={handleClick} className="flex items-center text-gray-300 hover:text-white focus:outline-none">
        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span id='home-button' className="ml-2">Back to Home</span>
      </button>
      <div className="flex items-center">
        <h1 className="text-xl font-large">NetHive</h1>
      </div>
      <div onClick={handleClick} className="flex items-center w-10 h-10">
        <img id='profile-button' className="w-full h-full rounded-full object-cover" style={{objectFit: "cover"}} src="https://media.wired.com/photos/5f87340d114b38fa1f8339f9/master/w_1600%2Cc_limit/Ideas_Surprised_Pikachu_HD.jpg" alt="Profile" />
      </div>
    </div>
  );
}

export default Header;

