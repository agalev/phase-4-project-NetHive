import React from 'react';
import Header from './Header';
import MessageDisplay from './MessageDisplay';
import SideBar from './SideBar';

function Main() {
  return (
    <>
      <Header />
      <div className="flex">
        <div className="w-1/4">
          <SideBar />
        </div>
        <div className="w-3/4">
          <MessageDisplay />
        </div>
      </div>
    </>
  );
}

export default Main;
