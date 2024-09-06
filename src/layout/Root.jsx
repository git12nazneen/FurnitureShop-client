import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../shared/Nav';
import Footer from '../shared/Footer';

const Root = () => {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div>
            <Nav onSearch={setSearchQuery} />
            <Outlet context={[searchQuery]} />
            <Footer />
        </div>
    );
};

export default Root;
