"use client"; // Marking as Client Component

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
        router.push('/profil'); // Profile page
        break;
      case 2:
        router.push('/prispevok'); // Posts page
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
      {/* Home button */}
      <BottomNavigationAction label="Domov" icon={<HomeIcon />} />

      {/* Posts button */}
      <BottomNavigationAction label="Príspevky" icon={<AddCircleIcon />} />

      {/* Display Profiles only if user is logged in */}
      {session && (
        <BottomNavigationAction label="Profily" icon={<PeopleIcon />} />
      )}

      {/* Display user profile picture if logged in */}
      {session && (
        <BottomNavigationAction
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
        />
      )}

      {/* Show Logout button if user is logged in */}
      {session ? (
        <BottomNavigationAction
          label="Odhlásiť"
          icon={<LogoutIcon />}
          onClick={handleLogout}
        />
      ) : (
        <>
          {/* Show Login and Registration buttons if user is not logged in */}
          <BottomNavigationAction
            label="Prihlásenie"
            icon={<LoginIcon />}
            onClick={() => router.push('/auth/prihlasenie')}
          />
          <BottomNavigationAction
            label="Registrácia"
            icon={<HowToRegIcon />}
            onClick={() => router.push('/auth/registracia')}
          />
        </>
      )}
    </BottomNavigation>
  );
};

export default NavBar;
