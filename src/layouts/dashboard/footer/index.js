import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#f8f9fa',
        paddingTop: '20px',
        textAlign: 'center',
        position: 'relative',
        bottom: 0,
        width: '100%',
      }}
    >
      <Typography variant="body1" color="textSecondary">
        Jika ada ketidakcocokan data akademik, silahkan menghubungi kantor BAA (U-203).
        Jika ada ketidakcocokan data keuangan, silahkan menghubungi kantor BAA (E-103).
        Jika ada block perwalian karena PMB, silahkan menghubungi kantor PMB (gedung E).
        Jika ada gangguan situs, silahkan menghubungi kantor PMB (E-501).
        Jika anda memiliki saran dan kritik, silahkan menghubungi Staff IT (E-501).
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Jalan Ngagel Jaya Tengah 73 - 77
        Surabaya, Indonesia
        Tel. +62 31 502 7920
        Fax. +62 31 504 1509, +62 31 503 1818
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Hotline Biro Administrasi Umum (BAU) : WA (0895 10100 888)
        Hotline Biro Administrasi Akademik (BAA) : WA (0878 9090 8955)
        Hotline Biro Administrasi Kemahasiswaan (BAK) : WA (081 333 555 070)
        Hotline Penerimaan Mahasiswa Baru (PMB) : Telepon (031 503 1818) / WA (0812 3353 3888)
        <Link color="inherit" href="#">
          Privacy Policy
        </Link>{' '}
        |{' '}
        <Link color="inherit" href="#">
          Terms & Conditions
        </Link>
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {new Date().getFullYear()} &copy; Sistem Informasi Mahasiswa iSTTS
      </Typography>
    </Box>
  );
};

export default Footer;
