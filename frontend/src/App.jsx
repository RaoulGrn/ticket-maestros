import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/home/Home';
import Hotel from './pages/hotel/Hotel';
import Favorites from './pages/Favorites/Favorites';
import History from './pages/History/History';
import User from './pages/user/User';
import Cart from './pages/cart/Cart';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import LoginModal from './components/modals/LoginModal';
import RegisterModal from './components/modals/RegisterModal';
import { AuthContextProvider } from './util/AuthContext';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import PrivateRoute from './util/PrivateRoute';
import PublicNavbar from "./components/publicNavbar/PublicNavbar.jsx";
import AdminPage from "./pages/admin/AdminPage.jsx";
import Footer from "./components/footer/Footer.jsx";
import Contact from "./pages/contact/Contact.jsx";

function App() {
    return (

        <AuthContextProvider>

                <Routes>
                    <Route path="/login" element={<PublicNavbar />} />


               <Route element={<PrivateRoute />}>
                   <Route path="/" element={<Home path="/" />}/>
                    <Route path="/hotels/:id" element={<Hotel />} />
                    <Route
                        path="/favorites"
                        element={
                            <>
                                <Navbar />
                                <Sidebar />
                                <Favorites />
                            </>
                        }
                    />
                    <Route path="/api/cart" element={[<Navbar/>,<Sidebar/>,<Cart />,<Footer/>]} />
                    <Route path="/user/info" element={[<Navbar/>,<Sidebar/>,<User />,<Footer/>]} />
                   <Route path="/contact" element={[<Navbar/>,<Sidebar/>,<Contact />,<Footer/>]} />
                   <Route path="/admin/userlist" element={[<Navbar/>,<Sidebar/>,<AdminPage/>,<Footer/>]} />
                   <Route path="*" element={<Navigate to="/" />} />
               </Route>
                </Routes>

        </AuthContextProvider>

    );
}

export default App;