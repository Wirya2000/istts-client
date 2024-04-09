import * as React from 'react';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import AddIcon from '@mui/icons-material/Add';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FilterListIcon from '@mui/icons-material/FilterList';
import PersonIcon from '@mui/icons-material/Person';
import SendIcon from '@mui/icons-material/Send';
import HistoryIcon from '@mui/icons-material/History';
import { visuallyHidden } from '@mui/utils';
// import { makeStyles } from "@material-ui/core/styles";
import Swal from 'sweetalert2'
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import { JenisBeasiswaSearch } from 'src/sections/master/jenis_beasiswa';
import useResponsive from '../hooks/useResponsive';
// components
import Iconify from '../components/iconify';

import tokenValidator from '../utils/tokenValidator';


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
    id: 'mhs_seleksi',
    numeric: false,
    disablePadding: true,
    label: 'Mahasiswa',
  },
  {
    id: 'mhs_ipk_seleksi',
    numeric: true,
    disablePadding: false,
    label: 'IPK',
  },
  {
    id: 'mhs_poin_seleksi',
    numeric: true,
    disablePadding: false,
    label: 'Poin',
  },
  {
    id: 'mhs_status_seleksi',
    numeric: true,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'mhs_perwalian_seleksi',
    numeric: true,
    disablePadding: false,
    label: 'Perwalian',
  },
  {
    id: 'mhs_syarat_seleksi',
    numeric: true,
    disablePadding: false,
    label: 'Syarat',
  },
  {
    id: 'mhs_status_seleksi',
    numeric: true,
    disablePadding: false,
    label: 'Ubah Status',
  },
  {
    id: 'mhs_history_seleksi',
    numeric: true,
    disablePadding: false,
    label: 'History',
  },
  {
    id: 'mhs_spp_seleksi',
    numeric: true,
    disablePadding: false,
    label: 'SPP',
  },
  {
    id: 'mhs_sks_seleksi',
    numeric: true,
    disablePadding: false,
    label: 'SKS',
  },
  {
    id: 'mhs_total_seleksi',
    numeric: true,
    disablePadding: false,
    label: 'Total',
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Actions',
  },
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
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'center'}
            padding={headCell.disablePadding ? 'normal' : 'normal'}
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

  const applystatus = [
    "Terdaftar",
    "Terima",
    "Tolak",
    "Waiting",
  ]

