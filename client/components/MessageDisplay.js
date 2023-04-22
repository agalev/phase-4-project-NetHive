import React, { useEffect, useState } from 'react'
import MusicPlayer from './MusicPlayer'
import { useDispatch, useSelector } from 'react-redux'
import { setDisplayMessages, setLoggedUserRooms } from '../store/userSlice'
import MessageBlob from './message_blob'
import handleRoomJoin from '../hooks/JoinRoom'
function MessageDisplay() {
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

		const bubbleStyles = {
			0: "rounded-full p-2 m-1 bg-gray-600 text-gray-100 xl:w-16 xl:text-xs xl:h-16 w-24 h-24 flex items-center justify-center text-xl font-bold animate-upanddown hover: cursor-pointer",
			1: "rounded-full p-2 m-1 bg-indigo-600 text-indigo-100 xl:w-32 xl:text-md xl:h-32 w-40 h-40 flex items-center justify-center text-xl font-bold animate-upanddown2 cursor-pointer",
			2: "rounded-full p-2 m-1 bg-pink-600 text-pink-100 xl:w-24 xl:text-md xl:h-24 w-32 h-32 flex items-center justify-center text-xl font-bold animate-upanddown3 cursor-pointer",
			3: "rounded-full p-2 m-1 bg-purple-600 text-purple-100 xl:w-28 xl:text-md xl:h-28 w-40 h-40 flex items-center justify-center text-xl font-bold animate-upanddown2 cursor-pointer",
			4: "rounded-full p-2 m-1 bg-green-600 text-green-100 xl:w-16 xl:text-xs xl:h-16 w-24 h-24 flex items-center justify-center text-xl font-bold animate-upanddown cursor-pointer",
			5: "rounded-full p-2 m-1 bg-blue-600 text-blue-100 xl:w-28 xl:text-md xl:h-28 w-40 h-40 flex items-center justify-center text-xl font-bold animate-upanddown3 cursor-pointer",
			6: "rounded-full p-2 m-1 bg-orange-600 text-orange-100 xl:w-20 xl:text-xs xl:h-20 w-32 h-32 flex items-center justify-center text-xl font-bold animate-upanddown cursor-pointer",
			7: "rounded-full p-2 m-1 bg-yellow-600 text-yellow-100 xl:w-32 xl:text-md xl:h-32 w-40 h-40 flex items-center justify-center text-xl font-bold animate-upanddown3 cursor-pointer",
			8: "rounded-full p-2 m-1 bg-red-600 text-red-100 xl:w-28 xl:text-sm xl:h-28 w-40 h-40  flex items-center justify-center text-xl font-bold animate-upanddown3 cursor-pointer",
			9: "rounded-full p-2 m-1 bg-teal-600 text-teal-100 xl:w-16 xl:text-sm xl:h-16 w-24 h-24 flex items-center justify-center text-xl font-bold animate-upanddown3 cursor-pointer",
			10: "rounded-full p-2 m-1 bg-green-600 text-red-100 xl:w-20 xl:text-md xl:h-20 w-32 h-32 flex items-center justify-center text-xl font-bold animate-upanddown cursor-pointer",
			11: "rounded-full p-2 m-1 bg-indigo-600 text-red-100 xl:w-32 xl:text-md xl:h-32 w-40 h-40 flex items-center justify-center text-xl font-bold animate-upanddown2 cursor-pointer",
			12: "rounded-full p-2 m-1 bg-pink-600 text-red-100 xl:w-16 xl:text-xs xl:h-16 w-24 h-24 flex items-center justify-center text-xl font-bold animate-upanddown3 cursor-pointer",
			13: "rounded-full p-2 m-1 bg-purple-600 text-red-100 xl:w-24 xl:text-md xl:h-24 w-32 h-32 flex items-center justify-center text-xl font-bold animate-upanddown2 cursor-pointer"
		};
	
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

const getRoomStyle = (index) => {
	const styleIndex = index % 10; // get a number between 0 and 9
	return styleIndex;
  };
  
  let counter = 0;

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
    

    if (rooms && rooms.length === 0 && !loggedUser.user.rooms) {
      return (
        <div className="flex items-center justify-center h-screen flex-col">
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
	<h1 class="text-center text-4xl mt-6 mb-6 font-bold bg-gradient-to-r from-my-blue to-my-purple text-transparent animate-text-reveal bg-clip-text">Welcome {loggedUser.user.first_name}, Pick Your First Room To Join:</h1>
      <div className="flex flex-col h-full overscroll-none">
        <div className="flex-1 overflow-y-scroll px-4 py-2">
          <div className="flex flex-wrap justify-center items-start">
		  {rooms.map((room, index) => {
				let newIndex = index % 13;
				console.log(newIndex)
				return (
					<div
						key={room.id}
						onClick={(e) => handleRoomJoin(e.target.id, dispatch)}
						// Use the new index to get the corresponding bubble style
						className={`${bubbleStyles[newIndex]}`}
						id={room.id}
					>
						#{room.topic}
					</div>
				);
			})}
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
