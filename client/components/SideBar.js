import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import handleRoomJoin from '../hooks/JoinRoom';
import UserPill from './user_pill'
import RoomPill from './room_pill'

function SideBar() {
    const dispatch = useDispatch()
    const loggedUser = useSelector((state) => state.user)
    const [users, setUsers] = useState([])
    const [rooms, setRooms] = useState([])
    const [showsearch, setShowSearch] = useState(false)
    const [searchValue, setSearchValue] = useState('');
    const [currInterval, setCurrInterval] = useState(null)

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
                className='bg-gradient-to-b from-my-purple to-my-blue text-gray-900 flex flex-col h-screen border-r-2 border-black'
                style={{ height: `calc(100vh - 80px)` }}
            >
                <div className='p-4 border-b-2 border-gray-900 h-1/2 flex-col'>
                    <h3 className='text-lg font-semibold mb-2 text-white'>Rooms</h3>
                    <div className='h-60 overflow-y-scroll'>
                        <ul>
                            <li>Nothing</li>
                        </ul>
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
    <div class="bg-gradient-to-b from-my-purple to-my-blue text-gray-900 flex flex-col h-screen border-r-2 border-black" style={{ height: `calc(100vh - 80px)` }}>
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
                )
            })
            }
        </ul>
      </div>
    </div>
    <div class="p-4 flex flex-col h-1/2">
      <h3 class='text-lg font-semibold mb-2 text-white'>Direct Message</h3>
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
export default SideBar
