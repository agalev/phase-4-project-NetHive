import { useDispatch, useSelector } from 'react-redux'
import { setDisplayMessages } from '../store/userSlice'
export default function UserPill({ user, currInterval, setCurrInterval }) {
    const dispatch = useDispatch()
    const currentMessages = useSelector((state) => state.user.displayMessages)
    function displayMessages() {
        clearInterval(currInterval)
        const interval = setInterval(() => {
            fetch(`/messages/${user.id}`)
                .then((response) => response.json())
                .then((data) => {
                    dispatch(setDisplayMessages({ conversation_with: user.id, data }))
                })
                .catch((error) => console.error(error))
        }, 1000)
        setCurrInterval(interval)
    }
    if (!user) return <div>LOADING</div>
    return (
        <article
            onClick={() => {
                displayMessages()
            }}
            className='text-gray-100 hover:bg-gray-900 hover:text-white cursor-pointer list-none '
            key={user.id}
        >
            {user.first_name} {user.last_name}
        </article>
    )
}