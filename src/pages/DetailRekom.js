import * as React from 'react';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import dayjs, { Dayjs } from 'dayjs';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { Link, useNavigate, useParams } from 'react-router-dom';
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

export default function DetailRekom() {
  const [tipe, setTipe] = React.useState("");
  // const [isChecked, setIsChecked] = useState(false);
  const { kodeBeasiswa, mhsNrp } = useParams();
  const [startDate, setStartDate] = useState(null);
  const [stopDate, setStopDate] = useState(null);
  const [periode, setPeriode] = useState([]);
  const [bearekom, setBeaRekom] = useState([]);
  const [beajenis, setBeaJenis] = useState([]);
  const [detailrekom, setDetailRekom] = useState([]);
  const [isChecked, setChecked] = useState(false);

  // const handleCheckboxChange = (event) => {
  //   setIsChecked(event.target.checked);
  // };

//   console.log();
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

//   const handleChange = async e => {
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
    // e.preventDefault();
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
    //   await setBeaApply({
    //     [e.target.name]: e.target.value
    //   });
    //   console.log(beaapply);
    // }

//   };

  

  const navigate = useNavigate();

  // const { handleSubmit, control } = useForm({
  //   mode: "onSubmit",
  //   defaultValues: {
  //     username: "12345",
  //     email: ""
  //   },
  //   resolver: joiResolver(schema)
  // });

  const handleRekomChange = (event) => {
    setChecked(event.target.checked);
    console.log(isChecked);
  };

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
    // console.log(e.target.elements.bea_apply_rekom.value);
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
    //   console.log(beatipe);
      console.log(isChecked);
      // console.log(bearekom.length);
      const token = Cookies.get('myToken');
      console.log(token)
      if(isChecked === true && bearekom.length === 0){
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/master/rekom/insert`, {
          // kode_beasiswa: beasiswa.form.bea_kode,
          mhs_nrp: detailrekom.mhs_nrp,
          periode_kode: periode.periode_kode,
          // bea_apply_rekom: e.target.elements.bea_apply_rekom.value,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      console.log(response.data);
      }

      else if(isChecked === false && bearekom.length === 1){
        console.log(token)
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/master/rekom/delete`, {
          bea_rekom_id: bearekom[0].bea_rekom_id,
          // mhs_nrp: detailrekom.mhs_nrp,
          // periode_kode: periode.periode_kode,
          // bea_apply_rekom: e.target.elements.bea_apply_rekom.value,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      console.log(response.data);
      }
      


      // .then((response)=>{
      //     console.log("Success insert data!");
      
      
      // })
      navigate("/master/rekom");
    } catch (error){
      console.error(error);
    }
  };

  const getDetailRekom = async() => {
    // const response = await axios.get('192.168.100.14:5000/master-jenis-beasiswa');
    // setBeaJenis(response.beajenis);
    // console.log(response.beajenis);
    console.log("sukses masuk");
    const token = Cookies.get('myToken');
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/mahasiswa/rekom/${mhsNrp}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response =>{
        setDetailRekom(response.data[0]);
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
    console.log("sukses masuk");
    const token = Cookies.get('myToken');
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/master/periode/rekom`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response =>{
        setPeriode(response.data[0]);
        console.log("Success fetch data!");
    })
    .catch(error => {
        navigate('/404');
        console.error('Error fetching data: ',error);
    });
  }

  const getBeaRekom = async() => {
      // const response = await axios.get('192.168.100.14:5000/master-jenis-beasiswa');
      // setBeaJenis(response.beajenis);
      // console.log(response.beajenis);
      console.log("sukses masuk");
      const token = Cookies.get('myToken');
      // masalah di periode..periode_kode
      console.log(`${process.env.REACT_APP_BACKEND_URL}/master/rekom/${mhsNrp}/${periode?.periode_kode}`);
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}/master/rekom/${mhsNrp}/${periode?.periode_kode}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then(response =>{
          setBeaRekom(response.data);
          console.log("Success fetch data!");
          console.log("Length of bearekom:", response.data.length);
      })
      .catch(error => {
          console.error('Error fetching data: ',error);
      });
  }

  useEffect(()=>{
    getDetailRekom();
    getPeriode();
  },[]);

  useEffect(() => {
    getBeaRekom();
  }, [periode]); 

  useEffect(() => {
    if (bearekom.length === 1) {
      setChecked(true);
    } else if (bearekom.length === 0) {
      setChecked(false);
    }
  }, [bearekom]); 
  

  console.log(detailrekom);
  console.log(periode);
  console.log(periode.periode_kode);
  console.log(bearekom);
  console.log(bearekom.length);

  console.log(isChecked);
  

  // useEffect(()=>{
  //   getPeriode();
  //   // getBeaSyarat();
  // },[]);

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
             Rekomendasi Mahasiswa
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
            <Grid item xs={12} sm={12}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700
                }}
              >
                NRP: {detailrekom.mhs_nrp}
              </InputLabel>
            </Grid>
          </Grid>
          <Grid>
            <Grid item xs={12} sm={12}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700
                }}
              >
                Nama Mahasiswa: {detailrekom.mhs_nama}
              </InputLabel>
            </Grid>
          </Grid>
          <Grid>
            <Grid item xs={12} sm={12}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700
                }}
              >
                Jurusan: {detailrekom && detailrekom.aka_jurusan && detailrekom.aka_jurusan.jur_nama}
              </InputLabel>
            </Grid>
          </Grid>
          <Grid>
            <Grid item xs={12} sm={12}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700
                }}
              >
                IPK: {detailrekom.mhs_ipk}
              </InputLabel>
            </Grid>
          </Grid>
          <Grid>
            <Grid item xs={12} sm={12}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700
                }}
              >
                Periode: {periode.periode_nama} {periode.periode_akademik}
              </InputLabel>
            </Grid>
          </Grid>
          <Grid>
            <Grid item xs={12} sm={3}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700
                }}
              >
                Rekomendasi:
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Checkbox
                id="rekom_status"
                name="rekom_status"
                color="primary"
                checked={isChecked}
                onChange={handleRekomChange}
              />
              {/* <p>Checkbox Value: {isChecked ? 'Checked' : 'Unchecked'}</p> */}
            </Grid>
          </Grid>
          
            {/* <Grid item xs={12} sm={12}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700
                }}
              >
                IPK Saat Mendaftar / IPK Saat Ini: {beaapply.bea_apply.ipk} / {beaapply && beaapply.mahasiswa && beaapply.mahasiswa.mhs_ipk}
              </InputLabel>
            </Grid> */}
            {/* <Grid item xs={12} sm={12}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700
                }}
              >
                IPS Saat Mendaftar / IPS Saat Ini: {beaapply.bea_apply.ips} / {beaapply && beaapply.mahasiswa && beaapply.mahasiswa.mhs_ips}
              </InputLabel>
            </Grid> */}

            {/* <Grid item xs={12} sm={3}>
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
            <Grid item xs={12} sm={4}> */}
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
              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    required
                    id="beasiswa_start"
                    name="beasiswa_start"
                    label="Tanggal Mulai"
                    // value={value}
                    onChange={handleStartDateChange}
                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={4}> */}
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
              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    required
                    id="beasiswa_stop"
                    name="beasiswa_stop"
                    label="Tanggal Selesai"
                    // value={}
                    onChange={handleStopDateChange}
                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                />
              </LocalizationProvider>
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
            <Grid item xs={12} sm={9}> */}
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
              {/* <TextField
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
            </Grid> */}
            

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

            {/* <Grid item xs={12} sm={3}>
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
            </Grid> */}

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
                Save
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
          {/* </Grid> */}
          </form>
        </Box>
      </Paper>
      </>
  )
}
