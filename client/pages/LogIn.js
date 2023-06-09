import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { useSelector, useDispatch } from 'react-redux'
import { login } from '../store/userSlice'
import { setLoggedUserImage, setInitalImage } from '../store/userSlice'

export default function Login() {
	const dispatch = useDispatch()
	const loggedUser = useSelector((state) => state.user)

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const router = useRouter()

	const handleSubmit = (e) => {
		e.preventDefault()
		const user = {
			email,
			password
		}
		fetch('/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		})
			.then((res) => {
				if (res.ok) {
					res
						.json()
						.then((data) => {
							dispatch(login(data))
							// console.log(data)
							dispatch(setInitalImage(data.image))
						})
						.then(() => router.push('/Main'))
				} else {
					throw new Error('Invalid Credentials')
				}
			})
			.catch((err) => console.log(err))
	}

	const handleChange = (e) => {
		if (e.target.name === 'email') setEmail(e.target.value)
		else setPassword(e.target.value)
	}

	return (
		<div className='min-h-screen bg-gradient-to-br from-purple-700 to-blue-500 flex items-center justify-center'>
			<div className='bg-white p-10 rounded-lg shadow-md'>
				<h2 className='text-3xl font-bold text-gray-800 mb-8'>Log in</h2>
				<form onSubmit={handleSubmit}>
					<div className='mb-4'>
						<label
							className='block text-gray-700 font-bold mb-2'
							htmlFor='email'
						>
							Email:
						</label>
						<input
							className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							id='email'
							name='email'
							type='text'
							value={email}
							onChange={handleChange}
						/>
					</div>
					<div className='mb-4'>
						<label
							className='block text-gray-700 font-bold mb-2'
							htmlFor='password'
						>
							Password:
						</label>
						<input
							className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							id='password'
							name='password'
							type='password'
							value={password}
							onChange={handleChange}
						/>
					</div>
					<input
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer'
						id='submit-btn'
						type='submit'
						value='Enter'
					/>
				</form>
				<div className='text-sm mt-4'>
					<Link href='/'>
						<button className='text-blue-500 hover:text-blue-700 bg-transparent border-none cursor-pointer'>
							Back to home
						</button>
					</Link>
				</div>
			</div>
		</div>
	)
}
