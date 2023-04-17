import React from 'react'
import Header from '../components/Header'
import MessageDisplay from '../components/MessageDisplay'
import SideBar from '../components/SideBar'

import { useSelector } from 'react-redux'


function Main() {
  const loggedUser = useSelector((state) => state.user);
  // console.log('loggedUser', loggedUser.user.id)
  // const id = loggedUser.user.id
  if (loggedUser.isLoggedIn) {console.log('id', loggedUser.user.id)}
	return (
		<>
			<Header />
			<div className='flex'>
				<div className='w-1/4'>
					<SideBar />
				</div>
				<div className='w-3/4'>
					<MessageDisplay />
				</div>
			</div>
		</>
	)
}

export default Main
