import axios from 'axios';


const axiosPublic = axios.create({
    baseURL: 'https://server-zeta-nine-87.vercel.app'
})


const UseAxiosPublic = () => {
    return axiosPublic;
};

export default UseAxiosPublic;