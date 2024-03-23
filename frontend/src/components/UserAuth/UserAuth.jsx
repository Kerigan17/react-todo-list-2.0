import './UserAuth.scss';
import React, {useEffect, useState} from "react";
import axios from "axios";

export default function UserAuth() {
    let [mode, setMode] = useState('login');
    let [users, setUsers] = useState([1,2,3]);

    useEffect(() => {
        axios.get("http://localhost:4000/users")
            .then(data => setUsers(data.data))
            .catch(error => console.error(error));
    }, []);

    return(
        <>
            <div className={'form-block'}>
                <h2 className={'form-title'}>Todo List</h2>

                <div className={'switcher'}>
                    <div className={mode==='login' ? 'switcher__login active' : 'switcher__login'} onClick={() => setMode('login')}>Login</div>
                    <div className={mode==='signup' ? 'switcher__signup active' : 'switcher__signup'} onClick={() => setMode('signup')}>Signup</div>
                </div>

                <form className={'form-auth'}>
                    <input type="email" placeholder='email'/>
                    <input type="password" placeholder='password'/>
                    <a className={'forgot'} href="#">Forgot password?</a>
                    {mode==='login' &&
                        <button type='button' className={'form__btn'}>Login</button>
                    }
                    {mode==='signup' &&
                        <button type='button' className={'form__btn'}>Signup</button>
                    }
                </form>
            </div>

            <div>
                all users {users}
            </div>

        </>
    )
}