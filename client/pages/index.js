import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="text-6xl font-bold text-blue-600">
        Net
      </div>
      <div className="text-6xl font-bold text-purple-600 mb-10">
        Hive
      </div>
      <div className="flex space-x-4">
        <Link href="/SignUp">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Sign up
          </button>
        </Link>
        <Link href="/LogIn">
          <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
            Log in
          </button>
        </Link>
      </div>
    </div>
  )
}
