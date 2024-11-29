"use client";

import * as React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LogoutIcon from '@mui/icons-material/Logout'; // Icon for logout
import { useRouter } from 'next/navigation'; // Using next/navigation instead of next/router
import { useSession, signOut } from "next-auth/react"; // Importing useSession and signOut
import Image from "next/image"; // Optimized image component from Next.js

const NavBar = () => {
  const [value, setValue] = React.useState(0);
  const { data: session } = useSession(); // Getting session data
  const router = useRouter(); // Using useRouter for navigation

  // Logout function
  const handleLogout = () => {
    signOut({ callbackUrl: '/' }); // Logout and redirect to the home page
  };

  const handleNavigation = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        router.push('/'); // Home page
        break;
      case 1:
        router.push('/prispevok'); // Posts page
        break;
      case 2:
        router.push('/profil'); // Profile page
        break;
      case 3:
        router.push('/auth/prihlasenie'); // Login page
        break;
      case 4:
        router.push('/auth/registracia'); // Registration page
        break;
      default:
        break;
    }
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleNavigation}
      showLabels
      sx={{ position: 'fixed', bottom: 0, width: '100%' }}
    >
      {[
        // Home button
        <BottomNavigationAction key="home" label="Domov" icon={<HomeIcon />} />,
        // Posts button
        <BottomNavigationAction key="posts" label="Príspevky" icon={<AddCircleIcon />} />,
        // Conditional rendering based on session
        ...(session
          ? [
              // Profiles button
              <BottomNavigationAction key="profiles" label="Profily" icon={<PeopleIcon />} />,
              // Profile button with user image
              <BottomNavigationAction
                key="profile"
                label="Profil"
                icon={
                  <Image
                    src={session.user?.image || '/default-avatar.png'}
                    alt="Profil"
                    width={24}
                    height={24}
                    style={{ borderRadius: '50%' }}
                  />
                }
              />,
              // Logout button
              <BottomNavigationAction
                key="logout"
                label="Odhlásiť"
                icon={<LogoutIcon />}
                onClick={handleLogout}
              />,
            ]
          : [
              // Login button
              <BottomNavigationAction
                key="login"
                label="Prihlásenie"
                icon={<LoginIcon />}
                onClick={() => router.push('/auth/prihlasenie')}
              />,
              // Registration button
              <BottomNavigationAction
                key="register"
                label="Registrácia"
                icon={<HowToRegIcon />}
                onClick={() => router.push('/auth/registracia')}
              />,
            ]),
      ]}
    </BottomNavigation>
  );
};

export default NavBar;
