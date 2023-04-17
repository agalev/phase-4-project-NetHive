import { useState } from 'react';
import Link from 'next/link';

export default function SignUpModal({ submitFunction }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    submitFunction(event);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Sign Up</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstName" className="block text-gray-700 font-semibold mb-2">First Name:</label>
              <input id="firstName" name="first_name" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="border border-gray-400 p-2 w-full rounded-lg"/>
            </div>
            <div>
              <label htmlFor="lastName" className="block text-gray-700 font-semibold mb-2">Last Name:</label>
              <input id="lastName" name="last_name" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="border border-gray-400 p-2 w-full rounded-lg"/>
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email:</label>
              <input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border border-gray-400 p-2 w-full rounded-lg"/>
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password:</label>
              <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border border-gray-400 p-2 w-full rounded-lg"/>
            </div>
            <div>
              <label htmlFor="image" className="block text-gray-700 font-semibold mb-2">Image URL:</label>
              <input id="image" name="img" type="text" value={image} onChange={(e) => setImage(e.target.value)} className="border border-gray-400 p-2 w-full rounded-lg"/>
            </div>
            <div>
              <input id="submit" type="submit" value="Sign up" className="bg-blue-500 text-white px-4 py-2 rounded-lg"/>
            </div>
          </form>
          <div className="mt-4">
            <Link href="/">
              <button className="text-blue-500">Back to home</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
