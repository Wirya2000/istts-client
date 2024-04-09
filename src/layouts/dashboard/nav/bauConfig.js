// component
import * as React from 'react';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const bauNavConfig = 
  // if(props.role === "admin"){
  //   return 
    [
      // {
      //   title: 'dashboard',
      //   path: '/dashboard/app',
      //   icon: icon('ic_analytics'),
      // },
    //   {
    //     title: 'beasiswa',
    //     path: '/master/beasiswa',
    //     icon: icon('ic_user'),
    //   },
    //   {
    //     title: 'jenis beaiaswa',
    //     path: '/master/jenis-beasiswa',
    //     icon: icon('ic_user'),
    //   },
      {
        title: 'nominal',
        path: '/master/nominal',
        icon: icon('ic_user'),
      },
    //   {
    //     title: 'syarat',
    //     path: '/master/syarat',
    //     icon: icon('ic_user'),
    //   },
    //   {
    //     title: 'wawancara',
    //     path: '/master/wawancara',
    //     icon: icon('ic_user'),
    //   },
      {
        title: 'rekomendasi mahasiswa',
        path: '/master/rekom',
        icon: icon('ic_user'),
      },
      {
        title: 'pengumuman',
        path: '/master/pengumuman',
        icon: icon('ic_report'),
      },
      {
        title: 'history',
        path: '/master/history/bau',
        icon: icon('ic_report'),
      },
    //   {
    //     title: 'generate SK PMB',
    //     path: '/master/genskpmb',
    //     icon: icon('ic_report'),
    //   },
    //   {
    //     title: 'seleksi',
    //     path: '/master/seleksi',
    //     icon: icon('ic_report'),
    //   },
    //   {
    //     title: 'laporan beasiswa',
    //     path: '/laporan/beasiswa',
    //     icon: icon('ic_report'),
    //   },
    //   {
        
    //     title: 'laporan dana',
    //     path: '/laporan/dana',
    //     icon: icon('ic_report'),
    //   },
    //   {
        
    //     title: 'laporan mahasiswa',
    //     path: '/laporan/beamahasiswa',
    //     icon: icon('ic_report'),
    //   },
      // {
      //   title: 'product',
      //   path: '/dashboard/products',
      //   icon: icon('ic_cart'),
      // },
      // {
      //   title: 'blog',
      //   path: '/dashboard/blog',
      //   icon: icon('ic_blog'),
      // },
      // {
      //   title: 'login',
      //   path: '/login',
      //   icon: icon('ic_lock'),
      // },
      // 
    ];

    

    
    
    
  // } 
  // // else {
  //   // Provide a default return value or an empty array if needed
  //   return [];
  // }



export default bauNavConfig;
