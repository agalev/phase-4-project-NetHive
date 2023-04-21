import React, { useEffect, useState } from 'react'
import MusicPlayer from './MusicPlayer'
import { useDispatch, useSelector } from 'react-redux'
import { setDisplayMessages, setLoggedUserRooms } from '../store/userSlice'
import MessageBlob from './message_blob'
function MessageDisplay({ handleRoomJoin }) {
	const dispatch = useDispatch()
	const loggedUser = useSelector((state) => state.user)
	const currentMessages = useSelector((state) => state.user.displayMessages)
	const [rooms, setRooms] = useState([])
	const [newMessage, setNewMessage] = useState('')
	useEffect(() => {
		fetch('/rooms')
			.then((response) => response.json())
			.then((data) => {
				setRooms(data)
			})
	}, [])
	
	function handleNewMessage(e) {
		setNewMessage(e.target.value)
	}
	
	function handleSubmit(e) {
		e.preventDefault()
		if (currentMessages.conversation_with) {
		fetch('/conversations', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				message: newMessage,
				sender_id: loggedUser.user.id,
				receiver_id: currentMessages.conversation_with
			})
		})
			.then((response) => response.json())
			.then((newmsg) => {
				dispatch(
					setDisplayMessages({
						...currentMessages,
						data: [...currentMessages.data, newmsg]
					})
				)
				setNewMessage('')
			})
			.catch((error) => console.error(error))
	} else if (currentMessages.conversation_with_room) {
		console.log(currentMessages.conversation_with_room)
		fetch('/conversations', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				message: newMessage,
				// sender_id: loggedUser.user.id,
				room_id: currentMessages.conversation_with_room
			})
		})
			.then((response) => response.json())
			.then((newmsg) => {
				console.log(newmsg)
				dispatch(
					setDisplayMessages({
						...currentMessages,
						data: [...currentMessages.data, newmsg]
					})
				)
				setNewMessage('')
			})
			.catch((error) => console.error(error))
	}
}

	if (rooms.length === 0) {
		return <div>Loading...</div>
	}

	if (!loggedUser.user.rooms || loggedUser.user.rooms.length === 0) {
		return (
			<>
				{/* <h1>Welcome New User, Pick A Topic:</h1> */}
				<div className='flex flex-col h-full bg-gray-100'>
					<div className='flex-1 overflow-y-scroll px-4 py-2'>
						<div className='flex flex-wrap justify-center items-start'>
							<div className='rounded-full p-2 m-1 bg-gray-600 text-gray-100 w-24 h-24 flex items-center justify-center text-xl font-bold animate-upanddown hover: cursor-pointer'>
								#{rooms[0].topic}
							</div>
							<div className='rounded-full p-2 m-1 bg-indigo-600 text-indigo-100 w-40 h-40 flex items-center justify-center text-xl font-bold animate-upanddown2 cursor-pointer'>
								#{rooms[1].topic}
							</div>
							<div className='rounded-full p-2 m-1 bg-pink-600 text-pink-100 w-32 h-32 flex items-center justify-center text-xl font-bold animate-upanddown3 cursor-pointer'>
								#{rooms[2].topic}
							</div>
							<div className='rounded-full p-2 m-1 bg-purple-600 text-purple-100 w-40 h-40 flex items-center justify-center text-xl font-bold animate-upanddown2 cursor-pointer'>
								#{rooms[3].topic}
							</div>
							<div className='rounded-full p-2 m-1 bg-green-600 text-green-100 w-24 h-24 flex items-center justify-center text-xl font-bold animate-upanddown cursor-pointer'>
								#{rooms[4].topic}
							</div>
							<div className='rounded-full p-2 m-1 bg-blue-600 text-blue-100 w-40 h-40 flex items-center justify-center text-xl font-bold animate-upanddown3 cursor-pointer'>
								#{rooms[5].topic}
							</div>
							<div className='rounded-full p-2 m-1 bg-orange-600 text-orange-100 w-32 h-32 flex items-center justify-center text-xl font-bold animate-upanddown cursor-pointer'>
								#{rooms[6].topic}
							</div>
							<div className='rounded-full p-2 m-1 bg-yellow-600 text-yellow-100 w-40 h-40 flex items-center justify-center text-xl font-bold animate-upanddown3 cursor-pointer'>
								#{rooms[7].topic}
							</div>
							<div className='rounded-full p-2 m-1 bg-red-600 text-red-100 w-40 h-40  flex items-center justify-center text-xl font-bold animate-upanddown3 cursor-pointer'>
								#{rooms[8].topic}
							</div>
							<div className='rounded-full p-2 m-1 bg-teal-600 text-teal-100 w-24 h-24 flex items-center justify-center text-xl font-bold animate-upanddown3 cursor-pointer'>
								#{rooms[9].topic}
							</div>
							<div className='rounded-full p-2 m-1 bg-green-600 text-red-100 w-32 h-32 flex items-center justify-center text-xl font-bold animate-upanddown cursor-pointer'>
								#{rooms[10].topic}
							</div>
							<div className='rounded-full p-2 m-1 bg-indigo-600 text-red-100 w-40 h-40 flex items-center justify-center text-xl font-bold animate-upanddown2 cursor-pointer'>
								#{rooms[11].topic}
							</div>
							<div className='rounded-full p-2 m-1 bg-pink-600 text-red-100 w-24 h-24 flex items-center justify-center text-xl font-bold animate-upanddown3 cursor-pointer'>
								#{rooms[12].topic}
							</div>
							<div className='rounded-full p-2 m-1 bg-purple-600 text-red-100 w-36 h-36 flex items-center justify-center text-xl font-bold animate-upanddown2 cursor-pointer'>
								#{rooms[13].topic}
							</div>
							<div className='rounded-full p-2 m-1 bg-green-600 text-red-100 w-32 h-32 flex items-center justify-center text-xl font-bold animate-upanddown cursor-pointer'>
								#{rooms[14].topic}
							</div>
							<div className='rounded-full p-2 m-1 bg-blue-600 text-red-100 w-24 h-24 flex items-center justify-center text-xl font-bold animate-upanddown3 cursor-pointer'>
								#{rooms[15].topic}
							</div>
							<div className='rounded-full p-2 m-1 bg-orange-600 text-red-100 w-428 h-28 flex items-center justify-center text-xl font-bold animate-upanddown2 cursor-pointer'>
								#{rooms[16].topic}
							</div>
							<div className='rounded-full p-2 m-1 bg-yellow-600 text-red-100 w-24 h-24 flex items-center justify-center text-xl font-bold animate-upanddown cursor-pointer'>
								#{rooms[17].topic}
							</div>
							<div className='rounded-full p-2 m-1 bg-red-600 text-red-100 w-40 h-40 flex items-center justify-center text-xl font-bold animate-upanddown cursor-pointer'>
								#{rooms[18].topic}
							</div>
							<div className='rounded-full p-2 m-1 bg-gray-600 text-red-100 w-32 h-32 flex items-center justify-center text-xl font-bold animate-upanddown2 cursor-pointer'>
								#{rooms[19].topic}
							</div>
							<div className='rounded-full p-2 m-1 bg-indigo-600 text-red-100 w-24 h-24 flex items-center justify-center text-xl font-bold animate-upanddown3 cursor-pointer'>
								#{rooms[20].topic}
							</div>
							<div className='rounded-full p-2 m-1 bg-red-600 text-red-100 w-32 h-32 flex items-center justify-center text-xl font-bold animate-upanddown2 cursor-pointer'>
								#{rooms[21].topic}
							</div>
							<div className='rounded-full p-2 m-1 bg-purple-600 text-red-100 w-24 h-24 flex items-center justify-center text-xl font-bold animate-upanddown2 cursor-pointer'>
								#{rooms[22].topic}
							</div>
							<div className='rounded-full p-2 m-1 bg-green-600 text-red-100 w-32 h-32 flex items-center justify-center text-xl font-bold animate-upanddown3 cursor-pointer'>
								#{rooms[23].topic}
							</div>
							<div className='rounded-full p-2 m-1 bg-blue-600 text-red-100 w-40 h-40 flex items-center justify-center text-xl font-bold animate-upanddown cursor-pointer'>
								#{rooms[24].topic}
							</div>
							<div className='rounded-full p-2 m-1 bg-pink-600 text-red-100 w-40 h-40 flex items-center justify-center text-xl font-bold animate-upanddown cursor-pointer'>
								#{rooms[25].topic}
							</div>
							<div className='rounded-full p-2 m-1 bg-red-600 text-red-100 w-24 h-24 flex items-center justify-center text-xl font-bold animate-upanddown3 cursor-pointer'>
								#{rooms[26].topic}
							</div>
							<div className='rounded-full p-2 m-1 bg-green-600 text-red-100 w-40 h-40 flex items-center justify-center text-xl font-bold animate-upanddown2 cursor-pointer'>
								#{rooms[27].topic}
							</div>
							<div className='rounded-full p-2 m-1 bg-indigo-600 text-red-100 w-32 h-32 flex items-center justify-center text-xl font-bold animate-upanddown cursor-pointer'>
								#{rooms[28].topic}
							</div>
							<div className='rounded-full p-2 m-1 bg-pink-600 text-red-100 w-24 h-24 flex items-center justify-center text-xl font-bold animate-upanddown3 cursor-pointer'>
								#{rooms[29].topic}
							</div>
							<div className='rounded-full p-2 m-1 bg-purple-600 text-red-100 w-40 h-40 flex items-center justify-center text-xl font-bold animate-upanddown cursor-pointer'>
								#{rooms[29].topic}
							</div>
							<div className='rounded-full p-2 m-1 bg-green-600 text-red-100 w-32 h-32 flex items-center justify-center text-xl font-bold animate-upanddown3 cursor-pointer'>
								#{rooms[29].topic}
							</div>
							<div className='rounded-full p-2 m-1 bg-blue-600 text-red-100 w-32 h-32 flex items-center justify-center text-xl font-bold animate-upanddown2 cursor-pointer'>
								#{rooms[30].topic}
							</div>
							<div className='rounded-full p-2 m-1 bg-orange-600 text-red-100 w-24 h-24 flex items-center justify-center text-xl font-bold animate-upanddown cursor-pointer'>
								#{rooms[31].topic}
							</div>
							<div className='rounded-full p-2 m-1 bg-yellow-600 text-red-100 w-24 h-24 flex items-center justify-center text-xl font-bold animate-upanddown3 cursor-pointer'>
								#{rooms[32].topic}
							</div>
							<div className='rounded-full p-2 m-1 bg-red-600 text-red-100 w-32 h-32 flex items-center justify-center text-xl font-bold animate-upanddown cursor-pointer'>
								#{rooms[33].topic}
							</div>
							<div className='rounded-full p-2 m-1 bg-gray-600 text-red-100 w-36 h-36 flex items-center justify-center text-xl font-bold animate-upanddown3 cursor-pointer'>
								#{rooms[34].topic}
							</div>
							<div className='rounded-full p-2 m-1 bg-pink-600 text-red-100 w-32 h-32 flex items-center justify-center text-xl font-bold animate-upanddown cursor-pointer'>
								#{rooms[35].topic}
							</div>
							<div className='rounded-full p-2 m-1 bg-purple-600 text-red-100 w-24 h-24 flex items-center justify-center text-xl font-bold animate-upanddown2 cursor-pointer'>
								#{rooms[36].topic}
							</div>
							<div className='rounded-full p-2 m-1 bg-green-600 text-red-100 w-32 h-32 flex items-center justify-center text-xl font-bold animate-upanddown3 cursor-pointer'>
								#{rooms[37].topic}
							</div>
							<div className='rounded-full p-2 m-1 bg-blue-600 text-red-100 w-24 h-24 flex items-center justify-center text-xl font-bold animate-upanddown2 cursor-pointer'>
								#{rooms[38].topic}
							</div>
							<div className='rounded-full p-2 m-1 bg-orange-600 text-red-100 w-32 h-32 flex items-center justify-center text-xl font-bold animate-upanddown2 cursor-pointer'>
								#{rooms[39].topic}
							</div>
							<div className='rounded-full p-2 m-1 bg-pink-600 text-red-100 w-28 h-28 flex items-center justify-center text-xl font-bold animate-upanddown cursor-pointer'>
								#{rooms[40].topic}
							</div>
						</div>
					</div>
				</div>
			</>
		)
	}

	if (!loggedUser.user.rooms) {
		return (
			<div
				className='flex flex-col h-full'
				style={{ height: 'calc(100vh - 80px)', backgroundColor: '#F7FAFC' }}
			>
				<div className='flex-1 overflow-y-scroll px-4 py-2'>
					Get Started Select A Topic:
					<div className='flex flex-col space-y-4'>
						{rooms &&
							rooms.map((room) => (
								<li
									onClick={joinRoom}
									className='text-gray-400 hover:bg-gray-900 hover:text-white cursor-pointer'
									id={room.id}
									key={room.id}
								>
									#{room.topic}
								</li>
							))}
					</div>
				</div>
			</div>
		)
	}
	return (
		<div
			className='flex flex-col h-full'
			style={{ height: 'calc(100vh - 80px)', backgroundColor: '#F7FAFC' }}
		>
			<MusicPlayer />
			<div className='flex-1 overflow-y-scroll px-4 py-2'>
				<div className='flex flex-col space-y-4 overflow-y-scroll'>
					{currentMessages &&
						currentMessages.data.map((message) => (
							<MessageBlob key={message.id} message={message} />
						))}
				</div>
			</div>
			<div
				className='border-t border-gray-300 px-4 py-2'
				style={{ backgroundColor: '#EDF2F7' }}
			>
				<form className='flex items-center space-x-2' onSubmit={handleSubmit}>
					<input
						type='text'
						value={newMessage}
						onChange={handleNewMessage}
						placeholder='Type a message'
						className='flex-1 border border-gray-400 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
					/>
					<button
						type='submit'
						className='bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50'
					>
						Send
					</button>
				</form>
			</div>
		</div>
	)
}
export default MessageDisplay
