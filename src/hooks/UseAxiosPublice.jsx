import axios from 'axios';


const axiosPublic = axios.create({
    baseURL: 'https://medi-shop-server.vercel.app'
})


const UseAxiosPublic = () => {
    return axiosPublic;
};

export default UseAxiosPublic;