import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import Header2 from "../components/Header2";

import {
  setLoggedUserFirstName,
  setInitialImage,
  setLoggedUserLastName,
  setLoggedUserEmail,
} from "../store/userSlice";

function ProfilePage() {
  const router = useRouter();
  const loggedUser = useSelector((state) => state.user);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [firstNameEditMode, setFirstNameEditMode] = useState(false);
  const [lastNameEditMode, setLastNameEditMode] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(loggedUser.user.email);
  const [selectedImageFile, setSelectedImageFile] = useState(null);

  const dispatch = useDispatch();

  function handleSave(val, make) {
    let updatedUser;
    if (make == "first") {
      updatedUser = {
        first_name: firstName,
      };
    } else if (make == "last") {
      updatedUser = {
        last_name: lastName,
      };
    }
    fetch(`/users/${loggedUser.user.id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedUser),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          dispatch(setLoggedUserFirstName(data.first_name));
          dispatch(setLoggedUserLastName(data.last_name));
          dispatch(setLoggedUserEmail(data.email));
          dispatch({ type: "UPDATE_USER", payload: data });
          setFirstNameEditMode(false);
          setLastNameEditMode(false);
        });
      }
    });
  }

  const handleDelete = async () => {
    try {
      // Replace this with your API call to delete the user
      console.log("Deleting user...");
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
    handleDelete();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const dataURL = reader.result;
      dispatch(setInitialImage(dataURL));
    };
    reader.readAsDataURL(file);
    setSelectedImageFile(file);
  };

  const handleImageClick = () => {
    document.getElementById("file-input").click();
  };

  return (
    <div className="bg-gradient-to-br from-purple-700 to-blue-500 min-h-screen ">
      <Header2 />
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-10 mt-36">
        <h2 className="text-3xl font-bold text-gray-800 text-center w-full">
          Account Details
        </h2>
        <div className="mt-5 space-y-8">
          <div className="0 relative">
            <img
              src={loggedUser.user.image}
              alt="Profile Image"
              width={150}
              className="rounded-full mx-auto"
            />
            <div
              className="absolute bottom-0 right-0 p-2 rounded-full bg-gray-800 text-white hover:bg-gray-900 cursor-pointer opacity-0 transition-opacity duration-300 ease-in-out group hover:opacity-100"
              onClick={handleImageClick}
            >
              <span className="block text-xs">Change profile picture</span>
              <input
                type="file"
                id="file-input"
                accept=".jpg,.jpeg,.png"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>
          <div className="mt-4 flex items-center ">
            <label className="font-bold mr-9 ml-9">First Name:</label>
            <span className="ml-2 ">{loggedUser.user.first_name}</span>
            <button
              onClick={() => setFirstNameEditMode(true)}
              className="ml-2 text-gray-500 hover:text-gray-800"
            >
              Edit
            </button>
          </div>
          {firstNameEditMode ? (
            <div>
              <input
                type="text"
                placeholder={loggedUser.user.first_name}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <button
                onClick={() => handleSave(firstName, "first")}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded text-center mt-2"
              >
                Save
              </button>
            </div>
          ) : null}
          <div className="flex items-center">
            <label className="font-bold mr-9 ml-9  ">Last Name:</label>
            <span className="ml-2">{loggedUser.user.last_name}</span>
            <button
              onClick={() => setLastNameEditMode(true)}
              className="ml-2 text-gray-500 hover:text-gray-800 "
            >
              Edit
            </button>
          </div>
          {lastNameEditMode ? (
            <div>
              <input
                type="text"
                placeholder={loggedUser.user.last_name}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <button
                onClick={() => handleSave(lastName, "last")}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded text-center mt-2"
              >
                Save
              </button>
            </div>
          ) : null}
          <div>
            <label className="font-bold ml-9 mr-20 ">Email:</label>
            <span className="pl-1 ">{loggedUser.user.email}</span>
          </div>
          <div>
            <label className="font-bold"></label>
          </div>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded text-center w-full"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-60 z-50"></div>
      )}
      {showDeleteModal && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-md p-6 z-50">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
            Confirm Delete
          </h2>
          <p className="mb-4">Are you sure you want to delete your account?</p>
          <div className="flex justify-end">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded  mr-2"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmDelete}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      )}
      {/* Back to home link */}
      {/* <div className="mt-8 text-center"> */}
      {/* <Link href="/" legacyBehavior> */}
      {/* <a className="text-blue-500 hover:text-blue-700">Back to Home</a> */}
      {/* </Link> */}
    </div>
    // </div>
  );
}

export default ProfilePage;
