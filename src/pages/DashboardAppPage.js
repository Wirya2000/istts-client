import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

import tokenValidator from '../utils/tokenValidator';



// ----------------------------------------------------------------------



export default function DashboardAppPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [beaapply, setBeaapply] = useState([]);
  const [beaapplyjenis, setBeaapplyJenis] = useState([]);
  const [beasiswa, setBeasiswa] = useState([]);
  const [beajenis, setBeajenis] = useState([]);
  const [beanominal, setBeanominal] = useState([]);
  const [jurusan, setJurusan] = useState([]);
  const [periode, setPeriode] = useState([]);
  const [periodeKode, setPeriodeKode] = useState([]);
  const [jenisKode, setJenisKode] = useState([]);
  const [jumbeaapply, setJumBeaapply] = useState([]);
  const [jumdata, setJumdata] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [jumaccbeajenis, setJumAccBeajenis] = useState([]);
  const [jumwaitbeajenis, setJumWaitBeajenis] = useState([]);
  const [jumtolakbeajenis, setJumTolakBeajenis] = useState([]);
  const [jumdaftarbeajenis, setJumDaftarBeajenis] = useState([]);
  const [jumdatanom, setJumdatanom] = useState([]);
  

  const handlePeriodeChange = async e => {
    e.preventDefault();
    const kode = e.target.value;
    console.log(kode);
    // setPeriodeKode(e.target.value);
    setPeriodeKode(kode);
    console.log(periodeKode);
    await getJumBeaapply(kode);
    await getBeaapply(kode);
    await getJumBeaapplyjenis(jenisKode, kode);
      // console.log('masuk onChange');
  };

  const handleBeajenisChange = async e => {
    e.preventDefault();
    const kode = e.target.value;
    console.log(kode);
    const period = periodeKode;
    console.log(period);
    setJenisKode(kode);
    console.log(jenisKode);
    await getJumBeaapplyjenis(kode, period);
      // console.log('masuk onChange');
  };

  const getPeriode = async() => {
    // const response = await axios.get('192.168.100.14:5000/master-jenis-beasiswa');
    // setBeaJenis(response.beajenis);
    console.log("sukses masuk");
    const token = Cookies.get('myToken');
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/master/periode`,
    {
        headers: {
        Authorization: `Bearer ${token}`,
        }
    })
    .then(response =>{
        setPeriode(response.data);
        console.log("Success fetch data!");
    })
    .catch(error => {
        // navigate('/404');
        console.error('Error fetching data: ',error);
    });
  }

  const getBeaapply = async(kode) => {
    // const response = await axios.get('192.168.100.14:5000/master-jenis-beasiswa');
    // setBeaJenis(response.beajenis);
    // console.log(response.beajenis);
    console.log("sukses masuk");
    const token = Cookies.get('myToken');
    console.log(token);
    console.log(`${process.env.REACT_APP_BACKEND_URL}/beaapply/acc/${kode}`)
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/beaapply/acc/${kode}`, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response =>{
        setBeaapply(response.data);
        console.log("Success fetch data!");
    })
    .catch(error => {
        // navigate('/404');
        console.error('Error fetching data: ',error);
    });
  }

  const getJumBeaapply = async(kode) => {
    // const response = await axios.get('192.168.100.14:5000/master-jenis-beasiswa');
    // setBeaJenis(response.beajenis);
    // console.log(response.beajenis);
    console.log("sukses masuk");
    const token = Cookies.get('myToken');
    console.log(token);
    console.log(`${process.env.REACT_APP_BACKEND_URL}/beaapply/jum/${kode}`)
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/beaapply/jum/${kode}`, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response =>{
        setJumBeaapply(response.data);
        console.log("Success fetch data!");
    })
    .catch(error => {
        // navigate('/404');
        console.error('Error fetching data: ',error);
    });
  }

  const getJumBeaapplyjenis = async(kode, period) => {
    // const response = await axios.get('192.168.100.14:5000/master-jenis-beasiswa');
    // setBeaJenis(response.beajenis);
    // console.log(response.beajenis);
    console.log("sukses masuk");
    const token = Cookies.get('myToken');
    console.log(token);
    console.log(`${process.env.REACT_APP_BACKEND_URL}/beaapply/jum/beajenis/${kode}/${period}`)
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/beaapply/jum/beajenis/${kode}/${period}`, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response =>{
        setBeaapplyJenis(response.data);
        console.log("Success fetch data!");
    })
    .catch(error => {
        // navigate('/404');
        console.error('Error fetching data: ',error);
    });
  }

  const getJurusan = async(kode) => {
    console.log("sukses masuk");
    const token = Cookies.get('myToken');
    console.log(token);
    console.log(`${process.env.REACT_APP_BACKEND_URL}/master/jurusan`)
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/master/jurusan`, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response =>{
        setJurusan(response.data);
        console.log("Success fetch data!");
    })
    .catch(error => {
        // navigate('/404');
        console.error('Error fetching data: ',error);
    });
  }

  const getBeasiswa = async(kode) => {
    console.log("sukses masuk");
    const token = Cookies.get('myToken');
    console.log(token);
    console.log(`${process.env.REACT_APP_BACKEND_URL}/master/beasiswa/periode/admin//${kode}`)
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/master/beasiswa/periode/admin//${kode}`, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response =>{
        setBeasiswa(response.data);
        console.log("Success fetch data!");
    })
    .catch(error => {
        // navigate('/404');
        console.error('Error fetching data: ',error);
    });
  }

  const getBeajenis = async(kode) => {
    console.log("sukses masuk");
    const token = Cookies.get('myToken');
    console.log(token);
    console.log(`${process.env.REACT_APP_BACKEND_URL}/master/jenis-beasiswa`)
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/master/jenis-beasiswa`, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response =>{
        setBeajenis(response.data);
        console.log("Success fetch data!");
    })
    .catch(error => {
        // navigate('/404');
        console.error('Error fetching data: ',error);
    });
  }

  const getBeanominal = async(kode) => {
    console.log("sukses masuk");
    const token = Cookies.get('myToken');
    console.log(token);
    console.log(`${process.env.REACT_APP_BACKEND_URL}/master/nominal/admin`)
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/master/nominal/admin`, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response =>{
        setBeanominal(response.data);
        console.log("Success fetch data!");
    })
    .catch(error => {
        // navigate('/404');
        console.error('Error fetching data: ',error);
    });
  }

  

  useEffect(()=>{
    getPeriode();
    getBeajenis();
    getBeanominal();
    // getBeaapply();
    getJurusan();
  //   getData();
    
  },[]);



  useEffect(()=>{
    console.log(beajenis);
    console.log(beaapply);
    // const updatedJumdata = [];
    const beajenisnom = [];
    for (let i = 0; i < beajenis.length; i += 1) {
      let jumnom = 0;
      for(let j = 0; j < beaapply.length; j += 1) {
        if(beajenis[i].bea_jenis_kode === beaapply[j].bea_jenis_kode){
          jumnom += (parseInt(beaapply[j].bea_apply_spp, 10)*parseInt(beaapply[j].nom_spp, 10)+parseInt(beaapply[j].bea_apply_sks, 10)*parseInt(beaapply[j].nom_sks, 10))
          // jumnom += parseInt(beaapply[j].nom_spp,10);
        }
      }
      beajenisnom.push({ label: beajenis[i].bea_jenis_nama, value: jumnom});
    }
    // await 
    setJumdatanom(beajenisnom);
  },[beajenis, beaapply]);
  console.log(jumdatanom);

  useEffect(() => {
    const fetchData = async () => {
      const hasil = Object.entries(jumbeaapply.reduce((acc, curr) => {
        curr.beaapply.forEach((apply) => {
            const key = `${curr.keu_bea_jeni.bea_jenis_nama}, ${apply.mahasiswa.aka_jurusan.jur_singkat}`;
            acc[key] = (acc[key] || 0) + 1;
        });
        return acc;
      }, {})).map(([key, value]) => {
        const [jenis, jur] = key.split(', ');
        return { jenis, jur, value };
      });
  
      function processData(data) {
        const hasilLabel = [];
        const hasilData = [];
  
        data.forEach(item => {
          const dataIndex = hasilData.findIndex(i => i.name === item.jur);
  
          if (dataIndex === -1) {
            hasilData.push({ name: item.jur, type: 'column', fill: 'solid', data: { [item.jenis]: item.value } });
          } else{
            if (!hasilData[dataIndex].data[item.jenis]) {
              hasilData[dataIndex].data[item.jenis] = item.value;
            } 
            // else {
              hasilData[dataIndex].data[item.jenis] += item.value;
              // console.log(hasilData);
            // }
          }
  
          if (!hasilLabel.includes(item.jenis)) {
            hasilLabel.push(item.jenis);
          }
        });
  
        hasilData.forEach(item => {
          const dataValues = hasilLabel.map(jenis => item.data[jenis] || 0);
          item.data = dataValues;
        });
  
        return { hasilLabel, hasilData };
      }
  
      const hasilAkhir = processData(hasil);
      console.log(hasilAkhir);
      await setJumdata(hasilAkhir);
    };
  
    fetchData();
  }, [jumbeaapply]);

  // useEffect(()=>{
  //   console.log(jumbeaapply);
  //   const updatedJumdata = [];

  //   for (let i = 0; i < jurusan.length; i += 1) {
  //     let jumjur = 0;
  //     for (let j = 0; j < jumbeaapply.length; j += 1){
  //       const mhsbeaapply = jumbeaapply[j].beaapply;
  //       for (let k = 0; k < mhsbeaapply.length; k += 1) {
  //         if(jurusan[i].jur_kode === mhsbeaapply[k].mahasiswa.jur_kode){
  //           jumjur += 1;
  //         }
  //       }
  //     }
  //     updatedJumdata.push({ kode: jumbeaapply[i].keu_bea_jeni.bea_jenis_nama, jum: jumbeaapply[i].beaapply.length });
  //   }
  //   setJumdata(updatedJumdata);
  // },[jumbeaapply]);

  useEffect(()=>{
    console.log(beaapplyjenis);
    let updatedJumAcc = 0;
    let updatedJumWait = 0;
    let updatedJumTolak = 0;
    let updatedJumDaftar = 0;
    for (let i = 0; i < beaapplyjenis.length; i += 1) {
      if(beaapplyjenis[i].bea_apply_status === 0){
        updatedJumDaftar += 1
      }
      else if(beaapplyjenis[i].bea_apply_status === 1){
        updatedJumWait += 1
      }
      else if(beaapplyjenis[i].bea_apply_status === 2){
        updatedJumAcc += 1
      }
      else if(beaapplyjenis[i].bea_apply_status === 3){
        updatedJumTolak += 1
      }
      
    }
    setJumAccBeajenis(updatedJumAcc);
    setJumWaitBeajenis(updatedJumWait);
    setJumTolakBeajenis(updatedJumTolak);
    setJumDaftarBeajenis(updatedJumDaftar);
  },[beaapplyjenis]);

  // const handleChartData = (beaapply) => {
  //   const chartData = beaapply.reduce((acc, item) => {
  //     const jurSingkat = item.mahasiswa.aka_jurusan.jur_singkat;
  //     if (!acc[jurSingkat]) {
  //       acc[jurSingkat] = [];
  //     }
  //     acc[jurSingkat].push(item);
  //     return acc;
  //   }, {});
  //   return Object.entries(chartData).map(([jurSingkat, items]) => ({
  //     name: jurSingkat,
  //     type: 'column',
  //     fill: 'solid',
  //     data: items.map(item => item.beaapply.length),
  //   }));
  // };

  console.log(jumdata);
  
  return (
    <>
      <Helmet>
        <title> Beasiswa ISTTS</title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          {/* <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Weekly Sales" total={714000} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="New Users" total={1352831} color="info" icon={'ant-design:apple-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Item Orders" total={1723315} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Bug Reports" total={234} color="error" icon={'ant-design:bug-filled'} />
          </Grid> */}

          <Grid item xs={12} md={6} lg={12}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Periode</InputLabel>
              <Select
                required
                id="periode_kode"
                name="periode_kode"
                // value={periode.periode_kode}
                onChange={handlePeriodeChange}
                label="Periode"
                // onChange={handleChange}
              >
                {periode.map((item) => (
                  <MenuItem value={item.periode_kode}>{item.periode_nama} {item.periode_akademik}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <AppWebsiteVisits
              title="Penerima Beasiswa"
              // subheader="(+43%) than last year"

              // chartLabels={
              //   // beajenis.map(item => item.bea_jenis_nama)
              //   // jumdata.hasilLabel

              //   jumdata && jumdata.hasilLabel && jumdata.hasilLabel.map(item => item)
              //   // [
              //   // '01/01/2003',
              //   // '02/01/2003',
              //   // '03/01/2003',
              //   // '04/01/2003',
              //   // '05/01/2003',
              //   // '06/01/2003',
              //   // '07/01/2003',
              //   // '08/01/2003',
              //   // '09/01/2003',
              //   // '10/01/2003',
              //   // '11/01/2003',
              //   // ]
              //   // jumdata.kode
              //   // Object.keys(chartData)
              // }
              // chartData={
              //   // handleChartData(beaapply)
              //   // [
              //   // {
              //   //   name: 'S1 Inf',
              //   //   type: 'column',
              //   //   fill: 'solid',
              //   //   data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
              //   //   // data: jumdata.map(item => item.jum)
              //   // },
              // //   // {
              // //   //   name: 'Team B',
              // //   //   type: 'column',
              // //   //   fill: 'gradient',
              // //   //   data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
              // //   // },
              // //   // {
              // //   //   name: 'Team C',
              // //   //   type: 'column',
              // //   //   fill: 'solid',
              // //   //   data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
              // //   // },
              // // ]
              // jumdata && jumdata.hasilData && jumdata.hasilData.map(item => item)
              // }

              chartLabels={
                jumdata && jumdata.hasilLabel ? jumdata.hasilLabel.map(item => item) : []
              }
              chartData={
                jumdata && jumdata.hasilData ? jumdata.hasilData.map(item => item) : []
              }
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Jenis Beasiswa</InputLabel>
              <Select
                required
                id="bea_jenis_kode"
                name="bea_jenis_kode"
                // value={periode.periode_kode}
                onChange={handleBeajenisChange}
                label="Jenis Beasiswa"
                // onChange={handleChange}
              >
                {beajenis.map((item) => (
                  <MenuItem value={item.bea_jenis_kode}>{item.bea_jenis_nama}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <AppCurrentVisits
              title="Pengajuan Beasiswa"
              chartData={[
                { label: 'Diterima', value: jumaccbeajenis },
                { label: 'Ditolak', value: jumtolakbeajenis },
                { label: 'Terdaftar', value: jumdaftarbeajenis },
                { label: 'Waiting', value: jumwaitbeajenis },
                // { label: 'Europe', value: 1443 },
                // { label: 'Africa', value: 4443 },
              ]}
              // chartColors={[
              //   theme.palette.primary.main,
              //   theme.palette.info.main,
              //   theme.palette.warning.main,
              //   theme.palette.error.main,
              // ]}
            />
          </Grid> */}

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Nominal Beasiswa"
              // subheader="(+43%) than last year"
              // chartData=beajenisnom.map(item => ({
              //   label: item.label,
              //   value: item.value
              // }));
              chartData={
               jumdatanom
              }
              // chartData=
              // {
                // [
                // { label: 'Italy', value: 400 },
                // { label: 'Japan', value: 430 },
                // { label: 'China', value: 448 },
                // { label: 'Canada', value: 470 },
                // { label: 'France', value: 540 },
                // { label: 'Germany', value: 580 },
                // { label: 'South Korea', value: 690 },
                // { label: 'Netherlands', value: 1100 },
                // { label: 'United States', value: 1200 },
                // { label: 'United Kingdom', value: 1380 },
                // ]
                // 
                // {(() => {
                //   for (let i = 0; i < beajenis.length; i+=1) {
                //     // const element = array[i];
                //       return(
                //         {
                //           label: beajenis[i].bea_jenis_nama    
                //         }
                //       )
                    
                //   }
                // })()}
              // }
              // chartData={beajenis.map(item => ({
              //   label: item.bea_jenis_nama,
              //   value: item.bea_jenis_jumlah_sks // You need to define how you want to get the value for each item
              // }))}
              
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            {/* <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            /> */}

            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Jenis Beasiswa</InputLabel>
              <Select
                required
                id="bea_jenis_kode"
                name="bea_jenis_kode"
                // value={periode.periode_kode}
                onChange={handleBeajenisChange}
                label="Jenis Beasiswa"
                // onChange={handleChange}
              >
                {beajenis.map((item) => (
                  <MenuItem value={item.bea_jenis_kode}>{item.bea_jenis_nama}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <AppCurrentVisits
              title="Pengajuan Beasiswa"
              chartData={[
                { label: 'Diterima', value: jumaccbeajenis },
                { label: 'Ditolak', value: jumtolakbeajenis },
                { label: 'Terdaftar', value: jumdaftarbeajenis },
                { label: 'Waiting', value: jumwaitbeajenis },
                // { label: 'Europe', value: 1443 },
                // { label: 'Africa', value: 4443 },
              ]}
              // chartColors={[
              //   theme.palette.primary.main,
              //   theme.palette.info.main,
              //   theme.palette.warning.main,
              //   theme.palette.error.main,
              // ]}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}
