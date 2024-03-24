import './UserAuth.scss';
import React, {useEffect, useState} from "react";
import {baseURL} from "../../config.mjs";
import axios from "axios";

export default function UserAuth() {
    let [mode, setMode] = useState('login');
    let [error, setError] = useState(false)
    const loginInput = React.createRef();
    const passwordInput = React.createRef();

    function checkUser() {
        let login = loginInput.current.value;
        let password = passwordInput.current.value;

        axios.get(`${baseURL}/users/user`, {
            params: {
                login: login,
                password: password
            }
        })
            .then(response => {
                if (!response.data) {
                    setError(true);
                } else {
                    setError(false);
                    console.log('access is allowed')
                }
            })
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

                    {error &&
                        <div className={'form__error'}>Неверный логин или пароль</div>
                    }

                    {mode==='login' &&
                        <button type='button' className={'form__btn'} onClick={checkUser}>Login</button>
                    }
                    {mode==='signup' &&
                        <button type='button' className={'form__btn'} onClick={addUser}>Signup</button>
                    }
                </form>
            </div>

            <div>

            </div>

        </>
    )
}