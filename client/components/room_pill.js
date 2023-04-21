import { useDispatch, useSelector } from 'react-redux'
import { setDisplayMessages } from '../store/userSlice'

export default function UserPill({ room, currInterval, setCurrInterval }) {
	const dispatch = useDispatch()
	const currentMessages = useSelector((state) => state.user.displayMessages)

	function displayMessages() {
		clearInterval(currInterval)
		const interval = setInterval(() => {
			fetch(`/room_messages/${room.room.id}`)
				.then((response) => response.json())
				.then((data) => {
					dispatch(
						setDisplayMessages({ conversation_with_room: room.room.id, data })
					)
				})
				.catch((error) => console.error(error))
		}, 1000)
		setCurrInterval(interval)
	}
	if (!room) return <div>LOADING</div>
	return (
		<article
			onClick={() => {
				displayMessages()
			}}
			className='text-gray-100 hover:bg-gray-900 hover:text-white cursor-pointer list-none'
			key={room.id}
		>
			{room.room.topic} ·{' '}
			{room.room.members == 1
				? `${room.room.members} member`
				: `${room.room.members} members`}
		</article>
	)
}
