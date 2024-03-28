import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import UserAuth from "./UserAuth/UserAuth";
import TaskList from './TaskList/TaskList';

export default function App() {
    const navigate = useNavigate();
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        // if (!auth) navigate('/auth');
        // else navigate('/');
    }, [navigate, auth]);

    return (
        <Routes>
            <Route path={'/'} element={<TaskList />}/>
            <Route path={'/auth'} element={<UserAuth onAuth = {setAuth}/>}/>
            <Route path={'*'} element={<Navigate to = '/' />}/>
        </Routes>
    )
}