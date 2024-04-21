import React from 'react';
import { Link } from "react-router-dom";
import "../assets/css/Footer.css";
import logoImg from "../assets/logo3.png";

const Footer = () => {
 return (
    <footer> 
            
        <Link to="/contact">Contact Us</Link>
        <pre>MoodHarbor</pre>
        <p>&copy;2024 Aditya, Anushka, Pauline</p>
        <img src={logoImg} alt="logo" />
    </footer>
 );
};

export default Footer;
