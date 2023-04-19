import React, { useState, useEffect } from 'react';

function SideBar() {
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const response = await fetch('http://localhost:5555/users');
  //     const data = await response.json();
  //     setUsers(data);
  //     console.log(users)
  //   };

  //   const fetchRooms = async () => {
  //     const response = await fetch('/api/rooms');
  //     const data = await response.json();
  //     setRooms(data);
  //   };

  //   fetchUsers();
  //   fetchRooms();
  // }, []);

  useEffect(() => {
    fetch('/check_auth')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
    // fetch('http://localhost:5555/users')
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //   })
      // .then(
      //   fetch('localhost:5555/rooms')
      //     .then((response) => response.json())
      //     .then((data) => {
      //       setRooms(data);
      //     })
      // );
  }, []);

  return (
    <div className="bg-gray-100 text-gray-800 flex flex-col h-full flex-grow">
      <div className="p-4 border-b border-gray-400">
        <h3 className="text-lg font-semibold mb-2">Users</h3>
        <ul>
          {/* {users.map((user) => (
            <li key={user.id} className="mb-2">{user.username}</li>
          ))}
        </ul>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Rooms</h3>
        <ul>
          {rooms.map((room) => (
            <li key={room.id} className="mb-2">{room.name}</li>
          ))} */}
        </ul>
      </div>
    </div>
  );

  
}

export default SideBar;