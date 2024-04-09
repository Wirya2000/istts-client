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
import FormControlLabel from "@mui/material/FormControlLabel";

import { useTheme } from '@mui/material/styles';
import { ConstructionOutlined } from '@mui/icons-material';

import tokenValidator from '../utils/tokenValidator';

import footer from '../assets/footerPengumuman.PNG'
import header from '../assets/headerPengumuman.PNG'

const schema = joi.object({
  username: joi.string().min(4).message("4").max(6).message("6").required()
});

const jenisSyarat = [];

const PAGE_SIZE = 10; // Set the number of items per page

export default function GeneratePengumuman() {
  // const { idPengumuman } = useParams();
  const { periodeKode, beasiswaKode } = useParams();
  const [tipe, setTipe] = React.useState("");
  const [checkedItems, setCheckedItems] = useState([]);
  const [userData, setUserData] = useState([]);
  const [beapengumuman, setBeaPengumuman] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
//   const [beajenis, setBeaJenis] = useState({
//       bea_jenis_kode: "",
//       bea_jenis_nama: "",
//       bea_jenis_syarat: "",
//       bea_jenis_jumlah_spp: "",
//       bea_jenis_jumlah_sks: "",
//       bea_jenis_tipe: ""
//   });
  const navigate = useNavigate();

  console.log(periodeKode);
  console.log(beasiswaKode);
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

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     let beatipe = e.target.elements.bea_jenis_tipe.value
//     if(beatipe==='Public/Umum'){
//       beatipe= '1';
//     }
//     else if(beatipe==='Private'){
//       beatipe= '2';
//     }

//     try{
//       console.log(beajenis);
//       console.log(beatipe);
//       console.log(e.target.elements.bea_jenis_syarat.value);
//       const token = Cookies.get('myToken');
//       const response = await axios.post('http://localhost:5000/master/jenis-beasiswa/insert', {
//           kode_jenis: e.target.elements.bea_jenis_kode.value,
//           nama_jenis: e.target.elements.bea_jenis_nama.value,
//           syarat_jenis: jenisSyarat.join(','),
//           jum_spp_jenis: e.target.elements.bea_jenis_jumlah_spp.value,
//           jum_sks_jenis: e.target.elements.bea_jenis_jumlah_sks.value,
//           tipe_jenis: beatipe
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/x-www-form-urlencoded'
//         }
//       })
//       console.log(response.data);
//       navigate("/master/jenis-beasiswa");
//     } catch (error){
//       console.error(error);
//     }
//   };

  const getUserData = async() => {
    // const response = await axios.get('192.168.100.14:5000/master-jenis-beasiswa');
    // setbeapengumuman(response.beapengumuman);
    // console.log(response.beapengumuman);
    console.log("sukses masuk");
    const token = Cookies.get('myToken');
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/login/userdata`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response =>{
        setUserData(response.data[0]);
        console.log("Success fetch data!");
    })
    .catch(error => {
        navigate('/404');
        console.error('Error fetching data: ',error);
    });
  }

  const getBeaPengumuman = async() => {
    console.log("sukses masuk");
    const token = Cookies.get('myToken');
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/master/genpengumuman/${periodeKode}/${beasiswaKode}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response =>{
        // console.log(JSON.stringify(response.data));
        setBeaPengumuman(response.data[0]);
        console.log("Success fetch data!");
    })
    .catch(error => {
        navigate("/404");
        console.error('Error fetching data: ',error);
    });
    
  }

  

  useEffect(()=>{
      getBeaPengumuman();
  },[]);

  console.log(beapengumuman);
  // // const applybea = beapengumuman && beapengumuman.beaapply;
  // console.log(beapengumuman.beaapply);

  // const totalPages = Math.ceil((beapengumuman.beaapply).length / PAGE_SIZE);
  // const startIndex = (currentPage - 1) * PAGE_SIZE;
  // const endIndex = startIndex + PAGE_SIZE;

  // const currentItems = (beapengumuman.beaapply).slice(startIndex, endIndex);

  // const handleNextPage = () => {
  //   setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  // };

  // const handlePrevPage = () => {
  //   setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  // };

//   const tipejenis = [
//     "Public/Umum",
//     "Private"
//   ];

  return (
      <>
        <Helmet>
            <title> Beasiswa ISTTS </title>
        </Helmet>
        {/* <Container maxWidth="xl">
            <Typography variant="h4" sx={{ mb: 5 }}>
            Insert Jenis Beasiswa
            </Typography>
        </Container> */}
      <Paper elevation={3} sx={{ marginRight: "15%", marginLeft: "15%", width: '210mm', height: '297mm'}}>
        <div name="header" style={{ width: "100%", height: "15%", margin: "auto" }}>
            <img src={header} alt="header" />
        </div>
        <div name="isi" style={{ width: "100%", height: "80%", margin: "auto" }}>
            <div style={{ textAlign: "center", fontSize: '1.5em'}}>
              <h1>PENGUMUMAN</h1>
            {/* {(() => {
                if(beapengumuman && beapengumuman.keu_bea_jeni && beapengumuman.keu_bea_jeni.bea_jenis_role === 1){
                    return(
                        <h1>PENGUMUMAN</h1>
                    )
                }
                return(
                    <h1>SURAT KEPUTUSAN</h1>
                )
            })} */}
                
            </div>
            <div style={{ textAlign: "left", height: "75%", overflow: "auto", marginLeft: "8%", marginRight: "8%" }}>
                <h4>Berikut adalah daftar mahasiswa yang diterima dalam beasiswa dengan jenis {beapengumuman && beapengumuman.keu_bea_jeni && beapengumuman.keu_bea_jeni.bea_jenis_nama} pada periode {beapengumuman && beapengumuman.aka_periode && beapengumuman.aka_periode.periode_nama} {beapengumuman &&  beapengumuman.aka_periode && beapengumuman.aka_periode.periode_akademik}</h4>
                <table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse", border: "1px solid black" }}>
                  <thead>
                    <tr>
                      <th style={{ border: "1px solid black", textAlign: "center", width: "100px" }}>NRP</th>
                      <th style={{ border: "1px solid black", textAlign: "center" }}>Nama Mahasiswa</th>
                      {/* <th style={{ border: "1px solid black" }}>Jurusan</th> */}
                      <th style={{ border: "1px solid black", textAlign: "center" }}>IPK</th>
                      {/* Add more headers as needed */}
                    </tr>
                  </thead>
                  <tbody>
                    {beapengumuman &&
                      beapengumuman.beaapply &&
                      beapengumuman.beaapply.reduce((acc, item) => {
                        const jurNama = item.mahasiswa && item.mahasiswa.aka_jurusan && item.mahasiswa.aka_jurusan.jur_nama;

                        // Check if there's an existing group with the same jur_nama
                        const existingGroup = acc.find((group) => group.jurNama === jurNama);

                        if (existingGroup) {
                          existingGroup.items.push(item);
                        } else {
                          acc.push({ jurNama, items: [item] });
                        }

                        return acc;
                      }, []).map((group, index) => (
                        <React.Fragment key={index}>
                          <tr>
                            <td colSpan="4" align="center" style={{ border: "1px solid black", fontWeight: "bold" }}>{group.jurNama}</td>
                          </tr>
                          {group.items.map((subItem) => (
                            <tr key={subItem.mhs_nrp}>
                              <td style={{ border: "1px solid black", textAlign: "center" }}>{subItem.mhs_nrp}</td>
                              <td style={{ border: "1px solid black" }}>{subItem.mahasiswa && subItem.mahasiswa.mhs_nama}</td>
                              {/* <td style={{ border: "1px solid black" }}>{subItem.mahasiswa && subItem.mahasiswa.aka_jurusan && subItem.mahasiswa.aka_jurusan.jur_nama}</td> */}
                              <td style={{ border: "1px solid black", textAlign: "center" }}>{subItem.bea_apply_ipk}</td>
                              {/* Add more data cells as needed */}
                            </tr>
                          ))}
                        </React.Fragment>
                      ))}
                  </tbody>
                </table>
            </div>
        </div>
        <div name="footer" style={{ width: "100%", height: "15%", margin: "auto" }}>
            <img src={footer} alt="footer" />
        </div>
      </Paper>
      </>
  )
}
