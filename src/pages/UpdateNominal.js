import * as React from 'react';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
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

import tokenValidator from '../utils/tokenValidator';

const schema = joi.object({
  username: joi.string().min(4).message("4").max(6).message("6").required()
});

export default function UpdateNominal() {
  const { beaNomKode } = useParams();
  const [tipe, setTipe] = React.useState("");
  // const [isChecked, setIsChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [jurusan, setJurusan] = useState([]);
  const [beanominal, setBeaNominal] = useState({
      nom_kode: "",
      jur_kode: "",
      nom_angkatan: "",
      nom_spp: "",
      nom_sks: "",
      nom_status: ""    
  });

  const navigate = useNavigate();

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

    await setBeaNominal({
    form:{
        ...beanominal.form,
        [e.target.name]: e.target.value
    }
    });
};

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
    try{
      console.log(beanominal);
      const token = Cookies.get('myToken');
      const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/master/nominal/update`, {
            kode_nom: beaNomKode,
            kode_jur: e.target.elements.jur_kode.value,
            angkatan_nom: e.target.elements.nom_angkatan.value,
            spp_nom: e.target.elements.nom_spp.value,
            sks_nom: e.target.elements.nom_sks.value,
            status_nom: 1
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      console.log(response.data);
      navigate("/master/nominal");
    } catch (error){
      console.error(error);
    }
  };

  const getJurusan = async() => {
      // const response = await axios.get('192.168.100.14:5000/master-jenis-beasiswa');
      // setBeaJenis(response.beajenis);
      // console.log(response.beajenis);
      console.log("sukses masuk");
      const token = Cookies.get("myToken");
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}/master/jurusan/bau`,
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
          console.error('Error fetching data: ',error);
      });
  }

  const getBeaNominal = async() => {
    console.log("sukses masuk");
    const token = Cookies.get('myToken');
    console.log(`${process.env.REACT_APP_BACKEND_URL}/master/nominal/${beaNomKode}`)
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/master/nominal/${beaNomKode}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response =>{
        setBeaNominal(response.data[0]);
        console.log("Success fetch data!");
    })
    .catch(error => {
        navigate('/404');
        console.error('Error fetching data: ',error);
    });
  }

  useEffect(()=>{
      getJurusan();
      getBeaNominal();
  },[]);

  console.log(beanominal);
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
            Update Nominal
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
                  value={beanominal.jur_kode}
                  onChange={handleChange}
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
                Angkatan
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
                required
                id="nom_angkatan"
                name="nom_angkatan"
                label="Angkatan (format 4 angka!)"
                value={beanominal.nom_angkatan}
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
                Nominal SPP
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField
                required
                id="nom_spp"
                name="nom_spp"
                label="Nominal SPP"
                value={beanominal.nom_spp}
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
                Nominal SKS
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField
                required
                id="nom_sks"
                name="nom_sks"
                label="Nominal SKS"
                value={beanominal.nom_sks}  
                onChange={handleChange}
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6} />
            <Grid item xs={12} sm={5} />
            <Grid item xs={12} sm={5} />
            <Grid item xs={12} sm={4}>
              <Button variant="contained"
              type="submit" 
              // Navigate to="/master/jenis-beasiswa" 
              >
                Update
              </Button>
            </Grid>

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
