import React from 'react'
import Header from '../components/Header'
import MessageDisplay from '../components/MessageDisplay'
import SideBar from '../components/SideBar'
import { useSelector } from 'react-redux'

function Main() {
  const loggedUser = useSelector((state) => state.user);

  return (
    <>
      <Header />
      <div className='flex'>
        <div className='w-1/4'>
          <SideBar />
        </div>
        <div className='w-3/4 flex flex-col'>
          <div className='flex-grow'>
            <MessageDisplay />
          </div>
        </div>
      </div>
    </>
  )
}

export default Main
