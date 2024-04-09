import * as React from 'react';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import axios from 'axios';
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
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import UploadFileIcon from "@mui/icons-material/UploadFile";
// import Button from "@mui/material/Button";

import Checkbox from "@mui/material/Checkbox";
import Autocomplete from '@mui/material/Autocomplete';
import FormControlLabel from "@mui/material/FormControlLabel";

import { useTheme } from '@mui/material/styles';
import { ConstructionOutlined } from '@mui/icons-material';

import tokenValidator from '../utils/tokenValidator';

const schema = joi.object({
  username: joi.string().min(4).message("4").max(6).message("6").required()
});



const jenisSyarat = [];

export default function InsertPmb() {
  const [tipe, setTipe] = React.useState("");
  const [checkedItems, setCheckedItems] = useState([]);
  const [jurusan, setJurusan] = useState([]);
  const [mahasiswa, setMahasiswa] = useState([]);
  const [mhsnoreg, setMhsnoreg] = useState("");
  const [mhsjurkode, setMhsjurkode] = useState("");
  const [beajenis, setBeaJenis] = useState([]);
//   const [se, setBeaJenis] = useState([]);

  const [alertMessage, setAlertMessage] = useState({severity: '', message: ''});

  const navigate = useNavigate();
  

//   const handleCheckboxChange = (e) => {
//     // const { name, checked } = e.target;
//     // setCheckedItems({ ...checkedItems, [name]: checked });
//     console.log(e.target.checked);
//     if(e.target.checked){
//       jenisSyarat.push(e.target.value);
//       // console.log(jenisSyarat);
//       // setCheckedItems(e.target.value)
//       // setCheckedItems({jenisSyarat: checkedItems.jenisSyarat.push(e.target.value)})
//     }
//     else{
//       jenisSyarat.splice(jenisSyarat.indexOf(e.target.value),1);
//     }
    
//     console.log(jenisSyarat);
//     console.log(jenisSyarat.join(','));
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedFile = e.target.elements.file_sk.files[0];
    console.log(e.target.elements.mhs_noreg.value)
    console.log(e.target.elements.bea_sk_tgl.value)
    console.log(selectedFile);
    // try{
      const token = Cookies.get('myToken');
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/master/pmb/insert`, {
          mhs_noreg: e.target.elements.mhs_noreg.value,
          jur_kode: e.target.elements.jur_kode.value,
          bea_jenis_kode: e.target.elements.bea_jenis_kode.value,
          bea_sk_no: e.target.elements.bea_sk_no.value,
          bea_sk_tgl: e.target.elements.bea_sk_tgl.value,
          bea_keterangan: e.target.elements.bea_keterangan.value,
          bea_benefit: e.target.elements.bea_benefit.value,
          file: selectedFile
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      }).then(response =>{
          console.log(response.data);
          
          setAlertMessage({severity: 'success', message: 'Berhasil Menambahkan'});
          setTimeout(() => {
            setAlertMessage({severity: '', message: ''});
          }, 3000);
          navigate("/master/pmb");
      })
      .catch(error => {
          // navigate('/404');
          console.error(error.response.data.message);
          setAlertMessage({severity: 'error', message: error.response.data.message});
          setTimeout(() => {
            setAlertMessage({severity: '', message: ''});
          }, 3000);
      });
      // const formData = new FormData();
      // formData.append('mhs_noreg', e.target.elements.mhs_noreg.value);
      // formData.append('jur_kode', e.target.elements.jur_kode.value);
      // formData.append('bea_jenis_kode', e.target.elements.bea_jenis_kode.value);
      // formData.append('bea_sk_no', e.target.elements.bea_sk_no.value);
      // formData.append('bea_sk_tgl', e.target.elements.bea_sk_tgl.value);
      // formData.append('bea_keterangan', e.target.elements.bea_keterangan.value);
      // formData.append('bea_benefit', e.target.elements.bea_benefit.value);
      // formData.append('file_sk', selectedFile);

      // const response = await axios.post('http://localhost:5000/master/pmb/insert', formData, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //     'Content-Type': 'multipart/form-data'
      //   }
      // });
      // console.log(response.data);
      // navigate("/master/pmb");
    // } catch (error){
    //   console.error(error);
    // }
  };

  const handleJurusanChange = async e => {
    e.preventDefault();
    // const kode = e.target.value;
    // console.log(kode);
    // set(e.target.value);
    // console.log()

    await getMahasiswa(e.target.value);
    console.log(mahasiswa);
    // console.log('masuk onChange');
  };

  const handleMahasiswaChange = async e => {
    e.preventDefault();
    // const kode = e.target.value;
    // console.log(kode);
    // setMhsnoreg(e.target.value);

    // await getMahasiswa(e.target.value);
    // console.log('masuk onChange');
  };

  const handleBeajenisChange = async e => {
    e.preventDefault();
    // const kode = e.target.value;
    // console.log(kode);
    // set(e.target.value);
    // await getMahasiswa(e.target.value);
    // console.log('masuk onChange');
  };

  const getJurusan = async() => {
    console.log("sukses masuk");
    const token = Cookies.get('myToken');
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/master/jurusan/pmb`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response =>{
        setJurusan(response.data);
        console.log("Success fetch data!");
    })
    .catch(error => {
        navigate('/404');
        console.error('Error fetching data: ',error);
    });
  }

  const getMahasiswa = async(jurKode) => {
    console.log("sukses masuk");
    const token = Cookies.get('myToken');
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/master/mahasiswa/${jurKode}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response =>{
        setMahasiswa(response.data);
        console.log("Success fetch data!");
    })
    .catch(error => {
        navigate('/404');
        console.error('Error fetching data: ',error);
    });
  }

  const getBeaJenis = async() => {
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
  

  useEffect(()=>{
      getJurusan();
      // getMahasiswa();
      getBeaJenis();
  },[]);

  console.log(mahasiswa);

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
            Insert PMB
            </Typography>
        </Container>
      <Paper elevation={3} sx={{ marginRight: "15%", marginLeft: "15%" }}>
        <Box sx={{ padding: 5 }}>
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
                Jurusan
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={9}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Jurusan</InputLabel>
              <Select
                required
                id="jur_kode"
                name="jur_kode"
                // value={periode.periode_kode}
                onChange={handleJurusanChange}
                label="Jurusan"
                // onChange={handleChange}
              >
                {jurusan.map((item) => (
                  <MenuItem value={item.jur_kode}>{item.jur_nama}</MenuItem>
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
                Mahasiswa
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={9}>
            {/* <FormControl fullWidth size="small"> */}
              {/* <InputLabel id="demo-simple-select-label">Mahasiswa</InputLabel> */}
              {/* <Select
                required
                id="mhs_noreg"
                name="mhs_noreg"
                // value={periode.periode_kode}
                onChange={handleMahasiswaChange}
                label="Mahasiswa"
                // onChange={handleChange}
              >
                {mahasiswa.map((item) => (
                  <MenuItem value={item.mhs_noreg}>{item.mhs_nama}</MenuItem>
                ))}
              </Select> */}
              <Autocomplete
                disablePortal
                id="mhs_noreg"
                name="mhs_noreg"
                options={mahasiswa.map((option) => ({
                  value: option.mhs_noreg,
                  label: option.mhs_nama
                }))}
                onChange={handleMahasiswaChange}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Mahasiswa" />}
              />
            {/* </FormControl> */}
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
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Jenis Beasiswa</InputLabel>
              <Select
                required
                id="bea_jenis_kode"
                name="bea_jenis_kode"
                // value={periode.periode_kode}
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
                No. S.K.
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField
                required
                id="bea_sk_no"
                name="bea_sk_no"
                label="No. S.K."
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
                Tanggal S.K.
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField
                required
                id="bea_sk_tgl"
                name="bea_sk_tgl"
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
                Keterangan
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField
                id="bea_keterangan"
                name="bea_keterangan"
                label="Keterangan"
                multiline
                fullWidth
                rows={4}
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
                Benefit
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField
                id="bea_benefit"
                name="bea_benefit"
                label="Benefit"
                multiline
                fullWidth
                rows={2}
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
                File SK
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField 
                id = "file_sk"
                name = "file_sk"
                type="file" 
                // onChange={(event) => handleFileChange(item, event)}
              />
            </Grid>

            

            <Grid item xs={12} sm={6} />
            <Grid item xs={12} sm={5} />
            <Grid item xs={12} sm={5} />

            <Grid item xs={12} sm={4}>
              <Button variant="contained" type="submit" >
                Insert
              </Button>
            </Grid>
          </Grid>
          </form>
        </Box>
      </Paper>
      </>
  )
}
