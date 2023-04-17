import React from 'react'
import Header from './Header'
import MessageDisplay from './MessageDisplay'
import SideBar from './SideBar'

import { useSelector } from 'react-redux'


function Main() {
  const loggedUser = useSelector((state) => state.user);
  // console.log('loggedUser', loggedUser.user.id)
  const id = loggedUser.user.id
  console.log('id', id)
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
