import './UserAuth.scss';
import React, {createRef, useState} from "react";
import {baseURL} from "../../config";
import axios from "axios";


export default function UserAuth({onAuth}:{onAuth: (value:boolean) => void} ) {
    let [mode, setMode] = useState('login');
    let [error, setError] = useState('');
    const loginInput = createRef<HTMLInputElement>();
    const passwordInput = createRef<HTMLInputElement>();

    function checkUser() {
        let login = loginInput.current!.value;
        let password = passwordInput.current!.value;

        if (login && password) {
            axios.get(`${baseURL}/users/user`, {
                params: {
                    login: login,
                    password: password
                }
            })
                .then(response => {
                    if (!response.data) {
                        setError('incorrect login or password');
                    } else {
                        setError('');
                        console.log('access is allowed')
                        onAuth(true);
                    }
                })
        } else {
            setError('enter login and password');
        }
    }

    function addUser() {
        let login = loginInput.current!.value;
        let password = passwordInput.current!.value;

        axios.post(`${baseURL}/users/add-user`, {
            login: login,
            password: password
        })
            .then(()=>checkUser())
            .catch(error => setError(error.response.data));
    }


    function validateLogin() {
        let login = loginInput.current!.value;
        let mailFormat = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
        if (!login.match(mailFormat)) {
            setError('Incorrect email format')
        }
    }

    function resetError() {
        if (error) setError('');
    }

    function changeMod(mod:string) {
        setMode(mod);
        setError('');
    }

    return (
        <>
            <div className={'form-block'}>
                <h2 className={'form-title'}>Todo List</h2>

                <div className={'switcher'}>
                    <div className={mode === 'login' ? 'switcher__login active' : 'switcher__login'}
                         onClick={() => changeMod('login')}>Login
                    </div>
                    <div className={mode === 'signup' ? 'switcher__signup active' : 'switcher__signup'}
                         onClick={() => changeMod('signup')}>Signup
                    </div>
                </div>

                <form className={'form-auth'}>
                    <input type="email" placeholder='email' ref={loginInput} onChange={resetError}
                           onBlur={validateLogin}/>
                    <input type="password" placeholder='password' ref={passwordInput} onChange={resetError}/>

                    <a className={'forgot'} href="#">Forgot password?</a>

                    {error !== '' && <div className={'form__error'}>{error}</div>}

                    {mode === 'login' &&
                        <button type='button' className={'form__btn btn_login'} onClick={checkUser}>Login</button>}
                    {mode === 'signup' &&
                        <button type='button' className={'form__btn btn_signup'} onClick={addUser}>Signup</button>}
                </form>
            </div>
        </>
    )
}