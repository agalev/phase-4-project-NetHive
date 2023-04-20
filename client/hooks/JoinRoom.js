
import { setLoggedUserRooms } from '../store/userSlice';

function handleRoomJoin(roomID, dispatch){
    // const dispatch = useDispatch()
    console.log('hello')
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
export default handleRoomJoin