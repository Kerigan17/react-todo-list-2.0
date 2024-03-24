import './UserAuth.scss';
import React, {useEffect, useState} from "react";
import {baseURL} from "../../config.mjs";
import axios from "axios";

export default function UserAuth() {
    let [mode, setMode] = useState('login');
    let [users, setUsers] = useState([]);
    const loginInput = React.createRef();
    const passwordInput = React.createRef();

    // data for one user
    // let [user, setUser] = useState({login:'', password:''})

    // get data for all users
    // useEffect(() => {
    //         axios.get(`${baseURL}/users/all-users`)
    //             .then(resp => {
    //                 setUsers(resp.data);
    //                 console.log(resp.data)
    //             });
    // }, []);

    function checkUser() {
        let login = loginInput.current.value;
        let password = passwordInput.current.value;

        axios.get(`${baseURL}/users/user`, {
            headers: {
                "content-type": "application/json"
            },
            params: {
                login: login,
                password: password
            }
        })
            .then(response => console.log(response.data))
    }

    return(
        <>
            <div className={'form-block'}>
                <h2 className={'form-title'}>Todo List</h2>

                <div className={'switcher'}>
                    <div className={mode==='login' ? 'switcher__login active' : 'switcher__login'} onClick={() => setMode('login')}>Login</div>
                    <div className={mode==='signup' ? 'switcher__signup active' : 'switcher__signup'} onClick={() => setMode('signup')}>Signup</div>
                </div>

                <form className={'form-auth'}>
                    <input type="email" placeholder='email' ref={loginInput}/>
                    <input type="password" placeholder='password' ref={passwordInput}/>
                    <a className={'forgot'} href="#">Forgot password?</a>
                    {mode==='login' &&
                        <button type='button' className={'form__btn'} onClick={checkUser}>Login</button>
                    }
                    {mode==='signup' &&
                        <button type='button' className={'form__btn'}>Signup</button>
                    }
                </form>
            </div>

            <div>

            </div>

        </>
    )
}