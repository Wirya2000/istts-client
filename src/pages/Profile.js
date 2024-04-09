import * as React from 'react';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
// import dotenv from 'dotenv';
import moment from 'moment';
import dayjs, { Dayjs } from 'dayjs';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { Link as RouterLink, useNavigate, useParams  } from 'react-router-dom';
import { ErrorMessage } from "@hookform/error-message";
import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
// import { google } from 'googleapis';
import joi from "joi";
// @mui
import { Stack, Button, Typography, Container, Alert } from '@mui/material';
import Grid from "@mui/material/Grid";
// import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import Button from "@mui/material/Button";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import { useTheme } from '@mui/material/styles';
import { forEach } from 'lodash';
import tokenValidator from '../utils/tokenValidator';



const schema = joi.object({
  username: joi.string().min(4).message("4").max(6).message("6").required()
});

function formatDate(dateString) {
  console.log(dateString);
  const [year, month, day] = dateString.split('-');
  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli',
    'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  const monthName = monthNames[parseInt(month, 10) - 1];
  return `${day} ${monthName} ${year}`;
}

// import {google} from 'googleapis';
// import {credentials} from ".../credentials.json";
// const {google} = require('google-apis');

// const OAuth2Data = credentials();

// const CLIENT_ID = OAuth2Data.web.client_id
// const CLIENT_SECRET = OAuth2Data.web.client_secret
// const REDIRECT_URI = OAuth2Data.web.redirect_uris[0]

// const oAuth2Client = new google.auth.OAuth2({
//   CLIENT_ID,
//   CLIENT_SECRET,
//   REDIRECT_URI
// })

// var authed = false

// const SCOPES = "http://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.profile"

