import * as React from 'react';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import moment from 'moment-timezone';
import { Link, useNavigate, useParams } from 'react-router-dom';
// @mui
import { Stack, Button, Typography, Container, Icon, Alert, AlertTitle } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import AddIcon from '@mui/icons-material/Add';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import InfoIcon from '@mui/icons-material/Info';
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
    id: 'mhsnrp_rekom',
    numeric: true,
    disablePadding: false,
    label: 'Mahasiswa',
  },
  {
    id: 'jurnama_rekom',
    numeric: true,
    disablePadding: false,
    label: 'Jurusan',
  },
//   {
//     id: 'tgl_apply',
//     numeric: true,
//     disablePadding: false,
//     label: 'Tanggal Apply',
//   },
  // {
  //   id: 'actions',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Actions',
  // },
  
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'left' : 'left'}
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
  console.log(dateString);
  const [year, month, day] = dateString.split('-');
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
    'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const monthName = monthNames[parseInt(month, 10) - 1];
  return `${day} ${monthName} ${year}`;
}

// function formatDatetime(dateString) {
//   const [datePart, timePart] = dateString.split(/[\sT]/);
//   return `${datePart}T${timePart}`;
// }

function formatDatetime(dateString) {
  const date = new Date(dateString);
  const formattedDate = date.toISOString().slice(0, 16); // Truncate to "yyyy-MM-ddThh:mm"
  return formattedDate;
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

export default function RekomMahasiswa() {
    // const theme = useTheme();
    // const classes = useStyles();
    const { mhsNrp } = useParams();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('mhs_nrp');
    const [selected, setSelected] = React.useState([]);
    const [isChecked, setChecked] = useState([]);
    const [bearekom, setBeaRekom] = useState([]);
    const [periode, setPeriode] = useState([]);
    const [searched, setSearched] = useState("");
    const [open, setOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rows, setRows] = useState(bearekom);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    // const kodeJenis="";
    // const beaJenisKode="";


    const [tgljam, setTgljam] = React.useState();

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


    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    });

    // const getUserData = async() => {
    //   // const response = await axios.get('192.168.100.14:5000/master-jenis-beasiswa');
    //   // setBeaJenis(response.beajenis);
    //   // console.log(response.beajenis);
    //   console.log("sukses masuk");
    //   const token = Cookies.get('myToken');
    //   await axios.get('http://localhost:5000/login/userdata',
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     }
    //   })
    //   .then(response =>{
    //       setUserData(response.data);
    //       console.log("Success fetch data!");
    //   })
    //   .catch(error => {
    //       navigate('/404');
    //       console.error('Error fetching data: ',error);
    //   });
    // }

    const handleWawancaraChange = async (e, mhsNrp, kodeBeasiswa) => {
      //   setBeasiswa(prevState => ({
      //     ...beasiswa.form,
      //     beasiswa_stop: date,
      //   }));
      // e.preventDefault();
      // await setBeaApply({
      //   form:{
      //     ...beaapply.form,
      //     [e.target.name]: e.target.value
      //   }
      // });
      // statusApply = e.target.value;

      console.log("sukses masuk");
      // const tgljam = e.target.value; 
      const tgljam = moment(e.target.value).tz('Asia/Jakarta').format();
      console.log(mhsNrp);
      console.log(tgljam);
      console.log(kodeBeasiswa);
      // if(selectedStatus === "Terdaftar"){
      //   selectedStatus = 0;
      // }
      // else if(selectedStatus === "Waiting"){
      //   selectedStatus = 1;
      // }
      // else if(selectedStatus === "Terima"){
      //   selectedStatus = 2;
      // }
      // else if(selectedStatus === "Tolak"){
      //   selectedStatus = 3;
      // }

      const token = Cookies.get("myToken");
      // console.log(mhsNrp);
      // console.log(selectedStatus);
      // console.log(`http://localhost:5000/master/${idSeleksi}`)
      const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/beaapply/wawancara/update`, {
          mhs_nrp: mhsNrp,
          beasiswa_kode: kodeBeasiswa,
          bea_apply_wawancara: tgljam  
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      console.log(response.data);
      
      
    };

    const getBeaRekom = async() => {
      console.log("sukses masuk");
      const token = Cookies.get("myToken");
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}/beaapply/rekom`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then(response =>{
          setBeaRekom(response.data);
          console.log("Success fetch data!");
          const initialCheckboxes = {};
          response.data.forEach((row) => {
            console.log(row.bea_apply_rekom);
            initialCheckboxes[`${row.mhs_nrp}-${row.beasiswa_kode}`] = row.bea_apply_rekom || false;
          });
          setCheckboxes(initialCheckboxes);
          console.log(checkboxes);
      })
      .catch(error => {
          navigate(`/404`);
          console.error('Error fetching data: ',error);
      });
      
    }

    const getPeriode = async() => {
      // const response = await axios.get('192.168.100.14:5000/master-jenis-beasiswa');
      // setBeaJenis(response.beajenis);
      console.log("sukses masuk");
      const token = Cookies.get('myToken');
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}/master/periode/rekom`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then(response =>{
          setPeriode(response.data[0]);
          console.log("Success fetch data!");
      })
      .catch(error => {
          navigate('/404');
          console.error('Error fetching data: ',error);
      });
    }

    // const delbearekom = async() => {
    //   console.log("sukses masuk");
    //   await axios.delete('http://localhost:5000/master/wawancara/delete/',bearekom.bea_wawancara_id)
    //   .then(response =>{
    //       setbearekom(response.data);
    //       console.log("Success delete data!");
    //   })
    //   .catch(error => {
    //       console.error('Error fetching data: ',error);
    //   });
    // }

    useEffect(()=>{
      getBeaRekom();
      getPeriode();
      
    },[]);
    console.log(bearekom);
    console.log(periode);

    function isRekom(statusRekom){
      if(statusRekom === false){
        return false
        // console.log("masuk false")
      } 
      if(statusRekom === true){
        return true
        // console.log("masuk true")
      }
      return false
    }

    const handleRekomChange = async (e, mhsNrp, kodeBeasiswa) => {
      //   setBeasiswa(prevState => ({
      //     ...beasiswa.form,
      //     beasiswa_stop: date,
      //   }));
      // e.preventDefault();
      // await setBeaApply({
      //   form:{
      //     ...beaapply.form,
      //     [e.target.name]: e.target.value
      //   }
      // });
      // statusApply = e.target.value;

      setChecked(e.target.checked);
      // console.log(isChecked);
      console.log("sukses masuk");
      // const tgljam = e.target.value; 
      // const tgljam = moment(e.target.value).tz('Asia/Jakarta').format();
      console.log(mhsNrp);
      // console.log(tgljam);
      console.log(kodeBeasiswa);
      // let statusChecked = is;
      // console.log(statusChecked);
      // if(isChecked === "false"){
      //   setChecked(true);
      //   // isRekom("false")
      // }
      // else if(isChecked === "true"){
      //   setChecked(false);
      //   // isRekom("true");
      // }

      console.log(isChecked);
      // else if(selectedStatus === "Terima"){
      //   selectedStatus = 2;
      // }
      // else if(selectedStatus === "Tolak"){
      //   selectedStatus = 3;
      // }

      const token = Cookies.get("myToken");
      // console.log(mhsNrp);
      // console.log(selectedStatus);
      console.log(`${process.env.REACT_APP_BACKEND_URL}/beaapply/rekom/update`) // ini jalan
      const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/beaapply/rekom/update`, {
          mhs_nrp: mhsNrp,
          beasiswa_kode: kodeBeasiswa,
          bea_apply_rekom: isChecked  
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(response =>{
          console.log(response.data);
      })
      .catch(error => {
          // navigate('/404');
          console.error('Error fetching data: ',error);
      });
      
      
      
    };

    const requestSearch = (searchedVal) => {
      const filteredRows = bearekom.filter((row) => {
        return row.bea_wawancara_id.toLowerCase().includes(searchedVal.toLowerCase());
      });
      setRows(filteredRows);
    };
  
    const cancelSearch = () => {
      setSearched("");
      requestSearch(searched);
    };
  

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - bearekom.length) : 0;

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

    const handleUpdateClick = (idWawancara) => {
        // Use navigate function to go to a different route
        idWawancara = bearekom.bea_wawancara_id;
        const baseUrl = '/master/wawancara/';
        const additionalPath = idWawancara;
        const combinedUrl = `${baseUrl}${additionalPath}`;
        navigate(combinedUrl);
    };

    const handleDeleteClick = async(index) => {
      // Use navigate function to go to a different route
      // kodeJenis = beajenis.bea_jenis_kode;
      // const baseUrl = '/master/jenis-beasiswa/delete/';
      // const additionalPath = kodeJenis;
      // const combinedUrl = `${baseUrl}${additionalPath}`;
      // navigate(combinedUrl);
      // let i = index;
      console.log(index);
      // const response = await axios.post('http://localhost:5000/master/jenis-beasiswa/delete', {
      //     kode_jenis: beajenis[index].bea_jenis_kode
      // }, {
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   }
      // })
      // console.log(response.data);

      // .then((response)=>{
      //     console.log("Success insert data!");
      navigate("/master/wawancara");
  };

  const [checkboxes, setCheckboxes] = useState({});

  // Function to handle checkbox change for a specific row
  const handleCheckboxChange = async (mhsNrp, kodeBeasiswa) => {
  try {
    const updatedCheckboxes = { ...checkboxes, [`${mhsNrp}-${kodeBeasiswa}`]: !checkboxes[`${mhsNrp}-${kodeBeasiswa}`] };
    setCheckboxes(updatedCheckboxes);

    // Update bea_apply_rekom in the bearekom data based on the checkbox state
    const updatedBearekom = bearekom.map((row) => {
      if (row.mhs_nrp === mhsNrp && row.beasiswa_kode === kodeBeasiswa) {
        return { ...row, bea_apply_rekom: updatedCheckboxes[`${mhsNrp}-${kodeBeasiswa}`] };
      }
      return row;
    });

    setBeaRekom(updatedBearekom);
    // console.log(updatedBearekom.bea_apply_rekom);

    const token = Cookies.get("myToken");
    // Make PUT request to your backend API with updated bearekom data
    updatedBearekom.forEach(async (updatedRow) => {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/beaapply/rekom/update`,
        {
          mhs_nrp: updatedRow.mhs_nrp,
          beasiswa_kode: updatedRow.beasiswa_kode,
          bea_apply_rekom: updatedRow.bea_apply_rekom,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      console.log(response.data); // Log response if needed
    });
  } catch (error) {
    console.error('Error:', error);
  }
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
            <Typography variant="h4" sx={{ mb: 5 }}>
            Rekomendasi Mahasiswa
            </Typography>
            {/* <Button align="center" variant="contained" startIcon={<AddIcon />} href='/master/wawancara/insert'> */}
                {/* <Icon>add_circle</Icon> */}
                {/* Tambah
            </Button> */}
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
                  <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                  />
                    <TableBody>
                    {/* <Link to={`/master/jenis-beasiswa/${beajenis.bea_jenis_kode}`}> */}
                    {(rowsPerPage > 0
                    ? bearekom.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : bearekom
                    ).map((bearekom,i) => {
                      const isItemSelected = isSelected(bearekom.mhs_nrp);
                      const labelId = `enhanced-table-checkbox-${i}`;
                      return (
                        <TableRow
                        hover
                        onClick={(event) => handleClick(event, bearekom.mhs_nrp)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={bearekom.mhs_nrp}
                        selected={isItemSelected}
                        // sx={{ cursor: 'pointer' }}
                        sx={{ cursor: 'pointer', '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {/* <TableCell component="th" scope="row">
                                {i+1}
                            </TableCell> */}
                            <TableCell padding="checkbox">
                              <Checkbox
                                id="bea_apply_rekom"
                                name="bea_apply_rekom"
                                color="primary"
                                checked={checkboxes[`${bearekom.mhs_nrp}-${bearekom.beasiswa_kode}`]}
                                onChange={(e) => handleCheckboxChange(bearekom.mhs_nrp, bearekom.beasiswa_kode)}
                                inputProps={{
                                  'aria-labelledby': labelId,
                                }}
                              />
                            </TableCell>
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                            >
                              {/* {bearekom.bea_wawancara_id} */}
                              <span dangerouslySetInnerHTML={{__html: `${bearekom.mhs_nrp}<br/>${bearekom && bearekom.mahasiswa && bearekom.mahasiswa.mhs_nama}`}} />
                            </TableCell>
                            <TableCell align="left">{bearekom && bearekom.mahasiswa && bearekom.mahasiswa.aka_jurusan && bearekom.mahasiswa.aka_jurusan.jur_nama}</TableCell>
                            {/* <TableCell align='left'> */}
                                {/* <h1 className="has-text-weight-bold">{beajenis.bea_jenis_nama} </h1>
                                {bearekom.mahasiswa.mhs_nama} */}
                                {/* <span dangerouslySetInnerHTML={{__html: `${bearekom.mhs_nrp}<br/>${bearekom && bearekom.mahasiswa && bearekom.mahasiswa.mhs_nama}`}} />
                            </TableCell> */}
                            {/* <TableCell align="left">{bearekom && bearekom.keu_beasiswa && bearekom.keu_beasiswa.keu_bea_jeni && bearekom.keu_beasiswa.keu_bea_jeni.bea_jenis_nama}</TableCell> */}
                            {/* <TableCell align="left"><span dangerouslySetInnerHTML={{__html: `${formatDate(bearekom.bea_apply_tanggal)}`}} /></TableCell>
                            <TableCell align='left'>
                              <TextField
                                required
                                id="bea_apply_wawancara"
                                name="bea_apply_wawancara"
                                type="datetime-local"  // Set the type to "datetime-local"
                                // label="Wawancara Date and Time"
                                value={formatDatetime(bearekom.bea_apply_wawancara)}
                                onChange={(e) => handleWawancaraChange(e, bearekom.mhs_nrp, bearekom.beasiswa_kode)}
                                fullWidth
                                size="small"
                                autoComplete="off"
                                variant="outlined"
                              />
                            </TableCell> */}
                            {/* <TableCell align="left">
                            <span dangerouslySetInnerHTML={{__html: `${formatDate(bearekom.bea_wawancara_tgl)}<br/>${bearekom.bea_wawancara_jam}`}} /></TableCell> */}
                            {/* <TableCell> */}
                            {/* <Button variant="contained" startIcon={<UpdateIcon/>} onClick={handleClick}>
                                Update
                            </Button> */}
                            {/* <Link to={`/master/rekom/${bearekom.mhs_nrp}`}>
                            <IconButton aria-label="detail" color="secondary"
                            // onClick={() => handleUpdateClick(kodeJenis)}
                            > 
                                <InfoIcon />
                            </IconButton>
                            </Link> */}
                            {/* <IconButton aria-label="delete" sx={{ color: "red" }}
                            onClick={() => handleClickOpen()}
                            >
                                <DeleteIcon />
                            </IconButton>
                            <Dialog
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
                                <Button onClick={() => handleDeleteClick({i})} autoFocus> */}
                                  {/* alert(i); */}
                                  {/* Agree
                                </Button>
                              </DialogActions>
                            </Dialog> */}
                            {/* </TableCell>  */}
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
                            count={bearekom.length}
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
        </>
    )
}
