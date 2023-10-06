import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../pages/Auth";
import '../../styles/MainSideBar.css';
import { NavLink } from "react-router-dom";
import Logo from "./Logo Transparent.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleQuestion, faGear, faGauge,
  faUserGroup
} from '@fortawesome/free-solid-svg-icons';
import firebaseApp from "../../pages/firebase.js";
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const navigation = [
  { name: 'Dashboard', href: 'dashboard', icon: faGauge },
  { name: 'Begin Audio Session', href: 'chat', icon: faUserGroup },
  { name: 'Settings', href: 'settings', icon: faGear, current: false },
  { name: 'Support', href: 'support', icon: faCircleQuestion, current: false },
];

export default function MainSideBar() {
  const { currentUser } = useContext(AuthContext);
  const [name, setName] = useState()
  const db = getFirestore(firebaseApp);

  const displayInitial = currentUser?.displayName ? currentUser.displayName.charAt(0).toUpperCase() : (name ? name.charAt(0).toUpperCase() : "?");
  const fetchUserName = async (uid) => {
    if (!currentUser?.displayName) {
      const userRef = await doc(db, 'users', uid)
      const userSnapShot = await getDoc(userRef)
      if (userSnapShot.exists()) {
        console.log(userSnapShot.data());
        setName(userSnapShot.data().name ?? userSnapShot.data().displayName);
      } else {
        console.log('User document not found');
      }
    }
  }

  useEffect(() => {
    fetchUserName(currentUser?.uid)
  })

  return (
    <div className="sidebar-container">
    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 h-screen">
      <div className="flex h-12 shrink-0 items-center">
        <img
          className="h-8 w-auto mt-4"
          src={Logo}
          alt="Your Company"
        />
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center">
        </div>
      </div>
      <div className="text-xs font-semibold leading-6 text-gray-400">Menu</div>
      <nav className="flex flex-1 flex-col">
        <ul className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul className="-mx-2 space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.href}
                    className='text-gray-700 custom-blue-hover hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-xs leading-6 font-semibold'
                    activeclassname='bg-gray-50 text-indigo-600'
                  >
                    <FontAwesomeIcon
                      icon={item.icon}
                      className='text-gray-400 group-hover:text-custom-blue h-5 w-5 shrink-0'
                    />
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>

          <li>
            <ul className="-mx-2 mt-2 space-y-1">
            </ul>
          </li>
          <li className="-mx-6 mt-auto">
            <a
              href="/profile/dashboard"
              className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
            >
              {
                currentUser.photoURL ? (
                  <img
                    className="h-8 w-8 rounded-full bg-gray-50"
                    src={currentUser.photoURL}
                    alt="User Avatar"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-lg font-bold text-white">
                    {displayInitial}
                  </div>
                )
              }
              <span className="sr-only">Your profile</span>
              <span aria-hidden="true">{currentUser?.displayName ?? name}</span>
            </a>
          </li>

        </ul>
      </nav>
    </div>
    </div>
  );
}

