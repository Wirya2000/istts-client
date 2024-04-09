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

export default function ApplyBeasiswa() {
  const { beasiswaKode } = useParams();
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
  const [beasiswa, setBeasiswa] = useState([]);

  const [alertMessage, setAlertMessage] = useState({severity: '', message: ''});

  const handleFileChange = (itemId, namaFile, tipeFile, event) => {
    const selectedFile = event.target.files[0];
    console.log("aaaa");
    // setFile(selectedFile);
    // setFileName(selectedFile.name); // Extracting file name
    // const itemId = item.id;
    // console.log(item.id);
    // console.log(userData);
    console.log(selectedFile);
    // const formData = new FormData();
    // formData.append(`${itemId}_${userData.username}_${beasiswaKode}`, selectedFile);
    // console.log(formData);

    // const response = await axios.post('http://localhost:5000/master/jenis-beasiswa/insert', {
    //       kode_jenis: e.target.elements.bea_jenis_kode.value,
    //       nama_jenis: e.target.elements.bea_jenis_nama.value,
    //       syarat_jenis: jenisSyarat.join(','),
    //       jum_spp_jenis: e.target.elements.bea_jenis_jumlah_spp.value,
    //       jum_sks_jenis: e.target.elements.bea_jenis_jumlah_sks.value,
    //       tipe_jenis: beatipe
    //   }, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       'Content-Type': 'application/x-www-form-urlencoded'
    //     }
    //   })

    

    
    const token = Cookies.get('myToken');
    // console.log(`http://localhost:5000/beaapplys/insert`)
    // axios.post(`http://localhost:5000/beaapplys/insert`, {
    //   beasiswa_kode: beasiswaKode,
    //   bea_syarat_id: itemId
    //   // kode_beasiswa: beasiswaKode
    // },
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   },
      
    // })
    // .then(response =>{
    //     // setUserData(response.data[0]);
    //     console.log("Success insert");
    // })
    // .catch(error => {
    //     // navigate('/404');
    //     console.error('Error upload: ',error);
    // });

    console.log(`${process.env.REACT_APP_BACKEND_URL}/beaapply/upload/${itemId}/${beasiswaKode}`)
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/beaapply/upload/${itemId}/${beasiswaKode}`, {
      bea_syarat_file_nama: namaFile,
      bea_syarat_file_tipe: tipeFile,
      file: selectedFile,
      // kode_beasiswa: beasiswaKode
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      },
      
    })
    .then(response =>{
        // setUserData(response.data[0]);
        console.log(response.data);
        console.log("Success upload");
    })
    .catch(error => {
        // navigate('/404');
        console.error(error.response.data.message);
        setAlertMessage({severity: 'error', message: error.response.data.message});
        setTimeout(() => {
          setAlertMessage({severity: '', message: ''});
        }, 3000);
    });



    // const temp1 = arrFile.map(e => {
    //   if (e.key === itemId) {
    //       return {
    //           ...e,
    //           file: selectedFile,
    //           filename: selectedFile.name
    //       };
    //   }
    //   return e;
    // });
    // setArrFile(temp1);
  };

  const handleFilePreview = (itemId, namaFile, tipeFile, event) => {
    // const file = event.target.files[0];
    // if (file) {
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     setPreviewUrls(prevState => ({
    //       ...prevState,
    //       [itemId]: reader.result
    //     }));
    //   };
    //   reader.readAsDataURL(file);
    // }
    const file = event.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrls(prevState => ({
        ...prevState,
        [itemId]: fileUrl
      }));
    }
    handleFileChange(itemId, namaFile, tipeFile, event);
  };

  const handlePreviewClick = (itemId) => {
    // Open a new window or modal to display the full-size image
    window.open(previewUrls[itemId], '_blank');
  };
  // const handlePreviewClick = (imageUrl) => {
  //   setModalImageSrc(imageUrl); // Set the image source for the modal
  //   setModalIsOpen(true); // Open the modal
  // };

  const apiKey = process.env.GDRIVE_API_KEY;
  const clientId = process.env.GDRIVE_CLIENT_ID;

  console.log(apiKey);
  console.log(clientId);
  
  

  // const handleCheckboxChange = (event) => {
  //   setIsChecked(event.target.checked);
  // };

  const handleStartDateChange = async date => {
    // await setBeasiswa({
    //   form:{
    //     ...beasiswa.form,
    //     beasiswa_start: date
    //   }
    // });
    setStartDate(moment(date.$d).format('YYYY-MM-DD'))
    console.log(moment(date.$d).format('YYYY-MM-DD'));
  };

  const handleStopDateChange = async date => {
    // setBeasiswa(prevState => ({
    //   ...beasiswa.form,
    //   beasiswa_stop: date,
    // }));
    setStopDate(moment(date.$d).format('YYYY-MM-DD'))
    console.log(moment(date.$d).format('YYYY-MM-DD'));
  };

  // const initClient = async () => {
  //   try {
  //     // Load the API client and auth2 library
  //     await window.gapi.client.init({
  //       apiKey: apiKey,
  //       clientId: clientId,
  //       discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
  //       scope: 'https://www.googleapis.com/auth/drive.file', // Use a more specific scope for file uploads
  //     });

  //     // Check if the user is already signed in
  //     const isSignedIn = window.gapi.auth2.getAuthInstance().isSignedIn.get();

  //     if (!isSignedIn) {
  //       // Sign in the user
  //       await window.gapi.auth2.getAuthInstance().signIn();
  //     }

  //     // Now you can make API calls, for example, uploading a file
  //     uploadFile();
  //   } catch (error) {
  //     console.error('Error initializing Google Drive API:', error);
  //   }
  // };

  const handleChange = async e => {
    // setTipe(event.target.value);
    // setSyarat(event.target.value);
    // setTipe(prevState => {
    //   if(prevState.value="Public/Umum"){
    //     return "1";
    //   }
    //   else if(prevState.value="Private"){
    //     return "2";
    //   }
    
    // setMyOtherState(prevState => {
    //   if
    //   return newOtherValue;
    // });
    
    // setIsChecked(e.target.checked);
    // const { name, value } = e.target;
    e.preventDefault();
    // const { name, checked } = e.target;
    // await setCheckedItems({ ...checkedItems, [name]: checked });

    // if(e.target.name==="beasiswa_start"){
    //   setBeasiswa(prevState => ({
    //     ...prevState,
    //     beasiswa_start: e.target.selectedDate,
    //   }));
    // }
    // else if(e.target.name==="beasiswa_stop"){
    //   setBeasiswa(prevState => ({
    //     ...prevState,
    //     beasiswa_stop: e.target.selectedDatedate,
    //   }));
    // }
    // else{
      await setBeasiswa({
        form:{
          ...beasiswa.form,
          [e.target.name]: e.target.value
        }
      });
      console.log(beasiswa);
    // }

  };

  

  const navigate = useNavigate();

  // const { handleSubmit, control } = useForm({
  //   mode: "onSubmit",
  //   defaultValues: {
  //     username: "12345",
  //     email: ""
  //   },
  //   resolver: joiResolver(schema)
  // });
  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   console.log(beajenis);
    //   const url = `http://localhost:5000/master/jenis-beasiswa/insert/`;
    //   const response = await axios.post(url, beajenis);
    //   console.log(response.data);
    // } catch (error) {
    //   console.error(error);
    // }
    // let beashow = beasiswa.form.beasiswa_show;
    // if(beashow===''){
    //   beashow= '1';
    // }
    // else if(beashow==='Private'){
    //   beatipe= '2';
    // }
    // await setBeasiswa({
    //   form:{
    //     ...beasiswa.form,
    //     [e.target.name]: e.target.value
    //   }
    // });
    // console.log(beasiswa);
    // setBeasiswa({
    //   beasiswa_kode: e.target.beasiswa_kode
    // })
    // console.log(e.target.elements.beasiswa_periode.value);
    // console.log(startDate);
    // console.log(stopDate);
    // console.log(e.target.elements.bea_jenis_kode.value);
    try{
      // await axios({
      //     method:'POST',
      //     url:`http://localhost:5000/master/jenis-beasiswa/insert/`,
      //     body: {
      //         kode_jenis: beajenis.form.bea_jenis_kode,
      //         nama_jenis: beajenis.form.bea_jenis_nama,
      //         syarat_jenis: beajenis.form.bea_jenis_syarat,
      //         jum_spp_jenis: beajenis.form.bea_jenis_jumlah_spp,
      //         jum_sks_jenis: beajenis.form.bea_jenis_jumlah_sks,
      //         tipe_jenis: beajenis.form.bea_jenis_tipe
      //     },
      
      // })
      console.log(new Date());
      const token = Cookies.get('myToken');
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/beaapply/insert`, {
          // kode_beasiswa: beasiswa.form.bea_kode,
          beasiswa_kode: beasiswaKode,
          bea_apply_tanggal: new Date(),
          bea_apply_ipk: mahasiswa.mhs_ipk,
          bea_apply_poin: mahasiswa.mhs_poin,
          bea_apply_status: 0,
          bea_apply_spp: beasiswa && beasiswa.keu_bea_jeni && beasiswa.keu_bea_jeni.bea_jenis_jumlah_spp,
          bea_apply_sks: beasiswa && beasiswa.keu_bea_jeni && beasiswa.keu_bea_jeni.bea_jenis_jumlah_sks,
          // show_beasiswa: 1,
          // asal_beasiswa: e.target.elements.beasiswa_asal.value,
          // kode_jenis: e.target.elements.bea_jenis_kode.value,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      console.log(response.data);


      // .then((response)=>{
      //     console.log("Success insert data!");
      navigate("/master/beasiswa");
      
      // })
    } catch (error){
      console.error(error);
    }
  };

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

  const getLinkgdrive = async() => {
    // const response = await axios.get('192.168.100.14:5000/master-jenis-beasiswa');
    // setBeaJenis(response.beajenis);
    // console.log(response.beajenis);
    console.log("sukses masuk");
    const token = Cookies.get('myToken');
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/beaapplys`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response =>{
        // setBeaApplys(response.data);
        console.log("Success fetch data!");
    })
    .catch(error => {
        navigate('/404');
        console.error('Error fetching data: ',error);
    });
  }

  const getBeaJenis = async() => {
    // const response = await axios.get('192.168.100.14:5000/master-jenis-beasiswa');
    // setBeaJenis(response.beajenis);
    // console.log(response.beajenis);
    console.log("sukses masuk");
    const token = Cookies.get('myToken');
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/master/jenis-beasiswa/beasiswamhs`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response =>{
        setBeaJenis(response.data);
        console.log("Success fetch data!");
    })
    .catch(error => {
        navigate('/404');
        console.error('Error fetching data: ',error);
    });
  }

  const getMahasiswa = async() => {
    // const response = await axios.get('192.168.100.14:5000/master-jenis-beasiswa');
    // setBeaJenis(response.beajenis);
    // console.log(response.beajenis);
    console.log("sukses masuk");
    const token = Cookies.get('myToken');
    console.log(token);
    console.log(`${process.env.REACT_APP_BACKEND_URL}/mahasiswa/detail`)
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/mahasiswa/detail`, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response =>{
        setMahasiswa(response.data[0]);
        console.log("Success fetch data!");
    })
    .catch(error => {
        navigate('/404');
        console.error('Error fetching data: ',error);
    });
    
  }

  const getBeasiswa = async() => {
    // const response = await axios.get('192.168.100.14:5000/master-jenis-beasiswa');
    // setBeaJenis(response.beajenis);
    // console.log(response.beajenis);
    console.log("sukses masuk");
    const token = Cookies.get('myToken');
    console.log(token);
    console.log(`${process.env.REACT_APP_BACKEND_URL}/master/beasiswamhs/${beasiswaKode}`)
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/master/beasiswamhs/${beasiswaKode}`, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response =>{
        setBeasiswa(response.data[0]);
        console.log("Success fetch data!");
    })
    .catch(error => {
        navigate('/404');
        console.error('Error fetching data: ',error);
    });
    
  }

  const getPeriode = async() => {
    // const response = await axios.get('192.168.100.14:5000/master-jenis-beasiswa');
    // setBeaJenis(response.beajenis);
    // console.log(response.beajenis);
    console.log("sukses masuk");
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/master/periode`)
    .then(response =>{
        setPeriode(response.data);
        console.log("Success fetch data!");
    })
    .catch(error => {
        console.error('Error fetching data: ',error);
    });
  }

    console.log(beajenis);
    console.log(periode);

  const getBeaSyarat = async() => {
      // const response = await axios.get('192.168.100.14:5000/master-jenis-beasiswa');
      // setBeaJenis(response.beajenis);
      // console.log(response.beajenis);

      console.log("sukses masuk");
      const token = Cookies.get('myToken');
      console.log(token);
      console.log(`${process.env.REACT_APP_BACKEND_URL}/master/syaratmhs`)
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}/master/syaratmhs`, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then(response =>{
          setBeaSyarat(response.data);
          console.log("Success fetch data!");
      })
      .catch(error => {
          navigate('/404');
          console.error('Error fetching data: ',error);
      });
      // console.log("sukses masuk");
      // await axios.get('http://localhost:5000/master/syaratmhs')
      // .then(response =>{
      //     setBeaSyarat(response.data);
      //     console.log("Success fetch data!");
      // })
      // .catch(error => {
      //     console.error('Error fetching data: ',error);
      // });
  }

  const getLinkSyaratMhs = async() => {
    // const response = await axios.get('192.168.100.14:5000/master-jenis-beasiswa');
    // setBeaJenis(response.beajenis);
    // console.log(response.beajenis);
    console.log("sukses masuk");
    const token = Cookies.get('myToken');
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/beaapplys/${beasiswaKode}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response =>{
        setLsyarat(response.data);
        console.log("Success fetch data!");
    })
    .catch(error => {
        navigate('/404');
        console.error('Error fetching data: ',error);
    });
  }



  useEffect(()=>{
    // getBeaJenis();
    getUserData()
    getBeasiswa();
    // getPeriode();
    getMahasiswa();
    getBeaSyarat();
    getLinkSyaratMhs();
    console.log(userData)
    // useEffect(()=>{
    //   getMahasiswa();
    // },[userData]);

    // console.log(userData)
    console.log(mahasiswa);


    
    console.log(beasyarat);
    console.log(beasyarat.length);
  },[]);

  
  console.log(beasiswa);
  
  
  
  
  // if(beasyarat[2].bea_syarat_id === newbeajenissyaratArr[2]){
  //   console.log("OK");
  // }
  // else{
  //   console.log("FALSE");
  // }
  const syaratArr = [];

  const beajenissyarat = beasiswa && beasiswa.keu_bea_jeni && beasiswa.keu_bea_jeni.bea_jenis_syarat;
  const beajenissyaratArr = beajenissyarat ? beajenissyarat.split(',') : [];
  console.log(beajenissyaratArr);
  const newbeajenissyaratArr = beajenissyaratArr.map(str => parseInt(str, 10));
  console.log(newbeajenissyaratArr);

  for (let i = 0; i < beasyarat.length; i+=1) {
    for (let j = 0; j < newbeajenissyaratArr.length; j+=1) {
      if(beasyarat[i].bea_syarat_id === newbeajenissyaratArr[j]){
        syaratArr.push({'id': beasyarat[i].bea_syarat_id, 'nama': beasyarat[i].bea_syarat_nama, 'namafile': beasyarat[i].bea_syarat_file_nama, 'tipefile': beasyarat[i].bea_syarat_file_tipe})
      }
    }
    
  }

  console.log(syaratArr);
  // // for (let i = 0; i < beasyarat.length; i+=1) {
  // //   for (let j = 0; j < newbeajenissyaratArr.length; j+=1) {
  // //     if(beasyarat[i].bea_syarat_id === newbeajenissyaratArr[j]){
  // //       useEffect(() => {
  // //         console.log("sukses masuk");
  // //         const token = Cookies.get('myToken');
  // //         axios.get(`http://localhost:5000/beaapplys/${beasiswaKode}/${beasyarat[i].bea_syarat_id}`,
  // //         {
  // //           headers: {
  // //             Authorization: `Bearer ${token}`,
  // //           }
  // //         })
  // //         .then(response =>{
  // //             // setBeaApplys(response.data);
  // //             // console.log(response.data[0])
  // //             syaratArr.push({ id: beasyarat[i].bea_syarat_id, nama: beasyarat[i].bea_syarat_nama, link: response.data[0].asyarat_link_gdrive })
  // //             console.log("Success fetch data!");
  // //         })
  // //         .catch(error => {
  // //             // navigate('/404');
  // //             console.error('Error fetching data: ',error);
  // //         });
  // //       }, []);
  // //       // syaratArr.push({ id: beasyarat[i].bea_syarat_id, nama: beasyarat[i].bea_syarat_nama })
  // //     }
  // //   }
    
  // // }

  

  // const getLink = async() => { 
  //   const beajenissyarat = beasiswa && beasiswa.keu_bea_jeni && beasiswa.keu_bea_jeni.bea_jenis_syarat;
  //   const beajenissyaratArr = beajenissyarat ? beajenissyarat.split(',') : [];
  //   console.log(beajenissyaratArr);
  //   const newbeajenissyaratArr = beajenissyaratArr.map(str => parseInt(str, 10));
  //   console.log(newbeajenissyaratArr);

  //   for (let i = 0; i < beasyarat.length; i+=1) {
  //     for (let j = 0; j < newbeajenissyaratArr.length; j+=1) {
  //       if(beasyarat[i].bea_syarat_id === newbeajenissyaratArr[j]){
  //         syaratArr.push({'id': beasyarat[i].bea_syarat_id, 'nama': beasyarat[i].bea_syarat_nama})
  //       }
  //     }
      
  //   }

  //   for (let i = 0; i < beasyarat.length; i+=1) {
  //     const item = beasyarat[i];
  //     const id = item.bea_syarat_id;
  //     const nama = item.bea_syarat_nama;
  //     const link = "";
    
  //     if (newbeajenissyaratArr.includes(id)) {
  //       syaratArr.push({ id, nama, link });
  //     }
  //   }

  //   const token = Cookies.get('myToken');
  //   // const promises = [];
  //   const response = await axios.get(`http://localhost:5000/beaapplys/${beasiswaKode}`,
  //   {
  //     arrsyarat: beajenissyarat
  //   },
  //   {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       // 'Content-Type': 'multipart/form-data'
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     }
  //   })
  //   .then(response =>{
  //       // console.log(response.data);
  //       for(let i = 0; i < syaratArr.length; i+=1){
  //         if(syaratArr[i].id === response.data.bea_syarat_id){
  //           syaratArr[i].link = response.data.asyarat_link_gdrive;
  //         }
  //       }
        
  //       console.log("Success fetch data!");
  //   })
  //   .catch(error => {
  //       console.error('Error fetching data: ',error);
  //   })
  // }
  // useEffect(() => {
  //   getLink();
  // },[beasyarat, beasiswaKode])

  // const syaratArr = [];

  // 
  //   // const fetchData = async () => {
  //   //   const token = Cookies.get('myToken');
  //   //   const promises = [];

  //   //   for (let i = 0; i < beasyarat.length; i+=1) {
  //   //     const item = beasyarat[i];
  //   //     const id = item.bea_syarat_id;
  //   //     const nama = item.bea_syarat_nama;
  //   //     const link = "";

  //   //     if (newbeajenissyaratArr.includes(id)) {
  //   //       promises.push(
  //   //         axios.get(`http://localhost:5000/beaapplys/${beasiswaKode}/${id}`, {
  //   //           headers: {
  //   //             Authorization: `Bearer ${token}`,
  //   //           }
  //   //         })
  //   //         .then(response => {
  //   //           syaratArr.push({ id, nama, link: response.data[0].asyarat_link_gdrive });
  //   //           console.log("Success fetch data!");
  //   //         })
  //   //         .catch(error => {
  //   //           console.error('Error fetching data: ', error);
  //   //         })
  //   //       );
  //   //     }
  //   //   }

  //   //   await Promise.all(promises);
  //   // };

  //   // fetchData();
  // }, [beasyarat, newbeajenissyaratArr, beasiswaKode]);
  

  
  

  console.log(syaratArr);

  const [arrFile, setArrFile] = useState([]);

  useEffect(() => {
    const temp = [];
    syaratArr.forEach(e => {
      const itemp = {
        key: e,
        filename: "" 
      }
      temp.push(itemp);
    });
  
    setArrFile(temp);
  }, [syaratArr]); // Only trigger the effect when newbeajenissyaratArr changes
  
  console.log(arrFile);

