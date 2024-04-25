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
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { visuallyHidden } from '@mui/utils';
// import { makeStyles } from "@material-ui/core/styles";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import { JenisBeasiswaSearch } from 'src/sections/master/jenis_beasiswa';
// import useResponsive from '../hooks/useResponsive';
// // components
// import Iconify from '../components/iconify';

// import tokenValidator from '../utils/tokenValidator';


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


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'jenis_beasiswa',
    numeric: false,
    disablePadding: true,
    label: 'Jenis Beasiswa',
  },
  {
    id: 'periode_beasiswa',
    numeric: true,
    disablePadding: false,
    label: 'Periode',
  },
  {
    id: 'startstop_beasiswa',
    numeric: true,
    disablePadding: false,
    label: 'Waktu Pendaftaran',
  },
  {
    id: 'jumdaftar_beasiswa',
    numeric: true,
    disablePadding: false,
    label: 'Jumlah Pendaftar',
  },
  {
    id: 'sk_beasiswa',
    numeric: true,
    disablePadding: false,
    label: 'No S.K.',
  },
  {
    id: 'status_beasiswa',
    numeric: true,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Actions',
  },
];

// const adminHeadCells = [
//   {
//     id: 'jenis_beasiswa',
//     numeric: false,
//     disablePadding: true,
//     label: 'Jenis Beasiswa',
//   },
//   {
//     id: 'periode_beasiswa',
//     numeric: true,
//     disablePadding: false,
//     label: 'Periode',
//   },
//   {
//     id: 'startstop_beasiswa',
//     numeric: true,
//     disablePadding: false,
//     label: 'Waktu Pendaftaran',
//   },
//   {
//     id: 'jumdaftar_beasiswa',
//     numeric: true,
//     disablePadding: false,
//     label: 'Jumlah Pendaftar',
//   },
//   {
//     id: 'sk_beasiswa',
//     numeric: true,
//     disablePadding: false,
//     label: 'No S.K.',
//   },
//   {
//     id: 'status_beasiswa',
//     numeric: true,
//     disablePadding: false,
//     label: 'Status',
//   },
//   {
//     id: 'action',
//     numeric: true,
//     disablePadding: false,
//     label: 'Actions',
//   },
// ];

