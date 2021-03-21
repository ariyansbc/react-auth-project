import React, { useContext, createContext,useState } from 'react';
import "./Login.css"
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
import { UserContext } from './../Header/Header';
import { useHistory, useLocation } from 'react-router';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {

    //state for handle new user
    const [newUser, setNewUser] = useState(false)

    {/*  main state */}
    const [user, setUser] = useState({
        isSignedIn : false,
        newUser: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false
    })

    //createContext state Value
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };


    // direct google sign in
    const handleGoogleLogin = () => {
        const GoogleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(GoogleProvider)
            .then((result) => {
                const {email} = result.user;
                const newUserInfo = {...user}
                newUserInfo.email = email;
                setUser(newUserInfo);
                setLoggedInUser(newUserInfo);
                history.replace(from);
                var user = result.user;
                // console.log("user", user);
                console.log("email",email);
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
            });
    }

    {/* form sign In  */ }
    const handleOnBlur = (e) => {
        let isFormFieldValid = true;
        if(e.target.name === 'email') {

            isFormFieldValid  = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if(e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const isPassHasNumber =  /\d{1}/.test(e.target.value);
            isFormFieldValid  = isPasswordValid && isPassHasNumber;
        }
        if(isFormFieldValid ) {
            const newUserInfo = {...user};
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
            // console.log("newUserInfro", newUserInfo);
        }
    }

    //custom form handle code
    const handleFormSubmit = (e) => {
        console.log(user.name);
        if(newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then((res) => {
                const {email} = res.user;
                const newUser = {...user};
                newUser.error = '';
                newUser.success = true;
                newUser.email = email;
                setUser(newUser);
                setLoggedInUser(newUser);
                history.replace(from);
                var user = res.user;
                // console.log("res",res);
                // console.log("user email",user);
                // console.log("email",email); 
            })
            .catch((error) => {
                const newUser = {...user};
                newUser.error = error.message;
                newUser.success = false;
                setUser(newUser)
            //   var errorCode = error.code;
            //   var errorMessage = error.message;
            //   console.log(errorMessage);
            });
        }

        if( !newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    const newUserInfo = {...user}
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                    console.log(res.user.email);
                    // console.log('sign in user info', res.user);
                })
                .catch((error) => {
                    const newUserInfo = {...user}
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }
        e.preventDefault();  
    }
    return (
        <div className="login">
            <div className="login-form-area">
                <h2>{newUser? "Create An Account" : "Login"}</h2>
                <input type="checkbox" onChange={()=> setNewUser(!newUser)} name="newUser"id=""/>
                <label className="label" htmlFor="">Don't have any account</label>
                <form onSubmit={handleFormSubmit} action="">
                    { newUser && <input type="text" name="name" onBlur={handleOnBlur} placeholder="Name" required/>}
                    <br/>
                    <input type="email" name="email" onBlur={handleOnBlur} placeholder="Your email" required />
                    <br />
                    <input type="password" name="password" onBlur={handleOnBlur} placeholder="password" required />
                    <br />
                    <input type="submit" value={newUser? "Create Account" : "Login"}/>

                </form>
            </div>
            <br/>
            <h2>------OR-----</h2>
            <div className="login-social-area">
                <button onClick={handleGoogleLogin}>Continue with google</button>
            </div>
            {user.success ? <h2 style={{color: 'green'}}> User {newUser ? 'created': 'Logged In'} Successfully</h2> :<h2 style={{color:"red"}} >{user.error}</h2>}
        </div>
    );
};

export default Login;