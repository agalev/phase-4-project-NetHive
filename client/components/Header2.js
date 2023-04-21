import Link from 'next/link';
import { useSelector } from 'react-redux';

const Header2 = ({ loggedUser }) => {

  const theme = useSelector((state) => state.user.userTheme)

  const colorGradients = {
    blue: 'bg-gradient-to-r from-my-blue to-my-purple',
    orange: 'bg-gradient-to-r from-my-orange to-my-red',
    green: 'bg-gradient-to-r from-my-green to-my-yellow'
    // Add more color gradients as needed
  };


    return (
        <div className="flex items-center justify-between bg-gray-900 text-white py-4 px-6" style={{ height: '80px' }}>
          <div className="flex items-center">
            <Link href='/Main' className="flex items-center text-gray-300 hover:text-white focus:outline-none">
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span id='home-button' className="ml-2">Back</span>
            </Link>
          </div>
          <div className="flex items-center justify-center pr-16 pl-">
            <h1 className={`${colorGradients[theme]} text-4xl font-large text-transparent bg-clip-text`}>Net</h1>
            <h1 className={`${colorGradients[theme]} text-4xl font-large text-transparent bg-clip-text`}>Hive</h1>
          </div>
          <div></div>
        </div>
      );
      
}

export default Header2;
