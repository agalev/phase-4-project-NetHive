import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-md p-8 mb-10 animate-gradient">
        <div className="text-6xl font-bold text-white text-center">
          Net
        </div>
        <div className="text-6xl font-bold text-white text-center">
          Hive
        </div>
      </div>
      <div className="flex space-x-4">
        <Link href="/SignUp">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Sign up
          </button>
        </Link>
        <Link href="/LogIn">
          <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
            Log in
          </button>
        </Link>
      </div>
      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 0%;
          }
          25% {
            background-position: 100% 0%;
          }
          50% {
            background-position: 100% 100%;
          }
          75% {
            background-position: 0% 100%;
          }
          100% {
            background-position: 0% 0%;
          }
        }

        .animate-gradient {
          animation: gradient 20s ease infinite;
          transform: rotate(360deg);
        }
      `}</style>
    </div>
  );
}