export default function DetailSeleksi() {
    // const theme = useTheme();
    // const classes = useStyles();
    const { idSeleksi } = useParams();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('kodebea_seleksi');
    const [selected, setSelected] = React.useState([]);
    const [dseleksi, setDseleksi] = useState([]);
    const [bearekom, setBeaRekom] = useState([]);
    const [beaapply, setBeaApply] = useState([]);
    const [nomspp, setNomspp] = useState([]);
    const [nomsks, setNomsks] = useState([]);
    const [searched, setSearched] = useState("");
    const [open, setOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rows, setRows] = useState(dseleksi);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    // const kodeJenis="";
    // const beaJenisKode="";

    // let statusApply = "Terdaftar";
    const [isRekom, setRekom] = useState(false);

    // function backgroundRekom(mhsNrp){
    //   for (let j = 0; j < bearekom.length; j+=1) {
    //     if (mhsNrp === bearekom[j].mhs_nrp) {
    //       // setRekom(true);
    //       if(bearekom[j].bea_apply_rekom === 1){
    //         return "yellow";
    //         // break; // Exit the inner loop once a match is found
    //       }
    //     } 
    //   }
    //   return "transparent";
    // }

    const showSwal = (iconMsg, msg) => {
      Swal.fire({
        title: msg,
        // text: msg,
        icon: iconMsg
      });
    }

    const formatCurrency = new Intl.NumberFormat('id-ID',{
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    });

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

    const handleStatusChange = async (e, mhsNrp) => {
      //   setBeasiswa(prevState => ({
      //     ...beasiswa.form,
      //     beasiswa_stop: date,
      //   }));
      e.preventDefault();
      // await setBeaApply({
      //   form:{
      //     ...beaapply.form,
      //     [e.target.name]: e.target.value
      //   }
      // });
      // statusApply = e.target.value;

      console.log("sukses masuk");
      let selectedStatus = e.target.value; 
      if(selectedStatus === "Terdaftar"){
        selectedStatus = 0;
      }
      else if(selectedStatus === "Terima"){
        selectedStatus = 1;
      }
      else if(selectedStatus === "Tolak"){
        selectedStatus = 2;
      }
      else if(selectedStatus === "Waiting"){
        selectedStatus = 3;
      }

      const token = Cookies.get("myToken");
      console.log(mhsNrp);
      console.log(selectedStatus);
      console.log(`${process.env.REACT_APP_BACKEND_URL}/seleksi/${idSeleksi}`)
      const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/seleksi/${idSeleksi}/update/status`, {
          mhs_nrp: mhsNrp,
          status_apply: selectedStatus  
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      console.log(response.data);
      await getDseleksi();
    };

    const handleSendEmail = async (mhsNrp) => {
      const token = Cookies.get("myToken");
      console.log(mhsNrp);
      // console.log(selectedStatus);
      console.log(`${process.env.REACT_APP_BACKEND_URL}/seleksi/email`)
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/seleksi/email`, {
          mhs_nrp: mhsNrp,
          beasiswa_kode: idSeleksi  
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      console.log(response.data.message);
      if(response.data.message === "error"){
        showSwal("error", "Sent Failed!")
      }
      else if(response.data.message === "success"){
        showSwal("success", "Sent Success!")
      }
      await getDseleksi();
    };
    
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    });

    const handleSppChange = async (e, mhsNrp) =>  {
      e.preventDefault();
      // setDseleksi(prevState => ({
      //   ...prevState,
      //   [e.target.name]: e.target.value
      // }));
      // setNomspp(e.target.value);

      const token = Cookies.get("myToken");
      // console.log(mhsNrp);
      // console.log(selectedStatus);
      console.log(`${process.env.REACT_APP_BACKEND_URL}/seleksi/${idSeleksi}`)
      const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/seleksi/${idSeleksi}/update/spp`, {
          mhs_nrp: mhsNrp,
          bea_apply_spp: e.target.value  
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      console.log(response.data);
      await getDseleksi();
    }

    const handleSksChange = async (e, mhsNrp) =>  {
      e.preventDefault();
      // setDseleksi(prevState => ({
      //   ...prevState,
      //   [e.target.name]: e.target.value
      // }));
      // setNomsks(e.target.value);

      const token = Cookies.get("myToken");
      // console.log(mhsNrp);
      // console.log(selectedStatus);
      console.log(`${process.env.REACT_APP_BACKEND_URL}/seleksi/${idSeleksi}`)
      const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/seleksi/${idSeleksi}/update/sks`, {
          mhs_nrp: mhsNrp,
          bea_apply_sks: e.target.value  
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      console.log(response.data);
      await getDseleksi();
    }
    
    const getDseleksi = async() => {
      // const response = await axios.get('192.168.100.14:5000/master-jenis-beasiswa');
      // setBeaJenis(response.beajenis);
      // console.log(response.beajenis);
      console.log("sukses masuk");
      const token = Cookies.get("myToken");
      console.log(`${process.env.REACT_APP_BACKEND_URL}/seleksi/${idSeleksi}`)
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}/seleksi/${idSeleksi}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then(response =>{
          setDseleksi(response.data);
          console.log("Success fetch data!");
      })
      .catch(error => {
          navigate('/404');
          console.error('Error fetching data: ',error);
      });
      
    }

    // const getNominal = async() => {
    //   // const response = await axios.get('192.168.100.14:5000/master-jenis-beasiswa');
    //   // setBeaJenis(response.beajenis);
    //   // console.log(response.beajenis);
    //   console.log("sukses masuk");
    //   const token = Cookies.get("myToken");
    //   console.log(`http://localhost:5000/seleksi/${idSeleksi}`)
    //   await axios.get(`http://localhost:5000/seleksi/${idSeleksi}`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     }
    //   })
    //   .then(response =>{
    //       setDseleksi(response.data);
    //       console.log("Success fetch data!");
    //   })
    //   .catch(error => {
    //       navigate('/404');
    //       console.error('Error fetching data: ',error);
    //   });
      
    // }

    // const getBeaRekom = async() => {
    //   // const response = await axios.get('192.168.100.14:5000/master-jenis-beasiswa');
    //   // setBeaJenis(response.beajenis);
    //   // console.log(response.beajenis);
    //   console.log("sukses masuk");
    //   const token = Cookies.get("myToken");
    //   console.log(`http://localhost:5000/seleksi/rekom/${idSeleksi}`)
    //   await axios.get(`http://localhost:5000/seleksi/rekom/${idSeleksi}`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     }
    //   })
    //   .then(response =>{
    //       setBeaRekom(response.data);
    //       console.log("Success fetch data!");
    //   })
    //   .catch(error => {
    //       navigate('/404');
    //       console.error('Error fetching data: ',error);
    //   });
      
    // }

    useEffect(()=>{
      getDseleksi();
      // getBeaRekom();
    },[]);
    console.log(dseleksi);
    // console.log(bearekom);
    // console.log(dseleksi.mhs_nrp);
    // console.log(bearekom[4].mhs_nrp);
    
    // useEffect(() => {
    //   for (let i = 0; i < dseleksi.length; i+=1) {
    //     for (let j = 0; j < bearekom.length; j+=1) {
    //       if (dseleksi[i].mhs_nrp === bearekom[j].mhs_nrp) {
    //         setRekom(true);
    //         break; // Exit the inner loop once a match is found
    //       } else {
    //         setRekom(false);
    //       }
    //     }
    //   }
      
    // }, [dseleksi, bearekom]);

    // console.log(isRekom);

    const requestSearch = (searchedVal) => {
      const filteredRows = dseleksi.filter((row) => {
        return row.mhs_nama.toLowerCase().includes(searchedVal.toLowerCase());
      });
      setRows(filteredRows);
    };
  
    const cancelSearch = () => {
      setSearched("");
      requestSearch(searched);
    };
  

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dseleksi.length) : 0;

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
            Detail Seleksi
            </Typography>
            {/* <Button align="center" variant="contained" startIcon={<AddIcon />} href='/master/seleksi/insert'>
                <Icon>add_circle</Icon>
                Tambah
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
                    ? dseleksi.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : dseleksi
                    ).map((dseleksi,i) => {
                      const isItemSelected = isSelected(dseleksi.mhs_nrp);
                      const labelId = `enhanced-table-checkbox-${i}`;
                      return (
                        <TableRow
                        hover
                        onClick={(event) => handleClick(event, dseleksi.mhs_nrp)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={dseleksi.mhs_nrp}
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
                              id="mhs_nrp"
                              name="mhs_nrp"
                              scope="row"
                              padding="none"
                            >
                              {/* {dseleksi.mhs_nrp} */}
                              {(() => {
                                if (dseleksi.bea_apply_rekom === true) {
                                  return (
                                    <span
                                      style={{
                                        backgroundColor: 'yellow',
                                        padding: '5px',
                                        textAlign: 'center'
                                      }}
                                      dangerouslySetInnerHTML={{
                                        __html: `${dseleksi.mhs_nrp}<br/>${dseleksi.mhs_nama}`,
                                      }}
                                    />
                                  );
                                } 
                                return (
                                  <span
                                    style={{
                                      backgroundColor: 'transparent',
                                      padding: '5px',
                                      textAlign: 'center'
                                    }}
                                    dangerouslySetInnerHTML={{
                                      __html: `${dseleksi.mhs_nrp}<br/>${dseleksi.mhs_nama}`,
                                    }}
                                  />
                                )
                              })()}
                              {/* <span
                                style={{
                                  backgroundColor: backgroundRekom(dseleksi.mhs_nrp),
                                  padding: '5px',
                                }}
                                dangerouslySetInnerHTML={{
                                  __html: `${dseleksi.mhs_nrp}<br/>${dseleksi &&
                                    dseleksi.mahasiswa &&
                                    dseleksi.mahasiswa.mhs_nama}`,
                                }}
                              /> */}
                              {/* <span dangerouslySetInnerHTML={{__html: `${dseleksi.mhs_nrp}<br/>${dseleksi && dseleksi.mahasiswa && dseleksi.mahasiswa.mhs_nama}`}} /> */}
                            </TableCell>
                            {/* <TableCell align="left" name="kodeJenis">{beajenis.bea_jenis_kode}</TableCell> */}
                            <TableCell align='left'>{dseleksi.bea_apply_ipk}</TableCell>
                            <TableCell align='left'>{dseleksi.bea_apply_poin}</TableCell>
                            <TableCell align="left">
                            {(() => {
                            if (dseleksi.bea_apply_status === 0) {
                              return 'Terdaftar';
                            }
                            if (dseleksi.bea_apply_status === 1) {
                              return 'Diterima';
                            } 
                            if (dseleksi.bea_apply_status === 2) {
                              return 'Ditolak';
                            }  
                            if (dseleksi.bea_apply_status === 3) {
                              return 'Waiting';
                            }
                            return "";
                            })()}
                            </TableCell>
                            <TableCell align="left">
                            {/* <span dangerouslySetInnerHTML={{__html: `${dseleksi && dseleksi.mahasiswa && dseleksi.mahasiswa.perwalian && dseleksi.mahasiswa.perwalian.perwalian_batas_sks}<br/>${dseleksi && dseleksi.mahasiswa && dseleksi.mahasiswa.aka_perwalian && dseleksi.mahasiswa.aka_perwalian.aka_periode && dseleksi.mahasiswa.aka_perwalian.aka_periode.periode_akademik}`}} /> */}
                              <span dangerouslySetInnerHTML={{__html: `${dseleksi.periode_nama}<br/>${dseleksi.periode_akademik}`}} />
                            </TableCell>
                            <TableCell align="left">
                              {/* <span dangerouslySetInnerHTML={{__html: `${formatDate(seleksi.beasiswa_start)}<br/>${formatDate(seleksi.beasiswa_stop)}`}} /> */}

                              <Link to={`/master/seleksi/${idSeleksi}/${dseleksi.mhs_nrp}`}>
                                <IconButton aria-label="update" color="secondary"
                                // onClick={() => handleUpdateClick(kodeJenis)}
                                > 
                                    <PersonIcon />
                                </IconButton>
                              </Link>
                            </TableCell>
                            <TableCell align="left">
                            <Select
                              required
                              id="bea_apply_status"
                              name="bea_apply_status"
                              value={applystatus[dseleksi.bea_apply_status]}
                              // value={statusApply }
                              onChange={(e) => handleStatusChange(e, dseleksi.mhs_nrp)}
                              // label="Periode"
                              // onChange={handleChange}
                            >
                              {applystatus.map((item) => (
                                <MenuItem value={item}>{item}</MenuItem>
                              ))}
                            </Select>
                            </TableCell>
                            <TableCell align="left">
                              {/* <span dangerouslySetInnerHTML={{__html: `${formatDate(seleksi.beasiswa_start)}<br/>${formatDate(seleksi.beasiswa_stop)}`}} /> */}

                              <Link to={`/master/seleksi/history/${dseleksi.mhs_nrp}`}>
                                <IconButton aria-label="update" color="secondary"
                                // onClick={() => handleUpdateClick(kodeJenis)}
                                > 
                                    <HistoryIcon />
                                </IconButton>
                              </Link>
                            </TableCell>
                            <TableCell align='left'>
                            <TextField
                              required
                              id="bea_apply_spp"
                              name="bea_apply_spp"
                              // label="Nominal SPP"
                              value={dseleksi.bea_apply_spp}
                              onChange={(e) => handleSppChange(e, dseleksi.mhs_nrp)}
                              fullWidth
                              size="small"
                              autoComplete="off"
                              variant="outlined"
                              style={{ width: '100px' }}
                            />
                            </TableCell>
                            <TableCell align='left'>
                            <TextField
                              required
                              id="bea_apply_sks"
                              name="bea_apply_sks"
                              // label="Nominal SPP"
                              value={dseleksi.bea_apply_sks}
                              onChange={(e) => handleSksChange(e, dseleksi.mhs_nrp)}
                              fullWidth
                              size="small"
                              autoComplete="off"
                              variant="outlined"
                              style={{ width: '100px' }}
                            />
                            </TableCell>
                            <TableCell> 
                              {formatCurrency.format((parseInt(dseleksi.bea_apply_spp, 10)*parseInt(dseleksi.nom_spp[0], 10)) + (parseInt(dseleksi.bea_apply_sks, 10)*parseInt(dseleksi.nom_sks[0], 10)))}
                            {/* {parseInt(nomspp)} */}
                            {/* <Link to={`/master/seleksi/${dseleksi.beasiswa_kode}`}>
                            <IconButton aria-label="visibility" color="secondary"
                            // onClick={() => handleUpdateClick(kodeJenis)}
                            > 
                                <VisibilityIcon />
                            </IconButton>
                            </Link> */}

                            </TableCell>
                            <TableCell align="center">
                              {(() => {
                                if(dseleksi.bea_apply_send === false){
                                  return(
                                    <Button 
                                      variant="contained" 
                                      startIcon={<SendIcon/>} 
                                      onClick={() => handleSendEmail(dseleksi.mhs_nrp)}>
                                        Send
                                    </Button>
                                  )
                                }
                                return(
                                  <Button 
                                      variant="contained" 
                                      startIcon={<SendIcon/>} 
                                      onClick={() => handleSendEmail(dseleksi.mhs_nrp)}
                                      disabled="true"
                                  >
                                      Send
                                  </Button>
                                )
                              
                              })()}
                            </TableCell>
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
                            count={dseleksi.length}
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
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <div style={{width: 30, height: 15, backgroundColor:"yellow", marginRight: 5, marginTop: 3}} />
              Mahasiswa yang direkomendasi BAU
            </div>
            
              
            
        </>
    )
}
