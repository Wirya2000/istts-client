import * as React from 'react';
import Cookies from 'js-cookie';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import JsPDF from 'jspdf';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
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
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import tokenValidator from '../utils/tokenValidator';

import footer from '../assets/footerPengumuman.PNG'
import header from '../assets/headerPengumuman.PNG'

const schema = joi.object({
  username: joi.string().min(4).message("4").max(6).message("6").required()
});

const jenisSyarat = [];

const PAGE_SIZE = 10; // Set the number of items per page

export default function GenerateSKPmb() {
  // const { idPengumuman } = useParams();
  const { periodeKode, beasiswaKode } = useParams();
  const [tipe, setTipe] = React.useState("");
  const [checkedItems, setCheckedItems] = useState([]);
  const [userData, setUserData] = useState([]);
  const [beapengumuman, setBeaPengumuman] = useState([]);
  const [skpmb, setSkpmb] = useState([]);
  const [mhsskpmb, setMhsSkpmb] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const pdfExportComponent = useRef(null);
  const contentArea = useRef(null);

//   const [beajenis, setBeaJenis] = useState({
//       bea_jenis_kode: "",
//       bea_jenis_nama: "",
//       bea_jenis_syarat: "",
//       bea_jenis_jumlah_spp: "",
//       bea_jenis_jumlah_sks: "",
//       bea_jenis_tipe: ""
//   });
  const navigate = useNavigate();

  // console.log(mhsNrp);
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

  const getSkPmb = async() => {
    console.log("sukses masuk");
    const token = Cookies.get('myToken');
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/master/genskpmb/${periodeKode}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response =>{
        // console.log(JSON.stringify(response.data));
        setMhsSkpmb(response.data);
        setSkpmb(response.data[0]);
        console.log("Success fetch data!");
    })
    .catch(error => {
        navigate("/404");
        console.error('Error fetching data: ',error);
    });
    
  }


  

  useEffect(()=>{
      getSkPmb();
  },[]);

  console.log(skpmb);
  console.log(mhsskpmb);
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
const pdfRef = useRef();
const exportToPDF = () => {
  // const doc = new JsPDF({
  //   orientation: 'portrait', // or 'landscape'
  //   unit: 'mm', // or 'in', 'cm', 'pt'
  //   format: [210, 297], // A4 paper size in mm (210x297)
  // });
  // doc.html(document.getElementById('content'), {
  //   callback: () => {
  //     window.open(doc.output('bloburl'));
  //     // doc.save(`SK_Perpanjangan_${periodeKode}.pdf`);
  //     // setMode("html");
  //   },
  //   x: -63,
  //   y: 0,
  //   width: 800,
  //   windowWidth: 800,
  //   html2canvas:{scale:0.266}
  // });
  // const printContents = document.getElementById('content').innerHTML;
  // const originalContents = document.body.innerHTML;
  // document.body.innerHTML = printContents;
  // window.print();
  // document.body.innerHTML = originalContents; 

  // pdfExportComponent.current.save(`SK_Perpanjangan_${periodeKode}.pdf`);

  const input = pdfRef.current;
  console.log(input);
  html2canvas(input).then((canvas) => {
    // const imgData = canvas.toDataURL('image/png');
    // console.log(imgData);
    const pdf = new JsPDF('p', 'mm', 'a4', true);
    // const pdfWidth = pdf.internal.pageSize.getWidth();
    // console.log(pdfWidth);
    // const pdfHeight = pdf.internal.pageSize.getHeight();
    // console.log(pdfHeight);
    // const imgWidth = canvas.width;
    // console.log(imgWidth);
    // const imgHeight = canvas.height;
    // console.log(imgHeight);
    // const ratio = Math.max(pdfWidth/imgWidth, pdfHeight/imgHeight);
    // console.log(ratio);
    // const imgX = (pdfWidth-imgWidth*ratio)/2;
    // const imgY = 0;
    // pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth*ratio, imgHeight*ratio);

    pdf.save(`SK_Perpanjangan_${periodeKode}.pdf`);
  })
};


  return (
      <>
        <Helmet>
            <title> Beasiswa ISTTS </title>
        </Helmet>
        {/* <Container maxWidth="xl">

          <Button align="center" variant="contained" startIcon={<FileDownloadIcon />} onClick={exportToPDF} sx={{ mb: 2 }}>
              Export to PDF
          </Button>
        </Container> */}
        {/* <PDFExport ref={pdfExportComponent} paperSize="A4"> */}
      <Paper elevation={3} sx={{ marginRight: "15%", marginLeft: "15%", width: '210mm', height: '297mm'}}>
      <div ref={pdfRef}>
        <div name="header" style={{ width: "100%", height: "44.55mm", margin: "auto" }}>
            <img src={header} alt="header" />
        </div>
        <div name="isi" style={{ width: "100%", height: "231.45mm", margin: "auto" }}>
            <div style={{ textAlign: "center", fontSize: '18px'}}>
              <h2>
                <u>SURAT KEPUTUSAN</u>
              </h2>
            </div>
            <div style={{ textAlign: "center", fontSize: '14px', marginTop: '-3%', lineHeight: '1.15'}}>
              No. {skpmb.beasiswa_sk}<br/><br/>
              TENTANG<br/>
              <b>PERPANJANGAN BEASISWA BANTUAN STUDI PMB ISTTS</b><br/>
              <b>SEMESTER {skpmb && skpmb.aka_periode && skpmb.aka_periode.periode_nama} {skpmb && skpmb.aka_periode && skpmb.aka_periode.periode_akademik}</b><br/><br/><br/>
            </div>
            <div style={{ textAlign: "justify", overflow: "auto", marginLeft: "11%", marginRight: "11%", fontSize: '14px', lineHeight: '1.15' }}>
              Institus Sains dan Teknologi Terpadu Surabaya, <br/><br/>
              Menimbang/
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;: Bahwa pemberian beasiswa bantuan studi untuk mahasiswa aktif masih<br/>
              Mengingat
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;diperlukan.<br/><br/>
              Memperhatikan
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: 1. &nbsp;Statuta Institut Sains dan Teknologi Terpadu Surabaya.<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. Saran Wakil Rektor di lingkungan Institus Sains dan Teknologi Terpadu<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;Surabaya.<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3. Hasil prestasi studi mahasiswa yang tercantum pada lampiran Surat<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;Keputusan ini yang dinilai memenuhi kriteria pemberian perpanjangan<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;beasiswa bantuan studi pada semester {skpmb && skpmb.aka_periode && skpmb.aka_periode.periode_nama} {skpmb && skpmb.aka_periode && skpmb.aka_periode.periode_akademik}.<br/><br/>
            </div>
            <div style={{ textAlign: "center", fontSize: '18px', marginTop: "-1%"}}>
              <b>MEMUTUSKAN</b><br/><br/>
            </div>
            <div style={{ textAlign: "justify", overflow: "auto", marginLeft: "11%", marginRight: "11%", fontSize: '14px', marginTop: "-2%", lineHeight: '1.15' }}>
              Menetapkan
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;: 1. &nbsp;Pemberian beasiswa bantuan studi kepada mahasiswa yang tercantum<br/> 
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;pada lampiran surat keputusan ini.<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. Pemberian beasiswa bantuan studi ini berupa pembebasan biaya SKS<br/> 
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;sebanyak 6 SKS atau 10 SKS pada semester {skpmb && skpmb.aka_periode && skpmb.aka_periode.periode_nama} {skpmb && skpmb.aka_periode && skpmb.aka_periode.periode_akademik}.<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3. Keputusan ini berlaku sejak tanggal ditetapkan dengan ketentuan akan<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;diperbaiki sebagaiman mestinya apabila terdapat kekeliruan dalam<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;penetapannya.<br/><br/><br/><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ditetapkan di
              &nbsp;&nbsp;: Surabaya<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Pada Tanggal : <br/><br/><br/><br/><br/><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b><u>Ir. Arya Tandy Hermawan, M.T.</u></b><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Rektor<br/><br/><br/><br/><br/>
              Tembusan :<br/>
              1. Yth. Ketua YPPT Nusantara<br/>
              2. Yth. Wakil Rektor I, II, III<br/>
              3. Yth. Kepala BAU<br/>
              4. Arsip


            </div>
        </div>
        
        <div name="footer" style={{ width: "100%", height: "29.7mm", margin: "auto" }}>
            <img src={footer} alt="footer" />
        </div>
      {/* </Paper> */}

      {/* <Paper elevation={3} sx={{ marginRight: "15%", marginLeft: "15%", width: '210mm', height: '297mm'}}> */}
        <div name="header" style={{ width: "100%", height: "44.55mm", margin: "auto" }}>
            <img src={header} alt="header" />
        </div>
        <div name="isi" style={{ width: "100%", height: "231.45mm", margin: "auto" }}>
            <div style={{ textAlign: "left", fontSize: '14px', marginLeft: '11%', marginTop: '-2%', lineHeight: '1.15'}}>
              {/* <h2>
                <u>SURAT KEPUTUSAN</u>
              </h2> */}
              Lampiran Surat Keputusan No. {skpmb.beasiswa_sk}<br/><br/><br/><br/>
            </div>
            <div style={{ textAlign: "center", fontSize: '14px', marginTop: '-1%', lineHeight: '1.15'}}>
              {/* No. {skpmb.beasiswa_sk}<br/><br/>
              TENTANG<br/> */}
              <b>Nama Mahasiswa Penerima Beasiswa Perpanjangan</b><br/>
              <b>Bantuan Studi PMB ISTTS Semester {skpmb && skpmb.aka_periode && skpmb.aka_periode.periode_nama} {skpmb && skpmb.aka_periode && skpmb.aka_periode.periode_akademik}</b><br/><br/>
            </div>
            <div style={{ textAlign: "justify", overflow: "auto", marginLeft: "11%", marginRight: "11%", fontSize: '14px', lineHeight: '1.15' }}>
              <table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse", border: "1px solid black" }}>
                <thead>
                  <tr>
                    <th style={{ border: "1px solid black", textAlign: "center", width: "100px" }}>NRP</th>
                    <th style={{ border: "1px solid black", textAlign: "center", width: "270px" }}>Nama</th>
                    <th style={{ border: "1px solid black", textAlign: "center" }}>Program Studi</th>
                    <th style={{ border: "1px solid black", textAlign: "center" }}>IPK</th>
                    <th style={{ border: "1px solid black", textAlign: "center", width: "50px" }}>Beasiswa SKS</th>
                    {/* Add more headers as needed */}
                  </tr>
                </thead>
                <tbody>
                  {mhsskpmb && mhsskpmb.map((item) => (
                    item.bea_jenis_kode === "PMB10" ? (
                      item.beaapply && item.beaapply.map((beaapplyItem) => (
                        <tr key={beaapplyItem.mhs_nrp}>
                          <td style={{ border: "1px solid black", textAlign: "center" }}>{beaapplyItem.mhs_nrp}</td>
                          <td style={{ border: "1px solid black" }}>{beaapplyItem.mahasiswa && beaapplyItem.mahasiswa.mhs_nama}</td>
                          <td style={{ border: "1px solid black" }}>{beaapplyItem.mahasiswa && beaapplyItem.mahasiswa.aka_jurusan && beaapplyItem.mahasiswa.aka_jurusan.jur_singkat}</td>
                          <td style={{ border: "1px solid black", textAlign: "center" }}>{beaapplyItem.mahasiswa && beaapplyItem.mahasiswa.mhs_ipk}</td>
                          <td style={{ border: "1px solid black", textAlign: "center" }}>10</td>
                          {/* Add more data cells as needed */}
                        </tr>
                      ))
                    ) : (
                      item.beaapply && item.beaapply.map((beaapplyItem) => (
                        <tr key={beaapplyItem.mhs_nrp}>
                          <td style={{ border: "1px solid black", textAlign: "center" }}>{beaapplyItem.mhs_nrp}</td>
                          <td style={{ border: "1px solid black" }}>{beaapplyItem.mahasiswa && beaapplyItem.mahasiswa.mhs_nama}</td>
                          <td style={{ border: "1px solid black" }}>{beaapplyItem.mahasiswa && beaapplyItem.mahasiswa.aka_jurusan && beaapplyItem.mahasiswa.aka_jurusan.jur_singkat}</td>
                          <td style={{ border: "1px solid black", textAlign: "center" }}>{beaapplyItem.mahasiswa && beaapplyItem.mahasiswa.mhs_ipk}</td>
                          <td style={{ border: "1px solid black", textAlign: "center" }}>6</td>
                          {/* Add more data cells as needed */}
                        </tr>
                      ))
                    )
                  ))}
                </tbody>
              </table>
            </div>
            <br/><br/><br/>
            <div style={{ textAlign: "justify", overflow: "auto", marginLeft: "11%", marginRight: "11%", fontSize: '14px', marginTop: "-2%", lineHeight: '1.15' }}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Surabaya, <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Institut Sains dan Teknologi Terpadu Surabaya<br/><br/><br/><br/><br/><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b><u>Ir. Arya Tandy Hermawan, M.T.</u></b><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Rektor<br/>


            </div>
        </div>
        
        <div name="footer" style={{ width: "100%", height: "29.7mm", margin: "auto" }}>
            <img src={footer} alt="footer" />
        </div>
      </div>
    </Paper>
        {/* </PDFExport> */}
      

      
      
      
      </>
  )
}
