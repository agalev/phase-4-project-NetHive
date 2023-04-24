import { Formik, Form, Field, ErrorMessage, setFieldValue } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import * as yup from 'yup'

import { useSelector, useDispatch } from 'react-redux'
import { login, setInitalImage } from '../store/userSlice'
import { useEffect } from 'react'

const MAX_IMAGE_SIZE = 1024 * 1024;
const SUPPORTED_IMAGE_FORMATS = ['image/jpeg', 'image/png'];

// Define validation schema
const validationSchema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one digit"
    ),
  image: yup
    .mixed()
    .test(
      "fileSize",
      "File size too large",
      (value) => !value || (value && value.size <= MAX_IMAGE_SIZE)
    )
    .test(
      "fileType",
      "Unsupported file format",
      (value) => !value || (value && SUPPORTED_IMAGE_FORMATS.includes(value.type))
    ),
});


export default function SignUpModal() {

  const dispatch = useDispatch()
  const router = useRouter()

    useEffect(() => {
      console.log('refresh')
    },[])

  const handleSubmit = (values) => {
    console.log(values)
    const formData = new FormData();
    formData.append('first_name', values.first_name);
    formData.append('last_name', values.last_name);
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('image', values.image);
    
    fetch('/signup', {
      method: 'POST',
      body: formData
    })
    .then((res) => {
      if (res.ok) {
        res
        .json()
        .then((data) => {
          dispatch(login(data));
          dispatch(setInitalImage(data.image))})
        .then(() => router.push('/Main'))
      } else {
        throw new Error('Unable to sign up')
      }
    })
    .catch((err) => console.log(err))
  }
	return (
	  <div className='min-h-screen bg-gradient-to-br from-purple-700 to-blue-500 flex items-center justify-center'>
			<div className='w-full max-w-sm'>
				<div className='bg-white rounded-lg shadow-lg p-6'>
					<h2 className='text-xl font-bold mb-4'>Sign Up</h2>
					<Formik
						initialValues={{
							first_name: '',
							last_name: '',
							email: '',
							password: '',
							image: ''
						}}
						validationSchema={validationSchema}
						onSubmit={(values) => {
							handleSubmit(values)
						}}
					>
						{({ isSubmitting, setFieldValue }) => (
							<Form className='space-y-4' encType='multipart/form-data'>
								<div>
									<label
                    htmlFor="first_name"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    First Name:
                  </label>
                  <Field
                    id="first_name"
                    name="first_name"
                    type="text"
                    className="border border-gray-400 p-2 w-full rounded-lg"
                  />
                  <ErrorMessage
                    name="first_name"
                    render={(msg) => (
                      <div className="text-red-500">
                        <div>{msg}</div>
                      </div>
                    )}
                  />
                </div>
                <div>
                  <label
                    htmlFor="last_ame"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Last Name:
                  </label>
                  <Field
                    id="last_name"
                    name="last_name"
                    type="text"
                    className="border border-gray-400 p-2 w-full rounded-lg"
                  />
                  <ErrorMessage
                    name="last_name"
                    render={(msg) => (
                      <div className="text-red-500">
                        <div>{msg}</div>
                      </div>
                    )}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-semibold mb-2"
                    >
                    Email:
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    className="border border-gray-400 p-2 w-full rounded-lg"
                    />
                    <ErrorMessage
                      name="email"
                      render={(msg) => (
                        <div className="text-red-500">
                          <div>{msg}</div>
                        </div>
                      )}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-gray-700 font-semibold mb-2"
                    >
                      Password:
                    </label>
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      className="border border-gray-400 p-2 w-full rounded-lg"
                    />
                    <ErrorMessage
                      name="password"
                      render={(msg) => (
                        <div className="text-red-500">
                          <div>{msg}</div>
                        </div>
                      )}
                    />
                  </div>
                  <div>
                    <label htmlFor="image" className="block text-gray-700 font-semibold mb-2">
                      Profile Picture:
                    </label>
                    <input
                      id="image"
                      name="image"
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={(event) => {
                        setFieldValue("image", event.currentTarget.files[0], true);
                      }}
                      className="border border-gray-400 p-2 w-full rounded-lg"
                    />
                    <ErrorMessage
                      name="image"
                      render={(msg) => (
                        <div className="text-red-500 mt-2">
                          <div>{msg}</div>
                        </div>
                      )}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                  >
                    Sign Up
                  </button>
                  <div className="text-center mt-4">
                    Already have an account?{" "}
                    <Link href="/LogIn">
                    Log in
                  </Link>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      );
    }
