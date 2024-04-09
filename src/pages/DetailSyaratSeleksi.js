import * as React from 'react';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import axios from 'axios';
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
// import Button from "@mui/material/Button";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import { useTheme } from '@mui/material/styles';
import tokenValidator from '../utils/tokenValidator';

const schema = joi.object({
  username: joi.string().min(4).message("4").max(6).message("6").required()
});

function formatDate(dateString) {
    // const options = { year: 'numeric', month: 'long', day: 'numeric' };
    // return new Date(dateString).toLocaleDateString(undefined, options);

    const [year, month, day] = dateString.split('-');
    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
        'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const monthName = monthNames[parseInt(month, 10) - 1];
    return `${day} ${monthName} ${year}`;
}

export default function DetailSyaratSeleksi() {
  const { idSeleksi, mhsNrp } = useParams();
  const [tipe, setTipe] = React.useState("");
  // const [isChecked, setIsChecked] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [stopDate, setStopDate] = useState(null);
  const [periode, setPeriode] = useState([]);
  const [beasyarat, setBeaSyarat] = useState([]);
  const [dsyarat, setDsyarat] = useState([]);
  const [beajenis, setBeaJenis] = useState([]);
  const [lsyarat, setLsyarat] = useState([]);
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
    console.log(e.target.elements.beasiswa_periode.value);
    console.log(startDate);
    console.log(stopDate);
    console.log(e.target.elements.bea_jenis_kode.value);
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
    //   console.log(beatipe);
      const token = Cookies.get('myToken');
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/master/beasiswa/insert`, {
          // kode_beasiswa: beasiswa.form.bea_kode,
          periode_beasiswa: e.target.elements.beasiswa_periode.value,
          start_beasiswa: startDate,
          stop_beasiswa: stopDate,
          sk_beasiswa: e.target.elements.beasiswa_sk.value,
          perolehan_beasiswa: e.target.elements.beasiswa_perolehan.value,
          ket_beasiswa: e.target.elements.beasiswa_keterangan.value,
          show_beasiswa: 1,
          asal_beasiswa: e.target.elements.beasiswa_asal.value,
          kode_jenis: e.target.elements.bea_jenis_kode.value,
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

  const getSyaratMhs = async() => {
    // const response = await axios.get('192.168.100.14:5000/master-jenis-beasiswa');
    // setBeaJenis(response.beajenis);
    // console.log(response.beajenis);
    console.log("sukses masuk");
    const token = Cookies.get('myToken');
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/seleksi/${idSeleksi}/${mhsNrp}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response =>{
        setDsyarat(response.data[0]);
        console.log("Success fetch data!");
    })
    .catch(error => {
        navigate('/404');
        console.error('Error fetching data: ',error);
    });
  }

  const getLinkSyaratMhs = async() => {
    // const response = await axios.get('192.168.100.14:5000/master-jenis-beasiswa');
    // setBeaJenis(response.beajenis);
    // console.log(response.beajenis);
    console.log("sukses masuk");
    const token = Cookies.get('myToken');
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/beaapplys/${idSeleksi}/${mhsNrp}`,
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

//   const getBeaJenis = async() => {
//     // const response = await axios.get('192.168.100.14:5000/master-jenis-beasiswa');
//     // setBeaJenis(response.beajenis);
//     // console.log(response.beajenis);
//     console.log("sukses masuk");
//     const token = Cookies.get('myToken');
//     await axios.get('http://localhost:5000/master/jenis-beasiswa/beasiswamhs',
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       }
//     })
//     .then(response =>{
//         setBeaJenis(response.data);
//         console.log("Success fetch data!");
//     })
//     .catch(error => {
//         navigate('/404');
//         console.error('Error fetching data: ',error);
//     });
//   }

//   const getBeasiswa = async() => {
//     // const response = await axios.get('192.168.100.14:5000/master-jenis-beasiswa');
//     // setBeaJenis(response.beajenis);
//     // console.log(response.beajenis);
//     console.log("sukses masuk");
//     const token = Cookies.get('myToken');
//     console.log(token);
//     console.log(`http://localhost:5000/master/beasiswamhs/${beasiswaKode}`)
//     await axios.get(`http://localhost:5000/master/beasiswamhs/${beasiswaKode}`, 
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       }
//     })
//     .then(response =>{
//         setBeasiswa(response.data[0]);
//         console.log("Success fetch data!");
//     })
//     .catch(error => {
//         navigate('/404');
//         console.error('Error fetching data: ',error);
//     });
    
//   }

