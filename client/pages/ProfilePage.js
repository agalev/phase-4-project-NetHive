import React from 'react';
import { useRouter } from 'next/router';

function ProfilePage() {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      // Replace this with your API call to delete the user
      console.log('Deleting user...');
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto py-8">
        <a onClick={() => router.back()} className="text-gray-500 hover:text-gray-700 cursor-pointer">
          Back
        </a>
        <h2 className="text-2xl font-bold mt-4">Account Details</h2>
        <div className="mt-8 space-y-4">
          <div>
            <label className="font-bold">First Name:</label>
            <span className="ml-2">John</span>
          </div>
          <div>
            <label className="font-bold">Last Name:</label>
            <span className="ml-2">Doe</span>
          </div>
          <div>
            <label className="font-bold">Email:</label>
            <span className="ml-2">johndoe@example.com</span>
          </div>
          <div>
            <label className="font-bold">Profile Image:</label>
            <img
              src="https://media.wired.com/photos/5f87340d114b38fa1f8339f9/master/w_1600%2Cc_limit/Ideas_Surprised_Pikachu_HD.jpg"
              alt="Profile Image"
              width={150}
              height={150}
              className="rounded-full mt-2"
            />
          </div>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
