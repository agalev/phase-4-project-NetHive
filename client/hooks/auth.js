import { useEffect } from 'react'
import { login, setInitalImage, setLoggedUserImage } from '../store/userSlice'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

export default function Auth() {
    const loggedUser = useSelector((state) => state.user)
	const dispatch = useDispatch()
	const router = useRouter()
    useEffect(() => {
        if (loggedUser){
        fetch('/check_auth')
          .then((res) => {
            if (res.ok) {
              res
                .json()
                .then((data) => {
                  dispatch(login(data));
                  dispatch(setInitalImage(data.image));
                  fetch(`/api/getImage?imagePath=${encodeURIComponent(data.image)}`)
                    .then(response => response.blob())
                    .then(blob => URL.createObjectURL(blob))
                    .then(url => {
                      dispatch(setLoggedUserImage(url));
                      console.log('hello');
                    })
                    .catch(error => console.error(error))
                    .finally(() => console.log('fetch request completed'));
                    if (router.pathname == '/Main' || router.pathname == '/'){
                  router.push('/Main');
                    }else{
                        router.push('/ProfilePage')
                    }
                })
                .catch((err) => console.log(err));
            }
          });
        }
      }, []);
}