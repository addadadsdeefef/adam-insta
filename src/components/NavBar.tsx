"use client";

import * as React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LogoutIcon from '@mui/icons-material/Logout';
import InfoIcon from '@mui/icons-material/Info'; // Icon for "O nás"
import { useRouter } from 'next/navigation';
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

const NavBar = () => {
  const [value, setValue] = React.useState(0);
  const { data: session } = useSession();
  const router = useRouter();

  // Logout function
  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  };

  // Navigation handler
  const handleNavigation = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        router.push('/'); // Home page
        break;
      case 1:
        session ? router.push('/hladanie') : router.push('/o-mne'); // Search or About Us
        break;
      case 2:
        session ? router.push('/pridat') : router.push('/auth/prihlasenie'); // Add or Login
        break;
      case 3:
        session ? router.push('/profil') : router.push('/auth/registracia'); // Profile or Registration
        break;
      default:
        break;
    }
  };

  const actions = session
    ? [
        <BottomNavigationAction key="home" label="Domov" icon={<HomeIcon />} />,
        <BottomNavigationAction key="search" label="Hľadať" icon={<SearchIcon />} />,
        <BottomNavigationAction key="add" label="Pridať" icon={<AddCircleIcon />} />,
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
        <BottomNavigationAction key="logout" label="Odhlásiť" icon={<LogoutIcon />} onClick={handleLogout} />,
      ]
    : [
        <BottomNavigationAction key="home" label="Domov" icon={<HomeIcon />} />,
        <BottomNavigationAction key="about" label="O nás" icon={<InfoIcon />} />,
        <BottomNavigationAction key="login" label="Prihlásenie" icon={<LoginIcon />} />,
        <BottomNavigationAction key="register" label="Registrácia" icon={<HowToRegIcon />} />,
      ];

  return (
    <BottomNavigation
      value={value}
      onChange={handleNavigation}
      showLabels
      sx={{ position: 'fixed', bottom: 0, width: '100%' }}
    >
      {actions}
    </BottomNavigation>
  );
};

export default NavBar;
