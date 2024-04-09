import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import MasterJenisBeasiswa from './pages/MasterJenisBeasiswa';
import MasterBeasiswa from './pages/MasterBeasiswa';
import MasterSyarat from './pages/MasterSyarat';
import MasterNominal from './pages/MasterNominal';
import MasterPengumuman from './pages/MasterPengumuman';
import InsertJenisBeasiswa from './pages/InsertJenisBeasiswa';
import Seleksi from './pages/Seleksi';
import UpdateJenisBeasiswa from './pages/UpdateJenisBeasiswa';
import MasterWawancara from './pages/MasterWawancara';
import InsertSyarat from './pages/InsertSyarat';
import InsertBeasiswa from './pages/InsertBeasiswa';
import InsertNominal from './pages/InsertNominal';
import LaporanBeasiswa from './pages/LaporanBeasiswa';
import LaporanDana from './pages/LaporanDana';
import UpdateNominal from './pages/UpdateNominal';
import UpdateSyarat from './pages/UpdateSyarat';
import DetailSeleksi from './pages/DetailSeleksi';
import MasterBeasiswaMhs from './pages/MasterBeasiswaMhs';
import LaporanBeaMahasiswa from './pages/LaporanBeaMahasiswa';
import LaporanBeaMahasiswaMhs from './pages/LaporanBeaMahasiswaMhs';
import MasterWawancaraMhs from './pages/MasterWawancaraMhs';
import UpdateBeasiswa from './pages/UpdateBeasiswa';
import ApplyBeasiswa from './pages/ApplyBeasiswa';
import RekomMahasiswa from './pages/RekomMahasiswa';
import DetailRekom from './pages/DetailRekom';
// import GeneratePengumuman from './pages/GeneratePengumuman';
import DetailSyaratSeleksi from './pages/DetailSyaratSeleksi';
import SelectPengumuman from './pages/SelectPengumuman';
import GeneratePengumuman from './pages/GeneratePengumuman';
import SelectSKPmb from './pages/SelectSKPmb';
import GenerateSKPmb from './pages/GenerateSKPmb';
import InsertJenisBeasiswaPmb from './pages/InsertJenisBeasiswaPmb';
import MasterPmb from './pages/MasterPmb';
import InsertPmb from './pages/InsertPmb';
import UpdatePmb from './pages/UpdatePmb';
import HistoryBau from './pages/HistoryBau';
import InsertPengumuman from './pages/InsertPengumuman';
import UpdatePengumuman from './pages/UpdatePengumuman';
import DetailPengumuman from './pages/Detail Pengumuman';
import DetailHistorySeleksi from './pages/DetailHistorySeleksi';
import Profile from './pages/Profile';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: 'login',
      element: <LoginPage />, index: true,
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" /> },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    // {
    //   element: <DashboardLayout/>,
    //   children: [
    //     { path: 'master' },
    //     { path: 'seleksi' }
    //   ]
    // },
    {
      path: '/master',
      element: <DashboardLayout/>,
      children: [
        { path: 'jenis-beasiswa', element: <MasterJenisBeasiswa /> },
        { path: 'jenis-beasiswa/insert', element: <InsertJenisBeasiswa/> },
        { path: 'jenis-beasiswa/pmb/insert', element: <InsertJenisBeasiswaPmb/> },
        { path: 'jenis-beasiswa/:beaJenisKode', element: <UpdateJenisBeasiswa/>},
        { path: 'beasiswa', element: <MasterBeasiswa /> },
        { path: 'beasiswa/mhs', element: <MasterBeasiswaMhs /> },
        { path: 'beasiswa/mhs/:beasiswaKode', element: <ApplyBeasiswa /> },
        { path: 'beasiswa/insert', element: <InsertBeasiswa /> },
        { path: 'beasiswa/:beasiswaKode', element: <UpdateBeasiswa /> },
        { path: 'syarat', element: <MasterSyarat /> },
        { path: 'syarat/insert', element: <InsertSyarat /> },
        { path: 'syarat/:beaSyaratId', element: <UpdateSyarat /> },
        { path: 'nominal', element: <MasterNominal /> },
        { path: 'nominal/insert', element: <InsertNominal /> },
        { path: 'nominal/:beaNomKode', element: <UpdateNominal /> },
        { path: 'history/bau', element: <HistoryBau /> },
        { path: 'pmb', element: <MasterPmb />},
        { path: 'pmb/insert', element: <InsertPmb />},
        { path: 'pmb/:kodeBea', element: <UpdatePmb />},
        { path: 'rekom', element: <RekomMahasiswa />},
        { path: 'rekom/:mhsNrp', element: <DetailRekom />},
        { path: 'wawancara', element: <MasterWawancara />},
        { path: 'wawancara/mhs', element: <MasterWawancaraMhs />},
        { path: 'pengumuman', element: <MasterPengumuman />},
        { path: 'pengumuman/insert', element: <InsertPengumuman />},
        { path: 'pengumuman/:kodePengumuman', element: <UpdatePengumuman />},
        { path: 'pengumuman/detail/:kodePengumuman', element: <DetailPengumuman />},
        { path: 'genpengumuman', element: <SelectPengumuman />},
        { path: 'genpengumuman/:periodeKode/:beasiswaKode', element: <GeneratePengumuman />},
        { path: 'genskpmb', element: <SelectSKPmb />},
        { path: 'genskpmb/:periodeKode', element: <GenerateSKPmb />},
        // { path: 'pengumuman/:idPengumuman', element: <GeneratePengumuman />},
        { path: 'seleksi', element: <Seleksi />},
        { path: 'seleksi/:idSeleksi', element: <DetailSeleksi />},
        { path: 'seleksi/:idSeleksi/:mhsNrp', element: <DetailSyaratSeleksi />},
        { path: 'seleksi/history/:mhsNrp', element: <DetailHistorySeleksi />},

      ],
    },
    {
      path: '/laporan',
      element: <DashboardLayout/>,
      children: [
        { path: 'beasiswa', element: <LaporanBeasiswa /> },
        { path: 'dana', element: <LaporanDana /> },
        { path: 'beamahasiswa', element: <LaporanBeaMahasiswa /> },
        { path: 'beamahasiswa/mhs', element: <LaporanBeaMahasiswaMhs /> },
      ],
    },
    {
      path: '/profile',
      element: <DashboardLayout/>,
      children: [
        { path: 'detail', element: <Profile /> },
      ],
    },
    // {
    //   path: 'seleksi',
    //   element: <Seleksi/>
      
    // },
    // {
    //   path: 'master-syarat',
    //   element: <MasterSyarat/>
    // },
    // {
    //   path: 'master-nominal',
    //   element: <MasterNominal/>
    // },
    // {
    //   path: 'master-pengumuman',
    //   element: <MasterPengumuman/>
    // },
    
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
