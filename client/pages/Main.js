import React from 'react'
import Header from '../components/Header'
import MessageDisplay from '../components/MessageDisplay'
import SideBar from '../components/SideBar'

function Main() {
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
