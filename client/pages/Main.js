import React from 'react'
import Header from '../components/Header'
import MessageDisplay from '../components/MessageDisplay'
import SideBar from '../components/SideBar'

function Main() {
<<<<<<< HEAD
=======
	const dispatch = useDispatch()
	const loggedUser = useSelector((state) => state.user);
	const [isLoaded, setIsLoaded] = useState(false);
	const [runeffect, setRunEffect] = useState(false);

	useEffect(() => {
		if (loggedUser.user.rooms != []){
		  setIsLoaded(true)
		}
	  }, []);

	function handleRoomJoin(roomID){
		fetch(`/rooms/${roomID}`, {
			method: 'PATCH',
			headers: {
			  'Content-Type': 'application/json',
			},
		  })
			.then(response => response.json())
			.then(data => {
				dispatch(setLoggedUserRooms(data[0].rooms))
				console.log(data[0].rooms)})
			.catch(error => console.error(error))
	}

	// console.log(loggedUser.user.rooms)
	
	useEffect(() => {
		setIsLoaded(true)
	}, [runeffect])
>>>>>>> main

	return (
		<>
			<Header />
			<div className='flex'>
				<div className='w-1/4'>
					<SideBar/>
				</div>
				<div className='w-3/4'>
					<MessageDisplay/>
				</div>
			</div>
		</>
	)
}

export default Main
