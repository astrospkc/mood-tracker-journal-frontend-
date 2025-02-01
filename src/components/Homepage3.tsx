
import React from 'react'
import { BsFillMoonStarsFill } from "react-icons/bs";
import "./styles.css"
import Siderbar from './Siderbar';
import { Link } from 'react-router-dom'

import Page2 from './Page2';
import Footer from './Footer';
import Page1 from './Page1';

const Homepage3 = () => {
    return (
        <>
            <div className='flex flex-col h-screen'>
                {/* Main Content Area */}
                <Page1 />
                {/* <Page2 /> */}

                {/* Footer */}
                <footer className='w-full  text-white pt-4 mt-auto'>
                    {/* Replace with your Footer component */}
                    <Footer />
                </footer>
            </div>



        </>

    )
}

export default Homepage3



