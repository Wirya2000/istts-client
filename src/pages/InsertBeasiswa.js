import * as React from 'react';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import dayjs, { Dayjs } from 'dayjs';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { ErrorMessage } from "@hookform/error-message";
import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
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
// import Button from "@mui/material/Button";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import { useTheme } from '@mui/material/styles';
import tokenValidator from '../utils/tokenValidator';

const schema = joi.object({
  username: joi.string().min(4).message("4").max(6).message("6").required()
});

export default function InsertBeasiswa() {
  const [tipe, setTipe] = React.useState("");
  // const [isChecked, setIsChecked] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [stopDate, setStopDate] = useState(null);
  const [periode, setPeriode] = useState([]);
  const [beasyarat, setBeaSyarat] = useState([]);
  const [beajenis, setBeaJenis] = useState([]);
  const [syaratArr, setSyaratArr] = useState([]);
  const [beasiswa, setBeasiswa] = useState({
    beasiswa_kode: "",
    beasiswa_periode: "",
    beasiswa_start: "",
    beasiswa_stop: "",
    beasiswa_sk: "",
    beasiswa_perolehan: "",
    beasiswa_keterangan: "",
    beasiswa_show: "",
    beasiswa_asal: "",
    bea_jenis_kode: ""
  });

  const [alertMessage, setAlertMessage] = useState({severity: '', message: ''});

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

  const handleBeajenisChange = async e => {
    console.log("sukses masuk");
    const token = Cookies.get('myToken');
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/master/jenis-beasiswa/${e.target.value}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response =>{
        setSyaratArr(response.data[0]);
        console.log("Success fetch data!");
    })
    .catch(error => {
        navigate('/404');
        console.error('Error fetching data: ',error);
    });
    
    
  }

  console.log(syaratArr.bea_jenis_syarat);

  

  const navigate = useNavigate();

  // const { handleSubmit, control } = useForm({
  //   mode: "onSubmit",
  //   defaultValues: {
  //     username: "12345",
  //     email: ""
  //   },
  //   resolver: joiResolver(schema)
  // });

  const beajenissyarat = syaratArr.bea_jenis_syarat;
      const beajenissyaratArr = beajenissyarat ? beajenissyarat.split(',') : [];
      console.log(beajenissyaratArr);
      const newbeajenissyaratArr = beajenissyaratArr.map(str => parseInt(str, 10));
      console.log(newbeajenissyaratArr)

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
    // console.log(startDate);
    // console.log(stopDate);
    console.log(e.target.elements.bea_jenis_kode.value);
    // try{

      ;
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

    
    
    let jumBea = 0;
    const token = Cookies.get('myToken');
    
    // Fetch data and update jumBea
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/master/beasiswa/jumjenis/${e.target.elements.bea_jenis_kode.value}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(response => {
      jumBea = response.data;
      console.log(response.data);
      console.log("Success fetch data!");
    }).catch(error => {
      navigate('/404');
      console.error('Error fetching data: ',error);
    });

    
    for (let i = 0; i < newbeajenissyaratArr.length; i+=1){
      const response = axios.post(`${process.env.REACT_APP_BACKEND_URL}/persyaratan/insert`, {
          kode_beasiswa: e.target.elements.bea_jenis_kode.value+String(jumBea+1).padStart(3, '0'),
          bea_syarat_id: newbeajenissyaratArr[i]
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    }
    
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/master/beasiswa/insert`, {
          kode_beasiswa: e.target.elements.bea_jenis_kode.value+String(jumBea+1).padStart(3, '0'),
          periode_beasiswa: e.target.elements.beasiswa_periode.value,
          start_beasiswa: e.target.elements.beasiswa_start.value,
          stop_beasiswa: e.target.elements.beasiswa_stop.value,
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
        }).then(response =>{
            console.log(response.data);
            
            setAlertMessage({severity: 'success', message: 'Berhasil Menambahkan'});
            setTimeout(() => {
              setAlertMessage({severity: '', message: ''});
            }, 3000);
        })
        .catch(error => {
            // navigate('/404');
            console.error(error.response.data.message);
            setAlertMessage({severity: 'error', message: error.response.data.message});
            setTimeout(() => {
              setAlertMessage({severity: '', message: ''});
            }, 3000);
        });
        navigate("/master/beasiswa");
        

      // console.log(response.data);
      
      


      // .then((response)=>{
      //     console.log("Success insert data!");
      // navigate("/master/beasiswa");
      
      // })
    // } catch (error){
    //   console.error(error);
    // }
  };

  

  const getBeaJenis = async() => {
    // const response = await axios.get('192.168.100.14:5000/master-jenis-beasiswa');
    // setBeaJenis(response.beajenis);
    // console.log(response.beajenis);
    console.log("sukses masuk");
    const token = Cookies.get('myToken');
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/master/jenis-beasiswa/beasiswa`,
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

  const getPeriode = async() => {
    // const response = await axios.get('192.168.100.14:5000/master-jenis-beasiswa');
    // setBeaJenis(response.beajenis);
    // console.log(response.beajenis);
    console.log("sukses masuk");
    const token = Cookies.get('myToken');
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/master/periode`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response =>{
        setPeriode(response.data);
        console.log("Success fetch data!");
    })
    .catch(error => {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/master/periodepmb`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then(response =>{
          setPeriode(response.data);
          console.log("Success fetch data!");
      })
      .catch(error => {
          console.error('Error fetching data: ',error);
      });
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
          console.error('Error fetching data: ',error);
      });
  }

  


  // if(beasyarat[2].bea_syarat_id === newbeajenissyaratArr[2]){
  //   console.log("OK");
  // }
  // else{
  //   console.log("FALSE");
  // }
  // const syaratArr = [];
  // for (let i = 0; i < beasyarat.length; i+=1) {
  //   for (let j = 0; j < newbeajenissyaratArr.length; j+=1) {
  //     if(beasyarat[i].bea_syarat_id === newbeajenissyaratArr[j]){
  //       syaratArr.push(beasyarat[i].bea_syarat_nama)
  //     }
  //   }
    
  // }

  // console.log(syaratArr);

  useEffect(()=>{
    getBeaJenis();
    getPeriode();
    getBeaSyarat();
  },[]);

  

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
            Insert Beasiswa
            </Typography>
            {/* <Button align="center" variant="contained" onClick={handleClick}>
                Tambah
            </Button> */}

        </Container>
      <Paper elevation={3} sx={{ marginRight: "15%", marginLeft: "15%" }}>
        <Box sx={{ padding: 5 }}>
          {/* <Typography variant="h6" gutterBottom sx={{ paddingBottom: 5 }}>
            Krunch Media
          </Typography> */}
          <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700
                }}
              >
                Jenis Beasiswa
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={9}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Jenis Besiswa</InputLabel>
                <Select
                  required
                  id="bea_jenis_kode"
                  name="bea_jenis_kode"
                  // value={beajenis.bea_jenis_tipe}
                  onChange={handleBeajenisChange}
                  label="Jenis Beasiswa"
                  // onChange={handleChange}
                >
                  {beajenis.map((item) => (
                    <MenuItem value={item.bea_jenis_kode}>{item.bea_jenis_nama}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={3}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700
                }}
              >
                Periode
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={9}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Periode</InputLabel>
                <Select
                  required
                  id="beasiswa_periode"
                  name="beasiswa_periode"
                  // value={beajenis.bea_jenis_tipe}
                  // onChange={handleChange}
                  label="Periode"
                  // onChange={handleChange}
                >
                  {periode.map((item) => (
                    <MenuItem value={item.periode_kode}>{item.periode_nama} {item.periode_akademik}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700
                }}
              >
                Tanggal Pendaftaran
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={4}>
              {/* <TextField
                required
                id="bea_jenis_nama"
                name="bea_jenis_nama"
                label="Nama Jenis"
                // value={beajenis.bea_jenis_nama}
                onChange={handleChange}
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
              /> */}
              <TextField
                required
                id="beasiswa_start"
                name="beasiswa_start"
                type="date"  // Set the type to "datetime-local"
                // label="Tanggal Mulai"
                // value={formatDatetime(rows.bea_apply_wawancara)}
                // onChange={(e) => handleWawancaraChange(e, rows.mhs_nrp, rows.beasiswa_kode)}
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              {/* <TextField
                required
                id="bea_jenis_nama"
                name="bea_jenis_nama"
                label="Nama Jenis"
                // value={beajenis.bea_jenis_nama}
                onChange={handleChange}
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
              /> */}
              <TextField
                required
                id="beasiswa_stop"
                name="beasiswa_stop"
                type="date"  // Set the type to "datetime-local"
                // label="Wawancara Date and Time"
                // value={formatDatetime(rows.bea_apply_wawancara)}
                // onChange={(e) => handleWawancaraChange(e, rows.mhs_nrp, rows.beasiswa_kode)}
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700
                }}
              >
                Nomor S.K.
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={9}>
              {/* <Controller
                name="bea_jenis_kode"
                control={control}
                render={({
                  field: { handleChange, onBlur, value, name, ref },
                  formState: { errors }
                }) => (
                  <div>
                    <TextField
                      // value={value}
                      label="Kode Jenis"
                      onBlur={onBlur}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      autoComplete="off"
                      variant="outlined"
                      // value={beajenis.bea_jenis_kode}
                    />
                    <ErrorMessage
                      errors={errors}
                      name={name}
                      render={({ message }) => <p>{message}</p>}
                    />
                  </div>
                  )}
              /> */}
              <TextField
                id="beasiswa_sk"
                name="beasiswa_sk"
                label="Nomor S.K."
                // value={beajenis.bea_jenis_nama}
                onChange={handleChange}
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
              />
            </Grid>
            
            <Grid item xs={12} sm={3}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700
                }}
              >
                Beasiswa yang diperoleh
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField
                id="beasiswa_perolehan"
                name="beasiswa_perolehan"
                label="Beasiswa yang diperoleh"
                // value={beajenis.bea_jenis_nama}
                onChange={handleChange}
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700
                }}
              >
                Keterangan
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField
                id="beasiswa_keterangan"
                name="beasiswa_keterangan"
                label="Keterangan"
                multiline
                fullWidth
                rows={4}
              />
            </Grid>
            

            {/*  */}
            {/* <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 700
                }}
              >
                Syarat
              </InputLabel>
            </Grid> */}

            {/* <Grid item xs={12} sm={10}>
              <FormControl 
                component="fieldset"
                name="beasiswa_show"
                // value={beajenis.bea_jenis_syarat}
                onChange={handleChange}
            >
                <FormControlLabel
                    // value={beasyarat.bea_syarat_id}
                    control={<Checkbox />}
                    label="Publish"
                    labelPlacement="end"
                    // name="bea_jenis_syarat"
                    onChange={handleChange}
                />
                {/* <InputLabel id="demo-simple-select-label">Syarat</InputLabel>
                <Select
                  id="bea_jenis_syarat"
                  name="bea_jenis_syarat"
                  value={beajenis.bea_jenis_syarat}
                  onChange={handleChange}
                  label="Syarat"
                  // onChange={handleChange}
                >
                
                {/* </Select> 
              </FormControl>
            </Grid> */}

            <Grid item xs={12} sm={3}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700
                }}
              >
                Asal Beasiswa
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField
                id="beasiswa_asal"
                name="beasiswa_asal"
                label="Asal Beasiswa"
                // value={beajenis.bea_jenis_jumlah_spp}
                onChange={handleChange}
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
              />
            </Grid>

            {/* <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 700
                }}
              >
                Img Upload
              </InputLabel>
            </Grid> */}

            {/* <Grid item xs={12} sm={3}>
              <Button>
                <UploadFileIcon />
              </Button>
            </Grid> */}

            

            <Grid item xs={12} sm={6} />
            <Grid item xs={12} sm={5} />
            <Grid item xs={12} sm={5} />
            <Grid item xs={12} sm={4}>
              <Button variant="contained"
              type="submit" 
              // Navigate to="/master/jenis-beasiswa" 
              >
                Insert
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
