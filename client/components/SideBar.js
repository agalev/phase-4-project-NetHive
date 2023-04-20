import React, { useState, useEffect } from 'react'
import UserPill from './user_pill'
import { useDispatch, useSelector } from 'react-redux';



function SideBar({ isLoaded, loggedUsersRooms }) {
	const loggedUser = useSelector((state) => state.user)
	const [users, setUsers] = useState([])
	const [rooms, setRooms] = useState([])

	console.log(loggedUser.user.rooms)

	useEffect(() => {
		fetch('/users')
			.then((response) => response.json())
			.then((data) => {
				setUsers(data)
			})
		fetch('/rooms')
			.then((response) => response.json())
			.then((data) => {
				setRooms(data)
			})
	}, [])

	if(!loggedUser.user.rooms){
return (
	<div class="bg-gradient-to-b from-my-purple to-my-blue text-gray-900 flex flex-col h-screen border-r-2 border-black" style={{height: `calc(100vh - 80px)`}}>
  <div class='p-4 border-b-2 border-gray-900 h-1/2 flex-col'>
    <h3 class='text-lg font-semibold mb-2 text-white'>Rooms</h3>
	<div className ='h-60 overflow-y-scroll'>
	<ul>
		<li>Nothing
		</li>
	</ul>
	</div>
  </div>
  <div class="p-4 flex flex-col h-1/2" >
    <h3 class='text-lg font-semibold mb-2 text-white'>Direct Message</h3>
	<div className = 'h-60 overflow-y-scroll'>
    <section>
      {users &&
        users.map((user) => (
          // <li class='text-gray-400 hover:bg-gray-900 hover:text-white cursor-pointer' key={user.id}>
          //   {user.first_name} {user.last_name}
          // </li>
          <UserPill key={user.id} {...user} />
        ))}
    </section>
	</div>
  </div>
</div>


);
}

console.log(loggedUser.user.rooms)

return (
	<div class="bg-gradient-to-b from-my-purple to-my-blue text-gray-900 flex flex-col h-screen border-r-2 border-black" style={{height: `calc(100vh - 80px)`}}>
  <div class='p-4 border-b-2 border-gray-900 h-1/2 flex-col'>
    <h3 class='text-lg font-semibold mb-2 text-white'>Rooms</h3>
	<div className ='h-60 overflow-y-scroll'>
	<ul>
	{loggedUser.user.rooms.map((room) => (
		<li className='text-gray-400 hover:bg-gray-900 hover:text-white cursor-pointer' id={room.id} key={room.id}>
			#{room.room.topic}
		</li>
		))}
	</ul>
	</div>
  </div>
  <div class="p-4 flex flex-col h-1/2" >
    <h3 class='text-lg font-semibold mb-2 text-white'>Direct Message</h3>
	<div className = 'h-60 overflow-y-scroll'>
    <section>
      {users &&
        users.map((user) => (
          // <li class='text-gray-400 hover:bg-gray-900 hover:text-white cursor-pointer' key={user.id}>
          //   {user.first_name} {user.last_name}
          // </li>
          <UserPill key={user.id} {...user} />
        ))}
    </section>
	</div>
  </div>
</div>

)
}

export default SideBar