export default function Profile() {
//   const { beasiswaKode } = useParams();
  const [profile, setProfile] = useState({
    mhs_lahir_tanggal: ""
  });
  const [photoprofile, setPhotoProfile] = useState([]);
  const [tipe, setTipe] = React.useState("");
  // const [isChecked, setIsChecked] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [stopDate, setStopDate] = useState(null);
  const [periode, setPeriode] = useState([]);
  const [beasyarat, setBeaSyarat] = useState([]);
  const [beajenis, setBeaJenis] = useState([]);
  const [userData, setUserData] = useState([]);
  const [mahasiswa, setMahasiswa] = useState([]);
  const [lsyarat, setLsyarat] = useState([]);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('Upload');
  const [previewUrls, setPreviewUrls] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState('');
  // const [beasiswa, setBeasiswa] = useState({
  //   beasiswa_kode: "",
  //   beasiswa_periode: "",
  //   beasiswa_start: "",
  //   beasiswa_stop: "",
  //   beasiswa_sk: "",
  //   beasiswa_perolehan: "",
  //   beasiswa_keterangan: "",
  //   beasiswa_show: "",
  //   beasiswa_asal: "",
  //   bea_jenis_kode: ""
  // });

  const [alertMessage, setAlertMessage] = useState({severity: '', message: ''});


  const navigate = useNavigate();

  const getUserData = async() => {
    // const response = await axios.get('192.168.100.14:5000/master-jenis-beasiswa');
    // setbeapengumuman(response.beapengumuman);
    // console.log(response.beapengumuman);
    console.log("sukses masuk");
    const token = Cookies.get('myToken');
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/login/userdata`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response =>{
        setUserData(response.data);
        console.log("Success fetch data!");
    })
    .catch(error => {
        navigate('/404');
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
        setProfile(response.data[0]);
        console.log("Success fetch data!");
    })
    .catch(error => {
        // navigate('/404');
        console.error('Error fetching data: ',error);
    });
  }

  useEffect(()=>{
    getPhotoProfile();
    getProfile();
  },[]);
  
  console.log(profile);

  return (
      <>
        <Helmet>
            <title> Beasiswa ISTTS </title>
        </Helmet>
        {alertMessage.message && (
          <Alert variant="filled" severity={alertMessage.severity}>
            {alertMessage.message}
          </Alert>
        )}
        <Container maxWidth="xl">
            
            {/* <Button align="center" variant="contained" onClick={handleClick}>
                Tambah
            </Button> */}

        </Container>
      <Paper elevation={3} sx={{ marginRight: "25%", marginLeft: "25%" }}>
        <Box sx={{ padding: 5 }}>
          {/* <Typography variant="h6" gutterBottom sx={{ paddingBottom: 5 }}>
            Krunch Media
          </Typography> */}
          {/* <form> */}
          <div>
          <div style={{ textAlign: "center", height: "300px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <div style={{ marginBottom: "10px", borderRadius: "50%", overflow: "hidden", width: "250px", height: "300px" }}>
              <img src={photoprofile} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ textAlign: "center" }}>
              <Typography variant="subtitle1">
                {profile.mhs_nrp}
              </Typography>
              <Typography variant="subtitle1">
                {profile.mhs_nama}
              </Typography>
            </div>
          </div>
          <div style={{ textAlign: "left" }}>
          <Typography variant="h4" sx={{ mb: 3, mt: 5 }}>
            Biodata
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700
                }}
              >
                Alamat: {profile.mhs_alamat}
              </InputLabel>
            </Grid>
          </Grid>  
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700
                }}
              >
                Email: {profile.mhs_email}
              </InputLabel>
            </Grid>
          </Grid>  
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700
                }}
              >
                Telepon/HP: {profile.mhs_telp === "" || profile.mhs_telp === null ? "-" : profile.mhs_telp}/{profile.mhs_hp}
              </InputLabel>
            </Grid>
          </Grid>  
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700
                }}
              >
                Tempat/Tanggal Lahir: {profile.mhs_lahir_kota}, {formatDate(profile.mhs_lahir_tanggal)}
              </InputLabel>
            </Grid>
          </Grid> 
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700
                }}
              >
                Agama: {profile.agama_kode}
              </InputLabel>
            </Grid>
          </Grid> 
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700
                }}
              >
                Status Nikah: {
                    profile && typeof profile.mhs_statusnikah !== 'undefined' ? (
                    profile.mhs_statusnikah === 0 ? "Belum Menikah" : "Sudah Menikah"
                    ) : "Data tidak tersedia"
                }
              </InputLabel>
            </Grid>
          </Grid> 
          </div>
          </div>
          
          {/* <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700
                }}
              >
                Tanggal Mulai: {beasiswa.beasiswa_start}
              </InputLabel>
            </Grid>
          </Grid>  
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700
                }}
              >
                Tanggal Berakhir: {beasiswa.beasiswa_stop }
              </InputLabel>
            </Grid>
          </Grid>  
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700
                }}
              >
                Benefit : {beasiswa.beasiswa_perolehan}
              </InputLabel>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700
                }}
              >
                Keterangan:
              </InputLabel>

              <TextField
                multiline
                rows={4} // Adjust the number of rows as needed
                fullWidth
                variant="outlined"
                value={beasiswa.beasiswa_keterangan}
                sx={{ marginTop: 1 }} // Adjust spacing as needed
              />
            </Grid>
          </Grid>  
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} />
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700
                }}
              >
                Asal Beasiswa: {beasiswa.beasiswa_asal}
              </InputLabel>
            </Grid>
          </Grid>   */}

          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} />
            <Grid item xs={12} sm={12} />
            <Grid item xs={12} sm={12} />
          </Grid>
          
          
              

          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} />
            <Grid item xs={12} sm={5} />
            <Grid item xs={12} sm={5} />
            <Grid item xs={12} sm={4}>
            {/* <Button variant="contained"
            type="submit" 
            // Navigate to="/master/jenis-beasiswa" 
            >
              Apply
            </Button>  */}
            </Grid>
            {/*  */}
            {/*  */}
            {/*  */}
            {/*  */}

            {/* <Grid item xs={12} sm={5}> */}
              {/* <FormControl component="fieldset"> */}
                {/* <FormLabel component="legend">Weekdays</FormLabel> */}
                {/* <FormGroup aria-label="position">
          <FormControlLabel
            value=""
            control={<Input />}
            label="Title"
            labelPlacement="bottom"
          />

          <FormControlLabel
            value=""
            control={<Input />}
            label="Artist"
            labelPlacement="bottom"
          />
        </FormGroup> */}
                
              {/* </FormControl>
            </Grid> */}
          </Grid>
          {/* </form> */}
        </Box>
      </Paper>
      </>
  )
}
