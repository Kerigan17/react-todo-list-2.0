import './UserAuth.scss';
import React, {useState} from "react";
import {baseURL} from "../../config.mjs";
import axios from "axios";

export default function UserAuth() {
    let [mode, setMode] = useState('login');
    let [error, setError] = useState({mode: false, text: ''});
    const loginInput = React.createRef();
    const passwordInput = React.createRef();

    function checkUser() {
        let login = loginInput.current.value;
        let password = passwordInput.current.value;

        if (login && password) {
            axios.get(`${baseURL}/users/user`, {
                params: {
                    login: login,
                    password: password
                }
            })
                .then(response => {
                    if (!response.data) {
                        setError({mode: true, text: 'incorrect login or password'});
                    } else {
                        setError({mode: false, text: ''});
                        console.log('access is allowed')
                    }
                })
        } else {
            setError({mode: true, text: 'enter password and login'});
        }
    }

    function addUser() {
        let login = loginInput.current.value;
        let password = passwordInput.current.value;

        axios.post(`${baseURL}/users/add-user`, {
            login: login,
            password: password
        })
            .then(response => console.log('new user was added'))
    }

    function resetError() {
        if (error) setError(false);
    }

    function changeMod(mod) {
        setMode(mod);
        setError(false);
    }

    return(
        <>
            <div className={'form-block'}>
                <h2 className={'form-title'}>Todo List</h2>

                <div className={'switcher'}>
                    <div className={mode==='login' ? 'switcher__login active' : 'switcher__login'} onClick={() => changeMod('login')}>Login</div>
                    <div className={mode==='signup' ? 'switcher__signup active' : 'switcher__signup'} onClick={() => changeMod('signup')}>Signup</div>
                </div>

                <form className={'form-auth'}>
                    <input type="email" placeholder='email' ref={loginInput} onChange={resetError}/>
                    <input type="password" placeholder='password' ref={passwordInput} onChange={resetError}/>

                    <a className={'forgot'} href="#">Forgot password?</a>

                    {error.mode && <div className={'form__error'}>{error.text}</div> }
                    {mode==='login' && <button type='button' className={'form__btn btn_login'} onClick={checkUser}>Login</button> }
                    {mode==='signup' &&  <button type='button' className={'form__btn btn_signup'} onClick={addUser}>Signup</button> }
                </form>
            </div>
        </>
    )
}