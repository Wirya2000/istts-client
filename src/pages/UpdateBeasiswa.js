import * as React from 'react';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import dayjs, { Dayjs } from 'dayjs';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { Link as RouterLink, useNavigate, useParams  } from 'react-router-dom';
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

export default function UpdateBeasiswa() {
  const { beasiswaKode } = useParams();
  const [tipe, setTipe] = React.useState("");
  // const [isChecked, setIsChecked] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [stopDate, setStopDate] = useState(null);
  const [periode, setPeriode] = useState([]);
  const [beasyarat, setBeaSyarat] = useState([]);
  const [beajenis, setBeaJenis] = useState([]);
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
    bea_jenis_kode: "",
    keu_bea_jeni: {
      bea_jenis_nama: ""
    },
    aka_periode: {
      periode_nama: "",
      periode_akademik: ""
    }

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

  const handleBeajenisChange = async e => {
    e.preventDefault();
    // const kode = e.target.value;
    // console.log(kode);
    // set(e.target.value);
    // await getMahasiswa(e.target.value);
    // console.log('masuk onChange');
    console.log(e.target.value);
    setBeasiswa(prevState => ({
      ...prevState,
      bea_jenis_kode: e.target.value
    }));
    await getPeriode();
  };

  const handlePeriodeChange = async e => {
    e.preventDefault();
    // const kode = e.target.value;
    // console.log(kode);
    // set(e.target.value);
    // await getMahasiswa(e.target.value);
    // console.log('masuk onChange');
    console.log(e.target.value);
    setBeasiswa(prevState => ({
      ...prevState,
      beasiswa_periode: e.target.value
    }));
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
      setBeasiswa(prevState => ({
        ...prevState,
        [e.target.name]: e.target.value
      }));
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

  const handlePublish = async() => {
      // Set the form value for beasiswa_show to "1"
    try{
      const token = Cookies.get('myToken');
      const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/master/beasiswa/publish`, {
          kode_beasiswa: beasiswaKode,
          show_beasiswa: 2,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      console.log(response.data);
      navigate("/master/beasiswa");
    } catch (error){
      console.error(error);
    }
  };

  const handleUnpublish = async() => {
      // Set the form value for beasiswa_show to "0"
    try{
      const token = Cookies.get('myToken');
      const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/master/beasiswa/publish`, {
          kode_beasiswa: beasiswaKode,
          show_beasiswa: 1,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      console.log(response.data);
      navigate("/master/beasiswa");
    } catch (error){
      console.error(error);
    }
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
    console.log(e.target.elements.beasiswa_periode.value);
    // console.log(startDate);
    // console.log(stopDate);
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
      const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/master/beasiswa/update`, {
          kode_beasiswa: e.target.elements.beasiswa_kode.value,
          periode_beasiswa: beasiswa.beasiswa_periode,
          start_beasiswa: e.target.elements.beasiswa_start.value,
          stop_beasiswa: e.target.elements.beasiswa_stop.value,
          sk_beasiswa: e.target.elements.beasiswa_sk.value,
          perolehan_beasiswa: e.target.elements.beasiswa_perolehan.value,
          ket_beasiswa: e.target.elements.beasiswa_keterangan.value,
          // show_beasiswa: 1,
          asal_beasiswa: e.target.elements.beasiswa_asal.value,
          kode_jenis: beasiswa.bea_jenis_kode,
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
    // console.log("sukses masuk");
    // await axios.get(`${process.env.REACT_APP_BACKEND_URL}/master/periode`)
    // .then(response =>{
    //     setPeriode(response.data);
    //     console.log("Success fetch data!");
    // })
    // .catch(error => {
    //     console.error('Error fetching data: ',error);
    // });

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
        navigate('/404');
        console.error('Error fetching data: ',error);
    });
  }

    

  const getBeaSyarat = async() => {
      // const response = await axios.get('192.168.100.14:5000/master-jenis-beasiswa');
      // setBeaJenis(response.beajenis);
      // console.log(response.beajenis);
      console.log("sukses masuk");
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}/master/syarat`)
      .then(response =>{
          setBeaSyarat(response.data);
          console.log("Success fetch data!");
      })
      .catch(error => {
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
    console.log(`${process.env.REACT_APP_BACKEND_URL}/master/beasiswa/${beasiswaKode}`)
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/master/beasiswa/${beasiswaKode}`, 
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

  useEffect(()=>{
    getBeaJenis();
    getBeaSyarat();
    getBeasiswa();
    getPeriode();
    // getPeriode();
  },[]);
  // useEffect(()=>{
  //   getPeriode();
  // },[beajenis]);

  

//   const beajenisNama = beajenis.bea_jenis_nama;
//   console.log(beajenisNama);

//   const tipejenis = [
//     "Public/Umum",
//     "Private"
//   ];

console.log(beasiswa);
console.log(beasiswa.keu_bea_jeni.bea_jenis_nama);
console.log(beajenis);
console.log(periode);
console.log(beasiswa.aka_periode.periode_nama)
  return (
      <>
        <Helmet>
            <title> Beasiswa ISTTS </title>
        </Helmet>
        <Container maxWidth="xl">
            <Typography variant="h4" sx={{ mb: 5 }}>
            Update Beasiswa
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
                Kode Beasiswa
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField
                id="beasiswa_kode"
                name="beasiswa_kode"
                label="Kode Beasiswa"
                value={beasiswa.beasiswa_kode}
                // onChange={handleChange}
                readOnly
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
                Jenis Beasiswa
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={9}>
              {/* <TextField
                id="bea_jenis_kode"
                name="bea_jenis_kode"
                label="Jenis Beasiswa"
                value={beasiswa.keu_bea_jeni.bea_jenis_nama}
                // onChange={handleChange}
                readOnly
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
              /> */}
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Jenis Besiswa</InputLabel>
                <Select
                  required
                  id="bea_jenis_kode"
                  name="bea_jenis_kode"
                  value={beasiswa.bea_jenis_kode}
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
            {/* <TextField
                id="beasiswa_periode"
                name="beasiswa_periode"
                label="Periode Beasiswa"
                value={
                  beasiswa &&
                  beasiswa.aka_periode &&
                  `${beasiswa.aka_periode.periode_nama} ${beasiswa.aka_periode.periode_akademik}`
                  // beasiswa.aka_periode.periode_nama
                }
                // onChange={handleChange}
                readOnly
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
              /> */}

              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Periode</InputLabel>
                <Select
                  required
                  id="beasiswa_periode"
                  name="beasiswa_periode"
                  value={beasiswa.beasiswa_periode}
                  onChange={handlePeriodeChange}
                  label="Periode Beasiswa"
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
                label="Tanggal Mulai"
                value={beasiswa.beasiswa_start}
                onChange={handleChange}
                // readOnly
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
                label="Tanggal Berakhir"
                value={beasiswa.beasiswa_stop}
                onChange={handleChange}
                // readOnly
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
                value={beasiswa.beasiswa_sk}
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
                value={beasiswa.beasiswa_perolehan}
                onChange={handleChange}
                // readOnly
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
                value={beasiswa.beasiswa_keterangan}
                onChange={handleChange}
                // readOnly
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
                value={beasiswa.beasiswa_asal}
                onChange={handleChange}
                // readOnly
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
              />
            </Grid>


            {/* <Grid item xs={12} sm={3}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700
                }}
              >
                Publish
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Checkbox
                id="beasiswa_show"
                name="beasiswa_show"
                color="primary"
                // inputProps={{
                //   'aria-labelledby': labelId,
                // }}
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
            <Grid item xs={12} sm={3} />
            <Grid item xs={12} sm={4}>
            {(() => {
                if (beasiswa.beasiswa_show === 1) {
                    return (
                        <Button 
                        variant="contained" 
                        id="beasiswa_publish"
                        name="beasiswa_publish"
                        onClick={handlePublish}>
                            Publish
                        </Button>
                    )
                }
                return (
                    <Button 
                    variant="contained" 
                    id="beasiswa_publish"
                    name="beasiswa_publish"
                    onClick={handleUnpublish}>
                        Unpublish
                    </Button>
                )
            })()}
            </Grid> 
            <Grid item xs={12} sm={3}>
              {/* <Button variant="contained"
              name="beasiswa_pulish"
              type="submit" 
              >
                Publish
              </Button> */}
              <Button variant="contained"
              name="beasiswa_submit"
              type="submit" 
              // Navigate to="/master/jenis-beasiswa" 
              >
                Update
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
