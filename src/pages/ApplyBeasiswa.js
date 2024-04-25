import * as React from 'react';
import Cookies from 'js-cookie';
import { useState, useEffect, useRef } from 'react';

import axios from 'axios';
import Modal from 'react-modal';
// import dotenv from 'dotenv';
import moment from 'moment';
import dayjs, { Dayjs } from 'dayjs';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { Link as RouterLink, useNavigate, useParams  } from 'react-router-dom';
import { ErrorMessage } from "@hookform/error-message";
import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
// import { google } from 'googleapis';
import joi from "joi";
// @mui
import { ProgressBar } from 'primereact/progressbar';
import { Toast } from 'primereact/toast';
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
import FileOpenIcon from '@mui/icons-material/FileOpen';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import Button from "@mui/material/Button";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import { useTheme } from '@mui/material/styles';
import { forEach } from 'lodash';
import tokenValidator from '../utils/tokenValidator';



const schema = joi.object({
  username: joi.string().min(4).message("4").max(6).message("6").required()
});

export default function ApplyBeasiswa() {
  const { beasiswaKode } = useParams();
  const [tipe, setTipe] = React.useState("");
  // const [isChecked, setIsChecked] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [stopDate, setStopDate] = useState(null);
  const [periode, setPeriode] = useState([]);
  const [beasyarat, setBeaSyarat] = useState([]);
  const [beajenis, setBeaJenis] = useState([]);
  const [userData, setUserData] = useState([]);
  const [mahasiswa, setMahasiswa] = useState([]);
  const [lsyarat, setLsyarat] = useState([]);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('Upload');
  const [previewUrls, setPreviewUrls] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState('');
  // const [beasiswa, setBeasiswa] = useState({
  //   beasiswa_kode: "",
  //   beasiswa_periode: "",
  //   beasiswa_start: "",
  //   beasiswa_stop: "",
  //   beasiswa_sk: "",
  //   beasiswa_perolehan: "",
  //   beasiswa_keterangan: "",
  //   beasiswa_show: "",
  //   beasiswa_asal: "",
  //   bea_jenis_kode: ""
  // });
  const [beasiswa, setBeasiswa] = useState([]);
  const [value, setValue] = useState(0);
  const toast = useRef(null);
  const interval = useRef(null);
  
  const navigate = useNavigate();

  const [alertMessage, setAlertMessage] = useState({severity: '', message: ''});

  const handleUploadProgress = () => {
    let _val = value;

    interval.current = setInterval(() => {
        _val += Math.floor(Math.random() * 10) + 1;

        if (_val >= 100) {
            _val = 100;
            toast.current.show({ severity: 'info', summary: 'Success', detail: 'Process Completed' });
            clearInterval(interval.current);
        }

        setValue(_val);
    }, 2000);

    return () => {
        if (interval.current) {
            clearInterval(interval.current);
            interval.current = null;
        }
    };
  }

  const handleFileChange = (itemId, namaFile, tipeFile, event) => {
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
    const token = Cookies.get('myToken');
    handleUploadProgress();
    console.log(`${process.env.REACT_APP_BACKEND_URL}/beaapply/upload/${itemId}/${beasiswaKode}`)
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/beaapply/upload/${itemId}/${beasiswaKode}`, {
      bea_syarat_file_nama: namaFile,
      bea_syarat_file_tipe: tipeFile,
      file: selectedFile,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      },
      
    })
    .then(response =>{
        console.log(response.data);
        console.log("Success upload");
    })
    .catch(error => {
        console.error(error.response.data.message);
        setAlertMessage({severity: 'error', message: error.response.data.message});
        setTimeout(() => {
          setAlertMessage({severity: '', message: ''});
        }, 3000);
    });
  };

  const handleFilePreview = (itemId, namaFile, tipeFile, event) => {
    handleFileChange(itemId, namaFile, tipeFile, event);
    const file = event.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrls(prevState => ({
        ...prevState,
        [itemId]: fileUrl
      }));
    }
    // handleFileChange(itemId, namaFile, tipeFile, event);
  };

  const handlePreviewClick = (itemId) => {
    window.open(previewUrls[itemId], '_blank');
  };

  const handleOpenLink = (itemLink) => {
    const url = itemLink;
    window.open(url, '_blank');
  };

  const handleStartDateChange = async date => {
    setStartDate(moment(date.$d).format('YYYY-MM-DD'))
    console.log(moment(date.$d).format('YYYY-MM-DD'));
  };

  const handleStopDateChange = async date => {
    setStopDate(moment(date.$d).format('YYYY-MM-DD'))
    console.log(moment(date.$d).format('YYYY-MM-DD'));
  };

  const handleChange = async e => {
    e.preventDefault();
      await setBeasiswa({
        form:{
          ...beasiswa.form,
          [e.target.name]: e.target.value
        }
      });
      console.log(beasiswa);

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      console.log(new Date());
      const token = Cookies.get('myToken');
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/beaapply/insert`, {
          beasiswa_kode: beasiswaKode,
          bea_apply_tanggal: new Date(),
          bea_apply_ipk: mahasiswa.mhs_ipk,
          bea_apply_poin: mahasiswa.mhs_poin,
          bea_apply_status: 0,
          bea_apply_spp: beasiswa && beasiswa.keu_bea_jeni && beasiswa.keu_bea_jeni.bea_jenis_jumlah_spp,
          bea_apply_sks: beasiswa && beasiswa.keu_bea_jeni && beasiswa.keu_bea_jeni.bea_jenis_jumlah_sks,
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

  const getUserData = async() => {
    console.log("sukses masuk");
    const token = Cookies.get('myToken');
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/login/userdata`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response =>{
        setUserData(response.data);
        console.log("Success fetch data!");
    })
    .catch(error => {
        navigate('/404');
        console.error('Error fetching data: ',error);
    });
  }

  const getLinkgdrive = async() => {
    console.log("sukses masuk");
    const token = Cookies.get('myToken');
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/beaapplys`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response =>{
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
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/master/jenis-beasiswa/beasiswamhs`,
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

  const getMahasiswa = async() => {
    console.log("sukses masuk");
    const token = Cookies.get('myToken');
    console.log(token);
    console.log(`${process.env.REACT_APP_BACKEND_URL}/mahasiswa/detail`)
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/mahasiswa/detail`, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response =>{
        setMahasiswa(response.data[0]);
        console.log("Success fetch data!");
    })
    .catch(error => {
        navigate('/404');
        console.error('Error fetching data: ',error);
    });
    
  }

  const getBeasiswa = async() => {
    console.log("sukses masuk");
    const token = Cookies.get('myToken');
    console.log(token);
    console.log(`${process.env.REACT_APP_BACKEND_URL}/master/beasiswamhs/${beasiswaKode}`)
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/master/beasiswamhs/${beasiswaKode}`, 
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

  const getPeriode = async() => {
    console.log("sukses masuk");
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/master/periode`)
    .then(response =>{
        setPeriode(response.data);
        console.log("Success fetch data!");
    })
    .catch(error => {
        console.error('Error fetching data: ',error);
    });
  }

    console.log(beajenis);
    console.log(periode);

  const getBeaSyarat = async() => {
    console.log("sukses masuk");
    const token = Cookies.get('myToken');
    console.log(token);
    console.log(`${process.env.REACT_APP_BACKEND_URL}/master/syaratmhs`)
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/master/syaratmhs`, 
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
  }

  const getLinkSyaratMhs = async() => {
    console.log("sukses masuk");
    const token = Cookies.get('myToken');
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/beaapplys/${beasiswaKode}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response =>{
        setLsyarat(response.data);
        console.log("Success fetch data!");
    })
    .catch(error => {
        navigate('/404');
        console.error('Error fetching data: ',error);
    });
  }

  useEffect(()=>{
    getUserData()
    getBeasiswa();
    getMahasiswa();
    getBeaSyarat();
    getLinkSyaratMhs();
  },[]);

  console.log(beasiswa);
  
  const syaratArr = [];

  const beajenissyarat = beasiswa && beasiswa.keu_bea_jeni && beasiswa.keu_bea_jeni.bea_jenis_syarat;
  const beajenissyaratArr = beajenissyarat ? beajenissyarat.split(',') : [];
  console.log(beajenissyaratArr);
  const newbeajenissyaratArr = beajenissyaratArr.map(str => parseInt(str, 10));
  console.log(newbeajenissyaratArr);

  for (let i = 0; i < beasyarat.length; i+=1) {
    for (let j = 0; j < newbeajenissyaratArr.length; j+=1) {
      if(beasyarat[i].bea_syarat_id === newbeajenissyaratArr[j]){
        syaratArr.push({'id': beasyarat[i].bea_syarat_id, 'nama': beasyarat[i].bea_syarat_nama, 'namafile': beasyarat[i].bea_syarat_file_nama, 'tipefile': beasyarat[i].bea_syarat_file_tipe})
      }
    }
    
  }

  console.log(syaratArr);

  const [arrFile, setArrFile] = useState([]);

  useEffect(() => {
    const temp = [];
    syaratArr.forEach(e => {
      const itemp = {
        key: e,
        filename: "" 
      }
      temp.push(itemp);
    });
  
    setArrFile(temp);
  }, [syaratArr]);
  
  console.log(arrFile);

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
            Apply Beasiswa
            </Typography>

        </Container>
      <Paper elevation={3} sx={{ marginRight: "2%", marginLeft: "2%" }}>
        <Box sx={{ padding: 5 }}>
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
                Kode Beasiswa: {beasiswa.beasiswa_kode}
              </InputLabel>
            </Grid>
          </Grid>  
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700
                }}
              >
                Jenis Beasiswa: {beasiswa && beasiswa.keu_bea_jeni && beasiswa.keu_bea_jeni.bea_jenis_nama}
              </InputLabel>
            </Grid>
          </Grid>  
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700
                }}
              >
                Periode Beasiswa: {beasiswa && beasiswa.aka_periode && beasiswa.aka_periode.periode_nama} {beasiswa && beasiswa.aka_periode && beasiswa.aka_periode.periode_akademik}
              </InputLabel>
            </Grid>
          </Grid>  
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700
                }}
              >
                Tanggal Mulai: {beasiswa.beasiswa_start}
              </InputLabel>
            </Grid>
          </Grid>  
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700
                }}
              >
                Tanggal Berakhir: {beasiswa.beasiswa_stop }
              </InputLabel>
            </Grid>
          </Grid>  
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700
                }}
              >
                Benefit : {beasiswa.beasiswa_perolehan}
              </InputLabel>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700
                }}
              >
                Keterangan:
              </InputLabel>

              <TextField
                multiline
                rows={4} 
                fullWidth
                variant="outlined"
                value={beasiswa.beasiswa_keterangan}
                sx={{ marginTop: 1 }}
              />
            </Grid>
          </Grid>  
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} />
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700
                }}
              >
                Asal Beasiswa: {beasiswa.beasiswa_asal}
              </InputLabel>
            </Grid>
          </Grid>  

          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} />
            <Grid item xs={12} sm={12} />
            <Grid item xs={12} sm={12} />
          </Grid>
          
          <Grid container spacing={3}>
            {syaratArr.map((item) => (
              <Grid item xs={4} key={item.id}> 
                <Box sx={{ width: "100%", paddingBottom: "5px" }}>
                  <Card variant="outlined">
                    <CardContent>
                      <InputLabel
                        sx={{
                          display: "flex",
                          justifyContent: "left",
                          fontWeight: 600,
                          fontSize: "13px"
                        }}
                      >
                        {item.nama}
                      </InputLabel>

                      {previewUrls[item.id] && (
                        <Button
                          style={{
                            border: 'none',
                            padding: 0,
                            margin: 0,
                            background: 'none',
                            cursor: 'pointer'
                          }}
                          onClick={() => handlePreviewClick(item.id)}
                          type="button"
                        >
                          <img
                            src={previewUrls[item.id]}
                            alt="File Preview"
                            style={{ width: "400px", height: "400px" }}
                          />
                        </Button>
                      )}
                      <Button
                        id={item.id}
                        variant="contained"
                        component="label"
                        startIcon={<CloudUploadIcon />}
                        sx={{ marginTop: 1 }} 
                        type="button"
                      >
                        Upload File
                        <input
                          type="file"
                          hidden
                          onChange={(event) => handleFilePreview(item.id, item.namafile, item.tipefile, event)}
                        />
                      </Button>
                      {value && (
                        <div className="card">
                          <Toast ref={toast} /> 
                          <ProgressBar value={value} /> 
                        </div>
                      )}
                      
                      {(() => {
                        const matchingLs = lsyarat.find(ls => ls.bea_syarat_id === item.id);
                        if (matchingLs) {
                          return(
                            <Button
                              id={item.id}
                              variant="contained"
                              component="label"
                              startIcon={<FileOpenIcon />}
                              onClick={() => handleOpenLink(matchingLs.asyarat_link_gdrive)}
                              sx={{ 
                                marginTop: 1,
                                backgroundColor: "#30a64f",
                                color: "#FFFFFF" 
                              }} 
                              type="button"
                            >
                              Lihat File
                            </Button>
                          ) 
                        }
                        return (
                          <Button
                              id={item.id}
                              variant="contained"
                              disabled
                              component="label"
                              startIcon={<FileOpenIcon />}
                              onClick={() => handleOpenLink(matchingLs.asyarat_link_gdrive)}
                              sx={{ 
                                marginTop: 1,
                                backgroundColor: "#30a64f",
                                color: "#FFFFFF" 
                              }}
                              type="button"
                            >
                              Lihat File
                            </Button>
                        );
                      })()}
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} />
            <Grid item xs={12} sm={5} />
            <Grid item xs={12} sm={5} />
            <Grid item xs={12} sm={4}>
            <Button variant="contained"
              type="submit" 
            >
              Apply
            </Button> 
            </Grid>
          </Grid>
          </form>
        </Box>
      </Paper>
      </>
  )
}
