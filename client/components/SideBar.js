import React, { useState, useEffect } from 'react'
import UserPill from './user_pill'

function SideBar() {
	const [users, setUsers] = useState([])
	const [rooms, setRooms] = useState([])

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

	return (
		<div class="bg-gradient-to-b from-my-purple to-my-blue text-gray-900 flex flex-col h-full flex-grow border-r-2 border-black">
			<div className='p-4 border-b border-gray-400'>
<<<<<<< HEAD
				<h3 className='text-lg font-semibold mb-2 text-white'>Users</h3>
				<ul>
					{users &&
						users.map((user) => (
							<li className='text-gray-400 hover:bg-gray-900 hover:text-white cursor-pointer' key={user.id}>
								{user.first_name} {user.last_name}
							</li>
						))}
				</ul>
        <h3 className='text-lg font-semibold my-2 text-white'>Rooms</h3>
=======
				<h3 className='text-lg font-semibold mb-2'>Users</h3>
				<section>
					{users &&
						users.map((user) => (
							// <li key={user.id}>
							// 	{user.first_name} {user.last_name}
							// </li>
							<UserPill key={user.id} {...user} />
						))}
				</section>
        <h3 className='text-lg font-semibold my-2'>Rooms</h3>
>>>>>>> main
        <ul>
          {rooms &&
            rooms.map((room) => (
              <li className='text-gray-400 hover:bg-gray-900 hover:text-white cursor-pointer' key={room.id}>
                {room.topic}
              </li>
            ))}
        </ul>
			</div>
		</div>
	)
}

export default SideBar
