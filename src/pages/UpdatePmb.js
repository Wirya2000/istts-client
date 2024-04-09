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
import Autocomplete from '@mui/material/Autocomplete';
import FormControlLabel from "@mui/material/FormControlLabel";

import { useTheme } from '@mui/material/styles';
import { ConstructionOutlined } from '@mui/icons-material';

import tokenValidator from '../utils/tokenValidator';

const schema = joi.object({
  username: joi.string().min(4).message("4").max(6).message("6").required()
});

const jenisSyarat = [];

export default function UpdatePmb() {
  const { kodeBea } = useParams();
  const [tipe, setTipe] = React.useState("");
  const [checkedItems, setCheckedItems] = useState([]);
  const [pmb, setPmb] = useState({
    mhs_noreg: "",
    bea_kode: "",
    bea_sk_no: "",
    bea_sk_tgl: "",
    bea_jenis_kode: "",
    jur_kode: "",
    bea_keterangan: "",
    bea_benefit: "",
    bea_link_gdrive: "",
    mahasiswa: {
      mhs_nama: ""
    },
    aka_jurusan: {
      jur_singkat: ""
    },
    keu_bea_jeni: {
      bea_jenis_nama: ""
    }
  });

  const [jurusan, setJurusan] = useState([]);
  const [mahasiswa, setMahasiswa] = useState([]);
  const [mhsnoreg, setMhsnoreg] = useState("");
  const [mhsjurkode, setMhsjurkode] = useState("");
  const [beajenis, setBeaJenis] = useState([]);
  
  const [alertMessage, setAlertMessage] = useState({severity: '', message: ''});

//   const [se, setBeaJenis] = useState([]);
  const navigate = useNavigate();

  const handleChange = async e => {
    e.preventDefault();

    setPmb(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));

  }

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  // const handleChange = (event) => {
  //   setPmb(prevState => ({
  //     ...prevState,
  //     bea_jenis_kode: e.target.value
  // }));
  // };
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
    try{
      const token = Cookies.get('myToken');
      const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/master/pmb/update`, {
          bea_kode: kodeBea,
          mhs_noreg: pmb.mhs_noreg,
          jur_kode: pmb.jur_kode,
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
      })
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
      console.log(response.data);
      navigate("/master/pmb");
    } catch (error){
      console.error(error);
    }
  };

//   const handleJurusanChange = async e => {
//     e.preventDefault();
//     // const kode = e.target.value;
//     // console.log(kode);
//     // set(e.target.value);
//     // console.log()

//     await getMahasiswa(e.target.value);
//     console.log(mahasiswa);
//     // console.log('masuk onChange');
//   };

//   const handleMahasiswaChange = async e => {
//     e.preventDefault();
//     // const kode = e.target.value;
//     // console.log(kode);
//     // setMhsnoreg(e.target.value);

//     // await getMahasiswa(e.target.value);
//     // console.log('masuk onChange');
//   };

  const handleBeajenisChange = async e => {
    e.preventDefault();
    // const kode = e.target.value;
    // console.log(kode);
    // set(e.target.value);
    // await getMahasiswa(e.target.value);
    // console.log('masuk onChange');
    console.log(e.target.value);
    setPmb(prevState => ({
        ...prevState,
        bea_jenis_kode: e.target.value
    }));
  };

//   const getJurusan = async() => {
//     console.log("sukses masuk");
//     const token = Cookies.get('myToken');
//     await axios.get('http://localhost:5000/master/jurusan',
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       }
//     })
//     .then(response =>{
//         setJurusan(response.data);
//         console.log("Success fetch data!");
//     })
//     .catch(error => {
//         navigate('/404');
//         console.error('Error fetching data: ',error);
//     });
//   }

  const getPmb = async(jurKode) => {
    console.log("sukses masuk");
    const token = Cookies.get('myToken');
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/master/pmb/${kodeBea}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response =>{
        setPmb(response.data[0]);
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
    //   getJurusan();
      // getMahasiswa();
      getPmb();
      getBeaJenis();
  },[]);

  console.log(pmb);
  // console.log(pmb.keu_bea_jeni);
  // console.log(pmb.keu_bea_jeni.bea_jenis_kode);

  return (
      <>
        <Helmet>
            <title> Beasiswa ISTTS </title>
        </Helmet>
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
              <TextField
                required
                id="jur_kode"
                name="jur_kode"
                // label="Jurusan"
                fullWidth
                readOnly
                value={pmb.aka_jurusan.jur_singkat}
                // onChange={handleChange}
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
              <TextField
                required
                id="mhs_noreg"
                name="mhs_noreg"
                // label="Mahasiswa"
                fullWidth
                readOnly
                value={pmb.mahasiswa.mhs_nama}
                // onChange={handleChange}
                size="small"
                autoComplete="off"
                variant="outlined"
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
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={pmb?.bea_jenis_kode}
                onChange={handleBeajenisChange}
                label="Jenis Beasiswa"
              >
                {beajenis.map((item) => (
                  <MenuItem key={item.bea_jenis_kode} value={item.bea_jenis_kode}>{item.bea_jenis_nama}</MenuItem>
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
                value={pmb.bea_sk_no}
                onChange={handleChange}
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
                label="Tanggal S.K."
                value={pmb.bea_sk_tgl}
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
                id="bea_keterangan"
                name="bea_keterangan"
                label="Keterangan"
                multiline
                fullWidth
                value={pmb.bea_keterangan}
                onChange={handleChange}
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
                value={pmb.bea_benefit}
                onChange={handleChange}
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
                // value={pmb.bea_sk_no}
                // onChange={handleChange}
                // onChange={(event) => handleFileChange(item, event)}
              />
              
              
            </Grid>
            <Grid item xs={12} sm={3} />
            {/* <Grid item xs={12} sm={3} /> */}
            {(() => {
                if(pmb.bea_link_gdrive === "" || pmb.bea_link_gdrive === null){
                    return ""
                }
                return(
                    <a href={pmb.bea_link_gdrive} target="_blank" rel="noreferrer">Lihat File</a>
                  )
              })()}
            

            <Grid item xs={12} sm={6} />
            <Grid item xs={12} sm={5} />
            <Grid item xs={12} sm={5} />

            <Grid item xs={12} sm={4}>
              <Button variant="contained" type="submit" >
                Update
              </Button>
            </Grid>
          </Grid>
          </form>
        </Box>
      </Paper>
      </>
  )
}
