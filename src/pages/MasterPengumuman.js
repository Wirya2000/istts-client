import * as React from 'react';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { Link, useNavigate } from 'react-router-dom';
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
import PrintIcon from '@mui/icons-material/Print';
import FilterListIcon from '@mui/icons-material/FilterList';
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
  if (a[orderBy] === null) {
    return 1;
  }
  if (b[orderBy] === null) {
    return -1;
  }
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

function stableSort({ inputData, comparator, filterName }) {
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if(filterName) {
    inputData = inputData.filter(
      (beapengumuman) =>beapengumuman.pengumuman_kode.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }
  return inputData;
}

// const headCells = [
//   {
//     id: 'kodejenis',
//     numeric: false,
//     disablePadding: true,
//     label: 'Kode Beasiswa',
//   },
//   {
//     id: 'namajenis',
//     numeric: true,
//     disablePadding: false,
//     label: 'Nama Beasiswa',
//   },
//   {
//     id: 'jumsppjenis',
//     numeric: true,
//     disablePadding: false,
//     label: 'Jumlah SPP',
//   },
//   {
//     id: 'jumsksjenis',
//     numeric: true,
//     disablePadding: false,
//     label: 'Jumlah SKS',
//   },
//   {
//     id: 'tipejenis',
//     numeric: true,
//     disablePadding: false,
//     label: 'Tipe',
//   },
//   {
//     id: 'action',
//     numeric: true,
//     disablePadding: false,
//     label: 'Actions',
//   },
// ];

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

export default function MasterJenisBeasiswa({kodeJenis}) {
    // const theme = useTheme();
    // const classes = useStyles();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('kodejenis');
    const [selected, setSelected] = useState([]);
    const [userData, setUserData] = useState([]);
    const [beapengumuman, setBeapengumuman] = useState([]);
    const [searched, setSearched] = useState("");
    const [open, setOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rows, setRows] = useState(beapengumuman);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [delindex, setDelindex] = React.useState();

    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelected = beapengumuman.map((n) => n.name);
        setSelected(newSelected);
        return;
      }
      setSelected([]);
    };

    const handleClick = (event, name) => {
      const selectedIndex = selected.indexOf(name);
      let newSelected = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
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

    const getBeapengumuman = async() => {
      console.log("sukses masuk");
      const token = Cookies.get('myToken');
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}/master/pengumuman`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then(response =>{
          console.log(JSON.stringify(response.data));
          setBeapengumuman(response.data);
          console.log("Success fetch data!");
      })
      .catch(error => {
          navigate("/404");
          console.error('Error fetching data: ',error);
      });
      
    }

    useEffect(()=>{
      getUserData();
      getBeapengumuman();
      
    },[]);
    console.log(beapengumuman);

    const handleDeleteClick = async(j) => {
      const kode = j;
      console.log(kode)
      console.log("sukses masuk");
      const token = Cookies.get('myToken');
      console.log(token);
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/master/pengumuman/delete`,
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
        getBeapengumuman();
      })
      .catch(error => {
          console.error('Error fetching data: ',error);
      });
      
  };


    const requestSearch = (searchedVal) => {
      const filteredRows = beapengumuman.filter((row) => {
        return row.pengumuman_judul.toLowerCase().includes(searchedVal.toLowerCase());
      });
      setRows(filteredRows);
    };
  
    const cancelSearch = () => {
      setSearched("");
      requestSearch(searched);
    };
  
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - beapengumuman.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;
    
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
        {(() => {
          console.log(userData.role);
          if (userData.role === "admin"){
            return(
              <Typography variant="h4" sx={{ mb: 5 }}>
                Master Pengumuman
              </Typography>
            )
          }
          return(
            <Typography variant="h4" sx={{ mb: 5 }}>
              Pengumuman
            </Typography>
          )
        })()}
        {(() => {
          console.log(userData.role);
          if (userData.role === "admin"){
            return (
            <Button align="center" variant="contained" startIcon={<AddIcon />} href='/master/pengumuman/insert'>
              {/* <Icon>add_circle</Icon> */}
              Tambah
            </Button>
            )
          }
          return""
        })()}
            
        </Container>
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
                  return(
                    <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={beapengumuman.length}
                    headLabel={[
                    {
                      id: 'kodepengumuman',
                      numeric: false,
                      disablePadding: true,
                      label: 'Kode Pengumuman',
                    },
                    {
                      id: 'judulpengumuman',
                      numeric: false,
                      disablePadding: false,
                      label: 'Judul Pengumuman',
                    },
                    {
                      id: 'statuspengumuman',
                      // numeric: true,
                      // disablePadding: false,
                      label: 'Status Pengumuman',
                    },
                    {
                      id: 'action',
                      // numeric: true,
                      // disablePadding: false,
                      label: 'Action',
                    }
                    ]}
                  />
                  )
                }
                return(
                  <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={beapengumuman.length}
                    headLabel={[
                    // {
                    //   id: 'kodepengumuman',
                    //   numeric: false,
                    //   disablePadding: true,
                    //   label: 'Kode Pengumuman',
                    // },
                    {
                      id: 'judulpengumuman',
                      numeric: false,
                      disablePadding: false,
                      label: 'Judul Pengumuman',
                    },
                    // {
                    //   id: 'statuspengumuman',
                    //   // numeric: true,
                    //   // disablePadding: false,
                    //   label: 'Status Pengumuman',
                    // },
                    ]}
                  />
                )
                })()}
                  
                    <TableBody>
                    {(rowsPerPage > 0
                    ? beapengumuman.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : beapengumuman
                    ).map((beapengumuman,i) => {
                      const isItemSelected = isSelected(beapengumuman.pengumuman_kode);
                      const labelId = `enhanced-table-checkbox-${i}`;
                      if(userData.role === "admin"){
                        return (
                          <TableRow
                          hover
                          onClick={(event) => handleClick(event, beapengumuman.bea_jenis_kode)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={beapengumuman.pengumuman_kode}
                          selected={isItemSelected}
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
                              {(() => {
                              if (userData.role === "admin"){
                                return(
                                  <TableCell
                                    component="th"
                                    id={labelId}
                                    scope="row"
                                    align='center'
                                    // padding="none"
                                  >
                                    {beapengumuman.pengumuman_kode}
                                  </TableCell>
                                )
                              }
                              return ""
                            })()}
                              {/* <TableCell align="left" name="kodeJenis">{beapengumuman.bea_jenis_kode}</TableCell> */}
                              <TableCell align='center'>{beapengumuman.pengumuman_judul}</TableCell>
                              <TableCell align='center'>
                              {(() => {
                              if (userData.role === "admin"){
                                if (beapengumuman.pengumuman_status === false) {
                                  return "Belum Terpublish";
                                } 
                                if (beapengumuman.pengumuman_status === true) {
                                  return "Telah Terpublish";
                                } 
                                return "";
                              }
                              return "";
                              })()}
                              </TableCell>
                              {(() => {
                              if (userData.role === "admin"){
                                return (
                                  <TableCell align='center'>
                                    <Link to={`/master/pengumuman/${beapengumuman.pengumuman_kode}`}>
                                    <IconButton aria-label="update" color="secondary"
                                    // onClick={() => handleUpdateClick(kodeJenis)}
                                    > 
                                        <ModeEditIcon />
                                    </IconButton>
                                    </Link>
                                    <IconButton aria-label="delete" sx={{ color: "red" }}
                                    onClick={() => {handleClickOpen(beapengumuman.pengumuman_kode); console.log(beapengumuman.pengumuman_kode)}}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                  </TableCell>
                                )
                              }
                              return "";
                              })()}
                              {/* <TableCell align="center">
                              {(() => {
                              if (beapengumuman.pengumuman_status === false) {
                                return 'Tidak Publish';
                              }
                              if (beapengumuman.pengumuman_status === true) {
                                return 'Publish';
                              }
                              return "";
                              })()}
                              </TableCell> */}
                          </TableRow>
  
                            )
                      }
                      return (
                        <Link to={`/master/pengumuman/detail/${beapengumuman.pengumuman_kode}`}>
                          <TableRow
                            hover
                            onClick={(event) => handleClick(event, beapengumuman.bea_jenis_kode)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={beapengumuman.pengumuman_kode}
                            selected={isItemSelected}
                            sx={{ cursor: 'pointer', '&:last-child td, &:last-child th': { border: 0 }, width: "100%"}}
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
                            {/* <TableCell align="left" name="kodeJenis">{beapengumuman.bea_jenis_kode}</TableCell> */}
                            <TableCell align='center' colSpan={12}>{beapengumuman.pengumuman_judul}</TableCell>
                            {/* <TableCell align="center">
                              {(() => {
                                if (beapengumuman.pengumuman_status === false) {
                                  return 'Tidak Publish';
                                }
                                if (beapengumuman.pengumuman_status === true) {
                                  return 'Publish';
                                }
                                return "";
                              })()}
                            </TableCell> */}
                          </TableRow>
                        </Link>
                      );
                      
                          
                          })}

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
                            count={beapengumuman.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            align='left'
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
              {beapengumuman.pengumuman_kode}
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