const mahasiswaHeadCells = [
  {
    id: 'jenis_beasiswa',
    numeric: false,
    disablePadding: true,
    label: 'Jenis Beasiswa',
  },
  {
    id: 'periode_beasiswa',
    numeric: true,
    disablePadding: false,
    label: 'Periode',
  },
  {
    id: 'startstop_beasiswa',
    numeric: true,
    disablePadding: false,
    label: 'Waktu Pendaftaran',
  },
  {
    id: 'sk_beasiswa',
    numeric: true,
    disablePadding: false,
    label: 'No S.K.',
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Actions',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headLabel } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell> */}
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            // width={headCell.id == "action" ? '10%' : "20%"}
            align={headCell.numeric ? 'center' : 'center'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nutrition
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
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

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }
  
  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };

  // const useStyles = makeStyles({
  //   table: {
  //     minWidth: 650
  //   }
  // });

export default function MasterBeasiswa({kodeBeasiswa}) {
    // const theme = useTheme();
    // const classes = useStyles();
    const [userData, setUserData] = useState([]);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('jenis_beasiswa');
    const [selected, setSelected] = React.useState([]);
    const [beasiswa, setBeasiswa] = useState([]);
    const [searched, setSearched] = useState("");
    const [open, setOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rows, setRows] = useState(beasiswa);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    // const kodeJenis="";
    // const beaJenisKode="";

    const [delindex, setDelindex] = React.useState();

    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelected = rows.map((n) => n.id);
        setSelected(newSelected);
        return;
      }
      setSelected([]);
    };

    const handleClick = (event, id) => {
      const selectedIndex = selected.indexOf(id);
      let newSelected = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
      setSelected(newSelected);
    };


    const handleClickOpen = (index) => {
      setOpen(true);
      setDelindex(index);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    });

    const getUserData = async() => {
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
      .then(response =>{
          setUserData(response.data);
          console.log("Success fetch data!");
      })
      .catch(error => {
          navigate('/404');
          console.error('Error fetching data: ',error);
      });
    }

    const getBeasiswa = async() => {
      console.log("sukses masuk");
      const token = Cookies.get("myToken");
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}/master/beasiswa`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response =>{
          setBeasiswa(response.data);
          console.log("Success fetch data!");
      })
      .catch(error => {
          navigate('/404');
          console.error('Error fetching data: ',error);
      });
      
    }

    const delBeasiswa = async() => {
      console.log("sukses masuk");
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/master/beasiswa/delete/`,beasiswa.beasiswa_kode)
      .then(response =>{
          setBeasiswa(response.data);
          console.log("Success delete data!");
      })
      .catch(error => {
          console.error('Error fetching data: ',error);
      });
    }

    useEffect(()=>{
      getUserData();
      getBeasiswa();
      
    },[]);
    console.log(beasiswa);

    const requestSearch = (searchedVal) => {
      const filteredRows = beasiswa.filter((row) => {
        return row.keu_bea_jeni.bea_jenis_nama.toLowerCase().includes(searchedVal.toLowerCase());
      });
      setRows(filteredRows);
    };
  
    const cancelSearch = () => {
      setSearched("");
      requestSearch(searched);
    };
  

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - beasiswa.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const visibleRows = React.useMemo(
      () =>
        stableSort(rows, getComparator(order, orderBy)).slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage,
        ),
      [order, orderBy, page, rowsPerPage],
    );
    
    const navigate = useNavigate();

    const handleUpdateClick = (kodeBeasiswa) => {
        // Use navigate function to go to a different route
        kodeBeasiswa = beasiswa.beasiswa_kode;
        const baseUrl = '/master/beasiswa/';
        const additionalPath = kodeBeasiswa;
        const combinedUrl = `${baseUrl}${additionalPath}`;
        navigate(combinedUrl);
    };

    const handleDeleteClick = async(j) => {
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
      .then(response =>{
        console.log(response.data);
        handleClose();
        // navigate("/master/beasiswa");
        getBeasiswa();
      })
      .catch(error => {
          console.error('Error fetching data: ',error);
      });
      
  };
     
    

    return (
        <>
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
              if (userData.role === "admin" || userData.role === "pmb"){
                return(
                  <Typography variant="h4" sx={{ mb: 5 }}>
                    Master Beasiswa
                  </Typography>
                )
              }
              if (userData.role === "mahasiswa"){
                return(
                  <Typography variant="h4" sx={{ mb: 5 }}>
                    Daftar Beasiswa
                  </Typography>
                )
              }
              return ""
          })()}
            
            {(() => {
              console.log(userData.role);
              if (userData.role === "admin" || userData.role === "pmb"){
                return (
                <Button align="center" variant="contained" startIcon={<AddIcon />} href='/master/beasiswa/insert'>
                  {/* <Icon>add_circle</Icon> */}
                  Tambah
                </Button>
                )
              }
              if (userData.role === "mahasiswa"){
                return (
                // <Button align="center" variant="contained" startIcon={<AddIcon />} href='/master/beasiswa/insert'>
                //   {/* <Icon>add_circle</Icon> */}
                //   Tambah
                // </Button>
                <div>
                <Stack sx={{ width: '100%' }} spacing={4}>
                  {/* <Stepper alternativeLabel activeStep={1} connector={<QontoConnector />}>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper> */}
                  <Stepper alternativeLabel activeStep={1} connector={<ColorlibConnector />}>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Stack>
                <Typography variant="subtitle1" sx={{ mb: 2, mt: 4 }}>
                    Beasiswa yang dapat diajukan
                  </Typography>
                </div>
                )
              }
              return ""
            })()}
            
        </Container>
        
        {/* <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}> */}
          <TableContainer component={Paper}>
              {/* <SearchBar
                value={searched}
                onChange={(searchVal) => requestSearch(searchVal)}
                onCancelSearch={() => cancelSearch()}
              /> */}
                {/* <Button></Button> */}
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                {(() => {
                if (userData.role === "admin" || userData.role === "pmb"){
                  return (
                    <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                    headLabel={[
                      {
                        id: 'jenis_beasiswa',
                        numeric: false,
                        disablePadding: true,
                        label: 'Jenis Beasiswa',
                      },
                      {
                        id: 'periode_beasiswa',
                        numeric: true,
                        disablePadding: false,
                        label: 'Periode',
                      },
                      {
                        id: 'startstop_beasiswa',
                        numeric: true,
                        disablePadding: false,
                        label: 'Waktu Pendaftaran',
                      },
                      {
                        id: 'jumdaftar_beasiswa',
                        numeric: true,
                        disablePadding: false,
                        label: 'Jumlah Pendaftar',
                      },
                      {
                        id: 'sk_beasiswa',
                        numeric: true,
                        disablePadding: false,
                        label: 'No S.K.',
                      },
                      {
                        id: 'status_beasiswa',
                        numeric: true,
                        disablePadding: false,
                        label: 'Status',
                      },
                      {
                        id: 'action',
                        numeric: true,
                        disablePadding: false,
                        label: 'Actions',
                      }
                    ]}
                  />
                  )
                }
                return (
                  <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                    headLabel={[
                      {
                        id: 'jenis_beasiswa',
                        numeric: false,
                        disablePadding: true,
                        label: 'Jenis Beasiswa',
                      },
                      {
                        id: 'periode_beasiswa',
                        numeric: true,
                        disablePadding: false,
                        label: 'Periode',
                      },
                      {
                        id: 'startstop_beasiswa',
                        numeric: true,
                        disablePadding: false,
                        label: 'Waktu Pendaftaran',
                      },
                      {
                        id: 'sk_beasiswa',
                        numeric: true,
                        disablePadding: false,
                        label: 'No S.K.',
                      },
                      {
                        id: 'action',
                        numeric: true,
                        disablePadding: false,
                        label: 'Actions',
                      },
                    ]}
                  />
                );
                })()}
                  
                    <TableBody>
                    {/* <Link to={`/master/jenis-beasiswa/${beajenis.bea_jenis_kode}`}> */}
                    {(rowsPerPage > 0
                    ? beasiswa.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : beasiswa
                    ).map((beasiswa,i) => {
                      const isItemSelected = isSelected(beasiswa.keu_bea_jeni.bea_jenis_nama);
                      const labelId = `enhanced-table-checkbox-${i}`;
                      return (
                        <TableRow
                        hover
                        onClick={(event) => handleClick(event, beasiswa.beasiswa_kode)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={beasiswa.beasiswa_kode}
                        selected={isItemSelected}
                        // sx={{ cursor: 'pointer' }}
                        sx={{ cursor: 'pointer', '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {/* <TableCell component="th" scope="row">
                                {i+1}
                            </TableCell> */}
                            {/* <TableCell padding="checkbox">
                              <Checkbox
                                color="primary"
                                checked={isItemSelected}
                                inputProps={{
                                  'aria-labelledby': labelId,
                                }}
                              />
                            </TableCell> */}
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                              align='center'

                            >
                              {beasiswa && beasiswa.keu_bea_jeni && beasiswa.keu_bea_jeni.bea_jenis_nama}
                            </TableCell>
                            {/* <TableCell align="left" name="kodeJenis">{beajenis.bea_jenis_kode}</TableCell> */}
                            <TableCell align='center'>
                                <span dangerouslySetInnerHTML={{__html: `${beasiswa && beasiswa.aka_periode && beasiswa.aka_periode.periode_nama}<br/>${beasiswa && beasiswa.aka_periode && beasiswa.aka_periode.periode_akademik}`}} />
                            </TableCell>
                            <TableCell align='center'>
                                <span dangerouslySetInnerHTML={{__html: `${formatDate(beasiswa.beasiswa_start)}<br/>${formatDate(beasiswa.beasiswa_stop)}`}} />
                            </TableCell>
                            {(() => {
                            if (userData.role === "admin" || userData.role === "pmb"){
                              return (
                                <TableCell align="center">{beasiswa && beasiswa.beaapply && beasiswa.beaapply.length}</TableCell>
                              )
                            }
                            return (
                              <TableCell align="center">"</TableCell>
                            )
                            })()}
                            
                            <TableCell align="center">{beasiswa.beasiswa_sk}""</TableCell>
                            <TableCell align="center">dsd
                            {(() => {
                            if (userData.role === "admin" || userData.role === "pmb"){
                              if (beasiswa.beasiswa_show === 1) {
                                return "Belum Terpublish";
                              } 
                              if (beasiswa.beasiswa_show === 2) {
                                return "Telah Terpublish";
                              } 
                              return "";
                            }
                            return "";
                            })()}
                            </TableCell>
                            {(() => {
                            if (userData.role === "admin" || userData.role === "pmb"){
                              // if(beasiswa && beasiswa.keu_bea_jeni && beasiswa.keu_bea_jeni.bea_jenis_role === "1"){
                                return (
                                  <TableCell align='center'>
                                    <Link to={`/master/beasiswa/${beasiswa.beasiswa_kode}`}>
                                    <IconButton aria-label="update" color="secondary"
                                    // onClick={() => handleUpdateClick(kodeJenis)}
                                    > 
                                        <ModeEditIcon />
                                    </IconButton>
                                    </Link>
                                    <IconButton aria-label="delete" sx={{ color: "red" }}
                                    onClick={() => {handleClickOpen(beasiswa.beasiswa_kode); console.log(beasiswa.beasiswa_kode)}}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                  </TableCell>
                                )
                              // }
                              // return ""
                            }
                            // if (userData.role === "pmb"){
                            //   if(beasiswa && beasiswa.keu_bea_jeni && beasiswa.keu_bea_jeni.bea_jenis_role === "2"){
                            //     return (
                            //       <TableCell>
                            //         <Link to={`/master/beasiswa/${beasiswa.beasiswa_kode}`}>
                            //         <IconButton aria-label="update" color="secondary"
                            //         // onClick={() => handleUpdateClick(kodeJenis)}
                            //         > 
                            //             <ModeEditIcon />
                            //         </IconButton>
                            //         </Link>
                            //         <IconButton aria-label="delete" sx={{ color: "red" }}
                            //         onClick={() => {handleClickOpen(beasiswa.beasiswa_kode); console.log(beasiswa.beasiswa_kode)}}
                            //         >
                            //             <DeleteIcon />
                            //         </IconButton>
                            //       </TableCell>
                            //     )
                            //   }
                            //   return ""
                            // }
                            if (userData.role === "mahasiswa"){
                              return (
                                <TableCell>
                                  <Link to={`/master/beasiswa/mhs/${beasiswa.beasiswa_kode}`}>
                                  <IconButton aria-label="update" color="secondary"
                                  // onClick={() => handleUpdateClick(kodeJenis)}
                                  > 
                                      <InfoIcon />
                                  </IconButton>
                                  </Link>
                                </TableCell>
                              )
                            }
                            return "";
                            })()}
                            {/* <Dialog
                              open={open}
                              onClose={handleClose}
                              aria-labelledby="alert-dialog-title"
                              aria-describedby="alert-dialog-description"
                            >
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
                                <Button onClick={() => handleDeleteClick({i})} autoFocus>
                                   alert(i); 
                                  Agree
                                </Button>
                              </DialogActions>
                            </Dialog> */}
                            
                        </TableRow>

                          )})}
                    {/* </Link> */}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                        </TableRow>
                    )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={12}
                            count={beasiswa.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
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
                <Button onClick={() => {handleDeleteClick(delindex); console.log(delindex)}}>
                  {/* alert(i); */}
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
        </>
    )
}