//   const beajenisNama = beajenis.bea_jenis_nama;
//   console.log(beajenisNama);

//   const tipejenis = [
//     "Public/Umum",
//     "Private"
//   ];
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
            <Typography variant="h4" sx={{ mb: 5 }}>
            Apply Beasiswa
            </Typography>
            {/* <Button align="center" variant="contained" onClick={handleClick}>
                Tambah
            </Button> */}

        </Container>
      <Paper elevation={3} sx={{ marginRight: "2%", marginLeft: "2%" }}>
        <Box sx={{ padding: 5 }}>
          {/* <Typography variant="h6" gutterBottom sx={{ paddingBottom: 5 }}>
            Krunch Media
          </Typography> */}
          <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700
                }}
              >
                Kode Beasiswa: {beasiswa.beasiswa_kode}
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
                Jenis Beasiswa: {beasiswa && beasiswa.keu_bea_jeni && beasiswa.keu_bea_jeni.bea_jenis_nama}
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
                Periode Beasiswa: {beasiswa && beasiswa.aka_periode && beasiswa.aka_periode.periode_nama} {beasiswa && beasiswa.aka_periode && beasiswa.aka_periode.periode_akademik}
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
          </Grid>  

          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} />
            <Grid item xs={12} sm={12} />
            <Grid item xs={12} sm={12} />
          </Grid>
          
          <Grid container spacing={3}>
      {syaratArr.map((item) => (
        <Grid item xs={4} key={item.id}> {/* Each item takes up one-third of the row */}
          <Box sx={{ width: "100%", paddingBottom: "5px" }}>
            <Card variant="outlined">
              <CardContent>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    fontWeight: 600,
                    fontSize: "13px"
                  }}
                >
                  {item.nama}
                </InputLabel>

                {previewUrls[item.id] && (
                  <Button
                    style={{
                      border: 'none',
                      padding: 0,
                      margin: 0,
                      background: 'none',
                      cursor: 'pointer'
                    }}
                    onClick={() => handlePreviewClick(item.id)}
                    type="button"
                  >
                    <img
                      src={previewUrls[item.id]}
                      alt="File Preview"
                      style={{ width: "400px", height: "400px" }}
                    />
                  </Button>
                )}
                <Button
                  id={item.id}
                  variant="outlined"
                  component="label"
                  startIcon={<CloudUploadIcon />}
                  sx={{ marginTop: 1 }} // Adjust spacing as needed
                  type="button"
                >
                  Upload File
                  <input
                    type="file"
                    hidden
                    onChange={(event) => handleFilePreview(item.id, item.namafile, item.tipefile, event)}
                  />
                </Button>
                
                {(() => {
                  const matchingLs = lsyarat.find(ls => ls.bea_syarat_id === item.id);
                  if (matchingLs) {
                    return(
                      <Typography variant="subtitle2" sx={{ mb: 2 }}>
                        <a href={matchingLs.asyarat_link_gdrive} target="_blank" rel="noreferrer">Lihat File</a>
                      </Typography>
                    ) 
                  }
                  return (
                    <Typography variant="subtitle2" sx={{ mb: 2 }}>
                      Belum Diupload
                    </Typography>
                  );
                })()}
              </CardContent>
            </Card>
          </Box>
        </Grid>
      ))}
    </Grid>
              

          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} />
            <Grid item xs={12} sm={5} />
            <Grid item xs={12} sm={5} />
            <Grid item xs={12} sm={4}>
            <Button variant="contained"
            type="submit" 
            // Navigate to="/master/jenis-beasiswa" 
            >
              Apply
            </Button> 
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
          </form>
        </Box>
      </Paper>
      </>
  )
}
