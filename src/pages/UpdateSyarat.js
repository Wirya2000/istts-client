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
import Fab from '@mui/material/Fab';
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import VisuallyHiddenInput from '@mui/material/VisuallyHidden';
// import Button from "@mui/material/Button";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import { useTheme } from '@mui/material/styles';

import tokenValidator from '../utils/tokenValidator';

const schema = joi.object({
  username: joi.string().min(4).message("4").max(6).message("6").required()
});

export default function UpdateSyarat() {
  const { beaSyaratId } = useParams();
  const [tipe, setTipe] = React.useState("");
  // const [isChecked, setIsChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [beasyarat, setBeaSyarat] = useState({
    bea_syarat_id: "",
    bea_syarat_nama: "",
    bea_syarat_file_nama: "",
    bea_syarat_file_tipe: "",
    bea_syarat_priority: "",
    bea_syarat_show: 1,
    bea_syarat_file: ""

  });

  const [alertMessage, setAlertMessage] = useState({severity: '', message: ''});

  // const handleCheckboxChange = (event) => {
  //   setIsChecked(event.target.checked);
  // };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCheckedItems({ ...checkedItems, [name]: checked });
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

    await setBeaSyarat(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
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
    const selectedFile = e.target.elements.file_template.files[0];
    console.log(selectedFile);
    let beatipe = e.target.elements.bea_syarat_file_tipe.value;
    if(beatipe==='jpg'){
      beatipe= 'jpg';
    }
    else if(beatipe==='pdf'){
      beatipe= 'pdf';
    }

    // try{
      console.log(beasyarat);
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
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/master/syarat/update`, {
          id_syarat: beaSyaratId,
          nama_syarat: e.target.elements.bea_syarat_nama.value,
          nfile_syarat: e.target.elements.bea_syarat_file_nama.value,
          tfile_syarat: beatipe,
          priority_syarat: e.target.elements.bea_syarat_priority.value,
          show_syarat: 1,
          file: selectedFile
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      }).then(response =>{
        console.log(response.data);
        setAlertMessage({severity: 'success', message: 'Berhasil Mengubah'});
        setTimeout(() => {
          setAlertMessage({severity: '', message: ''});
        }, 3000);
        navigate("/master/syarat");
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
      // const response = await axios.get('192.168.100.14:5000/master-jenis-beasiswa');
    // setBeaJenis(response.beajenis);
    // console.log(response.beajenis);
    console.log("sukses masuk");
    const token = Cookies.get("myToken");
    console.log(`${process.env.REACT_APP_BACKEND_URL}/master/syarat/${beaSyaratId}`)
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/master/syarat/${beaSyaratId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response =>{
        setBeaSyarat(response.data[0]);
        console.log("Success fetch data!");
    })
    .catch(error => {
        navigate('/404');
        console.error('Error fetching data: ',error);
    });
  }

  useEffect(()=>{
      getBeaSyarat();
  },[]);

  console.log(beasyarat);

  const tipefile = [
    "jpg",
    "pdf"
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
            Update Syarat
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
                Nama Syarat
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
                id="bea_syarat_nama"
                name="bea_syarat_nama"
                label="Nama Syarat"
                value={beasyarat.bea_syarat_nama}
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
            <Grid item xs={12} sm={3}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700
                }}
              >
                Nama File
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField
                required
                id="bea_syarat_file_nama"
                name="bea_syarat_file_nama"
                label="Nama File"
                value={beasyarat.bea_syarat_file_nama}
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
                Tipe File
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={9}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Tipe Jenis</InputLabel>
                <Select
                  required
                  id="bea_syarat_file_tipe"
                  name="bea_syarat_file_tipe"
                  value={beasyarat.bea_syarat_file_tipe}
                  onChange={handleChange}
                  label="Tipe File"
                  // onChange={handleChange}
                >
                  {tipefile.map((item, index) => (
                    <MenuItem key={index} value={item}>{item}</MenuItem>
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
                Priotitas
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField
                required
                id="bea_syarat_priority"
                name="bea_syarat_priority"
                label="Prioritas"
                value={beasyarat.bea_syarat_priority}
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
                Jumlah SKS
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                required
                id="bea_jenis_jumlah_sks"
                name="bea_jenis_jumlah_sks"
                label="Jumlah SKS"
                // value={beajenis.bea_jenis_jumlah_sks}
                onChange={handleChange}
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
              />
            </Grid> */}

            <Grid item xs={12} sm={3}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700
                }}
              >
                Template
              </InputLabel>
            </Grid> 

             <Grid item xs={12} sm={6}>
             <TextField 
                id = "file_template"
                name = "file_template"
                type="file" 
                // onChange={(event) => handleFileChange(item, event)}
              />
              
              {/* <input
                style={{ display: 'none' }}
                id="upload-photo"
                name="upload-photo"
                type="file"
              />
              <Fab color="primary" size="small" component="span" aria-label="add">
                <UploadFileIcon />
              </Fab> */}
            </Grid>
            <Grid item xs={12} sm={3} />
            <Grid item xs={12} sm={3} />
            <Grid item xs={12} sm={6}>
            {(() => {
              if(beasyarat.bea_syarat_file === "" || beasyarat.bea_syarat_file === null){
                  return ""
              }
              return(
                  <a href={beasyarat.bea_syarat_file} target="_blank" rel="noreferrer">Lihat File</a>
                )
            })()}
            </Grid>
            

            

            <Grid item xs={12} sm={6} />
            <Grid item xs={12} sm={5} />
            <Grid item xs={12} sm={6}>
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
