import React, { createContext,useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom";
import './Header.css'
import Home from '../Navbar/Home'
import NotFound from './../Navbar/NotFound';
import Destination from './../Navbar/Destination';
import Blog from '../Navbar/Blog';
import Contact from '../Navbar/Contact';
import Login from './../Navbar/Login';
import PrivateRoute from './../PrivateRoute/PrivateRoute';

export const UserContext = createContext();

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useState({});
    console.log("loggedInUser.email from header component",loggedInUser.email);
    return (
        <UserContext.Provider value={[loggedInUser, setLoggedInUser]} className="header-area">
            <Router>
                <nav>
                    <div className="logo">
                        <NavLink to="/">Quick Rider</NavLink>
                    </div>
                    <div className="menu-area">
                        <ul className="menu">
                            <li> <Link to="/" >Home</Link></li>
                            <li> <Link to="/destination" >Destination</Link> </li>
                            <li> <Link to="/blog">Blog</Link> </li>
                            <li> <Link to="/contact">Contact</Link> </li>
                            <li> <Link to="/login">Login</Link> </li>
                        </ul>
                    </div>
                </nav>
                <Switch>
                    <Route exact path="/">
                        <Home></Home>
                    </Route>
                    <PrivateRoute path="/destination">
                        <Destination></Destination>
                    </PrivateRoute>
                    <Route path="/blog">
                        <Blog></Blog>
                    </Route>
                    <Route path="/contact">
                        <Contact></Contact>
                    </Route>
                    <Route path="/login">
                        <Login></Login>
                    </Route>
                    
                    <Route path="*">
                        <NotFound></NotFound>
                    </Route>
                </Switch>
            </Router>
        </UserContext.Provider>
    );
};

export default Header;