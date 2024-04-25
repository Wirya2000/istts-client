import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#f8f9fa',
        padding: '20px',
        textAlign: 'center',
        position: 'fixed',
        bottom: 0,
        width: '100%',
      }}
    >
      <Typography variant="body1" color="textSecondary">
        &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
      </Typography>
      <Typography variant="body2" color="textSecondary">
        <Link color="inherit" href="#">
          Privacy Policy
        </Link>{' '}
        |{' '}
        <Link color="inherit" href="#">
          Terms & Conditions
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
