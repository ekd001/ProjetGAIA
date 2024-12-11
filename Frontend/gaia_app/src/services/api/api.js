
import axios from 'axios';

const API_URLs = "http://192.168.137.1:8000/api";

export const fetchInfoSys = async () => {
    try{
        const response = await axios.get(API_URLs+"/SystemInfo/");
        console.log(response);
        return response.data;
    }catch(error){
        console.log("Erreur lors du chargement d'information", error);
        throw error;
    }
};



