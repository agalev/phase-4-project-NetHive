import React, { useEffect, useState } from 'react';
import MusicPlayer from './MusicPlayer';
import { useDispatch, useSelector } from 'react-redux';
import { setDisplayMessages, setLoggedUserRooms } from '../store/userSlice';
import handleRoomJoin from '../hooks/JoinRoom';

function MessageDisplay() {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.user);
  const loggedUserMessages = useSelector((state) => state.user.displayMessages);
  console.log(loggedUser);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch('/rooms')
      .then((response) => response.json())
      .then((data) => {
        setRooms(data);
      });
  }, []);

  console.log(handleRoomJoin)

  if (!loggedUser.user.rooms || loggedUser.user.rooms.length == 0) {
    return (
      <div className="flex flex-col h-full" style={{ height: 'calc(100vh - 80px)', backgroundColor: '#F7FAFC' }}>
        <div className="flex-1 overflow-y-scroll px-4 py-2">
          Get Started Select A Topic:
          <div className="flex flex-col space-y-4">
            {rooms &&
            rooms.map((room) => (
              <li onClick={(e) => handleRoomJoin(e.target.id, dispatch)} className='text-gray-400 hover:bg-gray-900 hover:text-white cursor-pointer' id={room.id} key={room.id}>
                #{room.topic}
              </li>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full" style={{ height: 'calc(100vh - 80px)', backgroundColor: '#F7FAFC' }}>
      <MusicPlayer />
      <div className="flex-1 overflow-y-scroll px-4 py-2">
        <div className="flex flex-col space-y-4">
          {/* messages will be rendered here */}
        </div>
      </div>
      <div className="border-t border-gray-300 px-4 py-2" style={{ backgroundColor: '#EDF2F7' }}>
        <form className="flex items-center space-x-2">
          <input type="text" placeholder="Type a message" className="flex-1 border border-gray-400 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
          <button type="submit" className="bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">Send</button>
        </form>
      </div>
    </div>
  );
  }
  
export default MessageDisplay;
