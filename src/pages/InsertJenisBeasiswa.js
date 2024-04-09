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
import FormControlLabel from "@mui/material/FormControlLabel";

import { useTheme } from '@mui/material/styles';
import { ConstructionOutlined } from '@mui/icons-material';

import tokenValidator from '../utils/tokenValidator';

const schema = joi.object({
  username: joi.string().min(4).message("4").max(6).message("6").required()
});

const jenisSyarat = [];

export default function InsertJenisBeasiswa() {
  const [tipe, setTipe] = React.useState("");
  const [checkedItems, setCheckedItems] = useState([]);
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

  const navigate = useNavigate();

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let beatipe = e.target.elements.bea_jenis_tipe.value
    if(beatipe==='Public/Umum'){
      beatipe= '1';
    }
    else if(beatipe==='Private'){
      beatipe= '2';
    }

    // try{
      console.log(beajenis);
      console.log(beatipe);
      console.log(e.target.elements.bea_jenis_syarat.value);
      const token = Cookies.get('myToken');
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/master/jenis-beasiswa/insert`, {
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
      }).then(response =>{
          console.log(response.data);
          navigate("/master/jenis-beasiswa");
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
    // } catch (error){
    //   console.error(error);
    // }
  };

  const getBeaSyarat = async() => {
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
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/master/syaratpmb`,
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
          // navigate('/master/jenis-beasiswa/pmb/insert');
          // console.error('Error fetching data: ',error);
      });
  }

  useEffect(()=>{
      getBeaSyarat();
  },[]);

  const tipejenis = [
    "Public/Umum",
    "Private"
  ];

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
            Insert Jenis Beasiswa
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
                Kode Jenis
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField
                required
                id="bea_jenis_kode"
                name="bea_jenis_kode"
                label="Kode Jenis"
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
                Nama Jenis
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField
                required
                id="bea_jenis_nama"
                name="bea_jenis_nama"
                label="Nama Jenis"
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
                Syarat
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={9}>
              <FormControl 
                component="fieldset"
                id="bea_jenis_syarat"
                name="bea_jenis_syarat"
              >
                {beasyarat.map((beasyarat) => (
                  <FormControlLabel
                  value={beasyarat.bea_syarat_id}
                  control={<Checkbox />}
                  label={beasyarat.bea_syarat_nama}
                  labelPlacement="end"
                  id="bea_jenis_syarat"
                  name="bea_jenis_syarat"
                  sx={{ marginBottom: 2}} 
                  onChange={handleCheckboxChange}
                />
                ))}
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
                Jumlah SPP
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField
                required
                id="bea_jenis_jumlah_spp"
                name="bea_jenis_jumlah_spp"
                label="Jumlah SPP"
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
                Jumlah SKS
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField
                required
                id="bea_jenis_jumlah_sks"
                name="bea_jenis_jumlah_sks"
                label="Jumlah SKS"
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
                Tipe
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={9}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Tipe Jenis</InputLabel>
                <Select
                  required
                  id="bea_jenis_tipe"
                  name="bea_jenis_tipe"
                  label="Tipe Jenis"
                >
                  {tipejenis.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
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
