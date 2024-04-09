import * as React from 'react';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
// @mui
import { Stack, Button, Typography, Container, Alert } from '@mui/material';
import Grid from "@mui/material/Grid";
// import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
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
import { validateDateTime } from '@mui/x-date-pickers/internals';

import tokenValidator from '../utils/tokenValidator';

export default function UpdateJenisBeasiswa() {
    const { beaJenisKode } = useParams();
    const [tipe, setTipe] = React.useState("");
    // const [isChecked, setIsChecked] = useState(false);
    const [checkedItems, setCheckedItems] = useState({});
    const [beasyarat, setBeaSyarat] = useState([]);
    const [beajenis, setBeaJenis] = useState({
        bea_jenis_kode: "",
        bea_jenis_nama: "",
        bea_jenis_syarat: "",
        bea_jenis_jumlah_spp: "",
        bea_jenis_jumlah_sks: "",
        bea_jenis_tipe: ""
    });

    const [alertMessage, setAlertMessage] = useState({severity: '', message: ''});
    
    console.log(beaJenisKode);

    const jenisSyarat = [];

    const tipejenis = [
      "Public/Umum",
      "Private"
    ];

    // const handleCheckboxChange = (event) => {
    //   setIsChecked(event.target.checked);
    // };

    // const handleCheckboxChange = (e) => {
    //     const { name, checked } = e.target;
    //     setCheckedItems({ ...checkedItems, [name]: checked });
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
        const val = e.target.value;
        e.preventDefault();

        // const { name, checked } = e.target;
        // await setCheckedItems({ ...checkedItems, [name]: checked });

        // if(e.target.name === "bea_jenis_tipe"){
        //   val = (tipejenis.indexOf(e.target.value)+1)
        // }

        setBeaJenis(prevState => ({
          ...prevState,
          [e.target.name]: val
        }));
    };
    const handleCheckboxChange = (e) => {
      // const { name, checked } = e.target;
      // setCheckedItems({ ...checkedItems, [name]: checked });
      console.log(e.target.checked);
      if(e.target.checked){
        jenisSyarat.push(e.target.value);
        // console.log(jenisSyarat);
        // setCheckedItems(e.target.value)
        // setCheckedItems({jenisSyarat: checkedItems.jenisSyarat.push(e.target.value)})
      }
      else{
        jenisSyarat.splice(jenisSyarat.indexOf(e.target.value),1);
      }
      
      console.log(jenisSyarat);
      console.log(jenisSyarat.join(','));
      setBeaJenis(prevState => ({
        ...prevState,
        [e.target.name]: jenisSyarat.join(',')
      }));
    };

    const navigate = useNavigate();
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
      let beatipe = e.target.elements.bea_jenis_tipe.value;
      if(beatipe==='Public/Umum'){
        beatipe= '1';
      }
      else if(beatipe==='Private'){
        beatipe= '2';
      }
  
      try{
        console.log(beajenis);
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
        console.log(beatipe);
        const token = Cookies.get('myToken');
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/master/jenis-beasiswa/update`, {
          kode_jenis: e.target.elements.bea_jenis_kode.value,
          nama_jenis: e.target.elements.bea_jenis_nama.value,
          syarat_jenis: jenisSyarat.join(','),
          jum_spp_jenis: e.target.elements.bea_jenis_jumlah_spp.value,
          jum_sks_jenis: e.target.elements.bea_jenis_jumlah_sks.value,
          tipe_jenis: beatipe
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        console.log(response.data);
  
        // .then((response)=>{
        //     console.log("Success insert data!");
        navigate("/master/jenis-beasiswa");
        // })
      } catch (error){
        console.error(error);
      }
    };

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

    const getBeaJenis = async() => {
        // const response = await axios.get('192.168.100.14:5000/master-jenis-beasiswa');
        // setBeaJenis(response.beajenis);
        // console.log(response.beajenis);
        console.log("sukses masuk");
        const token = Cookies.get('myToken');
        console.log(`${process.env.REACT_APP_BACKEND_URL}/master/jenis-beasiswa/${beaJenisKode}`)
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/master/jenis-beasiswa/${beaJenisKode}`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        .then(response =>{
            setBeaJenis(response.data[0]);
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
    },[]);

    // useEffect(() => {
    //   setBeaJenis(prevState => ({
    //     ...prevState,
    //     bea_jenis_tipe: tipejenis[beajenis.bea_jenis_tipe]
    //   }));
    // }, [tipejenis]);

    console.log(beajenis);
    console.log(tipejenis[beajenis.bea_jenis_tipe-1])
    const syaratArr = [];

    const beajenissyarat = beajenis.bea_jenis_syarat;
    const beajenissyaratArr = beajenissyarat ? beajenissyarat.split(',') : [];
    console.log(beajenissyaratArr);
    const newbeajenissyaratArr = beajenissyaratArr.map(str => parseInt(str, 10));
    console.log(newbeajenissyaratArr);
    for (let i = 0; i < beajenissyaratArr.length; i+=1) {
      jenisSyarat.push(beajenissyaratArr[i])
    }
    // jenisSyarat.push(beajenissyaratArr)

    // for (let i = 0; i < beasyarat.length; i+=1) {
    //   for (let j = 0; j < newbeajenissyaratArr.length; j+=1) {
    //     if(beasyarat[i].bea_syarat_id === newbeajenissyaratArr[j]){
    //       syaratArr.push(beasyarat[i].bea_syarat_id)
    //     }
    //   }
      
    // }

    // console.log(syaratArr);

    const tj = tipejenis[beajenis.bea_jenis_tipe-1];
    
    

    return (
        <>
          <Helmet>
              <title> Beasiswa ISTTS </title>
          </Helmet>
          <Container maxWidth="xl">
              <Typography variant="h4" sx={{ mb: 5 }}>
              Update Jenis Beasiswa
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
              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: 700
                  }}
                >
                  Kode Jenis
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  required
                  id="bea_jenis_kode"
                  name="bea_jenis_kode"
                  label="Kode Jenis"
                  value={beajenis.bea_jenis_kode}
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
                  Content
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  id="outlined-multiline-static"
                  label="Content"
                  multiline
                  fullWidth
                  rows={4}
                />
              </Grid> */}
              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: 700
                  }}
                >
                  Nama Jenis
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  required
                  id="bea_jenis_nama"
                  name="bea_jenis_nama"
                  label="Nama Jenis"
                  value={beajenis.bea_jenis_nama}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  autoComplete="off"
                  variant="outlined"
                />
              </Grid>
              
  
              {/*  */}
              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: 700
                  }}
                >
                  Syarat
                </InputLabel>
              </Grid>
  
              <Grid item xs={12} sm={10}>
                <FormControl 
                  component="fieldset"
                  name="bea_jenis_syarat"
                  // value={beajenis.bea_jenis_syarat}
                  // onChange={handleChange}
  
                  >
                  {/* <InputLabel id="demo-simple-select-label">Syarat</InputLabel>
                  <Select
                    id="bea_jenis_syarat"
                    name="bea_jenis_syarat"
                    value={beajenis.bea_jenis_syarat}
                    onChange={handleChange}
                    label="Syarat"
                    // onChange={handleChange}
                  > */}
                  {beasyarat.map((beasyarat) => (
                    <FormControlLabel
                    value={beasyarat.bea_syarat_id}
                    control={<Checkbox checked={newbeajenissyaratArr.includes(beasyarat.bea_syarat_id)} />}
                    label={beasyarat.bea_syarat_nama}
                    labelPlacement="end"
                    name="bea_jenis_syarat"
                    sx={{ marginBottom: 2}} 
                    onChange={handleCheckboxChange}
                  />
                  ))}
                  {/* </Select> */}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: 700
                  }}
                >
                  Jumlah SPP
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  required
                  id="bea_jenis_jumlah_spp"
                  name="bea_jenis_jumlah_spp"
                  label="Jumlah SPP"
                  value={beajenis.bea_jenis_jumlah_spp}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  autoComplete="off"
                  variant="outlined"
                />
              </Grid>
  
              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: 700
                  }}
                >
                  Jumlah SKS
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  required
                  id="bea_jenis_jumlah_sks"
                  name="bea_jenis_jumlah_sks"
                  label="Jumlah SKS"
                  value={beajenis.bea_jenis_jumlah_sks}
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
  
              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: 700
                  }}
                >
                  Tipe
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={10}>
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">Tipe Jenis</InputLabel>
                  <Select
                    required
                    id="bea_jenis_tipe"
                    name="bea_jenis_tipe"
                    value={beajenis.bea_jenis_tipe}
                    // value="Private"
                    onChange={handleChange}
                    label="Tipe Jenis"
                    // onChange={handleChange}
                  >
                    {tipejenis.map((item, index) => (
                      <MenuItem key={index} value={index+1}>{item}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
  
              <Grid item xs={12} sm={6} />
              <Grid item xs={12} sm={5} />
              <Grid item xs={12} sm={4}>
                <Button variant="contained"
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