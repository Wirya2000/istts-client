import * as React from 'react';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { Link, useNavigate, useParams } from 'react-router-dom';

// import ReactHTMLTableToExcel from 'react-html-table-to-excel';
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
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import AddIcon from '@mui/icons-material/Add';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
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
    id: 'waktu_apply',
    numeric: true,
    disablePadding: false,
    label: 'Tanggal Apply',
  },
  {
    id: 'status_apply',
    numeric: true,
    disablePadding: false,
    label: 'Status Pendaftaran',
  },
  // {
  //   id: 'status_beasiswa',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Status',
  // },
//   {
//     id: 'action',
//     numeric: true,
//     disablePadding: false,
//     label: 'Actions',
//   },
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

export default function DetailHistorySeleksi() {
    // const theme = useTheme();
    // const classes = useStyles();
    const { mhsNrp } = useParams();
    const [sheetData, setSheetData] = useState(null);
    const [role, setRole] = useState([]);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('jenis_beasiswa');
    const [selected, setSelected] = React.useState([]);
    const [beaapply, setBeaApply] = useState([]);
    const [searched, setSearched] = useState("");
    const [open, setOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rows, setRows] = useState(beaapply);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    // const excel = XLSX();
    // const kodeJenis="";
    // const beaJenisKode="";

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

    // const get = async() => {
    //   // const response = await axios.get('192.168.100.14:5000/master-jenis-beasiswa');
    //   // setBeaJenis(response.beajenis);
    //   // console.log(response.beajenis);
    //   console.log("sukses masuk");
    //   const token = Cookies.get('myToken');
    //   await axios.get('http://localhost:5000/login/role',
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     }
    //   })
    //   .then(response =>{
    //       setRole(response.data);
    //       console.log("Success fetch data!");
    //   })
    //   .catch(error => {
    //       navigate('/404');
    //       console.error('Error fetching data: ',error);
    //   });
    // }

    const getBeaApply = async() => {
      console.log("sukses masuk");
      const token = Cookies.get("myToken");
      console.log(`${process.env.REACT_APP_BACKEND_URL}/history/${mhsNrp}`);
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}/history/${mhsNrp}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then(response =>{
          setBeaApply(response.data);
          console.log("Success fetch data!");
      })
      .catch(error => {
          navigate('/404');
          console.error('Error fetching data: ',error);
      });
      
    }

    // const getData = () => {
    //     setSheetData(
    //         [
    //             beasiswa.keu_bea_jeni.bea_jenis_nama,
    //             beasiswa.aka_periode.periode_nama,
    //             beasiswa.aka_periode.periode_akademik
    //         ]
    //     )
    // }

    

    // const delBeasiswa = async() => {
    //   console.log("sukses masuk");
    //   await axios.delete('http://localhost:5000/master/beasiswa/delete/',beasiswa.beasiswa_kode)
    //   .then(response =>{
    //       setBeasiswa(response.data);
    //       console.log("Success delete data!");
    //   })
    //   .catch(error => {
    //       console.error('Error fetching data: ',error);
    //   });
    // }

    useEffect(()=>{
      getBeaApply();
    //   getData();
      
    },[]);
    console.log(beaapply);
    console.log(sheetData);

    const handleOnExport = () => {
        console.log(beaapply);
        const dataToExport = beaapply.map(item => ({
          'Jenis Beasiswa': item.keu_beasiswa.keu_bea_jeni.bea_jenis_nama,
          'Periode': `${item.keu_beasiswa.aka_periode.periode_nama} - ${item.keu_beasiswa.aka_periode.periode_akademik}`,
          'Waktu Pendaftaran': formatDate(item.bea_apply_tanggal),
          'Status Pendaftaran': getStatusLabel(item.bea_apply_status),
        }));
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(dataToExport);

        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

        XLSX.writeFile(wb, `laporan_mahasiswa.xlsx`)
    };

    const getStatusLabel = (status) => {
      switch (status) {
        case 0:
          return 'Terdaftar';
        case 1:
          return 'Waiting';
        case 2:
          return 'Diterima';
        case 3:
          return 'Ditolak';
        default:
          return '';
      }
    };

    const requestSearch = (searchedVal) => {
      const filteredRows = beaapply.filter((row) => {
        return row.beasiswa_kode.toLowerCase().includes(searchedVal.toLowerCase());
      });
      setRows(filteredRows);
    };
  
    const cancelSearch = () => {
      setSearched("");
      requestSearch(searched);
    };
  

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - beaapply.length) : 0;

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

    // const handleUpdateClick = (kodeBeasiswa) => {
    //     // Use navigate function to go to a different route
    //     kodeBeasiswa = beasiswa.beasiswa_kode;
    //     const baseUrl = '/master/beasiswa/';
    //     const additionalPath = kodeBeasiswa;
    //     const combinedUrl = `${baseUrl}${additionalPath}`;
    //     navigate(combinedUrl);
    // };

    // const handleDeleteClick = async(index) => {
      // Use navigate function to go to a different route
      // kodeJenis = beajenis.bea_jenis_kode;
      // const baseUrl = '/master/jenis-beasiswa/delete/';
      // const additionalPath = kodeJenis;
      // const combinedUrl = `${baseUrl}${additionalPath}`;
      // navigate(combinedUrl);
      // let i = index;
      // console.log(index);
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
      // navigate("/master/beasiswa");
  // };
     
    

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
            History Apply
            </Typography>
            {/* <Button align="center" variant="contained" startIcon={<FileDownloadIcon />} onClick={handleOnExport} >
                Export to Excel
            </Button> */}
            {/* <ReactHTMLTableToExcel
                className="button"
                table="table-laporan"
                filename="laporan_beasiswa"
                sheet="Sheet"
                buttonText="Export to Excel"
            /> */}
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
                <Table sx={{ minWidth: 650 }} aria-label="simple table" id="table-laporan">
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
                    ? beaapply.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : beaapply
                    ).map((beaapply,i) => {
                      const isItemSelected = isSelected(beaapply.beasiswa_kode);
                      const labelId = `enhanced-table-checkbox-${i}`;
                      return (
                        <TableRow
                        hover
                        onClick={(event) => handleClick(event, beaapply.beasiswa_kode)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={beaapply.beasiswa_kode}
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
                              {beaapply && beaapply.keu_beasiswa && beaapply.keu_beasiswa.keu_bea_jeni && beaapply.keu_beasiswa.keu_bea_jeni.bea_jenis_nama}
                            </TableCell>
                            {/* <TableCell align="left" name="kodeJenis">{beajenis.bea_jenis_kode}</TableCell> */}
                            <TableCell align='center'>
                                <span dangerouslySetInnerHTML={{__html: `${beaapply && beaapply.keu_beasiswa && beaapply.keu_beasiswa.aka_periode && beaapply.keu_beasiswa.aka_periode.periode_nama}<br/>${beaapply && beaapply.keu_beasiswa && beaapply.keu_beasiswa.aka_periode && beaapply.keu_beasiswa.aka_periode.periode_akademik}`}} />
                            </TableCell>
                            {/* <TableCell align='left'>
                                <span dangerouslySetInnerHTML={{__html: `${formatDate(beaapply.bea_apply_tgl)}<br/>${formatDate(beasiswa.beasiswa_stop)}`}} />
                            </TableCell> */}
                            {/* <TableCell align="left">{formatDate(beasiswa.beasiswa_start)}{formatDate(beasiswa.beasiswa_stop)}</TableCell> */}
                            <TableCell align="center">{formatDate(beaapply.bea_apply_tanggal)}</TableCell>
                            {/* <TableCell align="left">{beaapply.bea_apply_status}</TableCell> */}
                            <TableCell align="center">
                            {(() => {
                            if (beaapply.bea_apply_status === 0) {
                              return 'Terdaftar';
                            }
                            if (beaapply.bea_apply_status === 1) {
                              return 'Diterima';
                            } 
                            if (beaapply.bea_apply_status === 2) {
                              return 'Ditolak';
                            } 
                            if (beaapply.bea_apply_status === 3) {
                              return 'Waiting';
                            } 
                            return "";
                            })()}
                            </TableCell>
                            {/* <TableCell>
                             <Button variant="contained" startIcon={<UpdateIcon/>} onClick={handleClick}>
                                Update
                            </Button> 
                            <Link to={`/master/beasiswa/${beasiswa.beasiswa_kode}`}>
                            <IconButton aria-label="update" color="secondary"
                            onClick={() => handleUpdateClick(kodeJenis)}
                            > 
                                <ModeEditIcon />
                            </IconButton>
                            </Link>
                            <IconButton aria-label="delete" sx={{ color: "red" }}
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
                                <Button onClick={() => handleDeleteClick({i})} autoFocus>
                                  alert(i);
                                  Agree
                                </Button>
                              </DialogActions>
                            </Dialog>
                            </TableCell> */}
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
                            count={beaapply.length}
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