//   const getPeriode = async() => {
//     // const response = await axios.get('192.168.100.14:5000/master-jenis-beasiswa');
//     // setBeaJenis(response.beajenis);
//     // console.log(response.beajenis);
//     console.log("sukses masuk");
//     await axios.get('http://localhost:5000/master/periode')
//     .then(response =>{
//         setPeriode(response.data);
//         console.log("Success fetch data!");
//     })
//     .catch(error => {
//         console.error('Error fetching data: ',error);
//     });
//   }

    // console.log(beajenis);
    // console.log(periode);

  const getBeaSyarat = async() => {
      // const response = await axios.get('192.168.100.14:5000/master-jenis-beasiswa');
      // setBeaJenis(response.beajenis);
      // console.log(response.beajenis);

      console.log("sukses masuk");
      const token = Cookies.get('myToken');
      console.log(token);
      console.log(`${process.env.REACT_APP_BACKEND_URL}/master/syarat`)
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}/master/syarat`, 
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



  useEffect(()=>{
    // getBeaJenis();
    // getBeasiswa();
    // getPeriode();
    getBeaSyarat();
    getSyaratMhs();
    getLinkSyaratMhs();
  },[]);

  console.log(lsyarat);
//   console.log(beasiswa);
  console.log(dsyarat);
  console.log(beasyarat);
  console.log(beasyarat.length);
  
  const beajenissyarat = dsyarat && dsyarat.keu_beasiswa && dsyarat.keu_beasiswa.keu_bea_jeni && dsyarat.keu_beasiswa.keu_bea_jeni.bea_jenis_syarat;
  const beajenissyaratArr = beajenissyarat ? beajenissyarat.split(',') : [];
  console.log(beajenissyaratArr);
  const newbeajenissyaratArr = beajenissyaratArr.map(str => parseInt(str, 10));
  console.log(newbeajenissyaratArr);
  // if(beasyarat[2].bea_syarat_id === newbeajenissyaratArr[2]){
  //   console.log("OK");
  // }
  // else{
  //   console.log("FALSE");
  // }
  const syaratArr = [];
  for (let i = 0; i < beasyarat.length; i+=1) {
    for (let j = 0; j < newbeajenissyaratArr.length; j+=1) {
      if(beasyarat[i].bea_syarat_id === newbeajenissyaratArr[j]){
        syaratArr.push({'id': beasyarat[i].bea_syarat_id, 'nama': beasyarat[i].bea_syarat_nama})
      }
    }
    
  }

  console.log(syaratArr);

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
        <Container maxWidth="xl">
            <Typography variant="h4" sx={{ mb: 5 }}>
            Detail Syarat Seleksi
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
                NRP: {dsyarat.mhs_nrp}
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
                Nama Mahasiswa: {dsyarat && dsyarat.mahasiswa && dsyarat.mahasiswa.mhs_nama}
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
                Jenis Beasiswa: {dsyarat && dsyarat.keu_beasiswa && dsyarat.keu_beasiswa.keu_bea_jeni && dsyarat.keu_beasiswa.keu_bea_jeni.bea_jenis_nama}
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
                Periode Beasiswa: {dsyarat && dsyarat.keu_beasiswa && dsyarat.keu_beasiswa.aka_periode && dsyarat.keu_beasiswa.aka_periode.periode_nama} {dsyarat && dsyarat.keu_beasiswa && dsyarat.keu_beasiswa.aka_periode && dsyarat.keu_beasiswa.aka_periode.periode_akademik}
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
                Tanggal Apply: {dsyarat.bea_apply_tanggal}
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
                IPK Saat Apply / IPK Saat Ini: {dsyarat.bea_apply_ipk} / {dsyarat && dsyarat.mahasiswa && dsyarat.mahasiswa.mhs_ipk}
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
                Poin Saat Apply / Poin Saat Ini: {dsyarat.bea_apply_poin} / {dsyarat && dsyarat.mahasiswa && dsyarat.mahasiswa.mhs_poin}
              </InputLabel>
            </Grid>
          </Grid>
          {/* <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700
                }}
              >
                Kode Beasiswa: {dsyarat.beasiswa_kode}
              </InputLabel>
            </Grid>
          </Grid>   */}
          
          {/* <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700
                }}
              >
                Tanggal Mulai: {dsyarat && dsyarat.keu_beasiswa && dsyarat.keu_beasiswa.beasiswa_start}
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
                Tanggal Berakhir: {dsyarat && dsyarat.keu_beasiswa && dsyarat.keu_beasiswa.beasiswa_stop}
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
                Benefit : {dsyarat && dsyarat.keu_beasiswa && dsyarat.keu_beasiswa.beasiswa_perolehan}
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
                value={dsyarat && dsyarat.keu_beasiswa && dsyarat.keu_beasiswa.beasiswa_keterangan}
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
                Asal Beasiswa: {dsyarat && dsyarat.keu_beasiswa && dsyarat.keu_beasiswa.beasiswa_asal}
              </InputLabel>
            </Grid>
          </Grid>   */}

          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} />
            <Grid item xs={12} sm={12} />
            <Grid item xs={12} sm={12} />
          </Grid>
          <Grid container spacing={3}>
            {syaratArr.map((item) => (
              <Grid item xs={12} sm={12} key={item.id}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    fontWeight: 600,
                    fontSize: "14px"
                  }}
                >
                  {(() => {
                    const matchingLs = lsyarat.find(ls => ls.bea_syarat_id === item.id);
                    if (matchingLs) {
                      return <a href={matchingLs.asyarat_link_gdrive} target="_blank" rel="noreferrer">{item.nama}</a>;
                    }
                    return item.nama;
                  })()}
                </InputLabel>
                
                {/* <Button
                  variant="outlined"
                  component="label"
                  startIcon={<CloudUploadIcon />}
                  sx={{ marginTop: 1 }} // Adjust spacing as needed
                >
                  Upload
                  <input type="file" hidden />
                </Button> */}
              </Grid>
            ))}
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
                Insert
              </Button> */}
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
