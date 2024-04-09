import * as React from 'react';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form"
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')

  const [showPassword, setShowPassword] = useState(false);

  const [alertMessage, setAlertMessage] = useState({severity: '', message: ''});

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const onSubmit = async (e) => {
    // e.preventDefault();
    console.log(e.username);
    console.log(user);
    console.log(`${process.env.REACT_APP_BACKEND_URL}/login`);
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
        username: e.username,
        password: e.password
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(response =>{
      // console.log(response.data);
      console.log(response.data);
      Cookies.set('myToken', response.data.token);
      // {(() =>{ 
        if(response.data.role === "admin"){
          navigate('/dashboard/app', { replace: true });
        }
        if(response.data.role === "mahasiswa"){
          navigate('/master/beasiswa', { replace: true });
        }
        if(response.data.role === "PMB"){
          navigate('/master/beasiswa', { replace: true });
        }
        if(response.data.role === "BAU"){
          navigate('/master/nominal', { replace: true });
        }
        
      // })()}
      // navigate('/dashboard/app');

    })
    .catch(error => {
      console.error(error.response.data.message);
      setAlertMessage({severity: 'error', message: error.response.data.message});
      setTimeout(() => {
        setAlertMessage({severity: '', message: ''});
      }, 3000);
      // navigate("/login");
      // console.error('Error fetching data: ',error);
      // if(error.data.error === "Unauthorized"){
        // alert("Username/password salah");
      // }
    });
  }

  const handleClick = () => {
    // {(() =>{ 
    //   if(userData.role === "admin"){
        navigate('/dashboard', { replace: true });
    //   }
      
    // })()}
  };

  // const handleSubmitt = async (e) =>{
  //   e.preventDefault();
  //   await axios.post('http://localhost:5000/login', {
  //       username: user,
  //       password: pass
  //   }, {
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     }
  //   })
  //   .then(response =>{
  //     console.log(response.data.token);
  //     Cookies.set('myToken', response.data.token);
  //     navigate('/dashboard/app');
  //   })
  //   .catch(error => {
  //     navigate("/login");
  //     console.error('Error fetching data: ',error);
  //   });
  //   // try{
  //   //   const response = await axios.post('http://localhost:5000/login', {
  //   //       username: user,
  //   //       password: pass
  //   //   }, {
  //   //     headers: {
  //   //       'Content-Type': 'application/x-www-form-urlencoded'
  //   //     }
  //   //   })
  //   //   console.log(response.data.token);
  //   //   Cookies.set('myToken', response.data.token);
  //   //   navigate('/master/jenis-beasiswa');
  //   // } catch(e){
  //   //   navigate('/login');
  //   //   console.log(e);
  //   // }
    
    
  // };

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {/* <TextField 
          name="username" 
          label="Username" 
          onChange={e => setUser(e.target.value)}
        /> */}
        {alertMessage.message && (
          <Alert variant="filled" severity={alertMessage.severity}>
            {alertMessage.message}
          </Alert>
        )}
        <Controller
          name="username"
          // label="Username"
          control={control}
          rules={{ required: true }}
          render={({ field }) => 
          <TextField 
            label="Username"
            onChange={e => setUser(e.target.value)}
            {...field} />}
        />
        {errors.username?.type === "required" && (
          <p role="alert">Username is required</p>
        )}
        {/* <input defaultValue="test" {...register("username", {required: true})} />
        {errors.username && <span>This field is required</span>} */}

        <Controller
          name="password"
          // label="Pass"
          control={control}
          rules={{ required: true }}
          render={({ field }) => 
          <TextField
            name="password"
            label="Password"
            onChange={e => setPass(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...field} />}
        />
        {errors.password?.type === "required" && (
          <p role="alert">Password is required</p>
        )}
        {/* <TextField
          name="password"
          label="Password"
          onChange={e => setPass(e.target.value)}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        /> */}
      </Stack>

      {/* <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack> */}

      <LoadingButton fullWidth size="large" type="submit" variant="contained" sx={{my: 5}}
      >
        Login
      </LoadingButton>
      </form>
    </>
  );
}
