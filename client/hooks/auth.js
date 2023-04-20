import { useEffect } from 'react'
import { login, setInitalImage } from '../store/userSlice'
import { useDispatch } from 'react-redux'
import { useRouter} from 'next/router'

export default function Auth() {
	const dispatch = useDispatch()
  const router = useRouter()
	useEffect(() => {
		fetch('/check_auth').then((res) => {
			if (res.ok) {
				res
					.json()
					.then((data) => {
						dispatch(login(data))
						dispatch(setInitalImage(data.image))
            router.push('/Main')
					})
					.catch((err) => console.log(err))
			}
		})
	}, [])
}