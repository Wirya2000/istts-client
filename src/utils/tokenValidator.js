import { Cookie } from '@mui/icons-material';

import Cookies from 'js-cookie';
import axios from 'axios';

const jwtDecode = require('jwt-decode');

// import {BACKEND_URL} from '@env';

export const tokenValidator = async () => {
    let token ='';
    const getToken = async () => {
        
        try {
            token = await Cookies.get('myToken');
        } catch (error) {
            console.error('Error checking authentication:', error);
        }
    };
    getToken();
    console.log(token);

    const isTokenExpired = tempToken  => {
        if (!tempToken) {
            return true;
        }
        try {
            const decodedToken = jwtDecode(tempToken);
            const currentTime = Math.floor(Date.now() / 1000);
            return decodedToken.exp < currentTime;
        } catch (error) {
        console.error('Error decoding token:', error);
            return true;
        }
    };
    if (isTokenExpired(token)) {
        const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/refreshToken`;
        axios.post(apiUrl).then(response => {
            if (response.status === 201) {
                token = response.data.token;
                saveToken();
            } 
            // if (response.status === 403 || response.status === 500) {
            //     // return null;
            //     token = null
            // }
            // return token
        }).catch((error) => {
            return null;
        });
    } else {
        saveToken();
    }
    
    // Add a return statement here
    return null;


    async function saveToken(){
        try {
            Cookies.set('myToken', token);
            console.log(`Token: ${token}`);
            console.log('Token saved successfully.');
        } catch (error) {
            console.error('Error saving token: ', error);
        }
    }
};