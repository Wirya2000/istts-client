import * as React from 'react';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
// mocks_
import account from '../../../_mock/account';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  // {
  //   label: 'Home',
  //   icon: 'eva:home-fill',
  // },
  // {
  //   label: 'Profile',
  //   icon: 'eva:person-fill',
  // },
  // {
  //   label: 'Settings',
  //   icon: 'eva:settings-2-fill',
  // },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [userData, setUserData] = useState([]);
  const [profile, setProfile] = useState([]);
  const [photoprofile, setPhotoProfile] = useState([]);
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleProfile = () => {
    setOpen(null);
    // Cookies.remove('myToken');
    navigate('/profile/detail');
  }

  const handleLogout = () => {
    setOpen(null);
    Cookies.remove('myToken');
    navigate('/login');
  }

  const getUserData = async() => {
    // const response = await axios.get('192.168.100.14:5000/master-jenis-beasiswa');
    // setBeaJenis(response.beajenis);
    // console.log(response.beajenis);
    console.log("sukses masuk");
    const token = Cookies.get('myToken');
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/login/userdata`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response =>{
        console.log(response.data);
        setUserData(response.data);
        console.log("Success fetch data!");
    })
    .catch(error => {
        navigate('/404');
        console.error('Error fetching data: ',error);
    });
  }

  const getProfile = async() => {
    // const response = await axios.get('192.168.100.14:5000/master-jenis-beasiswa');
    // setBeaJenis(response.beajenis);
    // console.log(response.beajenis);
    console.log("sukses masuk");
    const token = Cookies.get('myToken');
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/profile`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response =>{
        setProfile(response.data);
        console.log("Success fetch data!");
    })
    .catch(error => {
        // navigate('/404');
        console.error('Error fetching data: ',error);
    });
  }
  
  const getPhotoProfile = async() => {
    // const response = await axios.get('192.168.100.14:5000/master-jenis-beasiswa');
    // setBeaJenis(response.beajenis);
    // console.log(response.beajenis);
    console.log("sukses masuk");
    const token = Cookies.get('myToken');
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/profile/photo`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response =>{
        setPhotoProfile(response.data);
        console.log("Success fetch data!");
    })
    .catch(error => {
        // navigate('/404');
        console.error('Error fetching data: ',error);
    });
  }


  useEffect(() => {
    getUserData();
    getProfile();
    getPhotoProfile();
  },[]);

  console.log(profile);
  console.log(photoprofile);

  // return () => {
  //   const account = {
  //     nrp: profile.mhs_nrp,
  //     displayName: profile.mhs_nama,
  //     email: profile.mhs_email_stts,
  //     photoURL: '/assets/images/avatars/avatar_default.jpg',
  //   };
  // }
  

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
          <Avatar src={photoprofile} alt="photoURL" />

      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          {profile.map((item) => (
            <Typography variant="body2" sx={{ color: 'text.secondary' }} Wrap>
              {item.mhs_nrp}
            </Typography>
            // <Typography variant="subtitle2" noWrap>
            //   {item.mhs_nama}
            // </Typography>
          ))}
          {profile.map((item) => (
            // <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            //   {item.mhs_nrp}
            // </Typography>
            <Typography variant="subtitle2" Wrap>
              {item.mhs_nama}
            </Typography>
          ))}
          
          
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {/* <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack> */}
        {(() => {
          if(userData.role === "mahasiswa"){
            return(
              <>
              <MenuItem onClick={handleProfile} sx={{ m: 1 }}>
                Profile
              </MenuItem>
              <Divider sx={{ borderStyle: 'dashed' }} />
              </>
              
            )
          }
          return "";
        })()}
        
        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
