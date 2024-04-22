import React from 'react';
import logoImg from '../assets/logo1.png'

import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './Sidebar';

const Header = ({ title, subtitle, name, pageTitle }) => {
    const location = useLocation();

    if (location.pathname === "/" || location.pathname === "/register") {
        return (
            <header>
                <img src={logoImg} alt="logo" />
                <h1>{title}</h1>
                <div className='header-container '>
                    <p>{subtitle}</p>
                    <span>{name}</span>
                </div> 
            
            </header>
        );
    // } else if (location.pathname === "/home") {
    } else {
        const [isSidebarOpen, setIsSidebarOpen] = useState(false);
        const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
        }
        return (
            <>
                <header>
                    <img src={logoImg} alt="logo" />
                    <h1>{title}</h1>
                    <div className='header-container '>
                        <p>{subtitle}</p>
                    </div> 
                </header>
                <div className="nav_bar">
                    <button className="openbtn" onClick={toggleSidebar}>☰</button> 
                    <h2>{pageTitle}</h2>
                    <p>{name}</p>
                    
                </div>
            {isSidebarOpen && < Sidebar class_name={isSidebarOpen ? 'sidebar-open' : ''}></Sidebar>}
            </>
        );
    } 
}


export default Header;
