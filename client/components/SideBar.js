import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import handleRoomJoin from '../hooks/JoinRoom';
import UserPill from './user_pill'
import RoomPill from './room_pill'

function SideBar() {
    const dispatch = useDispatch()
    const loggedUser = useSelector((state) => state.user)
    const theme = useSelector((state) => state.user.userTheme)
    const value = useSelector((state) => state.user.userSearchValue)
    const [users, setUsers] = useState([])
    const [rooms, setRooms] = useState([])
    const [showroomsearch, setShowRoomSearch] = useState(false)
    const [showusersearch, setShowUserSearch] = useState(false)
    const [searchValue, setSearchValue] = useState('');
    const [usersearchValue, setUserSearchValue] = useState('');
    const [currInterval, setCurrInterval] = useState(null)
    const [showsearch, setShowSearch] = useState(false)

    console.log(value)

    const colorGradients = {
        blue: 'bg-gradient-to-b from-my-purple to-my-blue',
        orange: 'bg-gradient-to-b from-my-red to-my-orange',
        green: 'bg-gradient-to-b from-my-yellow to-my-green'
        // Add more color gradients as needed
      };

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

    if (!loggedUser.user.rooms) {
        return (
            <div
                className={`${colorGradients[theme]} text-gray-900 flex flex-col h-screen border-r-2 border-black`}
                style={{ height: `calc(100vh - 80px)` }}
            >
                <div className='p-4 border-b-2 border-gray-900 h-1/2 flex-col'>
                    <h3 className='text-lg font-semibold mb-2 text-white'>Rooms</h3>
                    <div className='h-60 overflow-y-scroll'>
                    </div>
                </div>
                <div className='p-4 flex flex-col h-1/2'>
                    <h3 className='text-lg font-semibold mb-2 text-white'>
                        Direct Message
                    </h3>
                    <div className='h-60 overflow-y-scroll'>
                        <section>
                            {users &&
                                users.map((user) => (
                                    <UserPill key={user.id} currInterval={currInterval} setCurrInterval={setCurrInterval} user={user} />
                                ))}
                        </section>
                    </div>
                </div>
            </div>
        )
    }
return (
    <div className={`${colorGradients[theme]} text-gray-900 flex flex-col h-screen border-r-2 border-black`} style={{ height: `calc(100vh - 80px)` }}>
    <div class="p-4 border-b-2 border-gray-900 h-1/2 flex-col">
      <div class="flex justify-between items-center mb-2">
      <div class="flex flex-1 justify-between items-center mb-2">
            <h3 class="text-lg font-semibold text-white">Rooms</h3>
            {!showsearch && (
                <div onClick={()=>{setShowSearch(!showsearch)}} class="flex justify-end">
                <Image
                    width={30}
                    height={30}
                    alt='search'
                    src="/Magnifying-Glass-Search-PNG-Image.png"
                    className="hover:cursor-pointer"
                />
                </div>
            )}
            </div>
        <div class="relative">
        {showsearch && (
            <input
                autoFocus={true}
                onBlur={() => {setShowSearch(!showsearch)}}
                type="text"
                placeholder="Search rooms..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full bg-transparent text-white pr-8 placeholder-gray-400 border-b-2 border-gray-900 focus:outline-none focus:border-gray-400"
            />
            )}
        </div>
      </div>
      <div className='h-60 overflow-y-scroll'>
        <ul>
          {!showsearch && (loggedUser.user.rooms.map((room) => (
            // <li className='text-gray-400 hover:bg-gray-900 hover:text-white cursor-pointer' id={room.id} key={room.id}>
            //   #{room.room.topic}
              <RoomPill key={room.id} currInterval={currInterval} setCurrInterval={setCurrInterval} room={room} />
            // </li>
          )))}
            {showsearch && rooms &&
                rooms
                .filter((room) => room.topic.toLowerCase().includes(searchValue.toLowerCase()))
                .map((room) => {
                    return(
                    <li key={room.id} onMouseDown={(e) => handleRoomJoin(e.target.id, dispatch)} className='text-gray-400 hover:bg-gray-900 hover:text-white cursor-pointer' id={room.id} >
                      #{room.topic}
                    </li>
                  )})
                }
              </ul>
            </div>
          </div>
          <div className="p-4 flex flex-col h-1/2">
            <div className="flex justify-between items-center mb-2">
              <div className="flex flex-1 justify-between items-center mb-2">
                <h3 className='text-lg font-semibold text-white'>Direct Message</h3>
                {!showusersearch && (
                  <div onClick={() => {setShowUserSearch(!showusersearch)}} className="flex justify-end">
                    <Image
                      width={30}
                      height={30}
                      alt='search'
                      src="/Magnifying-Glass-Search-PNG-Image.png"
                      className="hover:cursor-pointer"
                    />
                  </div>
                )}
              </div>
              <div className="relative">
                {showusersearch && (
                  <input
                    autoFocus={true}
                    onBlur={() => {setShowUserSearch(!showusersearch)}}
                    type="text"
                    placeholder="Search users..."
                    value={usersearchValue}
                    onChange={(e) => setUserSearchValue(e.target.value)}
                    className="w-full bg-transparent text-white pr-8 placeholder-gray-400 border-b-2 border-gray-900 focus:outline-none focus:border-gray-400"
                  />
                )}
              </div>
            </div>
            <div className='h-60 overflow-y-scroll'>
        <section>
        {!showusersearch && users && users.map((user) => (
            <UserPill currInterval={currInterval} setCurrInterval={setCurrInterval} key={user.id} user={user} />
        ))}
        {showusersearch && users
            .filter((user) => user.first_name.toLowerCase().includes(usersearchValue.toLowerCase()))
            .map((user) => (
                <UserPill currInterval={currInterval} setCurrInterval={setCurrInterval} key={user.id} user={user} />
            ))
            }
        </section>
      </div>
    </div>
  </div>
  
)
}
            
export default SideBar