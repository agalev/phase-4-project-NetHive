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
		<div className='bg-gray-100 text-gray-800 flex flex-col h-full flex-grow'>
			<div className='p-4 border-b border-gray-400'>
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
        <ul>
          {rooms &&
            rooms.map((room) => (
              <li key={room.id}>
                {room.topic}
              </li>
            ))}
        </ul>
			</div>
		</div>
	)
}

export default SideBar
