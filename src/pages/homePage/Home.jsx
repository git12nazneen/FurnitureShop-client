import React, { useContext, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Banner from '../../components/Banner';
import { AppContext } from '../../hooks/AppContext';

const Home = () => {
    const { sideCollaps } = useContext(AppContext);
    const [selectedCategory, setSelectedCategory] = useState("");

    return (
        <div className='flex'>
            <Sidebar setCategory={setSelectedCategory} sideCollaps={sideCollaps} />
            <Banner selectedCategory={selectedCategory} />
        </div>
    );
};

export default Home;
