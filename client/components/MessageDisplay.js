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
      return (
        <div className="flex items-center justify-center h-screen flex-col overscroll-none">
          <div className="text-xl font-bold mb-4">Generating Topics</div>
          <div role="status">
          <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
          </div>
        </div>
      );
    }
    


    
  if (!loggedUser.user.rooms || loggedUser.user.rooms.length === 0) {
    return (
      <>
      {/* <h1>Welcome New User, Pick A Topic:</h1> */}
      <div className="flex flex-col h-full bg-gray-100 overscroll-none">
        <div className="flex-1 overflow-y-scroll px-4 py-2">
          <div className="flex flex-wrap justify-center items-start">
          <div onClick={(e) => handleRoomJoin(e.target.id, dispatch)} className="rounded-full p-2 m-1 bg-gray-600 text-gray-100 w-24 h-24 flex items-center justify-center text-xl font-bold animate-upanddown hover: cursor-pointer" id={rooms[0].id}>#{rooms[0].topic}</div>
            <div onClick={(e) => handleRoomJoin(e.target.id, dispatch)} className="rounded-full p-2 m-1 bg-indigo-600 text-indigo-100 w-40 h-40 flex items-center justify-center text-xl font-bold animate-upanddown2 cursor-pointer" id={rooms[1].id}>#{rooms[1].topic}</div>
            <div onClick={(e) => handleRoomJoin(e.target.id, dispatch)} className="rounded-full p-2 m-1 bg-pink-600 text-pink-100 w-32 h-32 flex items-center justify-center text-xl font-bold animate-upanddown3 cursor-pointer" id={rooms[2].id}>#{rooms[2].topic}</div>
            <div onClick={(e) => handleRoomJoin(e.target.id, dispatch)} className="rounded-full p-2 m-1 bg-purple-600 text-purple-100 w-40 h-40 flex items-center justify-center text-xl font-bold animate-upanddown2 cursor-pointer" id={rooms[3].id}>#{rooms[3].topic}</div>
            <div onClick={(e) => handleRoomJoin(e.target.id, dispatch)} className="rounded-full p-2 m-1 bg-green-600 text-green-100 w-24 h-24 flex items-center justify-center text-xl font-bold animate-upanddown cursor-pointer" id={rooms[4].id}>#{rooms[4].topic}</div>
            <div onClick={(e) => handleRoomJoin(e.target.id, dispatch)} className="rounded-full p-2 m-1 bg-blue-600 text-blue-100 w-40 h-40 flex items-center justify-center text-xl font-bold animate-upanddown3 cursor-pointer" id={rooms[5].id}>#{rooms[5].topic}</div>
            <div onClick={(e) => handleRoomJoin(e.target.id, dispatch)} className="rounded-full p-2 m-1 bg-orange-600 text-orange-100 w-32 h-32 flex items-center justify-center text-xl font-bold animate-upanddown cursor-pointer" id={rooms[6].id}>#{rooms[6].topic}</div>
            <div onClick={(e) => handleRoomJoin(e.target.id, dispatch)} className="rounded-full p-2 m-1 bg-yellow-600 text-yellow-100 w-40 h-40 flex items-center justify-center text-xl font-bold animate-upanddown3 cursor-pointer" id={rooms[7].id}>#{rooms[7].topic}</div>
            <div onClick={(e) => handleRoomJoin(e.target.id, dispatch)} className="rounded-full p-2 m-1 bg-red-600 text-red-100 w-40 h-40  flex items-center justify-center text-xl font-bold animate-upanddown3 cursor-pointer" id={rooms[8].id}>#{rooms[8].topic}</div>
            <div onClick={(e) => handleRoomJoin(e.target.id, dispatch)} className="rounded-full p-2 m-1 bg-teal-600 text-teal-100 w-24 h-24 flex items-center justify-center text-xl font-bold animate-upanddown3 cursor-pointer" id={rooms[9].id}>#{rooms[9].topic}</div>
            <div onClick={(e) => handleRoomJoin(e.target.id, dispatch)} className="rounded-full p-2 m-1 bg-green-600 text-red-100 w-32 h-32 flex items-center justify-center text-xl font-bold animate-upanddown cursor-pointer" id={rooms[10].id}>#{rooms[10].topic}</div>
            <div onClick={(e) => handleRoomJoin(e.target.id, dispatch)} className="rounded-full p-2 m-1 bg-indigo-600 text-red-100 w-40 h-40 flex items-center justify-center text-xl font-bold animate-upanddown2 cursor-pointer" id={rooms[11].id}>#{rooms[11].topic}</div>
            <div onClick={(e) => handleRoomJoin(e.target.id, dispatch)} className="rounded-full p-2 m-1 bg-pink-600 text-red-100 w-24 h-24 flex items-center justify-center text-xl font-bold animate-upanddown3 cursor-pointer" id={rooms[12].id}>#{rooms[12].topic}</div>
            <div onClick={(e) => handleRoomJoin(e.target.id, dispatch)} className="rounded-full p-2 m-1 bg-purple-600 text-red-100 w-36 h-36 flex items-center justify-center text-xl font-bold animate-upanddown2 cursor-pointer" id={rooms[13].id}>#{rooms[13].topic}</div>
            <div onClick={(e) => handleRoomJoin(e.target.id, dispatch)} className="rounded-full p-2 m-1 bg-green-600 text-red-100 w-32 h-32 flex items-center justify-center text-xl font-bold animate-upanddown cursor-pointer" id={rooms[14].id}>#{rooms[14].topic}</div>
            <div onClick={(e) => handleRoomJoin(e.target.id, dispatch)} className="rounded-full p-2 m-1 bg-blue-600 text-red-100 w-24 h-24 flex items-center justify-center text-xl font-bold animate-upanddown3 cursor-pointer" id={rooms[15].id}>#{rooms[15].topic}</div>
            <div onClick={(e) => handleRoomJoin(e.target.id, dispatch)} className="rounded-full p-2 m-1 bg-orange-600 text-red-100 w-428 h-28 flex items-center justify-center text-xl font-bold animate-upanddown2 cursor-pointer" id={rooms[16].id}>#{rooms[16].topic}</div>
            <div onClick={(e) => handleRoomJoin(e.target.id, dispatch)} className="rounded-full p-2 m-1 bg-yellow-600 text-red-100 w-32 h-32 flex items-center justify-center text-xl font-bold animate-upanddown cursor-pointer" id={rooms[17].id}>#{rooms[17].topic}</div>
            <div onClick={(e) => handleRoomJoin(e.target.id, dispatch)} className="rounded-full p-2 m-1 bg-red-600 text-red-100 w-40 h-40 flex items-center justify-center text-xl font-bold animate-upanddown cursor-pointer" id={rooms[18].id}>#{rooms[18].topic}</div>
            <div onClick={(e) => handleRoomJoin(e.target.id, dispatch)} className="rounded-full p-2 m-1 bg-gray-600 text-red-100 w-32 h-32 flex items-center justify-center text-xl font-bold animate-upanddown2 cursor-pointer" id={rooms[19].id}>#{rooms[19].topic}</div>
            <div onClick={(e) => handleRoomJoin(e.target.id, dispatch)} className="rounded-full p-2 m-1 bg-indigo-600 text-red-100 w-24 h-24 flex items-center justify-center text-xl font-bold animate-upanddown3 cursor-pointer" id={rooms[20].id}>#{rooms[20].topic}</div>
            <div onClick={(e) => handleRoomJoin(e.target.id, dispatch)} className="rounded-full p-2 m-1 bg-red-600 text-red-100 w-32 h-32 flex items-center justify-center text-xl font-bold animate-upanddown2 cursor-pointer" id={rooms[21].id}>#{rooms[21].topic}</div>
            <div onClick={(e) => handleRoomJoin(e.target.id, dispatch)} className="rounded-full p-2 m-1 bg-purple-600 text-red-100 w-24 h-24 flex items-center justify-center text-xl font-bold animate-upanddown2 cursor-pointer" id={rooms[22].id}>#{rooms[22].topic}</div>
            <div onClick={(e) => handleRoomJoin(e.target.id, dispatch)} className="rounded-full p-2 m-1 bg-green-600 text-red-100 w-32 h-32 flex items-center justify-center text-xl font-bold animate-upanddown3 cursor-pointer" id={rooms[23].id}>#{rooms[23].topic}</div>
            <div onClick={(e) => handleRoomJoin(e.target.id, dispatch)} className="rounded-full p-2 m-1 bg-blue-600 text-red-100 w-40 h-40 flex items-center justify-center text-xl font-bold animate-upanddown cursor-pointer" id={rooms[24].id}>#{rooms[24].topic}</div>
            <div onClick={(e) => handleRoomJoin(e.target.id, dispatch)} className="rounded-full p-2 m-1 bg-pink-600 text-red-100 w-40 h-40 flex items-center justify-center text-xl font-bold animate-upanddown cursor-pointer" id={rooms[25].id}>#{rooms[25].topic}</div>
            <div onClick={(e) => handleRoomJoin(e.target.id, dispatch)} className="rounded-full p-2 m-1 bg-red-600 text-red-100 w-24 h-24 flex items-center justify-center text-xl font-bold animate-upanddown3 cursor-pointer" id={rooms[26].id}>#{rooms[26].topic}</div>
            <div onClick={(e) => handleRoomJoin(e.target.id, dispatch)} className="rounded-full p-2 m-1 bg-green-600 text-red-100 w-40 h-40 flex items-center justify-center text-xl font-bold animate-upanddown2 cursor-pointer" id={rooms[27].id}>#{rooms[27].topic}</div>
            <div onClick={(e) => handleRoomJoin(e.target.id, dispatch)} className="rounded-full p-2 m-1 bg-indigo-600 text-red-100 w-32 h-32 flex items-center justify-center text-xl font-bold animate-upanddown cursor-pointer" id={rooms[28].id}>#{rooms[28].topic}</div>
            <div onClick={(e) => handleRoomJoin(e.target.id, dispatch)} className="rounded-full p-2 m-1 bg-pink-600 text-red-100 w-32 h-32 flex items-center justify-center text-xl font-bold animate-upanddown3 cursor-pointer" id={rooms[29].id}>#{rooms[29].topic}</div>
            <div onClick={(e) => handleRoomJoin(e.target.id, dispatch)} className="rounded-full p-2 m-1 bg-purple-600 text-red-100 w-40 h-40 flex items-center justify-center text-xl font-bold animate-upanddown cursor-pointer" id={rooms[30].id}>#{rooms[30].topic}</div>
            <div onClick={(e) => handleRoomJoin(e.target.id, dispatch)} className="rounded-full p-2 m-1 bg-green-600 text-red-100 w-32 h-32 flex items-center justify-center text-xl font-bold animate-upanddown3 cursor-pointer" id={rooms[31].id}>#{rooms[31].topic}</div>
            <div onClick={(e) => handleRoomJoin(e.target.id, dispatch)} className="rounded-full p-2 m-1 bg-red-600 text-red-100 w-32 h-32 flex items-center justify-center text-xl font-bold animate-upanddown2 cursor-pointer" id={rooms[32].id}>#{rooms[32].topic}</div>
            <div onClick={(e) => handleRoomJoin(e.target.id, dispatch)} className="rounded-full p-2 m-1 bg-orange-600 text-red-100 w-24 h-24 flex items-center justify-center text-xl font-bold animate-upanddown cursor-pointer" id={rooms[33].id}>#{rooms[33].topic}</div>
            <div onClick={(e) => handleRoomJoin(e.target.id, dispatch)} className="rounded-full p-2 m-1 bg-yellow-600 text-red-100 w-24 h-24 flex items-center justify-center text-xl font-bold animate-upanddown3 cursor-pointer" id={rooms[34].id}>#{rooms[34].topic}</div>
            <div onClick={(e) => handleRoomJoin(e.target.id, dispatch)} className="rounded-full p-2 m-1 bg-red-600 text-red-100 w-32 h-32 flex items-center justify-center text-xl font-bold animate-upanddown cursor-pointer" id={rooms[35].id}>#{rooms[35].topic}</div>
            <div onClick={(e) => handleRoomJoin(e.target.id, dispatch)} className="rounded-full p-2 m-1 bg-gray-600 text-red-100 w-36 h-36 flex items-center justify-center text-xl font-bold animate-upanddown3 cursor-pointer" id={rooms[36].id}>#{rooms[36].topic}</div>
            <div onClick={(e) => handleRoomJoin(e.target.id, dispatch)} className="rounded-full p-2 m-1 bg-pink-600 text-red-100 w-32 h-32 flex items-center justify-center text-xl font-bold animate-upanddown cursor-pointer" id={rooms[37].id}>#{rooms[37].topic}</div>
            <div onClick={(e) => handleRoomJoin(e.target.id, dispatch)} className="rounded-full p-2 m-1 bg-purple-600 text-red-100 w-24 h-24 flex items-center justify-center text-xl font-bold animate-upanddown2 cursor-pointer" id={rooms[38].id}>#{rooms[38].topic}</div>
            <div onClick={(e) => handleRoomJoin(e.target.id, dispatch)} className="rounded-full p-2 m-1 bg-green-600 text-red-100 w-32 h-32 flex items-center justify-center text-xl font-bold animate-upanddown3 cursor-pointer" id={rooms[39].id}>#{rooms[39].topic}</div>
            <div onClick={(e) => handleRoomJoin(e.target.id, dispatch)} className="rounded-full p-2 m-1 bg-blue-600 text-red-100 w-36 h-36 flex items-center justify-center text-xl font-bold animate-upanddown2 cursor-pointer" id={rooms[40].id}>#{rooms[40].topic}</div>
  

            

          </div>
        </div>
      </div>
      </>
    );
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
