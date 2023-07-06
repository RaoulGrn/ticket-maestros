import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import {faCartShopping, faDoorOpen, faHistory, faHome, faInfo, faStar, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import {useState} from "react";
import "./Sidebar.css"
import {useAuthContext} from "../../util/AuthContext.jsx";

 const Sidebar = () => {
     const [path, setPath] = useState("");


     const { user, logout } = useAuthContext();
     const handleLogout = () => {
         logout();
     };


     return (

         <SideNav
             className={"sidebar"}
             onSelect={(selected) => {
                 setPath(selected);
             }}
         >
             <SideNav.Toggle  />
             <SideNav.Nav className={"sd-nav"}  defaultSelected="/home">
                 <NavItem eventKey="">
                     <NavIcon>
                         <Link to={"/"}><FontAwesomeIcon icon={faHome}/></Link>
                     </NavIcon>
                     <NavText>
                         Home
                     </NavText>
                 </NavItem>
                 <NavItem eventKey="/favorites" >
                     <NavIcon>
                         <Link to={path}><FontAwesomeIcon icon={faStar}/></Link>
                     </NavIcon>
                     <NavText>Favorites
                     </NavText>
                 </NavItem>

                 <NavItem eventKey="/api/cart">
                     <NavIcon>
                         <Link to={path}><FontAwesomeIcon icon={faCartShopping}/></Link>
                     </NavIcon>
                     <NavText>
                         Cart
                     </NavText>
                 </NavItem>

                 {user === "admin" ?

                     <NavItem  eventKey="/admin">
                         <NavIcon >
                             <FontAwesomeIcon icon={faUser}/>
                         </NavIcon>
                         <NavText >
                             Admin
                         </NavText>

                         <NavItem   eventKey="/admin/userlist">

                             <NavText>
                                 <Link to={path}>Admin Panel</Link>
                             </NavText>
                         </NavItem>
                         <NavItem  eventKey="/user/logout">
                             <NavText  onClick={handleLogout}>
                                 LogOut <FontAwesomeIcon className={"text-danger"}  icon={faDoorOpen}/>
                             </NavText>
                         </NavItem>
                     </NavItem>
                     :
                     <NavItem  eventKey="/user">
                         <NavIcon >
                             <FontAwesomeIcon icon={faUser}/>
                         </NavIcon>
                         <NavText >
                             User
                         </NavText>




                         <NavItem  eventKey="/user/logout">
                             <NavText  onClick={handleLogout}>
                                 LogOut <FontAwesomeIcon className={"text-danger"}  icon={faDoorOpen}/>
                             </NavText>
                         </NavItem>
                     </NavItem>

                 }

             </SideNav.Nav>
         </SideNav>
     );
};

export default Sidebar;