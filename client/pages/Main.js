import React, { use, useState } from 'react'
import Header from '../components/Header'
import MessageDisplay from '../components/MessageDisplay'
import SideBar from '../components/SideBar'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Auth from '../hooks/auth'
import { useDispatch } from 'react-redux'

function Main() {
    const dispatch = useDispatch()
    const router = useRouter()
    const [refresh, setRefresh] = useState(false)
    const [change, setChange] = useState(false)
      
//    Auth();
    
    
    return (
        <>
            <Header />
            <div className='flex'>
                <div className='w-1/4'>
                    <SideBar/>
                </div>
                <div className=' overflow-hidden w-3/4'>
                    <MessageDisplay />
                </div>
            </div>
        </>
    )
}
export default Main