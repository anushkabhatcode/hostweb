import { useContext, useEffect, useState } from "react";
import UserContext from "./Auth/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaSmile, FaEnvelope, FaSignOutAlt, FaBeer, FaChartArea, FaPhoneSquare } from 'react-icons/fa';
import PopupMessage from "./PopupMessage";

function Sidebar(props){

    const class_name=props.class_name;
    const [showPopup, setShowPopup] = useState(false);

    const navigate = useNavigate();

    //useContext to logout user
    const { logout } = useContext(UserContext);

    const handleLogout = () => {
        logout();
        setShowPopup(true);
        console.log("Popup shown!");

     };

    useEffect(() => {
        const timer = setTimeout(() => {
          setShowPopup(false);
        //   navigate('/');
        }, 2000);
        return () => clearTimeout(timer);
    }, [showPopup]);

    return(
    <div className={class_name}>
        <div className="nav-links">
            <Link to={"/home"} id="home"><FaHome /> Home</Link>
            <Link to={"/moodboost"} id="moodboost"><FaSmile /> MoodBoost</Link>
            <Link to={"/dashboard"} id="dash"><FaChartArea />  Logs</Link>
            <Link to={"/contact"} id="contact"><FaEnvelope /> Contact</Link>
            <div className="bottom_nav_container">
            <Link to={"/connect"} id="connect"><FaPhoneSquare /> Connect</Link>
                <div className="logout-link" id="logout" onClick={handleLogout}>
                    <FaSignOutAlt /> Logout
                    
                </div>
            </div>
        </div>
        {showPopup && <PopupMessage 
        message="Logged out successfully!" 
         />}
    </div>
    );
}

export default Sidebar;