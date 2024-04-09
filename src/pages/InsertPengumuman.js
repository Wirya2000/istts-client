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
import { Stack, Button, Typography, Container} from '@mui/material';
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
import Alert from '@mui/material/Alert';
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

export default function InsertPengumuman() {
  const [tipe, setTipe] = React.useState("");
  // const [isChecked, setIsChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [beapengumuman, setBeaPengumuman] = useState({
    pengumuman_kode: "",
    pengumuman_judul: "",
    pengumuman_isi: "",
    pengumuman_status: "",
    created_at: "",
    pengumuman_link_gdrive: ""
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

    // await setBeaSyarat({
    //   form:{
    //     ...beasyarat.form,
    //     [e.target.name]: e.target.value
    //   }
    // });
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
    // let beatipe =  e.target.elements.bea_syarat_file_tipe.value;
    // console.log(beatipe);
    const selectedFile = e.target.elements.file_template.files[0];
    console.log(selectedFile);
    // if(beatipe==='jpg'){
    //   beatipe= 'jpg';
    // }
    // else if(beatipe==='pdf'){
    //   beatipe= 'pdf';
    // }

    // try{
    //   console.log(beasyarat);
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
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/master/syarat/insert`, {
          pengumuman_kode:  0,
          pengumuman_judul:  e.target.elements.bea_syarat_nama.value,
          pengumuman_isi:  e.target.elements.bea_syarat_file_nama.value,
          pengumuman_status: 0,
          file: selectedFile
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      }).then(response =>{
          console.log(response.data);
          navigate("/master/pengumuman");
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

  const getBeapengumuman = async() => {
      // const response = await axios.get('192.168.100.14:5000/master-jenis-beasiswa');
      // setBeaJenis(response.beajenis);
      // console.log(response.beajenis);
      console.log("sukses masuk");
      const token = Cookies.get("myToken");
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}/master/syarat`,{
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then(response =>{
          setBeaPengumuman(response.data);
          console.log("Success fetch data!");
      })
      .catch(error => {
          navigate('/404');
          console.error('Error fetching data: ',error);
      });
  }

  useEffect(()=>{
      getBeapengumuman();
  },[]);

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
            Insert Pengumuman
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
                Judul Pengumuman
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField
                required
                id="pengumuman_judul"
                name="pengumuman_judul"
                label="Judul Pengumuman"
                // value={beajenis.bea_jenis_nama}
                // onChange={handleChange}
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
                Isi Pengumuman
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField
                required
                id="pengumuman_isi"
                name="pengumuman_isi"
                label="Isi Pengumuman"
                // value={beajenis.bea_jenis_nama}
                // onChange={handleChange}
                multiline
                fullWidth
                rows={4}
                // size="small"
                // autoComplete="off"
                // variant="outlined"
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
                File Pengumuman
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
            <Grid item xs={12} sm={6} />
            <Grid item xs={12} sm={5} />
            <Grid item xs={12} sm={4}>
              <Button variant="contained"
              type="submit" 
              // Navigate to="/master/jenis-beasiswa" 
              >
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
