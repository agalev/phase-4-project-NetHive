import { useDispatch, useSelector } from 'react-redux'
import { setDisplayMessages } from '../store/userSlice'

export default function UserPill({key, user}) {
	const dispatch = useDispatch()
	const displayMessages = () => {
		fetch(`/messages/${user.id}`)
			.then((response) => response.json())
			.then((data) => {
				dispatch(setDisplayMessages({'conversation_with': user.id, data}))
			})
			.catch((error) => console.error(error))
	}

	return (
		<article
			onClick={() => displayMessages()}
			className='text-gray-100 hover:bg-gray-900 hover:text-white cursor-pointer list-none'
			key={user.id}
		>
			{user.first_name} {user.last_name}
		</article>
	)
}
