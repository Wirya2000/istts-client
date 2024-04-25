// DataTableComponent.js

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { InputText } from 'primereact/inputtext';

import * as React from 'react';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { Link, useNavigate } from 'react-router-dom';

// @mui
import { Stack, Button, Typography, Container, Icon, Alert, AlertTitle } from '@mui/material';
import { useTheme, alpha, styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
// import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
// import SearchBar from "material-ui-search-bar";
import InputLabel from "@mui/material/InputLabel";
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import AddIcon from '@mui/icons-material/Add';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import InfoIcon from '@mui/icons-material/Info';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { visuallyHidden } from '@mui/utils';


const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#784af4',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <HowToRegIcon />,
    2: <HourglassBottomIcon />,
    3: <DoneAllIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const steps = ['Terdaftar', 'Proses Seleksi', 'Selesai'];

function formatDateMhs(dateString) {
  console.log(dateString);
  const [year, month, day] = dateString.split('-');
  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli',
    'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  const monthName = monthNames[parseInt(month, 10) - 1];
  return `${day} ${monthName} ${year}`;
}

export default function MasterBeasiswa({ kodeBeasiswa }) {
  const [beasiswa, setBeasiswa] = useState([]);
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState('');
  const [userData, setUserData] = useState([]);

  const [beaapply, setBeaapply] = useState([]);
  const [profile, setProfile] = useState({
    mhs_nrp: "",
    mhs_nama: "",
    mhs_alamat: "",
    agama_kode: "",
    mhs_email: "",
    mhs_lahir_kota: "",
    mhs_lahir_tanggal: "",
    mhs_telp: "",
    mhs_hp: "",
    mhs_ipk: "",
    mhs_poin: "",
    aka_jurusan: {
      jur_nama: ""
    }
  });
  const [photoprofile, setPhotoProfile] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [delindex, setDelindex] = React.useState();

  const handleClick = (event, kode, role) => {
    if (role === "mahasiswa") {
      navigate(`/master/beasiswa/mhs/${kode}`)
    }
  };


  const handleClickOpen = (index) => {
    setOpen(true);
    setDelindex(index);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getUserData = async () => {
    // const response = await axios.get('192.168.100.14:5000/master-jenis-beasiswa');
    // setBeaJenis(response.beajenis);
    // console.log(response.beajenis);
    console.log("sukses masuk");
    const token = Cookies.get('myToken');
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/login/userdata`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then(response => {
        setUserData(response.data);
        console.log("Success fetch data!");
      })
      .catch(error => {
        // navigate('/404');
        console.error('Error fetching data: ', error);
      });
  }

  const getBeasiswa = async () => {
    console.log("sukses masuk");
    const token = Cookies.get("myToken");
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/master/beasiswa`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        console.log('API response:', response.data);
        setBeasiswa(response.data);
        setLoading(false);
        console.log("Success fetch data!");
      })
      .catch(error => {
        // navigate('/404');
        console.error('Error fetching data: ', error);
      });
  }

  const getPhotoProfile = async () => {
    // const response = await axios.get('192.168.100.14:5000/master-jenis-beasiswa');
    // setBeaJenis(response.beajenis);
    // console.log(response.beajenis);
    console.log("sukses masuk");
    const token = Cookies.get('myToken');
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/profile/photo`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then(response => {
        setPhotoProfile(response.data);
        console.log("Success fetch data!");
      })
      .catch(error => {
        // navigate('/404');
        console.error('Error fetching data: ', error);
      });
  }

  const getProfile = async () => {
    // const response = await axios.get('192.168.100.14:5000/master-jenis-beasiswa');
    // setBeaJenis(response.beajenis);
    // console.log(response.beajenis);
    console.log("sukses masuk");
    const token = Cookies.get('myToken');
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then(response => {
        setProfile(response.data[0]);
        console.log("Success fetch data!");
      })
      .catch(error => {
        // navigate('/404');
        console.error('Error fetching data: ', error);
      });
  }

  const getBeaapply = async () => {
    console.log("sukses masuk");
    const token = Cookies.get("myToken");
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/beaapplymhs`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        setBeaapply(response.data);
        console.log("Success fetch data!");
      })
      .catch(error => {
        // navigate('/404');
        console.error('Error fetching data: ', error);
      });

  }

  useEffect(() => {
    getUserData();
    getBeasiswa();
    getBeaapply();
    getProfile();
    getPhotoProfile();
  }, []);

  const navigate = useNavigate();

  const handleDeleteClick = async (j) => {
    const kode = j;
    console.log(kode)
    console.log("sukses masuk");
    const token = Cookies.get('myToken');
    console.log(token);
    await axios.put(`${process.env.REACT_APP_BACKEND_URL}/master/beasiswa/delete`,
      {
        kode_beasiswa: kode
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(response => {
        console.log(response.data);
        handleClose();
        // navigate("/master/beasiswa");
        getBeasiswa();
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });

  };

  const concatPeriod = (rowData) => {
    // Concatenate periode_nama and periode_akademik
    return (
      <div>
        {rowData.aka_periode.periode_nama} <br />
        {rowData.aka_periode.periode_akademik}
      </div>
    );
  };

  function formatDate(dateString) {
    // const options = { year: 'numeric', month: 'long', day: 'numeric' };
    // return new Date(dateString).toLocaleDateString(undefined, options);

    const [year, month, day] = dateString.split('-');
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
      'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const monthName = monthNames[parseInt(month, 10) - 1];
    return `${day} ${monthName} ${year}`;
  }

  const concatDates = (rowData) => {
    const startDateFormatted = formatDate(rowData.beasiswa_start);
    const stopDateFormatted = formatDate(rowData.beasiswa_stop);
    return (
      <div>
        {startDateFormatted} <br />
        {stopDateFormatted}
      </div>
    );
  };

  const handleRowClick = (rowData) => {
    // Redirect to another page with the selected data
    alert("");
    navigate(`/master/beasiswa/mhs/${rowData.beasiswa_kode}`); // Navigate to '/details/:beasiswa_kode'
  };

  const header = (
    <div className="table-header">
      <h2>Scholarships</h2>
      <InputText
        type="search"
        placeholder="Global Search"
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />
    </div>
  );

  return (
    <div>
      <Helmet>
        <title> Beasiswa ISTTS </title>
      </Helmet>
      {/* <Alert severity="success" onClose={() => {}}>
        <AlertTitle>Success</AlertTitle>
        Berhasil menambahkan! <strong>check it out!</strong>
      </Alert> */}
      <Container maxWidth="xl">
        {(() => {
          console.log(userData.role);
          if (userData.role === "admin" || userData.role === "pmb") {
            return (
              <Typography variant="h4" sx={{ mb: 5 }}>
                Master Beasiswa
              </Typography>
            )
          }
          if (userData.role === "mahasiswa") {
            return (
              <Typography variant="h4" sx={{ mb: 5 }}>
                Daftar Beasiswa
              </Typography>
            )
          }
          return ""
        })()}

        {(() => {
          console.log(userData.role);
          if (userData.role === "admin" || userData.role === "pmb") {
            return (
              <Button align="center" variant="contained" startIcon={<AddIcon />} href='/master/beasiswa/insert'>
                {/* <Icon>add_circle</Icon> */}
                Tambah
              </Button>
            )
          }
          if (userData.role === "mahasiswa") {
            return (
              <>
                <Stack sx={{ width: '100%' }} spacing={1}>
                  <Grid item xs={12}>
                    <Box sx={{ width: "100%", paddingBottom: "1px", marginTop: "20px" }}>
                      <Card variant="outlined">
                        <CardContent>
                          {/* <div style={{ backgroundColor: '#584dff', width: '110%', paddingTop: '10px', paddingLeft: '2%', paddingBottom: '1px', marginTop: '-25px', marginLeft: '-2%'}}>
                            <Typography variant="subtitle1" sx={{ mb: 5, mt: 1, color:'white'}}>
                                  Profil
                            </Typography>
                            </div> */}
                          <div style={{ marginTop: '20px' }}>
                            <Grid container spacing={3}>
                              <Grid item xs={3}>
                                {/* <Box sx={{ width: "100%",  paddingBottom: "1px" }}>
                                  <Card variant="outlined">
                                    <CardContent> */}
                                <div style={{ textAlign: "center", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", }}>
                                  <div style={{ width: "250px", height: "330px", textAlign: "center" }}>
                                    <img src={photoprofile} alt="" style={{ width: "100%", height: "100%", textAlign: "center" }} />
                                  </div>
                                  <div style={{ textAlign: "center", marginTop: "2%" }}>
                                    {/* <Typography variant="subtitle1">
                                        {profile.mhs_nrp}
                                      </Typography> */}
                                    {/* <Typography variant="h3">
                                        {profile.mhs_nama}
                                      </Typography> */}
                                  </div>
                                </div>
                                {/* </CardContent>
                                  </Card>
                                  </Box> */}
                              </Grid>
                              <Grid item xs={5}>
                                <div style={{ marginBottom: '8px' }}>
                                  <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12}>
                                      <InputLabel
                                        sx={{
                                          display: "flex",
                                          justifyContent: "left",
                                          // fontWeight: 700,
                                          color: 'black'
                                        }}
                                      >
                                        NRP:
                                      </InputLabel>
                                    </Grid>
                                  </Grid>
                                  <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12}>
                                      <InputLabel
                                        sx={{
                                          display: "flex",
                                          justifyContent: "left",
                                          fontWeight: 700,
                                          color: '#584dff'
                                        }}
                                      >
                                        {profile.mhs_nrp}
                                      </InputLabel>
                                    </Grid>
                                  </Grid>
                                </div>

                                <div style={{ marginBottom: '8px' }}>
                                  <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12}>
                                      <InputLabel
                                        sx={{
                                          display: "flex",
                                          justifyContent: "left",
                                          // fontWeight: 700,
                                          color: 'black'
                                        }}
                                      >
                                        Nama Mahasiswa:
                                      </InputLabel>
                                    </Grid>
                                  </Grid>
                                  <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12}>
                                      <InputLabel
                                        sx={{
                                          display: "flex",
                                          justifyContent: "left",
                                          fontWeight: 700,
                                          color: '#584dff'
                                        }}
                                      >
                                        {profile.mhs_nama}
                                      </InputLabel>
                                    </Grid>
                                  </Grid>
                                </div>

                                <div style={{ marginBottom: '8px' }}>
                                  <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12}>
                                      <InputLabel
                                        sx={{
                                          display: "flex",
                                          justifyContent: "left",
                                          // fontWeight: 700,
                                          color: 'black'
                                        }}
                                      >
                                        Program Studi:
                                      </InputLabel>
                                    </Grid>
                                  </Grid>
                                  <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12}>
                                      <InputLabel
                                        sx={{
                                          display: "flex",
                                          justifyContent: "left",
                                          fontWeight: 700,
                                          color: '#584dff'
                                        }}
                                      >
                                        {profile.aka_jurusan.jur_nama}
                                      </InputLabel>
                                    </Grid>
                                  </Grid>
                                </div>

                                <div style={{ marginBottom: '8px' }}>
                                  <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12}>
                                      <InputLabel
                                        sx={{
                                          display: "flex",
                                          justifyContent: "left",
                                          // fontWeight: 700,
                                          color: 'black'
                                        }}
                                      >
                                        Tempat Tanggal Lahir :
                                      </InputLabel>
                                    </Grid>
                                  </Grid>
                                  <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12}>
                                      <InputLabel
                                        sx={{
                                          display: "flex",
                                          justifyContent: "left",
                                          fontWeight: 700,
                                          color: '#584dff'
                                        }}
                                      >
                                        {profile.mhs_lahir_kota}, {formatDateMhs(profile.mhs_lahir_tanggal)}
                                      </InputLabel>
                                    </Grid>
                                  </Grid>
                                </div>

                                <div style={{ marginBottom: '8px' }}>
                                  <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12}>
                                      <InputLabel
                                        sx={{
                                          display: "flex",
                                          justifyContent: "left",
                                          // fontWeight: 700,
                                          color: 'black'
                                        }}
                                      >
                                        Agama:
                                      </InputLabel>
                                    </Grid>
                                  </Grid>
                                  <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12}>
                                      <InputLabel
                                        sx={{
                                          display: "flex",
                                          justifyContent: "left",
                                          fontWeight: 700,
                                          color: '#584dff'
                                        }}
                                      >
                                        {profile.agama_kode}
                                      </InputLabel>
                                    </Grid>
                                  </Grid>
                                </div>

                                <div style={{ marginBottom: '8px' }}>
                                  <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12}>
                                      <InputLabel
                                        sx={{
                                          display: "flex",
                                          justifyContent: "left",
                                          // fontWeight: 700,
                                          color: 'black'
                                        }}
                                      >
                                        Alamat:
                                      </InputLabel>
                                    </Grid>
                                  </Grid>
                                  <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12}>
                                      <InputLabel
                                        sx={{
                                          display: "flex",
                                          justifyContent: "left",
                                          fontWeight: 700,
                                          color: '#584dff'
                                        }}
                                      >
                                        {profile.mhs_alamat}
                                      </InputLabel>
                                    </Grid>
                                  </Grid>
                                </div>
                              </Grid>
                              <Grid item xs={4}>
                                <div style={{ marginBottom: '8px' }}>
                                  <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12}>
                                      <InputLabel
                                        sx={{
                                          display: "flex",
                                          justifyContent: "left",
                                          // fontWeight: 700,
                                          color: 'black'
                                        }}
                                      >
                                        Telepon/HP:
                                      </InputLabel>
                                    </Grid>
                                  </Grid>
                                  <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12}>
                                      <InputLabel
                                        sx={{
                                          display: "flex",
                                          justifyContent: "left",
                                          fontWeight: 700,
                                          color: '#584dff'
                                        }}
                                      >
                                        {profile.mhs_telp === "" || profile.mhs_telp === null ? "-" : profile.mhs_telp}/{profile.mhs_hp}
                                      </InputLabel>
                                    </Grid>
                                  </Grid>
                                </div>

                                <div style={{ marginBottom: '8px' }}>
                                  <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12}>
                                      <InputLabel
                                        sx={{
                                          display: "flex",
                                          justifyContent: "left",
                                          // fontWeight: 700,
                                          color: 'black'
                                        }}
                                      >
                                        Email:
                                      </InputLabel>
                                    </Grid>
                                  </Grid>
                                  <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12}>
                                      <InputLabel
                                        sx={{
                                          display: "flex",
                                          justifyContent: "left",
                                          fontWeight: 700,
                                          color: '#584dff'
                                        }}
                                      >
                                        {profile.mhs_email}
                                      </InputLabel>
                                    </Grid>
                                  </Grid>
                                </div>

                                <div style={{ marginBottom: '8px' }}>
                                  <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12}>
                                      <InputLabel
                                        sx={{
                                          display: "flex",
                                          justifyContent: "left",
                                          // fontWeight: 700,
                                          color: 'black'
                                        }}
                                      >
                                        IPK:
                                      </InputLabel>
                                    </Grid>
                                  </Grid>
                                  <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12}>
                                      <InputLabel
                                        sx={{
                                          display: "flex",
                                          justifyContent: "left",
                                          fontWeight: 700,
                                          color: '#584dff'
                                        }}
                                      >
                                        {profile.mhs_ipk}
                                      </InputLabel>
                                    </Grid>
                                  </Grid>
                                </div>

                                <div style={{ marginBottom: '8px' }}>
                                  <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12}>
                                      <InputLabel
                                        sx={{
                                          display: "flex",
                                          justifyContent: "left",
                                          // fontWeight: 700,
                                          color: 'black'
                                        }}
                                      >
                                        Poin:
                                      </InputLabel>
                                    </Grid>
                                  </Grid>
                                  <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12}>
                                      <InputLabel
                                        sx={{
                                          display: "flex",
                                          justifyContent: "left",
                                          fontWeight: 700,
                                          color: '#584dff'
                                        }}
                                      >
                                        {profile.mhs_poin}
                                      </InputLabel>
                                    </Grid>
                                  </Grid>
                                </div>


                              </Grid>
                            </Grid>



                          </div>
                        </CardContent>
                      </Card>
                    </Box>
                  </Grid>
                </Stack>
                <Typography variant="subtitle1" sx={{ mb: 2, mt: 4 }}>
                  Beasiswa yang dapat diajukan
                </Typography>
              </>
            )
          }

          return ""
        })()}

      </Container>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <DataTable value={beasiswa} paginator rows={10} rowsPerPageOptions={[5, 10, 20]} selectionMode="single" onRowClick={handleRowClick} globalFilter={globalFilter} globalFilterFields={['keu_bea_jeni.bea_jenis_nama', 'aka_periode.periode_nama', 'beasiswa_stop', 'aka_periode.periode_akademik', 'beasiswa_start', 'beasiswa_sk']} filterDisplay="row" emptyMessage="No data found." header={header}>
          <Column field="keu_bea_jeni.bea_jenis_nama" sortable header="User ID" filter />
          <Column
            field="periode"
            header="Period Name & Academic Period"
            body={concatPeriod}
            sortable
            sortField="aka_periode.periode_nama" // Specify the sortField to enable sorting
            sortableCustom
            filter
          />
          <Column
            field="beasiswa_start"
            header="Start & End Dates"
            body={concatDates}
            sortable
            sortField="beasiswa_start" // Specify the sortField to enable sorting
            sortableCustom
            filter
          />
          <Column field="beasiswa_sk" sortable header="Email" filter />
          {/* Add more columns as needed */}
        </DataTable>
      )}

      {(() => {
        if (userData.role === "mahasiswa") {
          return (
            <div style={{ marginTop: '40px' }}>
              <Stack sx={{ width: '100%' }} spacing={1}>
                <Grid item xs={12}>
                  <Box sx={{ width: "100%", paddingBottom: "1px" }}>
                    <Card variant="outlined">
                      <CardContent>
                        <div style={{ backgroundColor: '#584dff', width: '110%', paddingTop: '10px', paddingLeft: '2%', paddingBottom: '1px', marginTop: '-25px', marginLeft: '-2%' }}>
                          <Typography variant="subtitle1" sx={{ mb: 5, mt: 1, color: 'white' }}>
                            Beasiswa yang sedang diajukan
                          </Typography>
                        </div>
                        {beaapply.map((item) => {
                          let status = 0;
                          if (item.bea_apply_status === 0) {
                            status = 0;
                          } else if (item.bea_apply_status === 3) {
                            status = 1;
                          } else {
                            status = 3;
                          }
                          return (
                            <>
                              <Typography variant="subtitle2" sx={{ mb: 1, mt: 2 }}>
                                {item.keu_beasiswa.keu_bea_jeni.bea_jenis_nama}
                              </Typography>
                              <Stepper alternativeLabel activeStep={status} connector={<ColorlibConnector />}>
                                {steps.map((label) => (
                                  <Step key={label}>
                                    <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                                  </Step>
                                ))}
                              </Stepper>
                            </>
                          );
                        })}
                      </CardContent>
                    </Card>
                  </Box>
                </Grid>
              </Stack>


            </div>
          )
        }
        return ""
      })()}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {beasiswa.beasiswa_kode}
        <DialogTitle id="alert-dialog-title">
          {"Are you sure to delete this item?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If this item was deleted, you can't resolve again
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={() => { handleDeleteClick(delindex); console.log(delindex) }}>
            {/* alert(i); */}
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};